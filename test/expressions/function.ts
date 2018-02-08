import { pass, fail } from '../test-utils';

describe('Expressions - Function', () => {

    fail(`var f = function(a = 0) { "use strict"; }`, {
        source: 'var f = function(a = 0) { "use strict"; }',
        message: 'Illegal \'use strict\' directive in function with non-simple parameter list',
        line: 1,
        column: 39,
        index: 39
    });

    fail(`0, function() { super(); };`, {
        source: '0, function() { super(); };',
        message: 'super() is only valid in derived class constructors',
        line: 1,
        column: 21,
        index: 21
    });

    fail(`0, function(x = super()) {};`, {
        source: '0, function(x = super()) {};',
        message: 'super() is only valid in derived class constructors',
        line: 1,
        column: 21,
        index: 21
    });

    fail(`"use strict"; function foo() { eval = 42; };`, {
        source: '"use strict"; function foo() { eval = 42; };',
        message: 'Eval or arguments can\'t be assigned to in strict mode code',
        line: 1,
        column: 35,
        index: 35
    });

    fail(`(function((a)){})`, {
    source: '(function((a)){})',
    message: 'Unexpected token (',
    line: 1,
    column: 10,
    index: 10
});

    fail(`(function ({ a(){} }) {})`, {
    source: '(function ({ a(){} }) {})',
    message: 'Unexpected token )',
    line: 1,
    column: 15,
    index: 15
});

    fail(`(function((a)){})`, {
    source: '(function((a)){})',
    message: 'Unexpected token (',
    line: 1,
    column: 10,
    index: 10
});

    fail(`(function(...a, b){})`, {
    source: '(function(...a, b){})',
    message:  'Rest parameter must be last formal parameter',
    line: 1,
    column: 14,
    index: 14
});

    fail(`var _13_1_18_fun = function (eval) { "use strict"; }`, {
    source: 'var _13_1_18_fun = function (eval) { "use strict"; }',
    message: 'Unexpected strict mode reserved word',
    line: 1,
    column: 50,
    index: 50
});

    pass(`(function foo() {} /42/i)`, {
    source: `(function foo() {} /42/i)`,
    loc: true,
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
                        type: 'BinaryExpression',
                        left: {
                            type: 'FunctionExpression',
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: [],
                                start: 16,
                                end: 18,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 16
                                    },
                                    end: {
                                        line: 1,
                                        column: 18
                                    }
                                }
                            },
                            async: false,
                            generator: false,
                            expression: false,
                            id: {
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
                            }
                        },
                        right: {
                            type: 'Literal',
                            value: 42,
                            start: 20,
                            end: 22,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 20
                                },
                                end: {
                                    line: 1,
                                    column: 22
                                }
                            },
                            raw: '42'
                        },
                        operator: '/',
                        start: 1,
                        end: 22,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 22
                            }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'i',
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
                        }
                    },
                    operator: '/',
                    start: 1,
                    end: 24,
                    loc: {
                        start: {
                            line: 1,
                            column: 1
                        },
                        end: {
                            line: 1,
                            column: 24
                        }
                    }
                },
                start: 0,
                end: 25,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 25
                    }
                }
            }
        ],
        sourceType: 'script',
        start: 0,
        end: 25,
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 25
            }
        }
    }
});

    pass(`function fn() {
return
function foo() {}
/42/i
}`, {
  source: `function fn() {
    return
    function foo() {}
    /42/i
  }`,
  loc: true,
  ranges: true,
  raw: true,
  expected: {
    type: 'Program',
    body: [
        {
            type: 'FunctionDeclaration',
            params: [],
            body: {
                type: 'BlockStatement',
                body: [
                    {
                        type: 'ReturnStatement',
                        argument: null,
                        start: 20,
                        end: 26,
                        loc: {
                            start: {
                                line: 2,
                                column: 4
                            },
                            end: {
                                line: 2,
                                column: 10
                            }
                        }
                    },
                    {
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 46,
                            end: 48,
                            loc: {
                                start: {
                                    line: 3,
                                    column: 19
                                },
                                end: {
                                    line: 3,
                                    column: 21
                                }
                            }
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'foo',
                            start: 40,
                            end: 43,
                            loc: {
                                start: {
                                    line: 3,
                                    column: 13
                                },
                                end: {
                                    line: 3,
                                    column: 16
                                }
                            }
                        },
                        start: 31,
                        end: 48,
                        loc: {
                            start: {
                                line: 3,
                                column: 4
                            },
                            end: {
                                line: 3,
                                column: 21
                            }
                        }
                    },
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Literal',
                            value: {},
                            regex: {
                                pattern: '42',
                                flags: 'i'
                            },
                            start: 53,
                            end: 58,
                            loc: {
                                start: {
                                    line: 4,
                                    column: 4
                                },
                                end: {
                                    line: 4,
                                    column: 9
                                }
                            },
                            raw: '/42/i'
                        },
                        start: 53,
                        end: 58,
                        loc: {
                            start: {
                                line: 4,
                                column: 4
                            },
                            end: {
                                line: 4,
                                column: 9
                            }
                        }
                    }
                ],
                start: 14,
                end: 62,
                loc: {
                    start: {
                        line: 1,
                        column: 14
                    },
                    end: {
                        line: 5,
                        column: 3
                    }
                }
            },
            async: false,
            generator: false,
            expression: false,
            id: {
                type: 'Identifier',
                name: 'fn',
                start: 9,
                end: 11,
                loc: {
                    start: {
                        line: 1,
                        column: 9
                    },
                    end: {
                        line: 1,
                        column: 11
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
                    line: 5,
                    column: 3
                }
            }
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 62,
    loc: {
        start: {
            line: 1,
            column: 0
        },
        end: {
            line: 5,
            column: 3
        }
    }
}
});

    pass(`test(); function foo() {} /42/i`, {
    source: `test(); function foo() {} /42/i`,
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
                      name: 'test',
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
                  },
                  arguments: [],
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
          {
              type: 'FunctionDeclaration',
              params: [],
              body: {
                  type: 'BlockStatement',
                  body: [],
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
                  }
              },
              async: false,
              generator: false,
              expression: false,
              id: {
                  type: 'Identifier',
                  name: 'foo',
                  start: 17,
                  end: 20,
                  loc: {
                      start: {
                          line: 1,
                          column: 17
                      },
                      end: {
                          line: 1,
                          column: 20
                      }
                  }
              },
              start: 8,
              end: 25,
              loc: {
                  start: {
                      line: 1,
                      column: 8
                  },
                  end: {
                      line: 1,
                      column: 25
                  }
              }
          },
          {
              type: 'ExpressionStatement',
              expression: {
                  type: 'Literal',
                  value: {},
                  regex: {
                      pattern: '42',
                      flags: 'i'
                  },
                  start: 26,
                  end: 31,
                  loc: {
                      start: {
                          line: 1,
                          column: 26
                      },
                      end: {
                          line: 1,
                          column: 31
                      }
                  },
                  raw: '/42/i'
              },
              start: 26,
              end: 31,
              loc: {
                  start: {
                      line: 1,
                      column: 26
                  },
                  end: {
                      line: 1,
                      column: 31
                  }
              }
          }
      ],
      sourceType: 'script',
      start: 0,
      end: 31,
      loc: {
          start: {
              line: 1,
              column: 0
          },
          end: {
              line: 1,
              column: 31
          }
      }
  }
  });

    pass(`!function fn() {} /42/i;`, {
    source: `!function fn() {} /42/i;`,
    loc: true,
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
                      type: 'BinaryExpression',
                      left: {
                          type: 'UnaryExpression',
                          operator: '!',
                          argument: {
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
                              generator: false,
                              expression: false,
                              id: {
                                  type: 'Identifier',
                                  name: 'fn',
                                  start: 10,
                                  end: 12,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 10
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
                          },
                          prefix: true,
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
                      },
                      right: {
                          type: 'Literal',
                          value: 42,
                          start: 19,
                          end: 21,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 19
                              },
                              end: {
                                  line: 1,
                                  column: 21
                              }
                          },
                          raw: '42'
                      },
                      operator: '/',
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
                  },
                  right: {
                      type: 'Identifier',
                      name: 'i',
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
                  operator: '/',
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

    pass('function *z() { var a; } function f() { return b; } f();', {
        source: 'function *z() { var a; } function f() { return b; } f();',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'VariableDeclaration',
                                declarations: [
                                    {
                                        type: 'VariableDeclarator',
                                        init: null,
                                        id: {
                                            type: 'Identifier',
                                            name: 'a',
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
                                            }
                                        },
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
                                        }
                                    }
                                ],
                                kind: 'var',
                                start: 16,
                                end: 22,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 16
                                    },
                                    end: {
                                        line: 1,
                                        column: 22
                                    }
                                }
                            }
                        ],
                        start: 14,
                        end: 24,
                        loc: {
                            start: {
                                line: 1,
                                column: 14
                            },
                            end: {
                                line: 1,
                                column: 24
                            }
                        }
                    },
                    async: false,
                    generator: true,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'z',
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
                {
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'ReturnStatement',
                                argument: {
                                    type: 'Identifier',
                                    name: 'b',
                                    start: 47,
                                    end: 48,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 47
                                        },
                                        end: {
                                            line: 1,
                                            column: 48
                                        }
                                    }
                                },
                                start: 40,
                                end: 49,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 40
                                    },
                                    end: {
                                        line: 1,
                                        column: 49
                                    }
                                }
                            }
                        ],
                        start: 38,
                        end: 51,
                        loc: {
                            start: {
                                line: 1,
                                column: 38
                            },
                            end: {
                                line: 1,
                                column: 51
                            }
                        }
                    },
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'f',
                        start: 34,
                        end: 35,
                        loc: {
                            start: {
                                line: 1,
                                column: 34
                            },
                            end: {
                                line: 1,
                                column: 35
                            }
                        }
                    },
                    start: 25,
                    end: 51,
                    loc: {
                        start: {
                            line: 1,
                            column: 25
                        },
                        end: {
                            line: 1,
                            column: 51
                        }
                    }
                },
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'f',
                            start: 52,
                            end: 53,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 52
                                },
                                end: {
                                    line: 1,
                                    column: 53
                                }
                            }
                        },
                        arguments: [],
                        start: 52,
                        end: 55,
                        loc: {
                            start: {
                                line: 1,
                                column: 52
                            },
                            end: {
                                line: 1,
                                column: 55
                            }
                        }
                    },
                    start: 52,
                    end: 56,
                    loc: {
                        start: {
                            line: 1,
                            column: 52
                        },
                        end: {
                            line: 1,
                            column: 56
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 56,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 56
                }
            }
        }
    });

    pass('var z = function *() { var a; }; function f() { return b; } f();', {
        source: 'var z = function *() { var a; }; function f() { return b; } f();',
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
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [
                                        {
                                            type: 'VariableDeclaration',
                                            declarations: [
                                                {
                                                    type: 'VariableDeclarator',
                                                    init: null,
                                                    id: {
                                                        type: 'Identifier',
                                                        name: 'a',
                                                        start: 27,
                                                        end: 28,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 27
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 28
                                                            }
                                                        }
                                                    },
                                                    start: 27,
                                                    end: 28,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 27
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 28
                                                        }
                                                    }
                                                }
                                            ],
                                            kind: 'var',
                                            start: 23,
                                            end: 29,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 23
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 29
                                                }
                                            }
                                        }
                                    ],
                                    start: 21,
                                    end: 31,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 21
                                        },
                                        end: {
                                            line: 1,
                                            column: 31
                                        }
                                    }
                                },
                                async: false,
                                generator: true,
                                expression: false,
                                id: null,
                                start: 8,
                                end: 31,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
                                    },
                                    end: {
                                        line: 1,
                                        column: 31
                                    }
                                }
                            },
                            id: {
                                type: 'Identifier',
                                name: 'z',
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
                            end: 31,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 31
                                }
                            }
                        }
                    ],
                    kind: 'var',
                    start: 0,
                    end: 32,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 32
                        }
                    }
                },
                {
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'ReturnStatement',
                                argument: {
                                    type: 'Identifier',
                                    name: 'b',
                                    start: 55,
                                    end: 56,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 55
                                        },
                                        end: {
                                            line: 1,
                                            column: 56
                                        }
                                    }
                                },
                                start: 48,
                                end: 57,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 48
                                    },
                                    end: {
                                        line: 1,
                                        column: 57
                                    }
                                }
                            }
                        ],
                        start: 46,
                        end: 59,
                        loc: {
                            start: {
                                line: 1,
                                column: 46
                            },
                            end: {
                                line: 1,
                                column: 59
                            }
                        }
                    },
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'f',
                        start: 42,
                        end: 43,
                        loc: {
                            start: {
                                line: 1,
                                column: 42
                            },
                            end: {
                                line: 1,
                                column: 43
                            }
                        }
                    },
                    start: 33,
                    end: 59,
                    loc: {
                        start: {
                            line: 1,
                            column: 33
                        },
                        end: {
                            line: 1,
                            column: 59
                        }
                    }
                },
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'f',
                            start: 60,
                            end: 61,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 60
                                },
                                end: {
                                    line: 1,
                                    column: 61
                                }
                            }
                        },
                        arguments: [],
                        start: 60,
                        end: 63,
                        loc: {
                            start: {
                                line: 1,
                                column: 60
                            },
                            end: {
                                line: 1,
                                column: 63
                            }
                        }
                    },
                    start: 60,
                    end: 64,
                    loc: {
                        start: {
                            line: 1,
                            column: 60
                        },
                        end: {
                            line: 1,
                            column: 64
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 64,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 64
                }
            }
        }
    });

    pass('function z(p1, p2) { var a; } function f() { return a; } f();', {
        source: 'var z = function () { var a; }; function f() { return b; } f();',
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
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [
                                        {
                                            type: 'VariableDeclaration',
                                            declarations: [
                                                {
                                                    type: 'VariableDeclarator',
                                                    init: null,
                                                    id: {
                                                        type: 'Identifier',
                                                        name: 'a',
                                                        start: 26,
                                                        end: 27,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 26
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 27
                                                            }
                                                        }
                                                    },
                                                    start: 26,
                                                    end: 27,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 26
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 27
                                                        }
                                                    }
                                                }
                                            ],
                                            kind: 'var',
                                            start: 22,
                                            end: 28,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 22
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 28
                                                }
                                            }
                                        }
                                    ],
                                    start: 20,
                                    end: 30,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 20
                                        },
                                        end: {
                                            line: 1,
                                            column: 30
                                        }
                                    }
                                },
                                async: false,
                                generator: false,
                                expression: false,
                                id: null,
                                start: 8,
                                end: 30,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
                                    },
                                    end: {
                                        line: 1,
                                        column: 30
                                    }
                                }
                            },
                            id: {
                                type: 'Identifier',
                                name: 'z',
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
                            end: 30,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 30
                                }
                            }
                        }
                    ],
                    kind: 'var',
                    start: 0,
                    end: 31,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 31
                        }
                    }
                },
                {
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'ReturnStatement',
                                argument: {
                                    type: 'Identifier',
                                    name: 'b',
                                    start: 54,
                                    end: 55,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 54
                                        },
                                        end: {
                                            line: 1,
                                            column: 55
                                        }
                                    }
                                },
                                start: 47,
                                end: 56,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 47
                                    },
                                    end: {
                                        line: 1,
                                        column: 56
                                    }
                                }
                            }
                        ],
                        start: 45,
                        end: 58,
                        loc: {
                            start: {
                                line: 1,
                                column: 45
                            },
                            end: {
                                line: 1,
                                column: 58
                            }
                        }
                    },
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'f',
                        start: 41,
                        end: 42,
                        loc: {
                            start: {
                                line: 1,
                                column: 41
                            },
                            end: {
                                line: 1,
                                column: 42
                            }
                        }
                    },
                    start: 32,
                    end: 58,
                    loc: {
                        start: {
                            line: 1,
                            column: 32
                        },
                        end: {
                            line: 1,
                            column: 58
                        }
                    }
                },
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'f',
                            start: 59,
                            end: 60,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 59
                                },
                                end: {
                                    line: 1,
                                    column: 60
                                }
                            }
                        },
                        arguments: [],
                        start: 59,
                        end: 62,
                        loc: {
                            start: {
                                line: 1,
                                column: 59
                            },
                            end: {
                                line: 1,
                                column: 62
                            }
                        }
                    },
                    start: 59,
                    end: 63,
                    loc: {
                        start: {
                            line: 1,
                            column: 59
                        },
                        end: {
                            line: 1,
                            column: 63
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 63,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 63
                }
            }
        }
    });

    pass('function yield() { }', {
        source: 'function yield() { }',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [],
                        start: 17,
                        end: 20,
                        loc: {
                            start: {
                                line: 1,
                                column: 17
                            },
                            end: {
                                line: 1,
                                column: 20
                            }
                        }
                    },
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'yield',
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

    pass('(function yield() { })', {
        source: '(function yield() { })',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'FunctionExpression',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [],
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
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'yield',
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
                        }
                    },
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
                    }
                }
            ],
            sourceType: 'script',
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
            }
        }
    });

    pass('var z = () => { var a; }; function f() { return b; } f();', {
        source: 'function foo(x, y) { return x + y; }',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'FunctionDeclaration',
                    params: [
                        {
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
                        {
                            type: 'Identifier',
                            name: 'y',
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
                            }
                        }
                    ],
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'ReturnStatement',
                                argument: {
                                    type: 'BinaryExpression',
                                    left: {
                                        type: 'Identifier',
                                        name: 'x',
                                        start: 28,
                                        end: 29,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 28
                                            },
                                            end: {
                                                line: 1,
                                                column: 29
                                            }
                                        }
                                    },
                                    right: {
                                        type: 'Identifier',
                                        name: 'y',
                                        start: 32,
                                        end: 33,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 32
                                            },
                                            end: {
                                                line: 1,
                                                column: 33
                                            }
                                        }
                                    },
                                    operator: '+',
                                    start: 28,
                                    end: 33,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 28
                                        },
                                        end: {
                                            line: 1,
                                            column: 33
                                        }
                                    }
                                },
                                start: 21,
                                end: 34,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 21
                                    },
                                    end: {
                                        line: 1,
                                        column: 34
                                    }
                                }
                            }
                        ],
                        start: 19,
                        end: 36,
                        loc: {
                            start: {
                                line: 1,
                                column: 19
                            },
                            end: {
                                line: 1,
                                column: 36
                            }
                        }
                    },
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'foo',
                        start: 9,
                        end: 12,
                        loc: {
                            start: {
                                line: 1,
                                column: 9
                            },
                            end: {
                                line: 1,
                                column: 12
                            }
                        }
                    },
                    start: 0,
                    end: 36,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 36
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 36,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 36
                }
            }
        }
    });

    pass('var z = function () { var a; }; function f() { return b; } f();', {
        source: 'var z = function () { var a; }; function f() { return b; } f();',
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
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [
                                        {
                                            type: 'VariableDeclaration',
                                            declarations: [
                                                {
                                                    type: 'VariableDeclarator',
                                                    init: null,
                                                    id: {
                                                        type: 'Identifier',
                                                        name: 'a',
                                                        start: 26,
                                                        end: 27,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 26
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 27
                                                            }
                                                        }
                                                    },
                                                    start: 26,
                                                    end: 27,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 26
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 27
                                                        }
                                                    }
                                                }
                                            ],
                                            kind: 'var',
                                            start: 22,
                                            end: 28,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 22
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 28
                                                }
                                            }
                                        }
                                    ],
                                    start: 20,
                                    end: 30,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 20
                                        },
                                        end: {
                                            line: 1,
                                            column: 30
                                        }
                                    }
                                },
                                async: false,
                                generator: false,
                                expression: false,
                                id: null,
                                start: 8,
                                end: 30,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
                                    },
                                    end: {
                                        line: 1,
                                        column: 30
                                    }
                                }
                            },
                            id: {
                                type: 'Identifier',
                                name: 'z',
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
                            end: 30,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 30
                                }
                            }
                        }
                    ],
                    kind: 'var',
                    start: 0,
                    end: 31,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 31
                        }
                    }
                },
                {
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'ReturnStatement',
                                argument: {
                                    type: 'Identifier',
                                    name: 'b',
                                    start: 54,
                                    end: 55,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 54
                                        },
                                        end: {
                                            line: 1,
                                            column: 55
                                        }
                                    }
                                },
                                start: 47,
                                end: 56,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 47
                                    },
                                    end: {
                                        line: 1,
                                        column: 56
                                    }
                                }
                            }
                        ],
                        start: 45,
                        end: 58,
                        loc: {
                            start: {
                                line: 1,
                                column: 45
                            },
                            end: {
                                line: 1,
                                column: 58
                            }
                        }
                    },
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'f',
                        start: 41,
                        end: 42,
                        loc: {
                            start: {
                                line: 1,
                                column: 41
                            },
                            end: {
                                line: 1,
                                column: 42
                            }
                        }
                    },
                    start: 32,
                    end: 58,
                    loc: {
                        start: {
                            line: 1,
                            column: 32
                        },
                        end: {
                            line: 1,
                            column: 58
                        }
                    }
                },
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'f',
                            start: 59,
                            end: 60,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 59
                                },
                                end: {
                                    line: 1,
                                    column: 60
                                }
                            }
                        },
                        arguments: [],
                        start: 59,
                        end: 62,
                        loc: {
                            start: {
                                line: 1,
                                column: 59
                            },
                            end: {
                                line: 1,
                                column: 62
                            }
                        }
                    },
                    start: 59,
                    end: 63,
                    loc: {
                        start: {
                            line: 1,
                            column: 59
                        },
                        end: {
                            line: 1,
                            column: 63
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 63,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 63
                }
            }
        }
    });

    pass('function z() { var a; } function f() { return a; }', {
        source: 'function z() { var a; } function f() { return a; }',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'VariableDeclaration',
                                declarations: [
                                    {
                                        type: 'VariableDeclarator',
                                        init: null,
                                        id: {
                                            type: 'Identifier',
                                            name: 'a',
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
                                    }
                                ],
                                kind: 'var',
                                start: 15,
                                end: 21,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 15
                                    },
                                    end: {
                                        line: 1,
                                        column: 21
                                    }
                                }
                            }
                        ],
                        start: 13,
                        end: 23,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 23
                            }
                        }
                    },
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'z',
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
                {
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'ReturnStatement',
                                argument: {
                                    type: 'Identifier',
                                    name: 'a',
                                    start: 46,
                                    end: 47,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 46
                                        },
                                        end: {
                                            line: 1,
                                            column: 47
                                        }
                                    }
                                },
                                start: 39,
                                end: 48,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 39
                                    },
                                    end: {
                                        line: 1,
                                        column: 48
                                    }
                                }
                            }
                        ],
                        start: 37,
                        end: 50,
                        loc: {
                            start: {
                                line: 1,
                                column: 37
                            },
                            end: {
                                line: 1,
                                column: 50
                            }
                        }
                    },
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'f',
                        start: 33,
                        end: 34,
                        loc: {
                            start: {
                                line: 1,
                                column: 33
                            },
                            end: {
                                line: 1,
                                column: 34
                            }
                        }
                    },
                    start: 24,
                    end: 50,
                    loc: {
                        start: {
                            line: 1,
                            column: 24
                        },
                        end: {
                            line: 1,
                            column: 50
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 50,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 50
                }
            }
        }
    });

    pass('function foo(bar, yield) { }', {
        source: 'function foo(bar, yield) { }',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'FunctionDeclaration',
                    params: [
                        {
                            type: 'Identifier',
                            name: 'bar',
                            start: 13,
                            end: 16,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 13
                                },
                                end: {
                                    line: 1,
                                    column: 16
                                }
                            }
                        },
                        {
                            type: 'Identifier',
                            name: 'yield',
                            start: 18,
                            end: 23,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 18
                                },
                                end: {
                                    line: 1,
                                    column: 23
                                }
                            }
                        }
                    ],
                    body: {
                        type: 'BlockStatement',
                        body: [],
                        start: 25,
                        end: 28,
                        loc: {
                            start: {
                                line: 1,
                                column: 25
                            },
                            end: {
                                line: 1,
                                column: 28
                            }
                        }
                    },
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'foo',
                        start: 9,
                        end: 12,
                        loc: {
                            start: {
                                line: 1,
                                column: 9
                            },
                            end: {
                                line: 1,
                                column: 12
                            }
                        }
                    },
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
                    }
                }
            ],
            sourceType: 'script',
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
            }
        }
    });

    pass(`(function () {
        return function fn() {} /42/i
      })`, {
      source: `(function () {
          return function fn() {} /42/i
        })`,
      loc: true,
      ranges: true,
      raw: true,
      expected: {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'ReturnStatement',
                                argument: {
                                    type: 'BinaryExpression',
                                    left: {
                                        type: 'BinaryExpression',
                                        left: {
                                            type: 'FunctionExpression',
                                            params: [],
                                            body: {
                                                type: 'BlockStatement',
                                                body: [],
                                                start: 46,
                                                end: 48,
                                                loc: {
                                                    start: {
                                                        line: 2,
                                                        column: 31
                                                    },
                                                    end: {
                                                        line: 2,
                                                        column: 33
                                                    }
                                                }
                                            },
                                            async: false,
                                            generator: false,
                                            expression: false,
                                            id: {
                                                type: 'Identifier',
                                                name: 'fn',
                                                start: 41,
                                                end: 43,
                                                loc: {
                                                    start: {
                                                        line: 2,
                                                        column: 26
                                                    },
                                                    end: {
                                                        line: 2,
                                                        column: 28
                                                    }
                                                }
                                            },
                                            start: 32,
                                            end: 48,
                                            loc: {
                                                start: {
                                                    line: 2,
                                                    column: 17
                                                },
                                                end: {
                                                    line: 2,
                                                    column: 33
                                                }
                                            }
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: 42,
                                            start: 50,
                                            end: 52,
                                            loc: {
                                                start: {
                                                    line: 2,
                                                    column: 35
                                                },
                                                end: {
                                                    line: 2,
                                                    column: 37
                                                }
                                            },
                                            raw: '42'
                                        },
                                        operator: '/',
                                        start: 32,
                                        end: 52,
                                        loc: {
                                            start: {
                                                line: 2,
                                                column: 17
                                            },
                                            end: {
                                                line: 2,
                                                column: 37
                                            }
                                        }
                                    },
                                    right: {
                                        type: 'Identifier',
                                        name: 'i',
                                        start: 53,
                                        end: 54,
                                        loc: {
                                            start: {
                                                line: 2,
                                                column: 38
                                            },
                                            end: {
                                                line: 2,
                                                column: 39
                                            }
                                        }
                                    },
                                    operator: '/',
                                    start: 32,
                                    end: 54,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 17
                                        },
                                        end: {
                                            line: 2,
                                            column: 39
                                        }
                                    }
                                },
                                start: 25,
                                end: 54,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 10
                                    },
                                    end: {
                                        line: 2,
                                        column: 39
                                    }
                                }
                            }
                        ],
                        start: 13,
                        end: 64,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 3,
                                column: 9
                            }
                        }
                    },
                    async: false,
                    generator: false,
                    expression: false,
                    id: null,
                    start: 1,
                    end: 64,
                    loc: {
                        start: {
                            line: 1,
                            column: 1
                        },
                        end: {
                            line: 3,
                            column: 9
                        }
                    }
                },
                start: 0,
                end: 65,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 3,
                        column: 10
                    }
                }
            }
        ],
        sourceType: 'script',
        start: 0,
        end: 65,
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 3,
                column: 10
            }
        }
    }
  });

    pass(`function a({a} = {a: 1}) {}`, {
      source: `function a({a} = {a: 1}) {}`,
      loc: true,
      ranges: true,
      raw: true,
      expected: {
          type: 'Program',
          body: [
              {
                  type: 'FunctionDeclaration',
                  params: [
                      {
                          type: 'AssignmentPattern',
                          left: {
                              type: 'ObjectPattern',
                              properties: [
                                  {
                                      type: 'Property',
                                      kind: 'init',
                                      key: {
                                          type: 'Identifier',
                                          name: 'a',
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
                                          }
                                      },
                                      computed: false,
                                      value: {
                                          type: 'Identifier',
                                          name: 'a',
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
                                          }
                                      },
                                      method: false,
                                      shorthand: true,
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
                                      }
                                  }
                              ],
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
                          right: {
                              type: 'ObjectExpression',
                              properties: [
                                  {
                                      type: 'Property',
                                      key: {
                                          type: 'Identifier',
                                          name: 'a',
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
                                          }
                                      },
                                      value: {
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
                                      kind: 'init',
                                      computed: false,
                                      method: false,
                                      shorthand: false,
                                      start: 18,
                                      end: 22,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 18
                                          },
                                          end: {
                                              line: 1,
                                              column: 22
                                          }
                                      }
                                  }
                              ],
                              start: 17,
                              end: 23,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 17
                                  },
                                  end: {
                                      line: 1,
                                      column: 23
                                  }
                              }
                          },
                          start: 11,
                          end: 23,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 11
                              },
                              end: {
                                  line: 1,
                                  column: 23
                              }
                          }
                      }
                  ],
                  body: {
                      type: 'BlockStatement',
                      body: [],
                      start: 25,
                      end: 27,
                      loc: {
                          start: {
                              line: 1,
                              column: 25
                          },
                          end: {
                              line: 1,
                              column: 27
                          }
                      }
                  },
                  async: false,
                  generator: false,
                  expression: false,
                  id: {
                      type: 'Identifier',
                      name: 'a',
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

    pass(`(function x(y, z) { })`, {
      source: `(function x(y, z) { })`,
      loc: true,
      ranges: true,
      raw: true,
      expected: {
          type: 'Program',
          body: [
              {
                  type: 'ExpressionStatement',
                  expression: {
                      type: 'FunctionExpression',
                      params: [
                          {
                              type: 'Identifier',
                              name: 'y',
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
                              }
                          },
                          {
                              type: 'Identifier',
                              name: 'z',
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
                              }
                          }
                      ],
                      body: {
                          type: 'BlockStatement',
                          body: [],
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
                      },
                      async: false,
                      generator: false,
                      expression: false,
                      id: {
                          type: 'Identifier',
                          name: 'x',
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
                      }
                  },
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
                  }
              }
          ],
          sourceType: 'script',
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
          }
      }
  });

    pass(`(function({a: x, a: y}){})`, {
      source: `(function({a: x, a: y}){})`,
      loc: true,
      ranges: true,
      raw: true,
      expected: {
          type: 'Program',
          body: [
              {
                  type: 'ExpressionStatement',
                  expression: {
                      type: 'FunctionExpression',
                      params: [
                          {
                              type: 'ObjectPattern',
                              properties: [
                                  {
                                      type: 'Property',
                                      kind: 'init',
                                      key: {
                                          type: 'Identifier',
                                          name: 'a',
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
                                      computed: false,
                                      value: {
                                          type: 'Identifier',
                                          name: 'x',
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
                                          }
                                      },
                                      method: false,
                                      shorthand: false,
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
                                      }
                                  },
                                  {
                                      type: 'Property',
                                      kind: 'init',
                                      key: {
                                          type: 'Identifier',
                                          name: 'a',
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
                                      computed: false,
                                      value: {
                                          type: 'Identifier',
                                          name: 'y',
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
                                          }
                                      },
                                      method: false,
                                      shorthand: false,
                                      start: 17,
                                      end: 21,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 17
                                          },
                                          end: {
                                              line: 1,
                                              column: 21
                                          }
                                      }
                                  }
                              ],
                              start: 10,
                              end: 22,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 10
                                  },
                                  end: {
                                      line: 1,
                                      column: 22
                                  }
                              }
                          }
                      ],
                      body: {
                          type: 'BlockStatement',
                          body: [],
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
                          }
                      },
                      async: false,
                      generator: false,
                      expression: false,
                      id: null,
                      start: 1,
                      end: 25,
                      loc: {
                          start: {
                              line: 1,
                              column: 1
                          },
                          end: {
                              line: 1,
                              column: 25
                          }
                      }
                  },
                  start: 0,
                  end: 26,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 26
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
                  line: 1,
                  column: 26
              }
          }
      }
  });

    pass(`function* g(){ (function yield(){}); }`, {
      source: `function* g(){ (function yield(){}); }`,
      loc: true,
      ranges: true,
      raw: true,
      expected: {
          type: 'Program',
          body: [
              {
                  type: 'FunctionDeclaration',
                  params: [],
                  body: {
                      type: 'BlockStatement',
                      body: [
                          {
                              type: 'ExpressionStatement',
                              expression: {
                                  type: 'FunctionExpression',
                                  params: [],
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
                                  async: false,
                                  generator: false,
                                  expression: false,
                                  id: {
                                      type: 'Identifier',
                                      name: 'yield',
                                      start: 25,
                                      end: 30,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 25
                                          },
                                          end: {
                                              line: 1,
                                              column: 30
                                          }
                                      }
                                  },
                                  start: 16,
                                  end: 34,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 16
                                      },
                                      end: {
                                          line: 1,
                                          column: 34
                                      }
                                  }
                              },
                              start: 15,
                              end: 36,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 15
                                  },
                                  end: {
                                      line: 1,
                                      column: 36
                                  }
                              }
                          }
                      ],
                      start: 13,
                      end: 38,
                      loc: {
                          start: {
                              line: 1,
                              column: 13
                          },
                          end: {
                              line: 1,
                              column: 38
                          }
                      }
                  },
                  async: false,
                  generator: true,
                  expression: false,
                  id: {
                      type: 'Identifier',
                      name: 'g',
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
                  start: 0,
                  end: 38,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 38
                      }
                  }
              }
          ],
          sourceType: 'script',
          start: 0,
          end: 38,
          loc: {
              start: {
                  line: 1,
                  column: 0
              },
              end: {
                  line: 1,
                  column: 38
              }
          }
      }
  });
});
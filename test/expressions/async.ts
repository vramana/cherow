import { pass, fail } from '../test-utils';

describe('Expressions - Async', () => {

    fail(`if (false) L: async function l() {}`, {
        source: 'if (false) L: async function l() {}',
        line: 1,
    });

    pass(`class UserRepo{ async notget(id) { return id; } }`, {
        source: 'class UserRepo{ async notget(id) { return id; } }',
        ranges: true,
        loc: true,
        raw: true,
        expected: {
            type: 'Program',
            start: 0,
            end: 49,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 49
              }
            },
            body: [
              {
                type: 'ClassDeclaration',
                start: 0,
                end: 49,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 49
                  }
                },
                id: {
                  type: 'Identifier',
                  start: 6,
                  end: 14,
                  loc: {
                    start: {
                      line: 1,
                      column: 6
                    },
                    end: {
                      line: 1,
                      column: 14
                    }
                  },
                  name: 'UserRepo'
                },
                superClass: null,
                body: {
                  type: 'ClassBody',
                  start: 14,
                  end: 49,
                  loc: {
                    start: {
                      line: 1,
                      column: 14
                    },
                    end: {
                      line: 1,
                      column: 49
                    }
                  },
                  body: [
                    {
                      type: 'MethodDefinition',
                      start: 16,
                      end: 47,
                      loc: {
                        start: {
                          line: 1,
                          column: 16
                        },
                        end: {
                          line: 1,
                          column: 47
                        }
                      },
                      computed: false,
                      key: {
                        type: 'Identifier',
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
                        },
                        name: 'notget'
                      },
                      static: false,
                      kind: 'method',
                      value: {
                        type: 'FunctionExpression',
                        start: 28,
                        end: 47,
                        loc: {
                          start: {
                            line: 1,
                            column: 28
                          },
                          end: {
                            line: 1,
                            column: 47
                          }
                        },
                        id: null,
                        generator: false,
                        expression: false,
                        async: true,
                        params: [
                          {
                            type: 'Identifier',
                            start: 29,
                            end: 31,
                            loc: {
                              start: {
                                line: 1,
                                column: 29
                              },
                              end: {
                                line: 1,
                                column: 31
                              }
                            },
                            name: 'id'
                          }
                        ],
                        body: {
                          type: 'BlockStatement',
                          start: 33,
                          end: 47,
                          loc: {
                            start: {
                              line: 1,
                              column: 33
                            },
                            end: {
                              line: 1,
                              column: 47
                            }
                          },
                          body: [
                            {
                              type: 'ReturnStatement',
                              start: 35,
                              end: 45,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 35
                                },
                                end: {
                                  line: 1,
                                  column: 45
                                }
                              },
                              argument: {
                                type: 'Identifier',
                                start: 42,
                                end: 44,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 42
                                  },
                                  end: {
                                    line: 1,
                                    column: 44
                                  }
                                },
                                name: 'id'
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

    pass(`({async: async, foo: foo})`, {
        source: '({async: async, foo: foo})',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
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
            },
            body: [
              {
                type: 'ExpressionStatement',
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
                },
                expression: {
                  type: 'ObjectExpression',
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
                  },
                  properties: [
                    {
                      type: 'Property',
                      start: 2,
                      end: 14,
                      loc: {
                        start: {
                          line: 1,
                          column: 2
                        },
                        end: {
                          line: 1,
                          column: 14
                        }
                      },
                      method: false,
                      shorthand: false,
                      computed: false,
                      key: {
                        type: 'Identifier',
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
                        },
                        name: 'async'
                      },
                      value: {
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
                      },
                      kind: 'init'
                    },
                    {
                      type: 'Property',
                      start: 16,
                      end: 24,
                      loc: {
                        start: {
                          line: 1,
                          column: 16
                        },
                        end: {
                          line: 1,
                          column: 24
                        }
                      },
                      method: false,
                      shorthand: false,
                      computed: false,
                      key: {
                        type: 'Identifier',
                        start: 16,
                        end: 19,
                        loc: {
                          start: {
                            line: 1,
                            column: 16
                          },
                          end: {
                            line: 1,
                            column: 19
                          }
                        },
                        name: 'foo'
                      },
                      value: {
                        type: 'Identifier',
                        start: 21,
                        end: 24,
                        loc: {
                          start: {
                            line: 1,
                            column: 21
                          },
                          end: {
                            line: 1,
                            column: 24
                          }
                        },
                        name: 'foo'
                      },
                      kind: 'init'
                    }
                  ]
                }
              }
            ],
            sourceType: 'script'
          }
    });

    pass(`(class {async foo(a) { await a }})`, {
      source: '(class {async foo(a) { await a }})',
      loc: true,
      ranges: true,
      raw: true,
      expected: {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'ClassExpression',
                    id: null,
                    superClass: null,
                    body: {
                        type: 'ClassBody',
                        body: [
                            {
                                type: 'MethodDefinition',
                                key: {
                                    type: 'Identifier',
                                    name: 'foo',
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
                                    }
                                },
                                kind: 'method',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [
                                        {
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
                                        }
                                    ],
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
                                                    start: 23,
                                                    end: 30,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 23
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 30
                                                        }
                                                    }
                                                },
                                                start: 23,
                                                end: 30,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 23
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 30
                                                    }
                                                }
                                            }
                                        ],
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
                                        }
                                    },
                                    async: true,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 17,
                                    end: 32,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 17
                                        },
                                        end: {
                                            line: 1,
                                            column: 32
                                        }
                                    }
                                },
                                static: false,
                                start: 8,
                                end: 32,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
                                    },
                                    end: {
                                        line: 1,
                                        column: 32
                                    }
                                }
                            }
                        ],
                        start: 7,
                        end: 33,
                        loc: {
                            start: {
                                line: 1,
                                column: 7
                            },
                            end: {
                                line: 1,
                                column: 33
                            }
                        }
                    },
                    start: 1,
                    end: 33,
                    loc: {
                        start: {
                            line: 1,
                            column: 1
                        },
                        end: {
                            line: 1,
                            column: 33
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
            }
        ],
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

    pass(`class UserRepo{ async get(id) { return id; } }`, {
    source: 'class UserRepo{ async get(id) { return id; } }',
    ranges: true,
    raw: true,
    loc: true,
    expected: {
        type: 'Program',
        start: 0,
        end: 46,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 46
          }
        },
        body: [
          {
            type: 'ClassDeclaration',
            start: 0,
            end: 46,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 46
              }
            },
            id: {
              type: 'Identifier',
              start: 6,
              end: 14,
              loc: {
                start: {
                  line: 1,
                  column: 6
                },
                end: {
                  line: 1,
                  column: 14
                }
              },
              name: 'UserRepo'
            },
            superClass: null,
            body: {
              type: 'ClassBody',
              start: 14,
              end: 46,
              loc: {
                start: {
                  line: 1,
                  column: 14
                },
                end: {
                  line: 1,
                  column: 46
                }
              },
              body: [
                {
                  type: 'MethodDefinition',
                  start: 16,
                  end: 44,
                  loc: {
                    start: {
                      line: 1,
                      column: 16
                    },
                    end: {
                      line: 1,
                      column: 44
                    }
                  },
                  computed: false,
                  key: {
                    type: 'Identifier',
                    start: 22,
                    end: 25,
                    loc: {
                      start: {
                        line: 1,
                        column: 22
                      },
                      end: {
                        line: 1,
                        column: 25
                      }
                    },
                    name: 'get'
                  },
                  static: false,
                  kind: 'method',
                  value: {
                    type: 'FunctionExpression',
                    start: 25,
                    end: 44,
                    loc: {
                      start: {
                        line: 1,
                        column: 25
                      },
                      end: {
                        line: 1,
                        column: 44
                      }
                    },
                    id: null,
                    generator: false,
                    expression: false,
                    async: true,
                    params: [
                      {
                        type: 'Identifier',
                        start: 26,
                        end: 28,
                        loc: {
                          start: {
                            line: 1,
                            column: 26
                          },
                          end: {
                            line: 1,
                            column: 28
                          }
                        },
                        name: 'id'
                      }
                    ],
                    body: {
                      type: 'BlockStatement',
                      start: 30,
                      end: 44,
                      loc: {
                        start: {
                          line: 1,
                          column: 30
                        },
                        end: {
                          line: 1,
                          column: 44
                        }
                      },
                      body: [
                        {
                          type: 'ReturnStatement',
                          start: 32,
                          end: 42,
                          loc: {
                            start: {
                              line: 1,
                              column: 32
                            },
                            end: {
                              line: 1,
                              column: 42
                            }
                          },
                          argument: {
                            type: 'Identifier',
                            start: 39,
                            end: 41,
                            loc: {
                              start: {
                                line: 1,
                                column: 39
                              },
                              end: {
                                line: 1,
                                column: 41
                              }
                            },
                            name: 'id'
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

    pass(`({async: async, foo: foo})`, {
    source: '({async: async, foo: foo})',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
        type: 'Program',
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
        },
        body: [
          {
            type: 'ExpressionStatement',
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
            },
            expression: {
              type: 'ObjectExpression',
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
              },
              properties: [
                {
                  type: 'Property',
                  start: 2,
                  end: 14,
                  loc: {
                    start: {
                      line: 1,
                      column: 2
                    },
                    end: {
                      line: 1,
                      column: 14
                    }
                  },
                  method: false,
                  shorthand: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
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
                    },
                    name: 'async'
                  },
                  value: {
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
                  },
                  kind: 'init'
                },
                {
                  type: 'Property',
                  start: 16,
                  end: 24,
                  loc: {
                    start: {
                      line: 1,
                      column: 16
                    },
                    end: {
                      line: 1,
                      column: 24
                    }
                  },
                  method: false,
                  shorthand: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    start: 16,
                    end: 19,
                    loc: {
                      start: {
                        line: 1,
                        column: 16
                      },
                      end: {
                        line: 1,
                        column: 19
                      }
                    },
                    name: 'foo'
                  },
                  value: {
                    type: 'Identifier',
                    start: 21,
                    end: 24,
                    loc: {
                      start: {
                        line: 1,
                        column: 21
                      },
                      end: {
                        line: 1,
                        column: 24
                      }
                    },
                    name: 'foo'
                  },
                  kind: 'init'
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
});
    pass(`(class {async foo(a) { await a }})`, {
    source: '(class {async foo(a) { await a }})',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
      type: 'Program',
      body: [
          {
              type: 'ExpressionStatement',
              expression: {
                  type: 'ClassExpression',
                  id: null,
                  superClass: null,
                  body: {
                      type: 'ClassBody',
                      body: [
                          {
                              type: 'MethodDefinition',
                              key: {
                                  type: 'Identifier',
                                  name: 'foo',
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
                                  }
                              },
                              kind: 'method',
                              computed: false,
                              value: {
                                  type: 'FunctionExpression',
                                  params: [
                                      {
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
                                      }
                                  ],
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
                                                  start: 23,
                                                  end: 30,
                                                  loc: {
                                                      start: {
                                                          line: 1,
                                                          column: 23
                                                      },
                                                      end: {
                                                          line: 1,
                                                          column: 30
                                                      }
                                                  }
                                              },
                                              start: 23,
                                              end: 30,
                                              loc: {
                                                  start: {
                                                      line: 1,
                                                      column: 23
                                                  },
                                                  end: {
                                                      line: 1,
                                                      column: 30
                                                  }
                                              }
                                          }
                                      ],
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
                                      }
                                  },
                                  async: true,
                                  generator: false,
                                  expression: false,
                                  id: null,
                                  start: 17,
                                  end: 32,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 17
                                      },
                                      end: {
                                          line: 1,
                                          column: 32
                                      }
                                  }
                              },
                              static: false,
                              start: 8,
                              end: 32,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 8
                                  },
                                  end: {
                                      line: 1,
                                      column: 32
                                  }
                              }
                          }
                      ],
                      start: 7,
                      end: 33,
                      loc: {
                          start: {
                              line: 1,
                              column: 7
                          },
                          end: {
                              line: 1,
                              column: 33
                          }
                      }
                  },
                  start: 1,
                  end: 33,
                  loc: {
                      start: {
                          line: 1,
                          column: 1
                      },
                      end: {
                          line: 1,
                          column: 33
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
          }
      ],
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

    pass(`class A {*async() { }}`, {
    source: 'class A {*async() { }}',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
      type: 'Program',
      body: [
          {
              type: 'ClassDeclaration',
              id: {
                  type: 'Identifier',
                  name: 'A',
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
              superClass: null,
              body: {
                  type: 'ClassBody',
                  body: [
                      {
                          type: 'MethodDefinition',
                          key: {
                              type: 'Identifier',
                              name: 'async',
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
                          kind: 'method',
                          computed: false,
                          value: {
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
                              generator: true,
                              expression: false,
                              id: null,
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
                          },
                          static: false,
                          start: 9,
                          end: 21,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 9
                              },
                              end: {
                                  line: 1,
                                  column: 21
                              }
                          }
                      }
                  ],
                  start: 8,
                  end: 22,
                  loc: {
                      start: {
                          line: 1,
                          column: 8
                      },
                      end: {
                          line: 1,
                          column: 22
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

    pass(`class A {static* async() { }}`, {
    source: 'class A {static* async() { }}',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
      type: 'Program',
      body: [
          {
              type: 'ClassDeclaration',
              id: {
                  type: 'Identifier',
                  name: 'A',
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
              superClass: null,
              body: {
                  type: 'ClassBody',
                  body: [
                      {
                          type: 'MethodDefinition',
                          key: {
                              type: 'Identifier',
                              name: 'async',
                              start: 17,
                              end: 22,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 17
                                  },
                                  end: {
                                      line: 1,
                                      column: 22
                                  }
                              }
                          },
                          kind: 'method',
                          computed: false,
                          value: {
                              type: 'FunctionExpression',
                              params: [],
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
                              generator: true,
                              expression: false,
                              id: null,
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
                          },
                          static: true,
                          start: 9,
                          end: 28,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 9
                              },
                              end: {
                                  line: 1,
                                  column: 28
                              }
                          }
                      }
                  ],
                  start: 8,
                  end: 29,
                  loc: {
                      start: {
                          line: 1,
                          column: 8
                      },
                      end: {
                          line: 1,
                          column: 29
                      }
                  }
              },
              start: 0,
              end: 29,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 29
                  }
              }
          }
      ],
      sourceType: 'script',
      start: 0,
      end: 29,
      loc: {
          start: {
              line: 1,
              column: 0
          },
          end: {
              line: 1,
              column: 29
          }
      }
  }
  });

    pass(`class A {async await() { }};`, {
    source: 'class A {async await() { }};',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
      type: 'Program',
      body: [
          {
              type: 'ClassDeclaration',
              id: {
                  type: 'Identifier',
                  name: 'A',
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
              superClass: null,
              body: {
                  type: 'ClassBody',
                  body: [
                      {
                          type: 'MethodDefinition',
                          key: {
                              type: 'Identifier',
                              name: 'await',
                              start: 15,
                              end: 20,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 15
                                  },
                                  end: {
                                      line: 1,
                                      column: 20
                                  }
                              }
                          },
                          kind: 'method',
                          computed: false,
                          value: {
                              type: 'FunctionExpression',
                              params: [],
                              body: {
                                  type: 'BlockStatement',
                                  body: [],
                                  start: 23,
                                  end: 26,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 23
                                      },
                                      end: {
                                          line: 1,
                                          column: 26
                                      }
                                  }
                              },
                              async: true,
                              generator: false,
                              expression: false,
                              id: null,
                              start: 20,
                              end: 26,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 20
                                  },
                                  end: {
                                      line: 1,
                                      column: 26
                                  }
                              }
                          },
                          static: false,
                          start: 9,
                          end: 26,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 9
                              },
                              end: {
                                  line: 1,
                                  column: 26
                              }
                          }
                      }
                  ],
                  start: 8,
                  end: 27,
                  loc: {
                      start: {
                          line: 1,
                          column: 8
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
          },
          {
              type: 'EmptyStatement',
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

    pass(`class A {static async await() { }};`, {
    source: 'class A {static async await() { }};',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
      type: 'Program',
      body: [
          {
              type: 'ClassDeclaration',
              id: {
                  type: 'Identifier',
                  name: 'A',
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
              superClass: null,
              body: {
                  type: 'ClassBody',
                  body: [
                      {
                          type: 'MethodDefinition',
                          key: {
                              type: 'Identifier',
                              name: 'await',
                              start: 22,
                              end: 27,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 22
                                  },
                                  end: {
                                      line: 1,
                                      column: 27
                                  }
                              }
                          },
                          kind: 'method',
                          computed: false,
                          value: {
                              type: 'FunctionExpression',
                              params: [],
                              body: {
                                  type: 'BlockStatement',
                                  body: [],
                                  start: 30,
                                  end: 33,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 30
                                      },
                                      end: {
                                          line: 1,
                                          column: 33
                                      }
                                  }
                              },
                              async: true,
                              generator: false,
                              expression: false,
                              id: null,
                              start: 27,
                              end: 33,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 27
                                  },
                                  end: {
                                      line: 1,
                                      column: 33
                                  }
                              }
                          },
                          static: true,
                          start: 9,
                          end: 33,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 9
                              },
                              end: {
                                  line: 1,
                                  column: 33
                              }
                          }
                      }
                  ],
                  start: 8,
                  end: 34,
                  loc: {
                      start: {
                          line: 1,
                          column: 8
                      },
                      end: {
                          line: 1,
                          column: 34
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
          },
          {
              type: 'EmptyStatement',
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
          }
      ],
      sourceType: 'script',
      start: 0,
      end: 35,
      loc: {
          start: {
              line: 1,
              column: 0
          },
          end: {
              line: 1,
              column: 35
          }
      }
  }
  });

    pass(`class A {static async foo() { }};`, {
    source: 'class A {static async foo() { }};',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
      type: 'Program',
      body: [
          {
              type: 'ClassDeclaration',
              id: {
                  type: 'Identifier',
                  name: 'A',
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
              superClass: null,
              body: {
                  type: 'ClassBody',
                  body: [
                      {
                          type: 'MethodDefinition',
                          key: {
                              type: 'Identifier',
                              name: 'foo',
                              start: 22,
                              end: 25,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 22
                                  },
                                  end: {
                                      line: 1,
                                      column: 25
                                  }
                              }
                          },
                          kind: 'method',
                          computed: false,
                          value: {
                              type: 'FunctionExpression',
                              params: [],
                              body: {
                                  type: 'BlockStatement',
                                  body: [],
                                  start: 28,
                                  end: 31,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 28
                                      },
                                      end: {
                                          line: 1,
                                          column: 31
                                      }
                                  }
                              },
                              async: true,
                              generator: false,
                              expression: false,
                              id: null,
                              start: 25,
                              end: 31,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 25
                                  },
                                  end: {
                                      line: 1,
                                      column: 31
                                  }
                              }
                          },
                          static: true,
                          start: 9,
                          end: 31,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 9
                              },
                              end: {
                                  line: 1,
                                  column: 31
                              }
                          }
                      }
                  ],
                  start: 8,
                  end: 32,
                  loc: {
                      start: {
                          line: 1,
                          column: 8
                      },
                      end: {
                          line: 1,
                          column: 32
                      }
                  }
              },
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
              type: 'EmptyStatement',
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
          }
      ],
      sourceType: 'script',
      start: 0,
      end: 33,
      loc: {
          start: {
              line: 1,
              column: 0
          },
          end: {
              line: 1,
              column: 33
          }
      }
  }
  });

    pass(`({async "foo"(){}})`, {
    source: '({async "foo"(){}})',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
      type: 'Program',
      body: [
          {
              type: 'ExpressionStatement',
              expression: {
                  type: 'ObjectExpression',
                  properties: [
                      {
                          type: 'Property',
                          key: {
                              type: 'Literal',
                              value: 'foo',
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
                              raw: '"foo"'
                          },
                          value: {
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
                              async: true,
                              generator: false,
                              expression: false,
                              id: null,
                              start: 13,
                              end: 17,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 13
                                  },
                                  end: {
                                      line: 1,
                                      column: 17
                                  }
                              }
                          },
                          kind: 'init',
                          computed: false,
                          method: true,
                          shorthand: false,
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
                          }
                      }
                  ],
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
              }
          }
      ],
      sourceType: 'script',
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
      }
  }
  });

    pass(`({async 100(){}})`, {
    source: '({async 100(){}})',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
      type: 'Program',
      body: [
          {
              type: 'ExpressionStatement',
              expression: {
                  type: 'ObjectExpression',
                  properties: [
                      {
                          type: 'Property',
                          key: {
                              type: 'Literal',
                              value: 100,
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
                              raw: '100'
                          },
                          value: {
                              type: 'FunctionExpression',
                              params: [],
                              body: {
                                  type: 'BlockStatement',
                                  body: [],
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
                                  }
                              },
                              async: true,
                              generator: false,
                              expression: false,
                              id: null,
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
                          kind: 'init',
                          computed: false,
                          method: true,
                          shorthand: false,
                          start: 2,
                          end: 15,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 2
                              },
                              end: {
                                  line: 1,
                                  column: 15
                              }
                          }
                      }
                  ],
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

    pass(`var obj = { async *method([{ x, y, z } = { x: 44, y: 55, z: 66 }] = []) {} }`, {
      source: `a = async
      function f(){}`,
      loc: true,
      ranges: true,
      next: true,
      raw: true,
      expected: {
        type: 'Program',
        start: 0,
        end: 30,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 2,
            column: 20
          }
        },
        body: [
          {
            type: 'ExpressionStatement',
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
            expression: {
              type: 'AssignmentExpression',
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
              operator: '=',
              left: {
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
              right: {
                type: 'Identifier',
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
                },
                name: 'async'
              }
            }
          },
          {
            type: 'FunctionDeclaration',
            start: 16,
            end: 30,
            loc: {
              start: {
                line: 2,
                column: 6
              },
              end: {
                line: 2,
                column: 20
              }
            },
            id: {
              type: 'Identifier',
              start: 25,
              end: 26,
              loc: {
                start: {
                  line: 2,
                  column: 15
                },
                end: {
                  line: 2,
                  column: 16
                }
              },
              name: 'f'
            },
            generator: false,
            expression: false,
            async: false,
            params: [],
            body: {
              type: 'BlockStatement',
              start: 28,
              end: 30,
              loc: {
                start: {
                  line: 2,
                  column: 18
                },
                end: {
                  line: 2,
                  column: 20
                }
              },
              body: []
            }
          }
        ],
        sourceType: 'script'
      }
  });

    pass(`var async; async = 3;`, {
      source: 'var async; async = 3;',
      loc: true,
      ranges: true,
      next: true,
      raw: true,
      expected: {
          type: 'Program',
          body: [
              {
                  type: 'VariableDeclaration',
                  declarations: [
                      {
                          type: 'VariableDeclarator',
                          init: null,
                          id: {
                              type: 'Identifier',
                              name: 'async',
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
                      }
                  ],
                  kind: 'var',
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
              {
                  type: 'ExpressionStatement',
                  expression: {
                      type: 'AssignmentExpression',
                      left: {
                          type: 'Identifier',
                          name: 'async',
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
                          }
                      },
                      operator: '=',
                      right: {
                          type: 'Literal',
                          value: 3,
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
                          raw: '3'
                      },
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
                  start: 11,
                  end: 21,
                  loc: {
                      start: {
                          line: 1,
                          column: 11
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

    pass(`x = async(y);`, {
      source: 'x = async(y);',
      loc: true,
      ranges: true,
      next: true,
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
                          type: 'CallExpression',
                          callee: {
                              type: 'Identifier',
                              name: 'async',
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
                          arguments: [
                              {
                                  type: 'Identifier',
                                  name: 'y',
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
                          start: 4,
                          end: 12,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 4
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

    pass(`f(x, async(y, z))`, {
      source: 'f(x, async(y, z))',
      loc: true,
      ranges: true,
      next: true,
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
                              name: 'x',
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
                              type: 'CallExpression',
                              callee: {
                                  type: 'Identifier',
                                  name: 'async',
                                  start: 5,
                                  end: 10,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 5
                                      },
                                      end: {
                                          line: 1,
                                          column: 10
                                      }
                                  }
                              },
                              arguments: [
                                  {
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
                                  {
                                      type: 'Identifier',
                                      name: 'z',
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
                                  }
                              ],
                              start: 5,
                              end: 16,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 5
                                  },
                                  end: {
                                      line: 1,
                                      column: 16
                                  }
                              }
                          }
                      ],
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

    pass(`class X { static async f(){} }`, {
      source: 'class X { static async f(){} }',
      loc: true,
      ranges: true,
      next: true,
      raw: true,
      expected: {
          type: 'Program',
          body: [
              {
                  type: 'ClassDeclaration',
                  id: {
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
                  },
                  superClass: null,
                  body: {
                      type: 'ClassBody',
                      body: [
                          {
                              type: 'MethodDefinition',
                              key: {
                                  type: 'Identifier',
                                  name: 'f',
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
                              kind: 'method',
                              computed: false,
                              value: {
                                  type: 'FunctionExpression',
                                  params: [],
                                  body: {
                                      type: 'BlockStatement',
                                      body: [],
                                      start: 26,
                                      end: 28,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 26
                                          },
                                          end: {
                                              line: 1,
                                              column: 28
                                          }
                                      }
                                  },
                                  async: true,
                                  generator: false,
                                  expression: false,
                                  id: null,
                                  start: 24,
                                  end: 28,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 24
                                      },
                                      end: {
                                          line: 1,
                                          column: 28
                                      }
                                  }
                              },
                              static: true,
                              start: 10,
                              end: 28,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 10
                                  },
                                  end: {
                                      line: 1,
                                      column: 28
                                  }
                              }
                          }
                      ],
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

    pass(`class X { async f(){} }`, {
    source: 'class X { async f(){} }',
    loc: true,
    ranges: true,
    next: true,
    raw: true,
    expected: {
        type: 'Program',
        body: [
            {
                type: 'ClassDeclaration',
                id: {
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
                },
                superClass: null,
                body: {
                    type: 'ClassBody',
                    body: [
                        {
                            type: 'MethodDefinition',
                            key: {
                                type: 'Identifier',
                                name: 'f',
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
                            },
                            kind: 'method',
                            computed: false,
                            value: {
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
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
                                    }
                                },
                                async: true,
                                generator: false,
                                expression: false,
                                id: null,
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
                            },
                            static: false,
                            start: 10,
                            end: 21,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10
                                },
                                end: {
                                    line: 1,
                                    column: 21
                                }
                            }
                        }
                    ],
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

    pass(`class X { async f(a) { await a } }`, {
    source: 'class X { async f(a) { await a } }',
    loc: true,
    ranges: true,
    next: true,
    raw: true,
    expected: {
        type: 'Program',
        body: [
            {
                type: 'ClassDeclaration',
                id: {
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
                },
                superClass: null,
                body: {
                    type: 'ClassBody',
                    body: [
                        {
                            type: 'MethodDefinition',
                            key: {
                                type: 'Identifier',
                                name: 'f',
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
                            },
                            kind: 'method',
                            computed: false,
                            value: {
                                type: 'FunctionExpression',
                                params: [
                                    {
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
                                    }
                                ],
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
                                                start: 23,
                                                end: 30,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 23
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 30
                                                    }
                                                }
                                            },
                                            start: 23,
                                            end: 30,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 23
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 30
                                                }
                                            }
                                        }
                                    ],
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
                                    }
                                },
                                async: true,
                                generator: false,
                                expression: false,
                                id: null,
                                start: 17,
                                end: 32,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 17
                                    },
                                    end: {
                                        line: 1,
                                        column: 32
                                    }
                                }
                            },
                            static: false,
                            start: 10,
                            end: 32,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10
                                },
                                end: {
                                    line: 1,
                                    column: 32
                                }
                            }
                        }
                    ],
                    start: 8,
                    end: 34,
                    loc: {
                        start: {
                            line: 1,
                            column: 8
                        },
                        end: {
                            line: 1,
                            column: 34
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
            }
        ],
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

    pass(`({ async "xyz"() {} })`, {
    source: '({ async "xyz"() {} })',
    loc: true,
    ranges: true,
    next: true,
    raw: true,
    expected: {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'ObjectExpression',
                    properties: [
                        {
                            type: 'Property',
                            key: {
                                type: 'Literal',
                                value: 'xyz',
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
                                raw: '"xyz"'
                            },
                            value: {
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 17,
                                    end: 19,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 17
                                        },
                                        end: {
                                            line: 1,
                                            column: 19
                                        }
                                    }
                                },
                                async: true,
                                generator: false,
                                expression: false,
                                id: null,
                                start: 14,
                                end: 19,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 14
                                    },
                                    end: {
                                        line: 1,
                                        column: 19
                                    }
                                }
                            },
                            kind: 'init',
                            computed: false,
                            method: true,
                            shorthand: false,
                            start: 3,
                            end: 19,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 3
                                },
                                end: {
                                    line: 1,
                                    column: 19
                                }
                            }
                        }
                    ],
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

    pass(`({ async f(a) { await a } })`, {
    source: '({ async f(a) { await a } })',
    loc: true,
    ranges: true,
    next: true,
    raw: true,
    expected: {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'ObjectExpression',
                    properties: [
                        {
                            type: 'Property',
                            key: {
                                type: 'Identifier',
                                name: 'f',
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
                            value: {
                                type: 'FunctionExpression',
                                params: [
                                    {
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
                                    }
                                ],
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
                                        }
                                    ],
                                    start: 14,
                                    end: 25,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 14
                                        },
                                        end: {
                                            line: 1,
                                            column: 25
                                        }
                                    }
                                },
                                async: true,
                                generator: false,
                                expression: false,
                                id: null,
                                start: 10,
                                end: 25,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 25
                                    }
                                }
                            },
                            kind: 'init',
                            computed: false,
                            method: true,
                            shorthand: false,
                            start: 3,
                            end: 25,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 3
                                },
                                end: {
                                    line: 1,
                                    column: 25
                                }
                            }
                        }
                    ],
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

    pass(`({ async ["xyz"]() {} })`, {
    source: '({ async ["xyz"]() {} })',
    loc: true,
    ranges: true,
    next: true,
    raw: true,
    expected: {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'ObjectExpression',
                    properties: [
                        {
                            type: 'Property',
                            key: {
                                type: 'Literal',
                                value: 'xyz',
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
                                },
                                raw: '"xyz"'
                            },
                            value: {
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
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
                                    }
                                },
                                async: true,
                                generator: false,
                                expression: false,
                                id: null,
                                start: 16,
                                end: 21,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 16
                                    },
                                    end: {
                                        line: 1,
                                        column: 21
                                    }
                                }
                            },
                            kind: 'init',
                            computed: true,
                            method: true,
                            shorthand: false,
                            start: 3,
                            end: 21,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 3
                                },
                                end: {
                                    line: 1,
                                    column: 21
                                }
                            }
                        }
                    ],
                    start: 1,
                    end: 23,
                    loc: {
                        start: {
                            line: 1,
                            column: 1
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

    pass(`var obj = { async *method([{ x, y, z } = { x: 44, y: 55, z: 66 }] = []) {} }`, {
  source: 'var obj = { async *method([{ x, y, z } = { x: 44, y: 55, z: 66 }] = []) {} }',
  loc: true,
  ranges: true,
  next: true,
  raw: true,
  expected: {
    type: 'Program',
    body: [
        {
            type: 'VariableDeclaration',
            declarations: [
                {
                    type: 'VariableDeclarator',
                    init: {
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'method',
                                    start: 19,
                                    end: 25,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 19
                                        },
                                        end: {
                                            line: 1,
                                            column: 25
                                        }
                                    }
                                },
                                value: {
                                    type: 'FunctionExpression',
                                    params: [
                                        {
                                            type: 'AssignmentPattern',
                                            left: {
                                                type: 'ArrayPattern',
                                                elements: [
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
                                                                        name: 'x',
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
                                                                    computed: false,
                                                                    value: {
                                                                        type: 'Identifier',
                                                                        name: 'x',
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
                                                                    method: false,
                                                                    shorthand: true,
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
                                                                {
                                                                    type: 'Property',
                                                                    kind: 'init',
                                                                    key: {
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
                                                                    computed: false,
                                                                    value: {
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
                                                                    method: false,
                                                                    shorthand: true,
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
                                                                {
                                                                    type: 'Property',
                                                                    kind: 'init',
                                                                    key: {
                                                                        type: 'Identifier',
                                                                        name: 'z',
                                                                        start: 35,
                                                                        end: 36,
                                                                        loc: {
                                                                            start: {
                                                                                line: 1,
                                                                                column: 35
                                                                            },
                                                                            end: {
                                                                                line: 1,
                                                                                column: 36
                                                                            }
                                                                        }
                                                                    },
                                                                    computed: false,
                                                                    value: {
                                                                        type: 'Identifier',
                                                                        name: 'z',
                                                                        start: 35,
                                                                        end: 36,
                                                                        loc: {
                                                                            start: {
                                                                                line: 1,
                                                                                column: 35
                                                                            },
                                                                            end: {
                                                                                line: 1,
                                                                                column: 36
                                                                            }
                                                                        }
                                                                    },
                                                                    method: false,
                                                                    shorthand: true,
                                                                    start: 35,
                                                                    end: 36,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 35
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 36
                                                                        }
                                                                    }
                                                                }
                                                            ],
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
                                                        right: {
                                                            type: 'ObjectExpression',
                                                            properties: [
                                                                {
                                                                    type: 'Property',
                                                                    key: {
                                                                        type: 'Identifier',
                                                                        name: 'x',
                                                                        start: 43,
                                                                        end: 44,
                                                                        loc: {
                                                                            start: {
                                                                                line: 1,
                                                                                column: 43
                                                                            },
                                                                            end: {
                                                                                line: 1,
                                                                                column: 44
                                                                            }
                                                                        }
                                                                    },
                                                                    value: {
                                                                        type: 'Literal',
                                                                        value: 44,
                                                                        start: 46,
                                                                        end: 48,
                                                                        loc: {
                                                                            start: {
                                                                                line: 1,
                                                                                column: 46
                                                                            },
                                                                            end: {
                                                                                line: 1,
                                                                                column: 48
                                                                            }
                                                                        },
                                                                        raw: '44'
                                                                    },
                                                                    kind: 'init',
                                                                    computed: false,
                                                                    method: false,
                                                                    shorthand: false,
                                                                    start: 43,
                                                                    end: 48,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 43
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 48
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    type: 'Property',
                                                                    key: {
                                                                        type: 'Identifier',
                                                                        name: 'y',
                                                                        start: 50,
                                                                        end: 51,
                                                                        loc: {
                                                                            start: {
                                                                                line: 1,
                                                                                column: 50
                                                                            },
                                                                            end: {
                                                                                line: 1,
                                                                                column: 51
                                                                            }
                                                                        }
                                                                    },
                                                                    value: {
                                                                        type: 'Literal',
                                                                        value: 55,
                                                                        start: 53,
                                                                        end: 55,
                                                                        loc: {
                                                                            start: {
                                                                                line: 1,
                                                                                column: 53
                                                                            },
                                                                            end: {
                                                                                line: 1,
                                                                                column: 55
                                                                            }
                                                                        },
                                                                        raw: '55'
                                                                    },
                                                                    kind: 'init',
                                                                    computed: false,
                                                                    method: false,
                                                                    shorthand: false,
                                                                    start: 50,
                                                                    end: 55,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 50
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 55
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    type: 'Property',
                                                                    key: {
                                                                        type: 'Identifier',
                                                                        name: 'z',
                                                                        start: 57,
                                                                        end: 58,
                                                                        loc: {
                                                                            start: {
                                                                                line: 1,
                                                                                column: 57
                                                                            },
                                                                            end: {
                                                                                line: 1,
                                                                                column: 58
                                                                            }
                                                                        }
                                                                    },
                                                                    value: {
                                                                        type: 'Literal',
                                                                        value: 66,
                                                                        start: 60,
                                                                        end: 62,
                                                                        loc: {
                                                                            start: {
                                                                                line: 1,
                                                                                column: 60
                                                                            },
                                                                            end: {
                                                                                line: 1,
                                                                                column: 62
                                                                            }
                                                                        },
                                                                        raw: '66'
                                                                    },
                                                                    kind: 'init',
                                                                    computed: false,
                                                                    method: false,
                                                                    shorthand: false,
                                                                    start: 57,
                                                                    end: 62,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 57
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 62
                                                                        }
                                                                    }
                                                                }
                                                            ],
                                                            start: 41,
                                                            end: 64,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 41
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 64
                                                                }
                                                            }
                                                        },
                                                        start: 27,
                                                        end: 64,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 27
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 64
                                                            }
                                                        }
                                                    }
                                                ],
                                                start: 26,
                                                end: 65,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 26
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 65
                                                    }
                                                }
                                            },
                                            right: {
                                                type: 'ArrayExpression',
                                                elements: [],
                                                start: 68,
                                                end: 70,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 68
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 70
                                                    }
                                                }
                                            },
                                            start: 26,
                                            end: 70,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 26
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 70
                                                }
                                            }
                                        }
                                    ],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 72,
                                        end: 74,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 72
                                            },
                                            end: {
                                                line: 1,
                                                column: 74
                                            }
                                        }
                                    },
                                    async: true,
                                    generator: true,
                                    expression: false,
                                    id: null,
                                    start: 25,
                                    end: 74,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 25
                                        },
                                        end: {
                                            line: 1,
                                            column: 74
                                        }
                                    }
                                },
                                kind: 'init',
                                computed: false,
                                method: true,
                                shorthand: false,
                                start: 12,
                                end: 74,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 12
                                    },
                                    end: {
                                        line: 1,
                                        column: 74
                                    }
                                }
                            }
                        ],
                        start: 10,
                        end: 76,
                        loc: {
                            start: {
                                line: 1,
                                column: 10
                            },
                            end: {
                                line: 1,
                                column: 76
                            }
                        }
                    },
                    id: {
                        type: 'Identifier',
                        name: 'obj',
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
                    start: 4,
                    end: 76,
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 76
                        }
                    }
                }
            ],
            kind: 'var',
            start: 0,
            end: 76,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 76
                }
            }
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 76,
    loc: {
        start: {
            line: 1,
            column: 0
        },
        end: {
            line: 1,
            column: 76
        }
    }
}
});

    pass(`var obj = { async *method([{ x }] = []) {} }`, {
    source: 'var obj = { async *method([{ x }] = []) {} }',
    loc: true,
    ranges: true,
    next: true,
    raw: true,
    expected: {
      type: 'Program',
      body: [
          {
              type: 'VariableDeclaration',
              declarations: [
                  {
                      type: 'VariableDeclarator',
                      init: {
                          type: 'ObjectExpression',
                          properties: [
                              {
                                  type: 'Property',
                                  key: {
                                      type: 'Identifier',
                                      name: 'method',
                                      start: 19,
                                      end: 25,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 19
                                          },
                                          end: {
                                              line: 1,
                                              column: 25
                                          }
                                      }
                                  },
                                  value: {
                                      type: 'FunctionExpression',
                                      params: [
                                          {
                                              type: 'AssignmentPattern',
                                              left: {
                                                  type: 'ArrayPattern',
                                                  elements: [
                                                      {
                                                          type: 'ObjectPattern',
                                                          properties: [
                                                              {
                                                                  type: 'Property',
                                                                  kind: 'init',
                                                                  key: {
                                                                      type: 'Identifier',
                                                                      name: 'x',
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
                                                                  computed: false,
                                                                  value: {
                                                                      type: 'Identifier',
                                                                      name: 'x',
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
                                                                  method: false,
                                                                  shorthand: true,
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
                                                              }
                                                          ],
                                                          start: 27,
                                                          end: 32,
                                                          loc: {
                                                              start: {
                                                                  line: 1,
                                                                  column: 27
                                                              },
                                                              end: {
                                                                  line: 1,
                                                                  column: 32
                                                              }
                                                          }
                                                      }
                                                  ],
                                                  start: 26,
                                                  end: 33,
                                                  loc: {
                                                      start: {
                                                          line: 1,
                                                          column: 26
                                                      },
                                                      end: {
                                                          line: 1,
                                                          column: 33
                                                      }
                                                  }
                                              },
                                              right: {
                                                  type: 'ArrayExpression',
                                                  elements: [],
                                                  start: 36,
                                                  end: 38,
                                                  loc: {
                                                      start: {
                                                          line: 1,
                                                          column: 36
                                                      },
                                                      end: {
                                                          line: 1,
                                                          column: 38
                                                      }
                                                  }
                                              },
                                              start: 26,
                                              end: 38,
                                              loc: {
                                                  start: {
                                                      line: 1,
                                                      column: 26
                                                  },
                                                  end: {
                                                      line: 1,
                                                      column: 38
                                                  }
                                              }
                                          }
                                      ],
                                      body: {
                                          type: 'BlockStatement',
                                          body: [],
                                          start: 40,
                                          end: 42,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 40
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 42
                                              }
                                          }
                                      },
                                      async: true,
                                      generator: true,
                                      expression: false,
                                      id: null,
                                      start: 25,
                                      end: 42,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 25
                                          },
                                          end: {
                                              line: 1,
                                              column: 42
                                          }
                                      }
                                  },
                                  kind: 'init',
                                  computed: false,
                                  method: true,
                                  shorthand: false,
                                  start: 12,
                                  end: 42,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 12
                                      },
                                      end: {
                                          line: 1,
                                          column: 42
                                      }
                                  }
                              }
                          ],
                          start: 10,
                          end: 44,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 10
                              },
                              end: {
                                  line: 1,
                                  column: 44
                              }
                          }
                      },
                      id: {
                          type: 'Identifier',
                          name: 'obj',
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
                      start: 4,
                      end: 44,
                      loc: {
                          start: {
                              line: 1,
                              column: 4
                          },
                          end: {
                              line: 1,
                              column: 44
                          }
                      }
                  }
              ],
              kind: 'var',
              start: 0,
              end: 44,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 44
                  }
              }
          }
      ],
      sourceType: 'script',
      start: 0,
      end: 44,
      loc: {
          start: {
              line: 1,
              column: 0
          },
          end: {
              line: 1,
              column: 44
          }
      }
  }
  });

    pass(`var obj = { async *method({ x: y } = { x: 23 }) {} }`, {
    source: 'var obj = { async *method({ x: y } = { x: 23 }) {} }',
    loc: true,
    ranges: true,
    next: true,
    raw: true,
    expected: {
      type: 'Program',
      body: [
          {
              type: 'VariableDeclaration',
              declarations: [
                  {
                      type: 'VariableDeclarator',
                      init: {
                          type: 'ObjectExpression',
                          properties: [
                              {
                                  type: 'Property',
                                  key: {
                                      type: 'Identifier',
                                      name: 'method',
                                      start: 19,
                                      end: 25,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 19
                                          },
                                          end: {
                                              line: 1,
                                              column: 25
                                          }
                                      }
                                  },
                                  value: {
                                      type: 'FunctionExpression',
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
                                                          computed: false,
                                                          value: {
                                                              type: 'Identifier',
                                                              name: 'y',
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
                                                          method: false,
                                                          shorthand: false,
                                                          start: 28,
                                                          end: 32,
                                                          loc: {
                                                              start: {
                                                                  line: 1,
                                                                  column: 28
                                                              },
                                                              end: {
                                                                  line: 1,
                                                                  column: 32
                                                              }
                                                          }
                                                      }
                                                  ],
                                                  start: 26,
                                                  end: 34,
                                                  loc: {
                                                      start: {
                                                          line: 1,
                                                          column: 26
                                                      },
                                                      end: {
                                                          line: 1,
                                                          column: 34
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
                                                              name: 'x',
                                                              start: 39,
                                                              end: 40,
                                                              loc: {
                                                                  start: {
                                                                      line: 1,
                                                                      column: 39
                                                                  },
                                                                  end: {
                                                                      line: 1,
                                                                      column: 40
                                                                  }
                                                              }
                                                          },
                                                          value: {
                                                              type: 'Literal',
                                                              value: 23,
                                                              start: 42,
                                                              end: 44,
                                                              loc: {
                                                                  start: {
                                                                      line: 1,
                                                                      column: 42
                                                                  },
                                                                  end: {
                                                                      line: 1,
                                                                      column: 44
                                                                  }
                                                              },
                                                              raw: '23'
                                                          },
                                                          kind: 'init',
                                                          computed: false,
                                                          method: false,
                                                          shorthand: false,
                                                          start: 39,
                                                          end: 44,
                                                          loc: {
                                                              start: {
                                                                  line: 1,
                                                                  column: 39
                                                              },
                                                              end: {
                                                                  line: 1,
                                                                  column: 44
                                                              }
                                                          }
                                                      }
                                                  ],
                                                  start: 37,
                                                  end: 46,
                                                  loc: {
                                                      start: {
                                                          line: 1,
                                                          column: 37
                                                      },
                                                      end: {
                                                          line: 1,
                                                          column: 46
                                                      }
                                                  }
                                              },
                                              start: 26,
                                              end: 46,
                                              loc: {
                                                  start: {
                                                      line: 1,
                                                      column: 26
                                                  },
                                                  end: {
                                                      line: 1,
                                                      column: 46
                                                  }
                                              }
                                          }
                                      ],
                                      body: {
                                          type: 'BlockStatement',
                                          body: [],
                                          start: 48,
                                          end: 50,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 48
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 50
                                              }
                                          }
                                      },
                                      async: true,
                                      generator: true,
                                      expression: false,
                                      id: null,
                                      start: 25,
                                      end: 50,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 25
                                          },
                                          end: {
                                              line: 1,
                                              column: 50
                                          }
                                      }
                                  },
                                  kind: 'init',
                                  computed: false,
                                  method: true,
                                  shorthand: false,
                                  start: 12,
                                  end: 50,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 12
                                      },
                                      end: {
                                          line: 1,
                                          column: 50
                                      }
                                  }
                              }
                          ],
                          start: 10,
                          end: 52,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 10
                              },
                              end: {
                                  line: 1,
                                  column: 52
                              }
                          }
                      },
                      id: {
                          type: 'Identifier',
                          name: 'obj',
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
                      start: 4,
                      end: 52,
                      loc: {
                          start: {
                              line: 1,
                              column: 4
                          },
                          end: {
                              line: 1,
                              column: 52
                          }
                      }
                  }
              ],
              kind: 'var',
              start: 0,
              end: 52,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 52
                  }
              }
          }
      ],
      sourceType: 'script',
      start: 0,
      end: 52,
      loc: {
          start: {
              line: 1,
              column: 0
          },
          end: {
              line: 1,
              column: 52
          }
      }
  }
  });

    pass(`var obj = { *method([[,] = g()]) {} }`, {
    source: 'var obj = { *method([[,] = g()]) {} }',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
      type: 'Program',
      body: [
          {
              type: 'VariableDeclaration',
              declarations: [
                  {
                      type: 'VariableDeclarator',
                      init: {
                          type: 'ObjectExpression',
                          properties: [
                              {
                                  type: 'Property',
                                  key: {
                                      type: 'Identifier',
                                      name: 'method',
                                      start: 13,
                                      end: 19,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 13
                                          },
                                          end: {
                                              line: 1,
                                              column: 19
                                          }
                                      }
                                  },
                                  value: {
                                      type: 'FunctionExpression',
                                      params: [
                                          {
                                              type: 'ArrayPattern',
                                              elements: [
                                                  {
                                                      type: 'AssignmentPattern',
                                                      left: {
                                                          type: 'ArrayPattern',
                                                          elements: [
                                                              null
                                                          ],
                                                          start: 21,
                                                          end: 24,
                                                          loc: {
                                                              start: {
                                                                  line: 1,
                                                                  column: 21
                                                              },
                                                              end: {
                                                                  line: 1,
                                                                  column: 24
                                                              }
                                                          }
                                                      },
                                                      right: {
                                                          type: 'CallExpression',
                                                          callee: {
                                                              type: 'Identifier',
                                                              name: 'g',
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
                                                          arguments: [],
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
                                                      start: 21,
                                                      end: 30,
                                                      loc: {
                                                          start: {
                                                              line: 1,
                                                              column: 21
                                                          },
                                                          end: {
                                                              line: 1,
                                                              column: 30
                                                          }
                                                      }
                                                  }
                                              ],
                                              start: 20,
                                              end: 31,
                                              loc: {
                                                  start: {
                                                      line: 1,
                                                      column: 20
                                                  },
                                                  end: {
                                                      line: 1,
                                                      column: 31
                                                  }
                                              }
                                          }
                                      ],
                                      body: {
                                          type: 'BlockStatement',
                                          body: [],
                                          start: 33,
                                          end: 35,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 33
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 35
                                              }
                                          }
                                      },
                                      async: false,
                                      generator: true,
                                      expression: false,
                                      id: null,
                                      start: 19,
                                      end: 35,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 19
                                          },
                                          end: {
                                              line: 1,
                                              column: 35
                                          }
                                      }
                                  },
                                  kind: 'init',
                                  computed: false,
                                  method: true,
                                  shorthand: false,
                                  start: 12,
                                  end: 35,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 12
                                      },
                                      end: {
                                          line: 1,
                                          column: 35
                                      }
                                  }
                              }
                          ],
                          start: 10,
                          end: 37,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 10
                              },
                              end: {
                                  line: 1,
                                  column: 37
                              }
                          }
                      },
                      id: {
                          type: 'Identifier',
                          name: 'obj',
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
                      start: 4,
                      end: 37,
                      loc: {
                          start: {
                              line: 1,
                              column: 4
                          },
                          end: {
                              line: 1,
                              column: 37
                          }
                      }
                  }
              ],
              kind: 'var',
              start: 0,
              end: 37,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 37
                  }
              }
          }
      ],
      sourceType: 'script',
      start: 0,
      end: 37,
      loc: {
          start: {
              line: 1,
              column: 0
          },
          end: {
              line: 1,
              column: 37
          }
      }
  }
  });

    pass(`({async, foo})`, {
    source: '({async, foo})',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'ObjectExpression',
                    properties: [
                        {
                            type: 'Property',
                            key: {
                                type: 'Identifier',
                                name: 'async',
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
                            value: {
                                type: 'Identifier',
                                name: 'async',
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
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: true,
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
                        {
                            type: 'Property',
                            key: {
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
                            value: {
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
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: true,
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
                        }
                    ],
                    start: 1,
                    end: 13,
                    loc: {
                        start: {
                            line: 1,
                            column: 1
                        },
                        end: {
                            line: 1,
                            column: 13
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

    pass(`const async = 1;`, {
    source: 'const async = 1;',
    loc: true,
    ranges: true,
    raw: true,
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
                            value: 1,
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
                            raw: '1'
                        },
                        id: {
                            type: 'Identifier',
                            name: 'async',
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
                        },
                        start: 6,
                        end: 15,
                        loc: {
                            start: {
                                line: 1,
                                column: 6
                            },
                            end: {
                                line: 1,
                                column: 15
                            }
                        }
                    }
                ],
                kind: 'const',
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

    pass(`({async foo() { }});`, {
    source: '({async foo() { }});',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'ObjectExpression',
                    properties: [
                        {
                            type: 'Property',
                            key: {
                                type: 'Identifier',
                                name: 'foo',
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
                            value: {
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
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
                                    }
                                },
                                async: true,
                                generator: false,
                                expression: false,
                                id: null,
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
                                }
                            },
                            kind: 'init',
                            computed: false,
                            method: true,
                            shorthand: false,
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
                            }
                        }
                    ],
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

    pass(`({async: true})`, {
    source: '({async: true})',
    loc: true,
    ranges: true,
    expected: {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'ObjectExpression',
                    properties: [
                        {
                            type: 'Property',
                            key: {
                                type: 'Identifier',
                                name: 'async',
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
                            value: {
                                type: 'Literal',
                                value: true,
                                start: 9,
                                end: 13,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 13
                                    }
                                }
                            },
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: false,
                            start: 2,
                            end: 13,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 2
                                },
                                end: {
                                    line: 1,
                                    column: 13
                                }
                            }
                        }
                    ],
                    start: 1,
                    end: 14,
                    loc: {
                        start: {
                            line: 1,
                            column: 1
                        },
                        end: {
                            line: 1,
                            column: 14
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

    pass(`({async() { }})`, {
    source: '({async() { }})',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'ObjectExpression',
                    properties: [
                        {
                            type: 'Property',
                            key: {
                                type: 'Identifier',
                                name: 'async',
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
                            value: {
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
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
                                async: false,
                                generator: false,
                                expression: false,
                                id: null,
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
                            kind: 'init',
                            computed: false,
                            method: true,
                            shorthand: false,
                            start: 2,
                            end: 13,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 2
                                },
                                end: {
                                    line: 1,
                                    column: 13
                                }
                            }
                        }
                    ],
                    start: 1,
                    end: 14,
                    loc: {
                        start: {
                            line: 1,
                            column: 1
                        },
                        end: {
                            line: 1,
                            column: 14
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

    pass(`({async})`, {
    source: '({async})',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'ObjectExpression',
                    properties: [
                        {
                            type: 'Property',
                            key: {
                                type: 'Identifier',
                                name: 'async',
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
                            value: {
                                type: 'Identifier',
                                name: 'async',
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
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: true,
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
                        }
                    ],
                    start: 1,
                    end: 8,
                    loc: {
                        start: {
                            line: 1,
                            column: 1
                        },
                        end: {
                            line: 1,
                            column: 8
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

    pass(`({async = 0} = {})`, {
    source: '({async = 0} = {})',
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
                        type: 'ObjectPattern',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'async',
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
                                value: {
                                    type: 'AssignmentPattern',
                                    left: {
                                        type: 'Identifier',
                                        name: 'async',
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
                                    right: {
                                        type: 'Literal',
                                        value: 0,
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
                                    start: 2,
                                    end: 11,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 2
                                        },
                                        end: {
                                            line: 1,
                                            column: 11
                                        }
                                    }
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: true,
                                start: 2,
                                end: 11,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 2
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
                    operator: '=',
                    right: {
                        type: 'ObjectExpression',
                        properties: [],
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

    pass(`class A {static async foo() { }};`, {
    source: 'class A {static async foo() { }};',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
        type: 'Program',
        body: [
            {
                type: 'ClassDeclaration',
                id: {
                    type: 'Identifier',
                    name: 'A',
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
                superClass: null,
                body: {
                    type: 'ClassBody',
                    body: [
                        {
                            type: 'MethodDefinition',
                            key: {
                                type: 'Identifier',
                                name: 'foo',
                                start: 22,
                                end: 25,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 22
                                    },
                                    end: {
                                        line: 1,
                                        column: 25
                                    }
                                }
                            },
                            kind: 'method',
                            computed: false,
                            value: {
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 28,
                                    end: 31,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 28
                                        },
                                        end: {
                                            line: 1,
                                            column: 31
                                        }
                                    }
                                },
                                async: true,
                                generator: false,
                                expression: false,
                                id: null,
                                start: 25,
                                end: 31,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 25
                                    },
                                    end: {
                                        line: 1,
                                        column: 31
                                    }
                                }
                            },
                            static: true,
                            start: 9,
                            end: 31,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 31
                                }
                            }
                        }
                    ],
                    start: 8,
                    end: 32,
                    loc: {
                        start: {
                            line: 1,
                            column: 8
                        },
                        end: {
                            line: 1,
                            column: 32
                        }
                    }
                },
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
                type: 'EmptyStatement',
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
            }
        ],
        sourceType: 'script',
        start: 0,
        end: 33,
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 33
            }
        }
    }
});

    pass(`async yield => 1;`, {
    source: 'async yield => 1;',
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
                        value: 1,
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
                        raw: '1'
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

    pass(`({foo() { }});`, {
    source: '({foo() { }});',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'ObjectExpression',
                    properties: [
                        {
                            type: 'Property',
                            key: {
                                type: 'Identifier',
                                name: 'foo',
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
                            value: {
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
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
                                async: false,
                                generator: false,
                                expression: false,
                                id: null,
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
                            },
                            kind: 'init',
                            computed: false,
                            method: true,
                            shorthand: false,
                            start: 2,
                            end: 11,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 2
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

    pass(`class A {static async() { }};`, {
    source: 'class A {static async() { }};',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
        type: 'Program',
        body: [
            {
                type: 'ClassDeclaration',
                id: {
                    type: 'Identifier',
                    name: 'A',
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
                superClass: null,
                body: {
                    type: 'ClassBody',
                    body: [
                        {
                            type: 'MethodDefinition',
                            key: {
                                type: 'Identifier',
                                name: 'async',
                                start: 16,
                                end: 21,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 16
                                    },
                                    end: {
                                        line: 1,
                                        column: 21
                                    }
                                }
                            },
                            kind: 'method',
                            computed: false,
                            value: {
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 24,
                                    end: 27,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 24
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
                                id: null,
                                start: 21,
                                end: 27,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 21
                                    },
                                    end: {
                                        line: 1,
                                        column: 27
                                    }
                                }
                            },
                            static: true,
                            start: 9,
                            end: 27,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 27
                                }
                            }
                        }
                    ],
                    start: 8,
                    end: 28,
                    loc: {
                        start: {
                            line: 1,
                            column: 8
                        },
                        end: {
                            line: 1,
                            column: 28
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
            },
            {
                type: 'EmptyStatement',
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
            }
        ],
        sourceType: 'script',
        start: 0,
        end: 29,
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 29
            }
        }
    }
});

    pass(`'use strict'; ({ async yield() {} });`, {
    source: '"use strict"; ({ async yield() {} });',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: 'use strict',
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
                    raw: '"use strict"'
                },
                directive: 'use strict',
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
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'ObjectExpression',
                    properties: [
                        {
                            type: 'Property',
                            key: {
                                type: 'Identifier',
                                name: 'yield',
                                start: 23,
                                end: 28,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 23
                                    },
                                    end: {
                                        line: 1,
                                        column: 28
                                    }
                                }
                            },
                            value: {
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 31,
                                    end: 33,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 31
                                        },
                                        end: {
                                            line: 1,
                                            column: 33
                                        }
                                    }
                                },
                                async: true,
                                generator: false,
                                expression: false,
                                id: null,
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
                            kind: 'init',
                            computed: false,
                            method: true,
                            shorthand: false,
                            start: 17,
                            end: 33,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 17
                                },
                                end: {
                                    line: 1,
                                    column: 33
                                }
                            }
                        }
                    ],
                    start: 15,
                    end: 35,
                    loc: {
                        start: {
                            line: 1,
                            column: 15
                        },
                        end: {
                            line: 1,
                            column: 35
                        }
                    }
                },
                start: 14,
                end: 37,
                loc: {
                    start: {
                        line: 1,
                        column: 14
                    },
                    end: {
                        line: 1,
                        column: 37
                    }
                }
            }
        ],
        sourceType: 'script',
        start: 0,
        end: 37,
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 37
            }
        }
    }
});

    pass(`(class {async foo(a) { await a }});`, {
    source: '(class {async foo(a) { await a }});',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'ClassExpression',
                    id: null,
                    superClass: null,
                    body: {
                        type: 'ClassBody',
                        body: [
                            {
                                type: 'MethodDefinition',
                                key: {
                                    type: 'Identifier',
                                    name: 'foo',
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
                                    }
                                },
                                kind: 'method',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [
                                        {
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
                                        }
                                    ],
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
                                                    start: 23,
                                                    end: 30,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 23
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 30
                                                        }
                                                    }
                                                },
                                                start: 23,
                                                end: 30,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 23
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 30
                                                    }
                                                }
                                            }
                                        ],
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
                                        }
                                    },
                                    async: true,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 17,
                                    end: 32,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 17
                                        },
                                        end: {
                                            line: 1,
                                            column: 32
                                        }
                                    }
                                },
                                static: false,
                                start: 8,
                                end: 32,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
                                    },
                                    end: {
                                        line: 1,
                                        column: 32
                                    }
                                }
                            }
                        ],
                        start: 7,
                        end: 33,
                        loc: {
                            start: {
                                line: 1,
                                column: 7
                            },
                            end: {
                                line: 1,
                                column: 33
                            }
                        }
                    },
                    start: 1,
                    end: 33,
                    loc: {
                        start: {
                            line: 1,
                            column: 1
                        },
                        end: {
                            line: 1,
                            column: 33
                        }
                    }
                },
                start: 0,
                end: 35,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 35
                    }
                }
            }
        ],
        sourceType: 'script',
        start: 0,
        end: 35,
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 35
            }
        }
    }
});
});
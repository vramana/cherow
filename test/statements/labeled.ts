import { pass, fail } from '../test-utils';

describe('Statements - Labelled', () => {

    fail(`aw\\u0061it: 1;`, {
        source: 'aw\\u0061it: 1;',
      message: 'Unexpected token await',
      module: true,
      line: 1
    });

    fail(`label: async function f() {}`, {
        source: 'label: async function f() {}',
      line: 1,
    });

    fail(`label: function* g() {}`, {
        source: 'label: function* g() {}',
      line: 1,
    });

    fail(`await: 1;`, {
        source: 'await: 1;',
      line: 1,
      module: true
    });

    fail(`label: class C {};`, {
    source: 'label: class C {};',
    line: 1,
});

    fail(`"use strict"; label: function g() {};`, {
    source: '"use strict"; label: function g() {};',
    line: 1,
});

    fail(` L: let
[a] = 0;`, {
    source: ` L: let
    [a] = 0;`,
    line: 1,
});

    fail(`label: async function* g() {};`, {
    source: 'label: async function* g() {};',
    line: 1,
});

    fail(`await: 1;`, {
    source: 'await: 1;',
    module: true,
    line: 1,
});

    pass(`start: while (true) break start`, {
          source: 'start: while (true) break start',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
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
              },
              body: [{
                  type: 'LabeledStatement',
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
                  },
                  body: {
                      type: 'WhileStatement',
                      start: 7,
                      end: 31,
                      loc: {
                          start: {
                              line: 1,
                              column: 7
                          },
                          end: {
                              line: 1,
                              column: 31
                          }
                      },
                      test: {
                          type: 'Literal',
                          start: 14,
                          end: 18,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 14
                              },
                              end: {
                                  line: 1,
                                  column: 18
                              }
                          },
                          value: true,
                          raw: 'true'
                      },
                      body: {
                          type: 'BreakStatement',
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
                          },
                          label: {
                              type: 'Identifier',
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
                              name: 'start'
                          }
                      }
                  },
                  label: {
                      type: 'Identifier',
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
                      name: 'start'
                  }
              }],
              sourceType: 'script'
          }
      });

    pass(`L: let\nx`, {
        source: 'L: let\nx',
        raw: true,
        expected: {
              body: [
                {
                  body: {
                    expression: {
                      name: 'let',
                      type: 'Identifier'
                    },
                    type: 'ExpressionStatement'
                  },
                  label: {
                    name: 'L',
                    type: 'Identifier'
                 },
                  type: 'LabeledStatement'
                },
                {
                  expression: {
                    name: 'x',
                    type: 'Identifier'
                  },
                  type: 'ExpressionStatement'
                }
              ],
              sourceType: 'script',
              type: 'Program'
            }
    });

    pass(`__proto__: test`, {
          source: '__proto__: test',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
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
              },
              body: [{
                  type: 'LabeledStatement',
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
                  },
                  body: {
                      type: 'ExpressionStatement',
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
                      expression: {
                          type: 'Identifier',
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
                          name: 'test'
                      }
                  },
                  label: {
                      type: 'Identifier',
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
                      name: '__proto__'
                  }
              }],
              sourceType: 'script'
          }
      });

    pass(`async: await`, {
          source: 'async: await',
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
                  type: 'LabeledStatement',
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
                  body: {
                      type: 'ExpressionStatement',
                      start: 7,
                      end: 12,
                      loc: {
                          start: {
                              line: 1,
                              column: 7
                          },
                          end: {
                              line: 1,
                              column: 12
                          }
                      },
                      expression: {
                          type: 'Identifier',
                          start: 7,
                          end: 12,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 7
                              },
                              end: {
                                  line: 1,
                                  column: 12
                              }
                          },
                          name: 'await'
                      }
                  },
                  label: {
                      type: 'Identifier',
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
                      name: 'async'
                  }
              }],
              sourceType: 'script'
          }
      });

    pass(`a:{break a;}`, {
          source: 'a:{break a;}',
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
                  type: 'LabeledStatement',
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
                  body: {
                      type: 'BlockStatement',
                      start: 2,
                      end: 12,
                      loc: {
                          start: {
                              line: 1,
                              column: 2
                          },
                          end: {
                              line: 1,
                              column: 12
                          }
                      },
                      body: [{
                          type: 'BreakStatement',
                          start: 3,
                          end: 11,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 3
                              },
                              end: {
                                  line: 1,
                                  column: 11
                              }
                          },
                          label: {
                              type: 'Identifier',
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
                              name: 'a'
                          }
                      }]
                  },
                  label: {
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
                  }
              }],
              sourceType: 'script'
          }
      });
  });
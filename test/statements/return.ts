import { pass, fail } from '../test-utils';

describe('Statements - Return', () => {

    fail(`{ return; }`, {
        source: '{ return; }',
        message: 'Illegal return statement',
        line: 1,
        column: 1,
        index: 1,
    });

    fail(`if (false) { return; }`, {
        source: 'if (false) { return; }',
        message: 'Illegal return statement',
        line: 1,
        column: 12,
        index: 12,
    });

    fail(`{ var x=1; return; var y=2; }`, {
      source: '{ var x=1; return; var y=2; }',
      message: 'Illegal return statement',
      line: 1,
      column: 10,
      index: 10,
  });

    fail(`return;`, {
    source: 'return;',
    line: 1,
});

    fail(`{
    var x=1;
    return;
    var y=2;
}`, {
    source: `{
        var x=1;
        return;
        var y=2;
    }`,
    line: 2,
});

    fail(`return (0);`, {
    source: 'return (0);',
    line: 1,
});

    pass(`(function(){ return })`, {
          source: '(function(){ return })',
          loc: true,
          ranges: true,
          raw: true,
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
              body: [{
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
                      type: 'FunctionExpression',
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
                      expression: false,
                      async: false,
                      params: [],
                      body: {
                          type: 'BlockStatement',
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
                          },
                          body: [{
                              type: 'ReturnStatement',
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
                              },
                              argument: null
                          }]
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

    pass(`(function(){ return; })`, {
          source: '(function(){ return; })',
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
              body: [{
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
                      type: 'FunctionExpression',
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
                      },
                      id: null,
                      generator: false,
                      expression: false,
                      async: false,
                      params: [],
                      body: {
                          type: 'BlockStatement',
                          start: 11,
                          end: 22,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 11
                              },
                              end: {
                                  line: 1,
                                  column: 22
                              }
                          },
                          body: [{
                              type: 'ReturnStatement',
                              start: 13,
                              end: 20,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 13
                                  },
                                  end: {
                                      line: 1,
                                      column: 20
                                  }
                              },
                              argument: null
                          }]
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

    pass(`(function(){ return x; })`, {
          source: '(function(){ return x; })',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
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
              },
              body: [{
                  type: 'ExpressionStatement',
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
                  },
                  expression: {
                      type: 'FunctionExpression',
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
                      },
                      id: null,
                      generator: false,
                      expression: false,
                      async: false,
                      params: [],
                      body: {
                          type: 'BlockStatement',
                          start: 11,
                          end: 24,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 11
                              },
                              end: {
                                  line: 1,
                                  column: 24
                              }
                          },
                          body: [{
                              type: 'ReturnStatement',
                              start: 13,
                              end: 22,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 13
                                  },
                                  end: {
                                      line: 1,
                                      column: 22
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
                                  name: 'x'
                              }
                          }]
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

    pass(`(function(){ return x * y })`, {
          source: '(function(){ return x * y })',
          loc: true,
          ranges: true,
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
              body: [{
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
                      type: 'FunctionExpression',
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
                      id: null,
                      generator: false,
                      expression: false,
                      async: false,
                      params: [],
                      body: {
                          type: 'BlockStatement',
                          start: 11,
                          end: 27,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 11
                              },
                              end: {
                                  line: 1,
                                  column: 27
                              }
                          },
                          body: [{
                              type: 'ReturnStatement',
                              start: 13,
                              end: 25,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 13
                                  },
                                  end: {
                                      line: 1,
                                      column: 25
                                  }
                              },
                              argument: {
                                  type: 'BinaryExpression',
                                  start: 20,
                                  end: 25,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 20
                                      },
                                      end: {
                                          line: 1,
                                          column: 25
                                      }
                                  },
                                  left: {
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
                                      name: 'x'
                                  },
                                  operator: '*',
                                  right: {
                                      type: 'Identifier',
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
                                      },
                                      name: 'y'
                                  }
                              }
                          }]
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

    pass(`_ => { return 0; }`, {
          source: '_ => { return 0; }',
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
              body: [{
                  type: 'ExpressionStatement',
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
                  expression: {
                      type: 'ArrowFunctionExpression',
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
                      id: null,
                      generator: false,
                      expression: false,
                      async: false,
                      params: [{
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
                          name: '_'
                      }],
                      body: {
                          type: 'BlockStatement',
                          start: 5,
                          end: 18,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 5
                              },
                              end: {
                                  line: 1,
                                  column: 18
                              }
                          },
                          body: [{
                              type: 'ReturnStatement',
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
                              argument: {
                                  type: 'Literal',
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
                                  value: 0,
                                  raw: '0'
                              }
                          }]
                      }
                  }
              }],
              sourceType: 'script'
          }
      });
  });
import { pass, fail, n } from '../test-utils';

describe('Miscellaneous - ASI', () => {

  fail(`Variable1 \n ++ \n ++ \n Variable2 construction`, {
    source: `var x=0, y=0;
    var z=
    x
    ++
    ++
    y`,
    message: 'Unexpected token',
    line: 4,
});

  fail(`invalid Do-While Statement ASI`, {
    source: `do {}; \n while(false)`,
    message: 'Unexpected token ;',
    line: 1,
  });

  fail(`for header is (false \n false \n)`, {
    source: `for(false
      false
  ) {
    break;
  }`,
  message:  'Unexpected token false',
  line: 1,
  });

  fail(`for header is (\n false \n)`, {
    source: `for(
      false
  ) {
    break;
  }`,
  message: 'Unexpected token )',
  });

  fail(`for header is (\n semicolon false)`, {
    source: `for(
      ;false) {
        break;
      }`,
  });

  fail(`for(false;false;;false) { break; }`, {
          source: `for(false;false;;false) {
              break;
            }`,
      });

  fail(`\n while(false)`, {
          source: `\n while(false)`,
      });

  pass(`;;1;;1;;1`, {
        source: `;;1;;1;;1`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
          type: 'Program',
          body: [
              {
                  type: 'EmptyStatement',
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
              {
                  type: 'EmptyStatement',
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
                  type: 'ExpressionStatement',
                  expression: {
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
                  }
              },
              {
                  type: 'EmptyStatement',
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
              {
                  type: 'ExpressionStatement',
                  expression: {
                      type: 'Literal',
                      value: 1,
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
                      raw: '1'
                  },
                  start: 5,
                  end: 7,
                  loc: {
                      start: {
                          line: 1,
                          column: 5
                      },
                      end: {
                          line: 1,
                          column: 7
                      }
                  }
              },
              {
                  type: 'EmptyStatement',
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
                  type: 'ExpressionStatement',
                  expression: {
                      type: 'Literal',
                      value: 1,
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
                      raw: '1'
                  },
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

  pass(`;;;;`, {
        source: `;;;;`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
          type: 'Program',
          body: [
              {
                  type: 'EmptyStatement',
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
              {
                  type: 'EmptyStatement',
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
                  type: 'EmptyStatement',
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
                  type: 'EmptyStatement',
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
              }
          ],
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

  pass(`0\n;`, {
        source: `0\n;`,
        raw: true,
        expected: {
            body: [
              {
                expression: {
                  raw: '0',
                  type: 'Literal',
                  value: 0,
                },
                type: 'ExpressionStatement'
              }
            ],
            sourceType: 'script',
            type: 'Program'
          }
      });

  pass(`x: while(true) { continue x\n; }`, {
        source: `    \t \f\v 'abc'  \t `,
        raw: true,
        expected: {
            body: [
              {
                directive: 'abc',
                expression: {
                  raw: '\'abc\'',
                  type: 'Literal',
                  value: 'abc'
                },
               type: 'ExpressionStatement'
              }
            ],
            sourceType: 'script',
            type: 'Program'
          }
      });

  pass(`    \t \f\v\n 'abc'  \t `, {
        source: `    \t \f\v\n 'abc'  \t `,
        raw: true,
        expected: {
            body: [
              {
                directive: 'abc',
                expression: {
                  raw: '\'abc\'',
                  type: 'Literal',
                  value: 'abc',
                },
                type: 'ExpressionStatement'
              },
            ],
            sourceType: 'script',
            type: 'Program'
          }
      });

  pass(`    \t \f\v\n`, {
        source: `    \t \f\v\n`,
        raw: true,
        expected: {
            body: [],
            sourceType: 'script',
            type: 'Program'
          }
      });

  pass(`;;1;;1;;1`, {
    source: `;;1;;1;;1`,
    loc: true,
    ranges: true,
    raw: true,
    expected: {
      type: 'Program',
      body: [
          {
              type: 'EmptyStatement',
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
          {
              type: 'EmptyStatement',
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
              type: 'ExpressionStatement',
              expression: {
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
              }
          },
          {
              type: 'EmptyStatement',
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
          {
              type: 'ExpressionStatement',
              expression: {
                  type: 'Literal',
                  value: 1,
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
                  raw: '1'
              },
              start: 5,
              end: 7,
              loc: {
                  start: {
                      line: 1,
                      column: 5
                  },
                  end: {
                      line: 1,
                      column: 7
                  }
              }
          },
          {
              type: 'EmptyStatement',
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
              type: 'ExpressionStatement',
              expression: {
                  type: 'Literal',
                  value: 1,
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
                  raw: '1'
              },
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

  pass(`;;;;`, {
    source: `;;;;`,
    loc: true,
    ranges: true,
    raw: true,
    expected: {
      type: 'Program',
      body: [
          {
              type: 'EmptyStatement',
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
          {
              type: 'EmptyStatement',
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
              type: 'EmptyStatement',
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
              type: 'EmptyStatement',
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
          }
      ],
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

  pass(`0\n;`, {
    source: `0\n;`,
    raw: true,
    expected: {
        body: [
          {
            expression: {
              raw: '0',
              type: 'Literal',
              value: 0,
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
  });

  pass(`x: while(true) { continue x\n; }`, {
    source: `    \t \f\v 'abc'  \t `,
    raw: true,
    expected: {
        body: [
          {
            directive: 'abc',
            expression: {
              raw: '\'abc\'',
              type: 'Literal',
              value: 'abc'
            },
           type: 'ExpressionStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
  });

  pass(`    \t \f\v\n 'abc'  \t `, {
    source: `    \t \f\v\n 'abc'  \t `,
    raw: true,
    expected: {
        body: [
          {
            directive: 'abc',
            expression: {
              raw: '\'abc\'',
              type: 'Literal',
              value: 'abc',
            },
            type: 'ExpressionStatement'
          },
        ],
        sourceType: 'script',
        type: 'Program'
      }
  });

  pass(`    \t \f\v\n`, {
    source: `    \t \f\v\n`,
    raw: true,
    expected: {
        body: [],
        sourceType: 'script',
        type: 'Program'
      }
  });

  pass(`do {} \n while(false)`, {
      source: `do {}
       while(false)`,
      raw: true,
      expected: {
        type: 'Program',
        body: [
            {
                type: 'DoWhileStatement',
                body: {
                    type: 'BlockStatement',
                    body: []
                },
                test: {
                    type: 'Literal',
                    value: false,
                    raw: 'false'
                }
            }
        ],
        sourceType: 'script'
    }
  });

  pass(`for(false\n    ;;false\n) {\n  break;\n}`, {
    source: `for(false\n    ;;false\n) {\n  break;\n}`,
    expected:  n('Program', {
      sourceType: 'script',
      body: [
          n('ForStatement', {
              init: n('Literal', {value: false}),
              test: null,
              update: n('Literal', {value: false}),
              body: n('BlockStatement', {body: [
                  n('BreakStatement', {label: null}),
              ]}),
          }),
      ]
  })
  });

  pass(`for(;\n  ;\n) {\n  break;\n}`, {
    source: `for(;\n  ;\n) {\n  break;\n}`,
    expected: n('Program', {
      sourceType: 'script',
      body: [
          n('ForStatement', {
              init: null,
              test: null,
              update: null,
              body: n('BlockStatement', {body: [
                  n('BreakStatement', {label: null}),
              ]}),
          }),
      ],
  })
  });

  pass(`var x =\n1`, {
    source: `var x =\n1`,
    expected: n('Program', {
      sourceType: 'script',
      body: [
          n('VariableDeclaration', {kind: 'var', declarations: [
              n('VariableDeclarator', {
                  id: n('Identifier', {name: 'x'}),
                  init: n('Literal', {value: 1}),
              }),
          ]}),
      ],
  })
  });

  pass(`var x\ny`, {
    source: `var x\ny`,
    expected: n('Program', {
      sourceType: 'script',
      body: [
          n('VariableDeclaration', {kind: 'var', declarations: [
              n('VariableDeclarator', {
                  id: n('Identifier', {name: 'x'}),
                  init: null,
              }),
          ]}),
          n('ExpressionStatement', {expression: n('Identifier', {name: 'y'})}),
      ],
  })
  });

  pass(`;1;\n;1\n;1;\n;1`, {
    source: `;1;\n;1\n;1;\n;1`,
    expected: n('Program', {
      sourceType: 'script',
      body: [
          n('EmptyStatement'),
          n('ExpressionStatement', {expression: n('Literal', {value: 1})}),
          n('EmptyStatement'),
          n('ExpressionStatement', {expression: n('Literal', {value: 1})}),
          n('ExpressionStatement', {expression: n('Literal', {value: 1})}),
          n('EmptyStatement'),
          n('ExpressionStatement', {expression: n('Literal', {value: 1})}),
      ],
  })
  });

  pass(`var\nx\n=\n1`, {
    source: `var\nx\n=\n1`,
    expected:  n('Program', {
      sourceType: 'script',
      body: [
          n('VariableDeclaration', {kind: 'var', declarations: [
              n('VariableDeclarator', {
                  id: n('Identifier', {name: 'x'}),
                  init: n('Literal', {value: 1}),
              }),
          ]}),
      ],
  })
  });

  pass(`var x /* comment */;`, {
    source: `var x /* comment */;`,
    expected: n('Program', {
      sourceType: 'script',
      body: [
          n('VariableDeclaration', {kind: 'var', declarations: [
              n('VariableDeclarator', {
                  id: n('Identifier', {name: 'x'}),
                  init: null,
              }),
          ]}),
      ],
  })
  });

  pass(`0\n;`, {
    source: `0\n;`,
    expected: n('Program', {
      sourceType: 'script',
      body: [
          n('ExpressionStatement', {expression: n('Literal', {value: 0})}),
      ],
  })
  });

  pass(`debugger\n;`, {
    source: `debugger\n;`,
    expected: n('Program', {
      sourceType: 'script',
      body: [
          n('DebuggerStatement'),
      ],
  })
  });

  pass(`while(true) { break\n; }`, {
    source: `while(true) { break\n; }`,
    expected: n('Program', {
      sourceType: 'script',
      body: [
          n('WhileStatement', {
              test: n('Literal', {value: true}),
              body: n('BlockStatement', {body: [
                  n('BreakStatement', {label: null}),
              ]}),
          }),
      ],
  })
  });

  pass(`var x /* comment */;`, {
    source: `var x /* comment */;`,
    expected: n('Program', {
      sourceType: 'script',
      body: [
          n('VariableDeclaration', {kind: 'var', declarations: [
              n('VariableDeclarator', {
                  id: n('Identifier', {name: 'x'}),
                  init: null,
              }),
          ]}),
      ],
  })
  });

  pass(`x: while(true) { continue x\n; }`, {
    source: `x: while(true) { continue x\n; }`,
    expected: n('Program', {
      sourceType: 'script',
      body: [
          n('LabeledStatement', {
              label: n('Identifier', {name: 'x'}),
              body: n('WhileStatement', {
                  test: n('Literal', {value: true}),
                  body: n('BlockStatement', {body: [
                      n('ContinueStatement', {label: n('Identifier', {name: 'x'})}),
                  ]}),
              }),
          }),
      ],
  })
  });

  pass(`var x\n;`, {
    source: `var x\n;`,
    module: true,
    expected:  n('Program', {
      sourceType: 'module',
      body: [
          n('VariableDeclaration', {kind: 'var', declarations: [
              n('VariableDeclarator', {
                  id: n('Identifier', {name: 'x'}),
                  init: null,
              }),
          ]}),
      ],
  })
  });
});
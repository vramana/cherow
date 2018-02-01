import { pass, fail } from '../test-utils';

describe('Statements - While', () => {
/*
      fail(`while({1}){ break ; };`, {
          source: 'while({1}){ break ; };',
          message: 'Unexpected token \'number\'',
          line: 1,
          column: 8,
          index: 9,
      });

      fail(`while 1 break;`, {
          source: 'while 1 break;',
          message: 'Unexpected token',
          line: 1,
          column: 6,
          index: 7,
      });

      fail(`while 0 break;`, {
          source: 'while 0 break;',
          message: 'Unexpected token',
          line: 1,
          column: 6,
          index: 7,
      });

      fail(`while '' break;`, {
          source: 'while "" break;',
          message: 'Unexpected token',
          line: 1,
          column: 6,
          index: 8,
      });

      fail(`while (false) async function* g() {}`, {
          source: 'while (false) async function* g() {}',
          message: 'Async functions can only be declared at the top level or inside a block',
          line: 1,
          column: 14,
          index: 19,
      });

      fail(`while (false) const x = null;`, {
          source: 'while (false) const x = null;',
          message: 'Unexpected token \'const\'',
          line: 1,
          column: 14,
          index: 19,
      });

      fail(`while (false) label1: label2: function f() {}`, {
          source: 'while (false) label1: label2: function f() {}',
          message: 'In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement',
          line: 1,
          column: 0,
          index: 38,
      });*/

      pass(`while(1);`, {
          source: 'while(1);',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
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
              body: [{
                  type: 'WhileStatement',
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
                  test: {
                      type: 'Literal',
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
                      value: 1,
                      raw: '1'
                  },
                  body: {
                      type: 'EmptyStatement',
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
              }],
              sourceType: 'script'
          }
      });

      pass(`'while (true) doSomething()`, {
          source: 'while (true) doSomething()',
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
              body: [{
                  type: 'WhileStatement',
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
                  test: {
                      type: 'Literal',
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
                      value: true,
                      raw: 'true'
                  },
                  body: {
                      type: 'ExpressionStatement',
                      start: 13,
                      end: 26,
                      loc: {
                          start: {
                              line: 1,
                              column: 13
                          },
                          end: {
                              line: 1,
                              column: 26
                          }
                      },
                      expression: {
                          type: 'CallExpression',
                          start: 13,
                          end: 26,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 13
                              },
                              end: {
                                  line: 1,
                                  column: 26
                              }
                          },
                          callee: {
                              type: 'Identifier',
                              start: 13,
                              end: 24,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 13
                                  },
                                  end: {
                                      line: 1,
                                      column: 24
                                  }
                              },
                              name: 'doSomething'
                          },
                          arguments: []
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`while (x < 10) { x++; y--; }`, {
          source: 'while (x < 10) { x++; y--; }',
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
                  type: 'WhileStatement',
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
                  test: {
                      type: 'BinaryExpression',
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
                      },
                      left: {
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
                          name: 'x'
                      },
                      operator: '<',
                      right: {
                          type: 'Literal',
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
                          value: 10,
                          raw: '10'
                      }
                  },
                  body: {
                      type: 'BlockStatement',
                      start: 15,
                      end: 28,
                      loc: {
                          start: {
                              line: 1,
                              column: 15
                          },
                          end: {
                              line: 1,
                              column: 28
                          }
                      },
                      body: [{
                              type: 'ExpressionStatement',
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
                              },
                              expression: {
                                  type: 'UpdateExpression',
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
                                  },
                                  operator: '++',
                                  prefix: false,
                                  argument: {
                                      type: 'Identifier',
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
                                      name: 'x'
                                  }
                              }
                          },
                          {
                              type: 'ExpressionStatement',
                              start: 22,
                              end: 26,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 22
                                  },
                                  end: {
                                      line: 1,
                                      column: 26
                                  }
                              },
                              expression: {
                                  type: 'UpdateExpression',
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
                                  operator: '--',
                                  prefix: false,
                                  argument: {
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
                                      name: 'y'
                                  }
                              }
                          }
                      ]
                  }
              }],
              sourceType: 'script'
          }
      });
  });
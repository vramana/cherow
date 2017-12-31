import { pass, fail, testErrorLocation } from '../utils';

describe('Statements - Labelled', () => {

        testErrorLocation(`label: async function f() {}`, {
          source: 'label: async function f() {}',
          message: 'Async functions can only be declared at the top level or inside a block',
          line: 1,
          column: 7,
          index: 12,
      });

        fail(`label: class C {}`, {
          source: 'label: class C {}',
      });

        testErrorLocation(`label: const x = null;`, {
          source: 'label: const x = null;',
          message: 'Unexpected token \'const\'',
          line: 1,
          column: 7,
          index: 12,
      });

        fail(`label: function g() {}`, {
          source: 'label: function g() {}',
          module: true
      });

        fail(`aw\\u0061it: 1;`, {
          source: 'aw\\u0061it: 1;',
          module: true
      });

        testErrorLocation(`yield: 1;`, {
          source: 'yield: 1;',
          module: true,
          message: 'Unexpected token \'yield\'',
          line: 1,
          column: 0,
          index: 5,
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
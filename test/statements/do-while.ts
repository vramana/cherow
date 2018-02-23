import { pass, fail } from '../test-utils';

describe('Statements - Do while', () => {

  fail(`do{
    ;
}while({0});;`, {
      source: `do{
      ;
  }while({0});;`,
      line: 3,
  });

  fail(`do break; while 1;;`, {
      source: 'do break; while 1;;',
      line: 1,
  });

  fail(`do break; while 0;`, {
      source: 'do break; while 0;',
      line: 1,
  });

  fail(`do async function f() {} while (false)`, {
      source: 'do async function f() {} while (false)',
      line: 1,
  });

  fail(`do break; while true;`, {
      source: 'do break; while true;',
      line: 1,
  });

  fail(`do const x = null; while (false);`, {
      source: 'do const x = null; while (false);',
      line: 1,
  });

  fail(`do function* g() {} while (false);`, {
      source: 'do function* g() {} while (false);',
      line: 1,
  });

  fail(`do label1: label2: function f() {} while (false);`, {
      source: 'do label1: label2: function f() {} while (false);',
      line: 1,
  });

  fail(`do let
[x] = 0
while (false);`, {
      source: `do let
[x] = 0
while (false);`,
      line: 1,
  });

  pass(`function a() { do;while(0)return }`, {
    source: 'function a() { do;while(0)return }',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
          body: [
            {
              async: false,
              body: {
                body: [
                  {
                    body: {
                      end: 18,
                     loc: {
                        end: {
                          column: 18,
                          line: 1,
                       },
                        start: {
                          column: 17,
                          line: 1,
                        },
                     },
                      start: 17,
                      type: 'EmptyStatement'
                    },
                    end: 26,
                    loc: {
                      end: {
                        column: 26,
                        line: 1
                     },
                      start: {
                        column: 15,
                        line: 1,
                      },
                    },
                    start: 15,
                    test: {
                      end: 25,
                      loc: {
                        end: {
                          column: 25,
                          line: 1,
                        },
                        start: {
                          column: 24,
                          line: 1,
                        },
                      },
                      raw: '0',
                      start: 24,
                     type: 'Literal',
                      value: 0,
                    },
                    type: 'DoWhileStatement',
                  },
                  {
                    argument: null,
                    end: 32,
                    loc: {
                      end: {
                        column: 32,
                        line: 1,
                      },
                      start: {
                        column: 26,
                        line: 1,
                      },
                   },
                    start: 26,
                    type: 'ReturnStatement',
                  },
                ],
                end: 34,
                loc: {
                  end: {
                    column: 34,
                    line: 1,
                  },
                  start: {
                    column: 13,
                    line: 1,
                  }
                },
                start: 13,
                type: 'BlockStatement',
              },
              end: 34,
              expression: false,
              generator: false,
              id: {
                end: 10,
                loc: {
                  end: {
                   column: 10,
                    line: 1,
                },
                  start: {
                    column: 9,
                    line: 1,
                  }
                },
                name: 'a',
                start: 9,
                type: 'Identifier'
              },
              loc: {
                end: {
                  column: 34,
                  line: 1,
                },
                start: {
                  column: 0,
                  line: 1,
                }
              },
              params: [],
              start: 0,
              type: 'FunctionDeclaration'
           }
          ],
         end: 34,
          loc: {
            end: {
              column: 34,
              line: 1
            },
            start: {
              column: 0,
              line: 1,
            }
          },
          sourceType: 'script',
          start: 0,
          type: 'Program',
        }
  });

  pass(`do keep(); while (true);`, {
      source: 'do keep(); while (true);',
      loc: true,
      ranges: true,
      raw: true,
      expected: {
          type: 'Program',
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
          },
          body: [{
              type: 'DoWhileStatement',
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
              },
              body: {
                  type: 'ExpressionStatement',
                  start: 3,
                  end: 10,
                  loc: {
                      start: {
                          line: 1,
                          column: 3
                      },
                      end: {
                          line: 1,
                          column: 10
                      }
                  },
                  expression: {
                      type: 'CallExpression',
                      start: 3,
                      end: 9,
                      loc: {
                          start: {
                              line: 1,
                              column: 3
                          },
                          end: {
                              line: 1,
                              column: 9
                          }
                      },
                      callee: {
                          type: 'Identifier',
                          start: 3,
                          end: 7,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 3
                              },
                              end: {
                                  line: 1,
                                  column: 7
                              }
                          },
                          name: 'keep'
                      },
                      arguments: []
                  }
              },
              test: {
                  type: 'Literal',
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
                  },
                  value: true,
                  raw: 'true'
              }
          }],
          sourceType: 'script'
      }
  });

  pass(`do continue; while(1);`, {
      source: 'do continue; while(1);',
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
              type: 'DoWhileStatement',
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
              body: {
                  type: 'ContinueStatement',
                  start: 3,
                  end: 12,
                  loc: {
                      start: {
                          line: 1,
                          column: 3
                      },
                      end: {
                          line: 1,
                          column: 12
                      }
                  },
                  label: null
              },
              test: {
                  type: 'Literal',
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
                  value: 1,
                  raw: '1'
              }
          }],
          sourceType: 'script'
      }
  });

  pass(`do ; while (true)`, {
      source: 'do ; while (true)',
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
              type: 'DoWhileStatement',
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
              body: {
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
              },
              test: {
                  type: 'Literal',
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
                  value: true,
                  raw: 'true'
              }
          }],
          sourceType: 'script'
      }
  });

  pass(`{ do { } while (false) false }`, {
    source: '{ do { } while (false) false }',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
        type: 'Program',
        sourceType: 'script',
        body: [
            {
                type: 'BlockStatement',
                body: [
                    {
                        type: 'DoWhileStatement',
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 5,
                            end: 8,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 5
                                },
                                end: {
                                    line: 1,
                                    column: 8
                                }
                            }
                        },
                        test: {
                            type: 'Literal',
                            value: false,
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
                            },
                            raw: 'false'
                        },
                        start: 2,
                        end: 22,
                        loc: {
                            start: {
                                line: 1,
                                column: 2
                            },
                            end: {
                                line: 1,
                                column: 22
                            }
                        }
                    },
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Literal',
                            value: false,
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
                            },
                            raw: 'false'
                        },
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
                    }
                ],
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

  pass(`do that();while (true)`, {
    source: 'do that();while (true)',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
        type: 'Program',
        sourceType: 'script',
        body: [
            {
                type: 'DoWhileStatement',
                body: {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'that',
                            start: 3,
                            end: 7,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 3
                                },
                                end: {
                                    line: 1,
                                    column: 7
                                }
                            }
                        },
                        arguments: [],
                        start: 3,
                        end: 9,
                        loc: {
                            start: {
                                line: 1,
                                column: 3
                            },
                            end: {
                                line: 1,
                                column: 9
                            }
                        }
                    },
                    start: 3,
                    end: 10,
                    loc: {
                        start: {
                            line: 1,
                            column: 3
                        },
                        end: {
                            line: 1,
                            column: 10
                        }
                    }
                },
                test: {
                    type: 'Literal',
                    value: true,
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
                    raw: 'true'
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

  pass(`do {} while (true)`, {
      source: 'do {} while (true)',
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
              type: 'DoWhileStatement',
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
              body: {
                  type: 'BlockStatement',
                  start: 3,
                  end: 5,
                  loc: {
                      start: {
                          line: 1,
                          column: 3
                      },
                      end: {
                          line: 1,
                          column: 5
                      }
                  },
                  body: []
              },
              test: {
                  type: 'Literal',
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
                  },
                  value: true,
                  raw: 'true'
              }
          }],
          sourceType: 'script'
      }
  });

  pass(`{do ; while(false); false}`, {
      source: '{do ; while(false); false}',
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
              type: 'BlockStatement',
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
                      type: 'DoWhileStatement',
                      start: 1,
                      end: 19,
                      loc: {
                          start: {
                              line: 1,
                              column: 1
                          },
                          end: {
                              line: 1,
                              column: 19
                          }
                      },
                      body: {
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
                      test: {
                          type: 'Literal',
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
                          value: false,
                          raw: 'false'
                      }
                  },
                  {
                      type: 'ExpressionStatement',
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
                      expression: {
                          type: 'Literal',
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
                          value: false,
                          raw: 'false'
                      }
                  }
              ]
          }],
          sourceType: 'script'
      }
  });
});
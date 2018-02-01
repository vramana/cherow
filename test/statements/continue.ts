import { pass, fail } from '../test-utils';

describe('Statements - Continue', () => {

  fail(`do { test262: { continue test262; } } while (false)`, {
    source: 'do { test262: { continue test262; } } while (false)'
  });

  fail(`while ( false ) Label: continue Label;`, {
    source: 'while ( false ) Label: continue Label;',
    message: 'continue  statement must be nested within an iteration statement',
    line: 1,
    column: 22,
    index: 22
  });

  pass(`while (true) { continue; }`, {
          source: 'while (true) { continue; }',
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
                  type: 'BlockStatement',
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
                  body: [
                    {
                      type: 'ContinueStatement',
                      start: 15,
                      end: 24,
                      loc: {
                        start: {
                          line: 1,
                          column: 15
                        },
                        end: {
                          line: 1,
                          column: 24
                        }
                      },
                      label: null
                    }
                  ]
                }
              }
            ],
            sourceType: 'script'
          }
      });

  pass(`while (true) { continue }`, {
          source: 'while (true) { continue }',
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
            body: [
              {
                type: 'WhileStatement',
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
                  type: 'BlockStatement',
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
                  body: [
                    {
                      type: 'ContinueStatement',
                      start: 15,
                      end: 23,
                      loc: {
                        start: {
                          line: 1,
                          column: 15
                        },
                        end: {
                          line: 1,
                          column: 23
                        }
                      },
                      label: null
                    }
                  ]
                }
              }
            ],
            sourceType: 'script'
          }
      });

  pass(`done: while (true) { continue done }`, {
          source: 'done: while (true) { continue done }',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
            type: 'Program',
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
            },
            body: [
              {
                type: 'LabeledStatement',
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
                },
                body: {
                  type: 'WhileStatement',
                  start: 6,
                  end: 36,
                  loc: {
                    start: {
                      line: 1,
                      column: 6
                    },
                    end: {
                      line: 1,
                      column: 36
                    }
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
                  },
                  body: {
                    type: 'BlockStatement',
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
                    },
                    body: [
                      {
                        type: 'ContinueStatement',
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
                        },
                        label: {
                          type: 'Identifier',
                          start: 30,
                          end: 34,
                          loc: {
                            start: {
                              line: 1,
                              column: 30
                            },
                            end: {
                              line: 1,
                              column: 34
                            }
                          },
                          name: 'done'
                        }
                      }
                    ]
                  }
                },
                label: {
                  type: 'Identifier',
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
                  },
                  name: 'done'
                }
              }
            ],
            sourceType: 'script'
          }
      });

  pass(`__proto__: while (true) { continue __proto__; }`, {
          source: '__proto__: while (true) { continue __proto__; }',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
            type: 'Program',
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
            },
            body: [
              {
                type: 'LabeledStatement',
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
                },
                body: {
                  type: 'WhileStatement',
                  start: 11,
                  end: 47,
                  loc: {
                    start: {
                      line: 1,
                      column: 11
                    },
                    end: {
                      line: 1,
                      column: 47
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
                  },
                  body: {
                    type: 'BlockStatement',
                    start: 24,
                    end: 47,
                    loc: {
                      start: {
                        line: 1,
                        column: 24
                      },
                      end: {
                        line: 1,
                        column: 47
                      }
                    },
                    body: [
                      {
                        type: 'ContinueStatement',
                        start: 26,
                        end: 45,
                        loc: {
                          start: {
                            line: 1,
                            column: 26
                          },
                          end: {
                            line: 1,
                            column: 45
                          }
                        },
                        label: {
                          type: 'Identifier',
                          start: 35,
                          end: 44,
                          loc: {
                            start: {
                              line: 1,
                              column: 35
                            },
                            end: {
                              line: 1,
                              column: 44
                            }
                          },
                          name: '__proto__'
                        }
                      }
                    ]
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
              }
            ],
            sourceType: 'script'
          }
      });

  pass(`a: do continue a; while(1);`, {
          source: 'a: do continue a; while(1);',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
            type: 'Program',
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
            },
            body: [
              {
                type: 'LabeledStatement',
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
                },
                body: {
                  type: 'DoWhileStatement',
                  start: 3,
                  end: 27,
                  loc: {
                    start: {
                      line: 1,
                      column: 3
                    },
                    end: {
                      line: 1,
                      column: 27
                    }
                  },
                  body: {
                    type: 'ContinueStatement',
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
                    label: {
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
                      name: 'a'
                    }
                  },
                  test: {
                    type: 'Literal',
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
                    value: 1,
                    raw: '1'
                  }
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
              }
            ],
            sourceType: 'script'
          }
      });

  pass(`a: while (0) { continue \r b; }`, {
        source: 'a: while (0) { continue \r b; }',
        expected: {
              body: [
                {
                  body: {
                    body: {
                     body: [
                        {
                          label: undefined,
                          type: 'ContinueStatement'
                        },
                        {
                          expression: {
                            name: 'b',
                            type: 'Identifier',
                          },
                          type: 'ExpressionStatement',
                        }
                     ],
                      type: 'BlockStatement',
                    },
                    test: {
                      type: 'Literal',
                      value: 0,
                    },
                    type: 'WhileStatement',
                  },
                  label: {
                    name: 'a',
                    type: 'Identifier',
                  },
                  type: 'LabeledStatement',
                },
              ],
              sourceType: 'script',
              type: 'Program'
            }
      });

  });
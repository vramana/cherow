import { pass, fail } from '../utils';

describe('Statements - Break', () => {

  pass(`while (true) { break }`, {
          source: 'while (true) { break }',
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
            body: [
              {
                type: 'WhileStatement',
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
                  body: [
                    {
                      type: 'BreakStatement',
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

  pass(`done: while (true) { break done }`, {
          source: 'done: while (true) { break done }',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
            type: 'Program',
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
            },
            body: [
              {
                type: 'LabeledStatement',
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
                },
                body: {
                  type: 'WhileStatement',
                  start: 6,
                  end: 33,
                  loc: {
                    start: {
                      line: 1,
                      column: 6
                    },
                    end: {
                      line: 1,
                      column: 33
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
                    end: 33,
                    loc: {
                      start: {
                        line: 1,
                        column: 19
                      },
                      end: {
                        line: 1,
                        column: 33
                      }
                    },
                    body: [
                      {
                        type: 'BreakStatement',
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
                        },
                        label: {
                          type: 'Identifier',
                          start: 27,
                          end: 31,
                          loc: {
                            start: {
                              line: 1,
                              column: 27
                            },
                            end: {
                              line: 1,
                              column: 31
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

  pass(`done: while (true) { break done; }`, {
          source: 'done: while (true) { break done; }',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
            type: 'Program',
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
            },
            body: [
              {
                type: 'LabeledStatement',
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
                },
                body: {
                  type: 'WhileStatement',
                  start: 6,
                  end: 34,
                  loc: {
                    start: {
                      line: 1,
                      column: 6
                    },
                    end: {
                      line: 1,
                      column: 34
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
                    end: 34,
                    loc: {
                      start: {
                        line: 1,
                        column: 19
                      },
                      end: {
                        line: 1,
                        column: 34
                      }
                    },
                    body: [
                      {
                        type: 'BreakStatement',
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
                        },
                        label: {
                          type: 'Identifier',
                          start: 27,
                          end: 31,
                          loc: {
                            start: {
                              line: 1,
                              column: 27
                            },
                            end: {
                              line: 1,
                              column: 31
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

  pass(`__proto__: while (true) { break __proto__; }`, {
          source: '__proto__: while (true) { break __proto__; }',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
            type: 'Program',
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
            },
            body: [
              {
                type: 'LabeledStatement',
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
                },
                body: {
                  type: 'WhileStatement',
                  start: 11,
                  end: 44,
                  loc: {
                    start: {
                      line: 1,
                      column: 11
                    },
                    end: {
                      line: 1,
                      column: 44
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
                    end: 44,
                    loc: {
                      start: {
                        line: 1,
                        column: 24
                      },
                      end: {
                        line: 1,
                        column: 44
                      }
                    },
                    body: [
                      {
                        type: 'BreakStatement',
                        start: 26,
                        end: 42,
                        loc: {
                          start: {
                            line: 1,
                            column: 26
                          },
                          end: {
                            line: 1,
                            column: 42
                          }
                        },
                        label: {
                          type: 'Identifier',
                          start: 32,
                          end: 41,
                          loc: {
                            start: {
                              line: 1,
                              column: 32
                            },
                            end: {
                              line: 1,
                              column: 41
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
    });

fail(`{ var x=1; break LABEL; var y=2; }`, {
    source: '{ var x=1; break LABEL; var y=2; }'
  });

fail(`LABEL : x=3.14; var x=1; break LABEL; var y=2; `, {
    source: 'LABEL : x=3.14; var x=1; break LABEL; var y=2; '
  });

fail(`{ var x=1; break LABEL; var y=2; }`, {
    source: '{ var x=1; break LABEL; var y=2; }'
  });
import { pass, fail } from '../test-utils';

describe('Statements - Throw', () => {

  fail(`throw
x;`, {
      source: `throw
  x;`,
      line: 1,
  });

  pass(`throw x;`, {
      source: 'throw x;',
      loc: true,
      ranges: true,
      raw: true,
      expected: {
          type: 'Program',
          start: 0,
          end: 8,
          loc: {
              start: {
                  line: 1,
                  column: 0
              },
              end: {
                  line: 1,
                  column: 8
              }
          },
          body: [{
              type: 'ThrowStatement',
              start: 0,
              end: 8,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 8
                  }
              },
              argument: {
                  type: 'Identifier',
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
                  name: 'x'
              }
          }],
          sourceType: 'script'
      }
  });

  pass(`throw x * y`, {
      source: 'throw x * y',
      loc: true,
      ranges: true,
      raw: true,
      expected: {
          type: 'Program',
          start: 0,
          end: 11,
          loc: {
              start: {
                  line: 1,
                  column: 0
              },
              end: {
                  line: 1,
                  column: 11
              }
          },
          body: [{
              type: 'ThrowStatement',
              start: 0,
              end: 11,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 11
                  }
              },
              argument: {
                  type: 'BinaryExpression',
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
                  },
                  left: {
                      type: 'Identifier',
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
                      name: 'x'
                  },
                  operator: '*',
                  right: {
                      type: 'Identifier',
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
                      },
                      name: 'y'
                  }
              }
          }],
          sourceType: 'script'
      }
  });

  pass(`try{ throw b+a; } catch(e){}`, {
    source: 'try{ throw b+a; } catch(e){}',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
      type: 'Program',
      body: [
          {
              type: 'TryStatement',
              block: {
                  type: 'BlockStatement',
                  body: [
                      {
                          type: 'ThrowStatement',
                          argument: {
                              type: 'BinaryExpression',
                              left: {
                                  type: 'Identifier',
                                  name: 'b',
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
                              right: {
                                  type: 'Identifier',
                                  name: 'a',
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
                              operator: '+',
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
                          start: 5,
                          end: 15,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 5
                              },
                              end: {
                                  line: 1,
                                  column: 15
                              }
                          }
                      }
                  ],
                  start: 3,
                  end: 17,
                  loc: {
                      start: {
                          line: 1,
                          column: 3
                      },
                      end: {
                          line: 1,
                          column: 17
                      }
                  }
              },
              handler: {
                  type: 'CatchClause',
                  param: {
                      type: 'Identifier',
                      name: 'e',
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
                      }
                  },
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
                  start: 18,
                  end: 28,
                  loc: {
                      start: {
                          line: 1,
                          column: 18
                      },
                      end: {
                          line: 1,
                          column: 28
                      }
                  }
              },
              finalizer: null,
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

  pass(`try{ throw b||a; } catch(e){}`, {
    source: 'try{ throw b||a; } catch(e){}',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
      type: 'Program',
      body: [
          {
              type: 'TryStatement',
              block: {
                  type: 'BlockStatement',
                  body: [
                      {
                          type: 'ThrowStatement',
                          argument: {
                              type: 'LogicalExpression',
                              left: {
                                  type: 'Identifier',
                                  name: 'b',
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
                              right: {
                                  type: 'Identifier',
                                  name: 'a',
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
                              operator: '||',
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
                  start: 3,
                  end: 18,
                  loc: {
                      start: {
                          line: 1,
                          column: 3
                      },
                      end: {
                          line: 1,
                          column: 18
                      }
                  }
              },
              handler: {
                  type: 'CatchClause',
                  param: {
                      type: 'Identifier',
                      name: 'e',
                      start: 25,
                      end: 26,
                      loc: {
                          start: {
                              line: 1,
                              column: 25
                          },
                          end: {
                              line: 1,
                              column: 26
                          }
                      }
                  },
                  body: {
                      type: 'BlockStatement',
                      body: [],
                      start: 27,
                      end: 29,
                      loc: {
                          start: {
                              line: 1,
                              column: 27
                          },
                          end: {
                              line: 1,
                              column: 29
                          }
                      }
                  },
                  start: 19,
                  end: 29,
                  loc: {
                      start: {
                          line: 1,
                          column: 19
                      },
                      end: {
                          line: 1,
                          column: 29
                      }
                  }
              },
              finalizer: null,
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

  pass(`try{ throw (adding1()); } catch(e){}`, {
    source: 'try{ throw (adding1()); } catch(e){}',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
      type: 'Program',
      body: [
          {
              type: 'TryStatement',
              block: {
                  type: 'BlockStatement',
                  body: [
                      {
                          type: 'ThrowStatement',
                          argument: {
                              type: 'CallExpression',
                              callee: {
                                  type: 'Identifier',
                                  name: 'adding1',
                                  start: 12,
                                  end: 19,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 12
                                      },
                                      end: {
                                          line: 1,
                                          column: 19
                                      }
                                  }
                              },
                              arguments: [],
                              start: 12,
                              end: 21,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 12
                                  },
                                  end: {
                                      line: 1,
                                      column: 21
                                  }
                              }
                          },
                          start: 5,
                          end: 23,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 5
                              },
                              end: {
                                  line: 1,
                                  column: 23
                              }
                          }
                      }
                  ],
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
              },
              handler: {
                  type: 'CatchClause',
                  param: {
                      type: 'Identifier',
                      name: 'e',
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
                  body: {
                      type: 'BlockStatement',
                      body: [],
                      start: 34,
                      end: 36,
                      loc: {
                          start: {
                              line: 1,
                              column: 34
                          },
                          end: {
                              line: 1,
                              column: 36
                          }
                      }
                  },
                  start: 26,
                  end: 36,
                  loc: {
                      start: {
                          line: 1,
                          column: 26
                      },
                      end: {
                          line: 1,
                          column: 36
                      }
                  }
              },
              finalizer: null,
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
});
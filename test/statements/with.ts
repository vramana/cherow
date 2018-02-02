import { pass, fail } from '../test-utils';

describe('Statements - With', () => {

  fail(`with ({}) label1: label2: function test262() {}`, {
      source: `with ({}) label1: label2: function test262() {}`,
      module: true,
      line: 1,
  });

  fail(`if (false) {
with ({}) let
[a] = 0;
}`, {
      source: `if (false) {
  with ({}) let
  [a] = 0;
}`,
      line: 2,
  });

  fail(`with ({}) async function* g() {}`, {
      source: `with ({}) async function* g() {}`,
      module: true,
      line: 1,
  });

  fail(`with ({}) class C {}`, {
      source: `with ({}) class C {}`,
      module: true,
      line: 1,
  });

  fail(`with ({}) function f() {}`, {
      source: `with ({}) function f() {}`,
      module: true,
      line: 1,
  });

  fail(`with ({}) function* g() {}`, {
      source: `with ({}) function* g() {}`,
      module: true,
      line: 1,
  });

  fail(`with ({}) class C {}`, {
      source: 'with ({}) class C {}',
      message: 'class can\'t appear in single-statement context',
      line: 1,
      column: 9,
      index: 9,
  });

  fail(`with in strict mode`, {
      source: '"use strict"; with (x) foo',
      message: 'Strict mode code may not include a with statement',
      line: 1,
      column: 13,
      index: 13,
  });

  pass(`with (x) foo`, {
      source: 'with (x) foo',
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
              type: 'WithStatement',
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
              object: {
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
              body: {
                  type: 'ExpressionStatement',
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
                  },
                  expression: {
                      type: 'Identifier',
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
                      },
                      name: 'foo'
                  }
              }
          }],
          sourceType: 'script'
      }
  });

  pass(`with (x) { foo }`, {
      source: 'with (x) { foo }',
      loc: true,
      ranges: true,
      raw: true,
      expected: {
          type: 'Program',
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
          },
          body: [{
              type: 'WithStatement',
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
              },
              object: {
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
              body: {
                  type: 'BlockStatement',
                  start: 9,
                  end: 16,
                  loc: {
                      start: {
                          line: 1,
                          column: 9
                      },
                      end: {
                          line: 1,
                          column: 16
                      }
                  },
                  body: [{
                      type: 'ExpressionStatement',
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
                      },
                      expression: {
                          type: 'Identifier',
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
                          },
                          name: 'foo'
                      }
                  }]
              }
          }],
          sourceType: 'script'
      }
  });

  pass(`with(1);`, {
      source: 'with(1);',
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
              type: 'WithStatement',
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
              object: {
                  type: 'Literal',
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
                  value: 1,
                  raw: '1'
              },
              body: {
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
              }
          }],
          sourceType: 'script'
      }
  });

  pass(`with ({}) {}`, {
      source: 'with ({}) {}',
      loc: true,
      ranges: true,
      raw: true,
      expected: {
          type: 'Program',
          body: [{
              type: 'WithStatement',
              object: {
                  type: 'ObjectExpression',
                  properties: [],
                  start: 6,
                  end: 8,
                  loc: {
                      start: {
                          line: 1,
                          column: 6
                      },
                      end: {
                          line: 1,
                          column: 8
                      }
                  }
              },
              body: {
                  type: 'BlockStatement',
                  body: [],
                  start: 10,
                  end: 12,
                  loc: {
                      start: {
                          line: 1,
                          column: 10
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
          }],
          sourceType: 'script',
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
      }
  });

  pass(`with ({}) 12`, {
      source: 'with ({}) 12',
      loc: true,
      ranges: true,
      raw: true,
      expected: {
          type: 'Program',
          body: [{
              type: 'WithStatement',
              object: {
                  type: 'ObjectExpression',
                  properties: [],
                  start: 6,
                  end: 8,
                  loc: {
                      start: {
                          line: 1,
                          column: 6
                      },
                      end: {
                          line: 1,
                          column: 8
                      }
                  }
              },
              body: {
                  type: 'ExpressionStatement',
                  expression: {
                      type: 'Literal',
                      value: 12,
                      start: 10,
                      end: 12,
                      loc: {
                          start: {
                              line: 1,
                              column: 10
                          },
                          end: {
                              line: 1,
                              column: 12
                          }
                      },
                      raw: '12'
                  },
                  start: 10,
                  end: 12,
                  loc: {
                      start: {
                          line: 1,
                          column: 10
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
          }],
          sourceType: 'script',
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
      }
  });

});
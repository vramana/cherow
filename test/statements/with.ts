import { pass, fail } from '../utils';

describe('Statements - With', () => {

fail(`with ({}) class C {}`, {
    source: 'with ({}) class C {}',
    message: 'class can\'t appear in single-statement context',
    line: 1,
    column: 10,
    index: 15,
});

fail(`with in strict mode`, {
    source: '"use strict"; with (x) foo',
    message: 'Strict mode code may not include a with statement',
    line: 1,
    column: 14,
    index: 18,
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
            body: [
              {
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
              }
            ],
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
            body: [
              {
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
                  body: [
                    {
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
                    }
                  ]
                }
              }
            ],
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
            body: [
              {
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
              }
            ],
            sourceType: 'script'
          }
      });
  });
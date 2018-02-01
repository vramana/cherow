import { pass, fail } from '../utils';

describe('Expressions - Exponentiation', () => {

    fail(`~3 ** 2;`, {
          source: '~3 ** 2;',
          message: 'Unexpected token \'**\'',
          line: 1,
          column: 3,
          index: 5
      });
    fail(`delete o.p ** 2;`, {
          source: 'delete o.p ** 2;',
          message: 'Unexpected token \'**\'',
          line: 1,
          column: 11,
          index: 13
      });
    fail(`!1 ** 2;`, {
          source: '!1 ** 2;',
      });
    fail(`-3 ** 2;`, {
          source: '-3 ** 2;',
      });
    fail(`+1 ** 2;`, {
          source: '+1 ** 2;',
      });
    fail(`typeof 1 ** 2;`, {
          source: 'typeof 1 ** 2;',
      });
    fail(`void 1 ** 2;`, {
          source: 'void 1 ** 2;',
      });

    fail(`~3 ** 2;`, {
          source: '~3 ** 2;',
      });

    fail(`void x ** y`, {
          source: 'void x ** y',
      });

    fail(`delete x ** y`, {
          source: 'delete x ** y',
      });

    fail(`-x ** y`, {
          source: '-x ** y',
      });

    pass(`-(3 ** 2)`, {
          source: '-(3 ** 2)',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              body: [{
                  type: 'ExpressionStatement',
                  expression: {
                      type: 'UnaryExpression',
                      operator: '-',
                      argument: {
                          type: 'BinaryExpression',
                          left: {
                              type: 'Literal',
                              value: 3,
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
                              raw: '3'
                          },
                          right: {
                              type: 'Literal',
                              value: 2,
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
                              raw: '2'
                          },
                          operator: '**',
                          start: 2,
                          end: 8,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 2
                              },
                              end: {
                                  line: 1,
                                  column: 8
                              }
                          }
                      },
                      prefix: true,
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
                  },
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
              }],
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

    pass(`2 ** typeof 1`, {
          source: '2 ** typeof 1',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              body: [{
                  type: 'ExpressionStatement',
                  expression: {
                      type: 'BinaryExpression',
                      left: {
                          type: 'Literal',
                          value: 2,
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
                          raw: '2'
                      },
                      right: {
                          type: 'UnaryExpression',
                          operator: 'typeof',
                          argument: {
                              type: 'Literal',
                              value: 1,
                              start: 12,
                              end: 13,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 12
                                  },
                                  end: {
                                      line: 1,
                                      column: 13
                                  }
                              },
                              raw: '1'
                          },
                          prefix: true,
                          start: 5,
                          end: 13,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 5
                              },
                              end: {
                                  line: 1,
                                  column: 13
                              }
                          }
                      },
                      operator: '**',
                      start: 0,
                      end: 13,
                      loc: {
                          start: {
                              line: 1,
                              column: 0
                          },
                          end: {
                              line: 1,
                              column: 13
                          }
                      }
                  },
                  start: 0,
                  end: 13,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 13
                      }
                  }
              }],
              sourceType: 'script',
              start: 0,
              end: 13,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 13
                  }
              }
          }
      });

    pass(`2 ** +s`, {
          source: '2 ** +s',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              start: 0,
              end: 7,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 7
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 7,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 7
                      }
                  },
                  expression: {
                      type: 'BinaryExpression',
                      start: 0,
                      end: 7,
                      loc: {
                          start: {
                              line: 1,
                              column: 0
                          },
                          end: {
                              line: 1,
                              column: 7
                          }
                      },
                      left: {
                          type: 'Literal',
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
                          value: 2,
                          raw: '2'
                      },
                      operator: '**',
                      right: {
                          type: 'UnaryExpression',
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
                          },
                          operator: '+',
                          prefix: true,
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
                              name: 's'
                          }
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

    pass(`2 ** -1 * 2`, {
          source: '2 ** -1 * 2',
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
                  type: 'ExpressionStatement',
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
                  expression: {
                      type: 'BinaryExpression',
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
                      left: {
                          type: 'BinaryExpression',
                          start: 0,
                          end: 7,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 0
                              },
                              end: {
                                  line: 1,
                                  column: 7
                              }
                          },
                          left: {
                              type: 'Literal',
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
                              value: 2,
                              raw: '2'
                          },
                          operator: '**',
                          right: {
                              type: 'UnaryExpression',
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
                              },
                              operator: '-',
                              prefix: true,
                              argument: {
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
                              }
                          }
                      },
                      operator: '*',
                      right: {
                          type: 'Literal',
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
                          value: 2,
                          raw: '2'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

    pass(`16 / 2 ** 2`, {
          source: '16 / 2 ** 2',
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
                  type: 'ExpressionStatement',
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
                  expression: {
                      type: 'BinaryExpression',
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
                      left: {
                          type: 'Literal',
                          start: 0,
                          end: 2,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 0
                              },
                              end: {
                                  line: 1,
                                  column: 2
                              }
                          },
                          value: 16,
                          raw: '16'
                      },
                      operator: '/',
                      right: {
                          type: 'BinaryExpression',
                          start: 5,
                          end: 11,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 5
                              },
                              end: {
                                  line: 1,
                                  column: 11
                              }
                          },
                          left: {
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
                              value: 2,
                              raw: '2'
                          },
                          operator: '**',
                          right: {
                              type: 'Literal',
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
                              value: 2,
                              raw: '2'
                          }
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

    pass(`2 ** ++exponent`, {
          source: '2 ** ++exponent',
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
                  type: 'ExpressionStatement',
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
                  expression: {
                      type: 'BinaryExpression',
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
                      left: {
                          type: 'Literal',
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
                          value: 2,
                          raw: '2'
                      },
                      operator: '**',
                      right: {
                          type: 'UpdateExpression',
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
                          },
                          operator: '++',
                          prefix: true,
                          argument: {
                              type: 'Identifier',
                              start: 7,
                              end: 15,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 7
                                  },
                                  end: {
                                      line: 1,
                                      column: 15
                                  }
                              },
                              name: 'exponent'
                          }
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

    pass(`2 ** 2 * 4, 16`, {
          source: '2 ** 2 * 4, 16',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              start: 0,
              end: 14,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 14
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 14,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 14
                      }
                  },
                  expression: {
                      type: 'SequenceExpression',
                      start: 0,
                      end: 14,
                      loc: {
                          start: {
                              line: 1,
                              column: 0
                          },
                          end: {
                              line: 1,
                              column: 14
                          }
                      },
                      expressions: [{
                              type: 'BinaryExpression',
                              start: 0,
                              end: 10,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 0
                                  },
                                  end: {
                                      line: 1,
                                      column: 10
                                  }
                              },
                              left: {
                                  type: 'BinaryExpression',
                                  start: 0,
                                  end: 6,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 0
                                      },
                                      end: {
                                          line: 1,
                                          column: 6
                                      }
                                  },
                                  left: {
                                      type: 'Literal',
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
                                      value: 2,
                                      raw: '2'
                                  },
                                  operator: '**',
                                  right: {
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
                                      value: 2,
                                      raw: '2'
                                  }
                              },
                              operator: '*',
                              right: {
                                  type: 'Literal',
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
                                  value: 4,
                                  raw: '4'
                              }
                          },
                          {
                              type: 'Literal',
                              start: 12,
                              end: 14,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 12
                                  },
                                  end: {
                                      line: 1,
                                      column: 14
                                  }
                              },
                              value: 16,
                              raw: '16'
                          }
                      ]
                  }
              }],
              sourceType: 'script'
          }
      });

    pass(`3 * 2 ** 3, 24`, {
          source: '3 * 2 ** 3, 24',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              start: 0,
              end: 14,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 14
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 14,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 14
                      }
                  },
                  expression: {
                      type: 'SequenceExpression',
                      start: 0,
                      end: 14,
                      loc: {
                          start: {
                              line: 1,
                              column: 0
                          },
                          end: {
                              line: 1,
                              column: 14
                          }
                      },
                      expressions: [{
                              type: 'BinaryExpression',
                              start: 0,
                              end: 10,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 0
                                  },
                                  end: {
                                      line: 1,
                                      column: 10
                                  }
                              },
                              left: {
                                  type: 'Literal',
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
                                  value: 3,
                                  raw: '3'
                              },
                              operator: '*',
                              right: {
                                  type: 'BinaryExpression',
                                  start: 4,
                                  end: 10,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 4
                                      },
                                      end: {
                                          line: 1,
                                          column: 10
                                      }
                                  },
                                  left: {
                                      type: 'Literal',
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
                                      },
                                      value: 2,
                                      raw: '2'
                                  },
                                  operator: '**',
                                  right: {
                                      type: 'Literal',
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
                                      value: 3,
                                      raw: '3'
                                  }
                              }
                          },
                          {
                              type: 'Literal',
                              start: 12,
                              end: 14,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 12
                                  },
                                  end: {
                                      line: 1,
                                      column: 14
                                  }
                              },
                              value: 24,
                              raw: '24'
                          }
                      ]
                  }
              }],
              sourceType: 'script'
          }
      });

    pass(`(2 ** 3) === 8`, {
          source: '(2 ** 3) === 8',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              start: 0,
              end: 14,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 14
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 14,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 14
                      }
                  },
                  expression: {
                      type: 'BinaryExpression',
                      start: 0,
                      end: 14,
                      loc: {
                          start: {
                              line: 1,
                              column: 0
                          },
                          end: {
                              line: 1,
                              column: 14
                          }
                      },
                      left: {
                          type: 'BinaryExpression',
                          start: 1,
                          end: 7,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 1
                              },
                              end: {
                                  line: 1,
                                  column: 7
                              }
                          },
                          left: {
                              type: 'Literal',
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
                              },
                              value: 2,
                              raw: '2'
                          },
                          operator: '**',
                          right: {
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
                              value: 3,
                              raw: '3'
                          }
                      },
                      operator: '===',
                      right: {
                          type: 'Literal',
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
                          },
                          value: 8,
                          raw: '8'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

    pass(`x ** ~y`, {
          source: 'x ** ~y',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              start: 0,
              end: 7,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 7
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 7,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 7
                      }
                  },
                  expression: {
                      type: 'BinaryExpression',
                      start: 0,
                      end: 7,
                      loc: {
                          start: {
                              line: 1,
                              column: 0
                          },
                          end: {
                              line: 1,
                              column: 7
                          }
                      },
                      left: {
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
                          name: 'x'
                      },
                      operator: '**',
                      right: {
                          type: 'UnaryExpression',
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
                          },
                          operator: '~',
                          prefix: true,
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
                              name: 'y'
                          }
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

    pass(`x ** !y`, {
          source: 'x ** !y',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              start: 0,
              end: 7,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 7
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 7,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 7
                      }
                  },
                  expression: {
                      type: 'BinaryExpression',
                      start: 0,
                      end: 7,
                      loc: {
                          start: {
                              line: 1,
                              column: 0
                          },
                          end: {
                              line: 1,
                              column: 7
                          }
                      },
                      left: {
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
                          name: 'x'
                      },
                      operator: '**',
                      right: {
                          type: 'UnaryExpression',
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
                          },
                          operator: '!',
                          prefix: true,
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
                              name: 'y'
                          }
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

    pass(`(++x ** y) - (--p ** q)`, {
          source: '(++x ** y) - (--p ** q)',
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
                      type: 'BinaryExpression',
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
                      left: {
                          type: 'BinaryExpression',
                          start: 1,
                          end: 9,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 1
                              },
                              end: {
                                  line: 1,
                                  column: 9
                              }
                          },
                          left: {
                              type: 'UpdateExpression',
                              start: 1,
                              end: 4,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 1
                                  },
                                  end: {
                                      line: 1,
                                      column: 4
                                  }
                              },
                              operator: '++',
                              prefix: true,
                              argument: {
                                  type: 'Identifier',
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
                                  },
                                  name: 'x'
                              }
                          },
                          operator: '**',
                          right: {
                              type: 'Identifier',
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
                              name: 'y'
                          }
                      },
                      operator: '-',
                      right: {
                          type: 'BinaryExpression',
                          start: 14,
                          end: 22,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 14
                              },
                              end: {
                                  line: 1,
                                  column: 22
                              }
                          },
                          left: {
                              type: 'UpdateExpression',
                              start: 14,
                              end: 17,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 14
                                  },
                                  end: {
                                      line: 1,
                                      column: 17
                                  }
                              },
                              operator: '--',
                              prefix: true,
                              argument: {
                                  type: 'Identifier',
                                  start: 16,
                                  end: 17,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 16
                                      },
                                      end: {
                                          line: 1,
                                          column: 17
                                      }
                                  },
                                  name: 'p'
                              }
                          },
                          operator: '**',
                          right: {
                              type: 'Identifier',
                              start: 21,
                              end: 22,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 21
                                  },
                                  end: {
                                      line: 1,
                                      column: 22
                                  }
                              },
                              name: 'q'
                          }
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

    pass(`x ** ++y`, {
          source: 'x ** ++y',
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
                  type: 'ExpressionStatement',
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
                  expression: {
                      type: 'BinaryExpression',
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
                      left: {
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
                          name: 'x'
                      },
                      operator: '**',
                      right: {
                          type: 'UpdateExpression',
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
                          },
                          operator: '++',
                          prefix: true,
                          argument: {
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
                              name: 'y'
                          }
                      }
                  }
              }],
              sourceType: 'script'
          }
      });
  });
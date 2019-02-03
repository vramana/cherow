import { Context } from '../../../src/common';
import { pass } from '../../test-utils';
import { parseSource } from '../../../src/cherow';
import * as t from 'assert';

describe('Expressions - Conditional', () => {});

const validSyntax = [
  '(y ? y : true)',
  'true ? y : false',
  '"1" ? "" : "1"',
  '"1" ? y : ""',
  'y ? y : "1"',
  'true ? y : z',
  '(false ? true : undefined)',
  '("1" ? "" : "1")',
  '("1" ? y : "")',
  'Symbol() ? 1 : 2, 1',
  '(false ? false : true)'
];

for (const arg of validSyntax) {
  it(`${arg}`, () => {
    t.doesNotThrow(() => {
      parseSource(`${arg}`, undefined, Context.Empty);
    });
  });

  it(`${arg}`, () => {
    t.doesNotThrow(() => {
      parseSource(`${arg}`, undefined, Context.OptionsNext | Context.Module);
    });
  });
}

pass('Expressions - Conditional (pass)', [
  [
    'x = (0) ? 1 : 2',
    Context.LocationTracking,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'Identifier',
              name: 'x',
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
            operator: '=',
            right: {
              type: 'ConditionalExpression',
              test: {
                type: 'Literal',
                value: 0,
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
                }
              },
              consequent: {
                type: 'Literal',
                value: 1,
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
                }
              },
              alternate: {
                type: 'Literal',
                value: 2,
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
              start: 4,
              end: 15,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 15
                }
              }
            },
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
            }
          },
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
          }
        }
      ],
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
      }
    }
  ],
  [
    'x && y ? 1 : 2',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ConditionalExpression',
            test: {
              type: 'LogicalExpression',
              left: {
                type: 'Identifier',
                name: 'x'
              },
              right: {
                type: 'Identifier',
                name: 'y'
              },
              operator: '&&'
            },
            consequent: {
              type: 'Literal',
              value: 1
            },
            alternate: {
              type: 'Literal',
              value: 2
            }
          }
        }
      ]
    }
  ],
  [
    'a ? !b : !c;',
    Context.LocationTracking,
    {
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
          type: 'ExpressionStatement',
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
          expression: {
            type: 'ConditionalExpression',
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
            test: {
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
            },
            consequent: {
              type: 'UnaryExpression',
              start: 4,
              end: 6,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 6
                }
              },
              operator: '!',
              prefix: true,
              argument: {
                type: 'Identifier',
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
                name: 'b'
              }
            },
            alternate: {
              type: 'UnaryExpression',
              start: 9,
              end: 11,
              loc: {
                start: {
                  line: 1,
                  column: 9
                },
                end: {
                  line: 1,
                  column: 11
                }
              },
              operator: '!',
              prefix: true,
              argument: {
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
                name: 'c'
              }
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    'a?b:c',
    Context.LocationTracking,
    {
      type: 'Program',
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
      body: [
        {
          type: 'ExpressionStatement',
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
          expression: {
            type: 'ConditionalExpression',
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
            test: {
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
            },
            consequent: {
              type: 'Identifier',
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
              name: 'b'
            },
            alternate: {
              type: 'Identifier',
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
              name: 'c'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    'a === b ? c : d % e;',
    Context.LocationTracking,
    {
      type: 'Program',
      start: 0,
      end: 20,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 20
        }
      },
      body: [
        {
          type: 'ExpressionStatement',
          start: 0,
          end: 20,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 20
            }
          },
          expression: {
            type: 'ConditionalExpression',
            start: 0,
            end: 19,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 19
              }
            },
            test: {
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
                name: 'a'
              },
              operator: '===',
              right: {
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
                name: 'b'
              }
            },
            consequent: {
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
              name: 'c'
            },
            alternate: {
              type: 'BinaryExpression',
              start: 14,
              end: 19,
              loc: {
                start: {
                  line: 1,
                  column: 14
                },
                end: {
                  line: 1,
                  column: 19
                }
              },
              left: {
                type: 'Identifier',
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
                },
                name: 'd'
              },
              operator: '%',
              right: {
                type: 'Identifier',
                start: 18,
                end: 19,
                loc: {
                  start: {
                    line: 1,
                    column: 18
                  },
                  end: {
                    line: 1,
                    column: 19
                  }
                },
                name: 'e'
              }
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    'a=b?c:d',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'Identifier',
              name: 'a'
            },
            operator: '=',
            right: {
              type: 'ConditionalExpression',
              test: {
                type: 'Identifier',
                name: 'b'
              },
              consequent: {
                type: 'Identifier',
                name: 'c'
              },
              alternate: {
                type: 'Identifier',
                name: 'd'
              }
            }
          }
        }
      ]
    }
  ],
  [
    'a?b=c:d',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ConditionalExpression',
            test: {
              type: 'Identifier',
              name: 'a'
            },
            consequent: {
              type: 'AssignmentExpression',
              left: {
                type: 'Identifier',
                name: 'b'
              },
              operator: '=',
              right: {
                type: 'Identifier',
                name: 'c'
              }
            },
            alternate: {
              type: 'Identifier',
              name: 'd'
            }
          }
        }
      ]
    }
  ],
  [
    'a?b:c=d',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ConditionalExpression',
            test: {
              type: 'Identifier',
              name: 'a'
            },
            consequent: {
              type: 'Identifier',
              name: 'b'
            },
            alternate: {
              type: 'AssignmentExpression',
              left: {
                type: 'Identifier',
                name: 'c'
              },
              operator: '=',
              right: {
                type: 'Identifier',
                name: 'd'
              }
            }
          }
        }
      ]
    }
  ]
]);

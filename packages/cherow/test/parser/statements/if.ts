import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - If', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [
  ['if(a)b', 'if(a)b', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'IfStatement',
            'test': {
                'type': 'Identifier',
                'name': 'a',
                'start': 3,
                'end': 4,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 3
                    },
                    'end': {
                        'line': 1,
                        'column': 4
                    }
                }
            },
            'consequent': {
                'type': 'ExpressionStatement',
                'expression': {
                    'type': 'Identifier',
                    'name': 'b',
                    'start': 5,
                    'end': 6,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 5
                        },
                        'end': {
                            'line': 1,
                            'column': 6
                        }
                    }
                },
                'start': 5,
                'end': 6,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 6
                    }
                }
            },
            'alternate': null,
            'start': 0,
            'end': 6,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 6
                }
            }
        }
    ],
    'start': 0,
    'end': 6,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 6
        }
    }
}],
['if (a) b()', 'if (a) b()', Context.OptionsRanges | Context.OptionsLoc, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'IfStatement',
          'test': {
              'type': 'Identifier',
              'name': 'a',
              'start': 4,
              'end': 5,
              'loc': {
                  'start': {
                      'line': 1,
                      'column': 4
                  },
                  'end': {
                      'line': 1,
                      'column': 5
                  }
              }
          },
          'consequent': {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'CallExpression',
                  'callee': {
                      'type': 'Identifier',
                      'name': 'b',
                      'start': 7,
                      'end': 8,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 7
                          },
                          'end': {
                              'line': 1,
                              'column': 8
                          }
                      }
                  },
                  'arguments': [],
                  'start': 7,
                  'end': 10,
                  'loc': {
                      'start': {
                          'line': 1,
                          'column': 7
                      },
                      'end': {
                          'line': 1,
                          'column': 10
                      }
                  }
              },
              'start': 7,
              'end': 10,
              'loc': {
                  'start': {
                      'line': 1,
                      'column': 7
                  },
                  'end': {
                      'line': 1,
                      'column': 10
                  }
              }
          },
          'alternate': null,
          'start': 0,
          'end': 10,
          'loc': {
              'start': {
                  'line': 1,
                  'column': 0
              },
              'end': {
                  'line': 1,
                  'column': 10
              }
          }
      }
  ],
  'start': 0,
  'end': 10,
  'loc': {
      'start': {
          'line': 1,
          'column': 0
      },
      'end': {
          'line': 1,
          'column': 10
      }
  }
}],
['if (true) if (false) {} else ; else {}', 'if (true) if (false) {} else ; else {}', Context.OptionsRanges | Context.OptionsLoc, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'IfStatement',
          'test': {
              'type': 'Literal',
              'value': true,
              'start': 4,
              'end': 8,
              'loc': {
                  'start': {
                      'line': 1,
                      'column': 4
                  },
                  'end': {
                      'line': 1,
                      'column': 8
                  }
              }
          },
          'consequent': {
              'type': 'IfStatement',
              'test': {
                  'type': 'Literal',
                  'value': false,
                  'start': 14,
                  'end': 19,
                  'loc': {
                      'start': {
                          'line': 1,
                          'column': 14
                      },
                      'end': {
                          'line': 1,
                          'column': 19
                      }
                  }
              },
              'consequent': {
                  'type': 'BlockStatement',
                  'body': [],
                  'start': 21,
                  'end': 23,
                  'loc': {
                      'start': {
                          'line': 1,
                          'column': 21
                      },
                      'end': {
                          'line': 1,
                          'column': 23
                      }
                  }
              },
              'alternate': {
                  'type': 'EmptyStatement',
                  'start': 29,
                  'end': 30,
                  'loc': {
                      'start': {
                          'line': 1,
                          'column': 29
                      },
                      'end': {
                          'line': 1,
                          'column': 30
                      }
                  }
              },
              'start': 10,
              'end': 30,
              'loc': {
                  'start': {
                      'line': 1,
                      'column': 10
                  },
                  'end': {
                      'line': 1,
                      'column': 30
                  }
              }
          },
          'alternate': {
              'type': 'BlockStatement',
              'body': [],
              'start': 36,
              'end': 38,
              'loc': {
                  'start': {
                      'line': 1,
                      'column': 36
                  },
                  'end': {
                      'line': 1,
                      'column': 38
                  }
              }
          },
          'start': 0,
          'end': 38,
          'loc': {
              'start': {
                  'line': 1,
                  'column': 0
              },
              'end': {
                  'line': 1,
                  'column': 38
              }
          }
      }
  ],
  'start': 0,
  'end': 38,
  'loc': {
      'start': {
          'line': 1,
          'column': 0
      },
      'end': {
          'line': 1,
          'column': 38
      }
  }
}],
];

pass('Declarations - If (pass)', valids);

});

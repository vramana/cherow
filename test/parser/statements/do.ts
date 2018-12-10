import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Do while', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [
  ['do foo; while (bar);', 'do foo; while (bar);', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'DoWhileStatement',
            'body': {
                'type': 'ExpressionStatement',
                'expression': {
                    'type': 'Identifier',
                    'name': 'foo',
                    'start': 3,
                    'end': 6,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 3
                        },
                        'end': {
                            'line': 1,
                            'column': 6
                        }
                    }
                },
                'start': 3,
                'end': 7,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 3
                    },
                    'end': {
                        'line': 1,
                        'column': 7
                    }
                }
            },
            'test': {
                'type': 'Identifier',
                'name': 'bar',
                'start': 15,
                'end': 18,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 15
                    },
                    'end': {
                        'line': 1,
                        'column': 18
                    }
                }
            },
            'start': 0,
            'end': 20,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 20
                }
            }
        }
    ],
    'start': 0,
    'end': 20,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 20
        }
    }
}],
['do a(); while (true);', 'do a(); while (true);', Context.OptionsRanges | Context.OptionsLoc, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'DoWhileStatement',
          'body': {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'CallExpression',
                  'callee': {
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
                  'arguments': [],
                  'start': 3,
                  'end': 6,
                  'loc': {
                      'start': {
                          'line': 1,
                          'column': 3
                      },
                      'end': {
                          'line': 1,
                          'column': 6
                      }
                  }
              },
              'start': 3,
              'end': 7,
              'loc': {
                  'start': {
                      'line': 1,
                      'column': 3
                  },
                  'end': {
                      'line': 1,
                      'column': 7
                  }
              }
          },
          'test': {
              'type': 'Literal',
              'value': true,
              'start': 15,
              'end': 19,
              'loc': {
                  'start': {
                      'line': 1,
                      'column': 15
                  },
                  'end': {
                      'line': 1,
                      'column': 19
                  }
              }
          },
          'start': 0,
          'end': 21,
          'loc': {
              'start': {
                  'line': 1,
                  'column': 0
              },
              'end': {
                  'line': 1,
                  'column': 21
              }
          }
      }
  ],
  'start': 0,
  'end': 21,
  'loc': {
      'start': {
          'line': 1,
          'column': 0
      },
      'end': {
          'line': 1,
          'column': 21
      }
  }
}],
['do ; while (true)', 'do ; while (true)', Context.OptionsRanges | Context.OptionsLoc, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'DoWhileStatement',
          'body': {
              'type': 'EmptyStatement',
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
          'test': {
              'type': 'Literal',
              'value': true,
              'start': 12,
              'end': 16,
              'loc': {
                  'start': {
                      'line': 1,
                      'column': 12
                  },
                  'end': {
                      'line': 1,
                      'column': 16
                  }
              }
          },
          'start': 0,
          'end': 17,
          'loc': {
              'start': {
                  'line': 1,
                  'column': 0
              },
              'end': {
                  'line': 1,
                  'column': 17
              }
          }
      }
  ],
  'start': 0,
  'end': 17,
  'loc': {
      'start': {
          'line': 1,
          'column': 0
      },
      'end': {
          'line': 1,
          'column': 17
      }
  }
}],
['do continue; while(1);', 'do continue; while(1);', Context.OptionsRanges | Context.OptionsLoc, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'DoWhileStatement',
          'body': {
              'type': 'ContinueStatement',
              'label': null,
              'start': 3,
              'end': 12,
              'loc': {
                  'start': {
                      'line': 1,
                      'column': 3
                  },
                  'end': {
                      'line': 1,
                      'column': 12
                  }
              }
          },
          'test': {
              'type': 'Literal',
              raw: null,
              'value': 1,
              'start': 19,
              'end': 20,
              'loc': {
                  'start': {
                      'line': 1,
                      'column': 19
                  },
                  'end': {
                      'line': 1,
                      'column': 20
                  }
              }
          },
          'start': 0,
          'end': 22,
          'loc': {
              'start': {
                  'line': 1,
                  'column': 0
              },
              'end': {
                  'line': 1,
                  'column': 22
              }
          }
      }
  ],
  'start': 0,
  'end': 22,
  'loc': {
      'start': {
          'line': 1,
          'column': 0
      },
      'end': {
          'line': 1,
          'column': 22
      }
  }
}],
['do {} while (true)', 'do {} while (true)', Context.OptionsRanges | Context.OptionsLoc, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'DoWhileStatement',
          'body': {
              'type': 'BlockStatement',
              'body': [],
              'start': 3,
              'end': 5,
              'loc': {
                  'start': {
                      'line': 1,
                      'column': 3
                  },
                  'end': {
                      'line': 1,
                      'column': 5
                  }
              }
          },
          'test': {
              'type': 'Literal',
              'value': true,
              'start': 13,
              'end': 17,
              'loc': {
                  'start': {
                      'line': 1,
                      'column': 13
                  },
                  'end': {
                      'line': 1,
                      'column': 17
                  }
              }
          },
          'start': 0,
          'end': 18,
          'loc': {
              'start': {
                  'line': 1,
                  'column': 0
              },
              'end': {
                  'line': 1,
                  'column': 18
              }
          }
      }
  ],
  'start': 0,
  'end': 18,
  'loc': {
      'start': {
          'line': 1,
          'column': 0
      },
      'end': {
          'line': 1,
          'column': 18
      }
  }
}],
['{do ; while(false); false}', '{do ; while(false); false}', Context.OptionsRanges | Context.OptionsLoc, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'BlockStatement',
          'body': [
              {
                  'type': 'DoWhileStatement',
                  'body': {
                      'type': 'EmptyStatement',
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
                  'test': {
                      'type': 'Literal',
                      'value': false,
                      'start': 12,
                      'end': 17,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 12
                          },
                          'end': {
                              'line': 1,
                              'column': 17
                          }
                      }
                  },
                  'start': 1,
                  'end': 19,
                  'loc': {
                      'start': {
                          'line': 1,
                          'column': 1
                      },
                      'end': {
                          'line': 1,
                          'column': 19
                      }
                  }
              },
              {
                  'type': 'ExpressionStatement',
                  'expression': {
                      'type': 'Literal',
                      'value': false,
                      'start': 20,
                      'end': 25,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 20
                          },
                          'end': {
                              'line': 1,
                              'column': 25
                          }
                      }
                  },
                  'start': 20,
                  'end': 25,
                  'loc': {
                      'start': {
                          'line': 1,
                          'column': 20
                      },
                      'end': {
                          'line': 1,
                          'column': 25
                      }
                  }
              }
          ],
          'start': 0,
          'end': 26,
          'loc': {
              'start': {
                  'line': 1,
                  'column': 0
              },
              'end': {
                  'line': 1,
                  'column': 26
              }
          }
      }
  ],
  'start': 0,
  'end': 26,
  'loc': {
      'start': {
          'line': 1,
          'column': 0
      },
      'end': {
          'line': 1,
          'column': 26
      }
  }
}],
];

const invalids: Array < [string, string, Context, any] > = [
  ['do class C {} while (false)', 'do class C {} while (false)', Context.Empty, {}],
  ['do function f() {} while (false)', 'do function f() {} while (false)', Context.Empty, {}],
  ['do let x; while (false)', 'do let x; while (false)', Context.Empty, {}],
  ['do label1: label2: function f() {} while (false)', 'do label1: label2: function f() {} while (false)', Context.Empty, {}],
];

fail('Declarations - Do while (pass)', invalids);
pass('Declarations - Do while (pass)', valids);

});

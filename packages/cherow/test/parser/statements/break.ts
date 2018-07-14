import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Break', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [
  ['while ( foo ) Label: break Label;', 'while ( foo ) Label: break Label;', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'WhileStatement',
            'test': {
                'type': 'Identifier',
                'name': 'foo',
                'start': 8,
                'end': 11,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 8
                    },
                    'end': {
                        'line': 1,
                        'column': 11
                    }
                }
            },
            'body': {
                'type': 'LabeledStatement',
                'label': {
                    'type': 'Identifier',
                    'name': 'Label',
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
                'body': {
                    'type': 'BreakStatement',
                    'label': {
                        'type': 'Identifier',
                        'name': 'Label',
                        'start': 27,
                        'end': 32,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 27
                            },
                            'end': {
                                'line': 1,
                                'column': 32
                            }
                        }
                    },
                    'start': 21,
                    'end': 33,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 21
                        },
                        'end': {
                            'line': 1,
                            'column': 33
                        }
                    }
                },
                'start': 14,
                'end': 33,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 14
                    },
                    'end': {
                        'line': 1,
                        'column': 33
                    }
                }
            },
            'start': 0,
            'end': 33,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 33
                }
            }
        }
    ],
    'start': 0,
    'end': 33,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 33
        }
    }
}],
['do {  test262: {  break test262; } } while (a)', 'do {  test262: {  break test262; } } while (a)', Context.OptionsRanges | Context.OptionsLoc, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'DoWhileStatement',
          'body': {
              'type': 'BlockStatement',
              'body': [
                  {
                      'type': 'LabeledStatement',
                      'label': {
                          'type': 'Identifier',
                          'name': 'test262',
                          'start': 6,
                          'end': 13,
                          'loc': {
                              'start': {
                                  'line': 1,
                                  'column': 6
                              },
                              'end': {
                                  'line': 1,
                                  'column': 13
                              }
                          }
                      },
                      'body': {
                          'type': 'BlockStatement',
                          'body': [
                              {
                                  'type': 'BreakStatement',
                                  'label': {
                                      'type': 'Identifier',
                                      'name': 'test262',
                                      'start': 24,
                                      'end': 31,
                                      'loc': {
                                          'start': {
                                              'line': 1,
                                              'column': 24
                                          },
                                          'end': {
                                              'line': 1,
                                              'column': 31
                                          }
                                      }
                                  },
                                  'start': 18,
                                  'end': 32,
                                  'loc': {
                                      'start': {
                                          'line': 1,
                                          'column': 18
                                      },
                                      'end': {
                                          'line': 1,
                                          'column': 32
                                      }
                                  }
                              }
                          ],
                          'start': 15,
                          'end': 34,
                          'loc': {
                              'start': {
                                  'line': 1,
                                  'column': 15
                              },
                              'end': {
                                  'line': 1,
                                  'column': 34
                              }
                          }
                      },
                      'start': 6,
                      'end': 34,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 6
                          },
                          'end': {
                              'line': 1,
                              'column': 34
                          }
                      }
                  }
              ],
              'start': 3,
              'end': 36,
              'loc': {
                  'start': {
                      'line': 1,
                      'column': 3
                  },
                  'end': {
                      'line': 1,
                      'column': 36
                  }
              }
          },
          'test': {
              'type': 'Identifier',
              'name': 'a',
              'start': 44,
              'end': 45,
              'loc': {
                  'start': {
                      'line': 1,
                      'column': 44
                  },
                  'end': {
                      'line': 1,
                      'column': 45
                  }
              }
          },
          'start': 0,
          'end': 46,
          'loc': {
              'start': {
                  'line': 1,
                  'column': 0
              },
              'end': {
                  'line': 1,
                  'column': 46
              }
          }
      }
  ],
  'start': 0,
  'end': 46,
  'loc': {
      'start': {
          'line': 1,
          'column': 0
      },
      'end': {
          'line': 1,
          'column': 46
      }
  }
}],
['do {  test262: {  break test262; } } while (a)', 'do {  test262: {  break test262; } } while (a)', Context.OptionsRanges | Context.OptionsLoc, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'DoWhileStatement',
          'body': {
              'type': 'BlockStatement',
              'body': [
                  {
                      'type': 'LabeledStatement',
                      'label': {
                          'type': 'Identifier',
                          'name': 'test262',
                          'start': 6,
                          'end': 13,
                          'loc': {
                              'start': {
                                  'line': 1,
                                  'column': 6
                              },
                              'end': {
                                  'line': 1,
                                  'column': 13
                              }
                          }
                      },
                      'body': {
                          'type': 'BlockStatement',
                          'body': [
                              {
                                  'type': 'BreakStatement',
                                  'label': {
                                      'type': 'Identifier',
                                      'name': 'test262',
                                      'start': 24,
                                      'end': 31,
                                      'loc': {
                                          'start': {
                                              'line': 1,
                                              'column': 24
                                          },
                                          'end': {
                                              'line': 1,
                                              'column': 31
                                          }
                                      }
                                  },
                                  'start': 18,
                                  'end': 32,
                                  'loc': {
                                      'start': {
                                          'line': 1,
                                          'column': 18
                                      },
                                      'end': {
                                          'line': 1,
                                          'column': 32
                                      }
                                  }
                              }
                          ],
                          'start': 15,
                          'end': 34,
                          'loc': {
                              'start': {
                                  'line': 1,
                                  'column': 15
                              },
                              'end': {
                                  'line': 1,
                                  'column': 34
                              }
                          }
                      },
                      'start': 6,
                      'end': 34,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 6
                          },
                          'end': {
                              'line': 1,
                              'column': 34
                          }
                      }
                  }
              ],
              'start': 3,
              'end': 36,
              'loc': {
                  'start': {
                      'line': 1,
                      'column': 3
                  },
                  'end': {
                      'line': 1,
                      'column': 36
                  }
              }
          },
          'test': {
              'type': 'Identifier',
              'name': 'a',
              'start': 44,
              'end': 45,
              'loc': {
                  'start': {
                      'line': 1,
                      'column': 44
                  },
                  'end': {
                      'line': 1,
                      'column': 45
                  }
              }
          },
          'start': 0,
          'end': 46,
          'loc': {
              'start': {
                  'line': 1,
                  'column': 0
              },
              'end': {
                  'line': 1,
                  'column': 46
              }
          }
      }
  ],
  'start': 0,
  'end': 46,
  'loc': {
      'start': {
          'line': 1,
          'column': 0
      },
      'end': {
          'line': 1,
          'column': 46
      }
  }
}],
['while (foo) { break; }', 'while (foo) { break; }', Context.OptionsRanges | Context.OptionsLoc, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'WhileStatement',
          'test': {
              'type': 'Identifier',
              'name': 'foo',
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
          'body': {
              'type': 'BlockStatement',
              'body': [
                  {
                      'type': 'BreakStatement',
                      'label': null,
                      'start': 14,
                      'end': 20,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 14
                          },
                          'end': {
                              'line': 1,
                              'column': 20
                          }
                      }
                  }
              ],
              'start': 12,
              'end': 22,
              'loc': {
                  'start': {
                      'line': 1,
                      'column': 12
                  },
                  'end': {
                      'line': 1,
                      'column': 22
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
}]
];

pass('Declarations - Break (pass)', valids);

});

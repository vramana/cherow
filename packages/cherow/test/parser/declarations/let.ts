import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Let', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [
  ['let foo;', 'let foo;', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'VariableDeclaration',
            'kind': 'let',
            'declarations': [
                {
                    'type': 'VariableDeclarator',
                    'init': null,
                    'id': {
                        'type': 'Identifier',
                        'name': 'foo',
                        'start': 4,
                        'end': 7,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 4
                            },
                            'end': {
                                'line': 1,
                                'column': 7
                            }
                        }
                    },
                    'start': 4,
                    'end': 7,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 4
                        },
                        'end': {
                            'line': 1,
                            'column': 7
                        }
                    }
                }
            ],
            'start': 0,
            'end': 8,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 8
                }
            }
        }
    ],
    'start': 0,
    'end': 8,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 8
        }
    }
}],
['let [x, ...[a, b]] = obj;', 'let [x, ...[a, b]] = obj;', Context.OptionsRanges | Context.OptionsLoc, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'VariableDeclaration',
          'kind': 'let',
          'declarations': [
              {
                  'type': 'VariableDeclarator',
                  'init': {
                      'type': 'Identifier',
                      'name': 'obj',
                      'start': 21,
                      'end': 24,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 21
                          },
                          'end': {
                              'line': 1,
                              'column': 24
                          }
                      }
                  },
                  'id': {
                      'type': 'ArrayPattern',
                      'elements': [
                          {
                              'type': 'Identifier',
                              'name': 'x',
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
                          {
                              'type': 'RestElement',
                              'argument': {
                                  'type': 'ArrayPattern',
                                  'elements': [
                                      {
                                          'type': 'Identifier',
                                          'name': 'a',
                                          'start': 12,
                                          'end': 13,
                                          'loc': {
                                              'start': {
                                                  'line': 1,
                                                  'column': 12
                                              },
                                              'end': {
                                                  'line': 1,
                                                  'column': 13
                                              }
                                          }
                                      },
                                      {
                                          'type': 'Identifier',
                                          'name': 'b',
                                          'start': 15,
                                          'end': 16,
                                          'loc': {
                                              'start': {
                                                  'line': 1,
                                                  'column': 15
                                              },
                                              'end': {
                                                  'line': 1,
                                                  'column': 16
                                              }
                                          }
                                      }
                                  ],
                                  'start': 11,
                                  'end': 17,
                                  'loc': {
                                      'start': {
                                          'line': 1,
                                          'column': 11
                                      },
                                      'end': {
                                          'line': 1,
                                          'column': 17
                                      }
                                  }
                              },
                              'start': 8,
                              'end': 17,
                              'loc': {
                                  'start': {
                                      'line': 1,
                                      'column': 8
                                  },
                                  'end': {
                                      'line': 1,
                                      'column': 17
                                  }
                              }
                          }
                      ],
                      'start': 4,
                      'end': 18,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 4
                          },
                          'end': {
                              'line': 1,
                              'column': 18
                          }
                      }
                  },
                  'start': 4,
                  'end': 24,
                  'loc': {
                      'start': {
                          'line': 1,
                          'column': 4
                      },
                      'end': {
                          'line': 1,
                          'column': 24
                      }
                  }
              }
          ],
          'start': 0,
          'end': 25,
          'loc': {
              'start': {
                  'line': 1,
                  'column': 0
              },
              'end': {
                  'line': 1,
                  'column': 25
              }
          }
      }
  ],
  'start': 0,
  'end': 25,
  'loc': {
      'start': {
          'line': 1,
          'column': 0
      },
      'end': {
          'line': 1,
          'column': 25
      }
  }
}],
['let x, {foo} = y;', 'let x, {foo} = y;', Context.OptionsRanges | Context.OptionsLoc, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'VariableDeclaration',
          'kind': 'let',
          'declarations': [
              {
                  'type': 'VariableDeclarator',
                  'init': null,
                  'id': {
                      'type': 'Identifier',
                      'name': 'x',
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
              {
                  'type': 'VariableDeclarator',
                  'init': {
                      'type': 'Identifier',
                      'name': 'y',
                      'start': 15,
                      'end': 16,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 15
                          },
                          'end': {
                              'line': 1,
                              'column': 16
                          }
                      }
                  },
                  'id': {
                      'type': 'ObjectPattern',
                      'properties': [
                          {
                              'type': 'Property',
                              'kind': 'init',
                              'key': {
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
                              'computed': false,
                              'value': {
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
                              'method': false,
                              'shorthand': true,
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
                          }
                      ],
                      'start': 7,
                      'end': 12,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 7
                          },
                          'end': {
                              'line': 1,
                              'column': 12
                          }
                      }
                  },
                  'start': 7,
                  'end': 16,
                  'loc': {
                      'start': {
                          'line': 1,
                          'column': 7
                      },
                      'end': {
                          'line': 1,
                          'column': 16
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
['let x = y, {foo} = z;', 'let x = y, {foo} = z;', Context.OptionsRanges | Context.OptionsLoc, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'VariableDeclaration',
          'kind': 'let',
          'declarations': [
              {
                  'type': 'VariableDeclarator',
                  'init': {
                      'type': 'Identifier',
                      'name': 'y',
                      'start': 8,
                      'end': 9,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 8
                          },
                          'end': {
                              'line': 1,
                              'column': 9
                          }
                      }
                  },
                  'id': {
                      'type': 'Identifier',
                      'name': 'x',
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
                  'start': 4,
                  'end': 9,
                  'loc': {
                      'start': {
                          'line': 1,
                          'column': 4
                      },
                      'end': {
                          'line': 1,
                          'column': 9
                      }
                  }
              },
              {
                  'type': 'VariableDeclarator',
                  'init': {
                      'type': 'Identifier',
                      'name': 'z',
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
                  'id': {
                      'type': 'ObjectPattern',
                      'properties': [
                          {
                              'type': 'Property',
                              'kind': 'init',
                              'key': {
                                  'type': 'Identifier',
                                  'name': 'foo',
                                  'start': 12,
                                  'end': 15,
                                  'loc': {
                                      'start': {
                                          'line': 1,
                                          'column': 12
                                      },
                                      'end': {
                                          'line': 1,
                                          'column': 15
                                      }
                                  }
                              },
                              'computed': false,
                              'value': {
                                  'type': 'Identifier',
                                  'name': 'foo',
                                  'start': 12,
                                  'end': 15,
                                  'loc': {
                                      'start': {
                                          'line': 1,
                                          'column': 12
                                      },
                                      'end': {
                                          'line': 1,
                                          'column': 15
                                      }
                                  }
                              },
                              'method': false,
                              'shorthand': true,
                              'start': 12,
                              'end': 15,
                              'loc': {
                                  'start': {
                                      'line': 1,
                                      'column': 12
                                  },
                                  'end': {
                                      'line': 1,
                                      'column': 15
                                  }
                              }
                          }
                      ],
                      'start': 11,
                      'end': 16,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 11
                          },
                          'end': {
                              'line': 1,
                              'column': 16
                          }
                      }
                  },
                  'start': 11,
                  'end': 20,
                  'loc': {
                      'start': {
                          'line': 1,
                          'column': 11
                      },
                      'end': {
                          'line': 1,
                          'column': 20
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
['let {} = x;', 'let {} = x;', Context.OptionsRanges | Context.OptionsLoc, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'VariableDeclaration',
          'kind': 'let',
          'declarations': [
              {
                  'type': 'VariableDeclarator',
                  'init': {
                      'type': 'Identifier',
                      'name': 'x',
                      'start': 9,
                      'end': 10,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 9
                          },
                          'end': {
                              'line': 1,
                              'column': 10
                          }
                      }
                  },
                  'id': {
                      'type': 'ObjectPattern',
                      'properties': [],
                      'start': 4,
                      'end': 6,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 4
                          },
                          'end': {
                              'line': 1,
                              'column': 6
                          }
                      }
                  },
                  'start': 4,
                  'end': 10,
                  'loc': {
                      'start': {
                          'line': 1,
                          'column': 4
                      },
                      'end': {
                          'line': 1,
                          'column': 10
                      }
                  }
              }
          ],
          'start': 0,
          'end': 11,
          'loc': {
              'start': {
                  'line': 1,
                  'column': 0
              },
              'end': {
                  'line': 1,
                  'column': 11
              }
          }
      }
  ],
  'start': 0,
  'end': 11,
  'loc': {
      'start': {
          'line': 1,
          'column': 0
      },
      'end': {
          'line': 1,
          'column': 11
      }
  }
}],
];

pass('Declarations - Let (pass)', valids);

});

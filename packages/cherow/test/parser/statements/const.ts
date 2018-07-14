import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Const', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [
  ['const karl = ghost;', 'const karl = ghost;', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'VariableDeclaration',
            'kind': 'const',
            'declarations': [
                {
                    'type': 'VariableDeclarator',
                    'init': {
                        'type': 'Identifier',
                        'name': 'ghost',
                        'start': 13,
                        'end': 18,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 13
                            },
                            'end': {
                                'line': 1,
                                'column': 18
                            }
                        }
                    },
                    'id': {
                        'type': 'Identifier',
                        'name': 'karl',
                        'start': 6,
                        'end': 10,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 6
                            },
                            'end': {
                                'line': 1,
                                'column': 10
                            }
                        }
                    },
                    'start': 6,
                    'end': 18,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 6
                        },
                        'end': {
                            'line': 1,
                            'column': 18
                        }
                    }
                }
            ],
            'start': 0,
            'end': 19,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 19
                }
            }
        }
    ],
    'start': 0,
    'end': 19,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 19
        }
    }
}],
['const [foo=a,bar=b] = x;', 'const [foo=a,bar=b] = x;', Context.OptionsRanges | Context.OptionsLoc, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'VariableDeclaration',
          'kind': 'const',
          'declarations': [
              {
                  'type': 'VariableDeclarator',
                  'init': {
                      'type': 'Identifier',
                      'name': 'x',
                      'start': 22,
                      'end': 23,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 22
                          },
                          'end': {
                              'line': 1,
                              'column': 23
                          }
                      }
                  },
                  'id': {
                      'type': 'ArrayPattern',
                      'elements': [
                          {
                              'type': 'AssignmentPattern',
                              'left': {
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
                              'right': {
                                  'type': 'Identifier',
                                  'name': 'a',
                                  'start': 11,
                                  'end': 12,
                                  'loc': {
                                      'start': {
                                          'line': 1,
                                          'column': 11
                                      },
                                      'end': {
                                          'line': 1,
                                          'column': 12
                                      }
                                  }
                              },
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
                          {
                              'type': 'AssignmentPattern',
                              'left': {
                                  'type': 'Identifier',
                                  'name': 'bar',
                                  'start': 13,
                                  'end': 16,
                                  'loc': {
                                      'start': {
                                          'line': 1,
                                          'column': 13
                                      },
                                      'end': {
                                          'line': 1,
                                          'column': 16
                                      }
                                  }
                              },
                              'right': {
                                  'type': 'Identifier',
                                  'name': 'b',
                                  'start': 17,
                                  'end': 18,
                                  'loc': {
                                      'start': {
                                          'line': 1,
                                          'column': 17
                                      },
                                      'end': {
                                          'line': 1,
                                          'column': 18
                                      }
                                  }
                              },
                              'start': 13,
                              'end': 18,
                              'loc': {
                                  'start': {
                                      'line': 1,
                                      'column': 13
                                  },
                                  'end': {
                                      'line': 1,
                                      'column': 18
                                  }
                              }
                          }
                      ],
                      'start': 6,
                      'end': 19,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 6
                          },
                          'end': {
                              'line': 1,
                              'column': 19
                          }
                      }
                  },
                  'start': 6,
                  'end': 23,
                  'loc': {
                      'start': {
                          'line': 1,
                          'column': 6
                      },
                      'end': {
                          'line': 1,
                          'column': 23
                      }
                  }
              }
          ],
          'start': 0,
          'end': 24,
          'loc': {
              'start': {
                  'line': 1,
                  'column': 0
              },
              'end': {
                  'line': 1,
                  'column': 24
              }
          }
      }
  ],
  'start': 0,
  'end': 24,
  'loc': {
      'start': {
          'line': 1,
          'column': 0
      },
      'end': {
          'line': 1,
          'column': 24
      }
  }
}],
['const [a=[...b], ...c] = obj;', 'const [a=[...b], ...c] = obj;', Context.OptionsRanges | Context.OptionsLoc, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'VariableDeclaration',
          'kind': 'const',
          'declarations': [
              {
                  'type': 'VariableDeclarator',
                  'init': {
                      'type': 'Identifier',
                      'name': 'obj',
                      'start': 25,
                      'end': 28,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 25
                          },
                          'end': {
                              'line': 1,
                              'column': 28
                          }
                      }
                  },
                  'id': {
                      'type': 'ArrayPattern',
                      'elements': [
                          {
                              'type': 'AssignmentPattern',
                              'left': {
                                  'type': 'Identifier',
                                  'name': 'a',
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
                              'right': {
                                  'type': 'ArrayExpression',
                                  'elements': [
                                      {
                                          'type': 'SpreadElement',
                                          'argument': {
                                              'type': 'Identifier',
                                              'name': 'b',
                                              'start': 13,
                                              'end': 14,
                                              'loc': {
                                                  'start': {
                                                      'line': 1,
                                                      'column': 13
                                                  },
                                                  'end': {
                                                      'line': 1,
                                                      'column': 14
                                                  }
                                              }
                                          },
                                          'start': 10,
                                          'end': 14,
                                          'loc': {
                                              'start': {
                                                  'line': 1,
                                                  'column': 10
                                              },
                                              'end': {
                                                  'line': 1,
                                                  'column': 14
                                              }
                                          }
                                      }
                                  ],
                                  'start': 9,
                                  'end': 15,
                                  'loc': {
                                      'start': {
                                          'line': 1,
                                          'column': 9
                                      },
                                      'end': {
                                          'line': 1,
                                          'column': 15
                                      }
                                  }
                              },
                              'start': 7,
                              'end': 15,
                              'loc': {
                                  'start': {
                                      'line': 1,
                                      'column': 7
                                  },
                                  'end': {
                                      'line': 1,
                                      'column': 15
                                  }
                              }
                          },
                          {
                              'type': 'RestElement',
                              'argument': {
                                  'type': 'Identifier',
                                  'name': 'c',
                                  'start': 20,
                                  'end': 21,
                                  'loc': {
                                      'start': {
                                          'line': 1,
                                          'column': 20
                                      },
                                      'end': {
                                          'line': 1,
                                          'column': 21
                                      }
                                  }
                              },
                              'start': 17,
                              'end': 21,
                              'loc': {
                                  'start': {
                                      'line': 1,
                                      'column': 17
                                  },
                                  'end': {
                                      'line': 1,
                                      'column': 21
                                  }
                              }
                          }
                      ],
                      'start': 6,
                      'end': 22,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 6
                          },
                          'end': {
                              'line': 1,
                              'column': 22
                          }
                      }
                  },
                  'start': 6,
                  'end': 28,
                  'loc': {
                      'start': {
                          'line': 1,
                          'column': 6
                      },
                      'end': {
                          'line': 1,
                          'column': 28
                      }
                  }
              }
          ],
          'start': 0,
          'end': 29,
          'loc': {
              'start': {
                  'line': 1,
                  'column': 0
              },
              'end': {
                  'line': 1,
                  'column': 29
              }
          }
      }
  ],
  'start': 0,
  'end': 29,
  'loc': {
      'start': {
          'line': 1,
          'column': 0
      },
      'end': {
          'line': 1,
          'column': 29
      }
  }
}],
['const {foo=a,bar} = x;', 'const {foo=a,bar} = x;', Context.OptionsRanges | Context.OptionsLoc, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'VariableDeclaration',
          'kind': 'const',
          'declarations': [
              {
                  'type': 'VariableDeclarator',
                  'init': {
                      'type': 'Identifier',
                      'name': 'x',
                      'start': 20,
                      'end': 21,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 20
                          },
                          'end': {
                              'line': 1,
                              'column': 21
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
                              'computed': false,
                              'value': {
                                  'type': 'AssignmentPattern',
                                  'left': {
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
                                  'right': {
                                      'type': 'Identifier',
                                      'name': 'a',
                                      'start': 11,
                                      'end': 12,
                                      'loc': {
                                          'start': {
                                              'line': 1,
                                              'column': 11
                                          },
                                          'end': {
                                              'line': 1,
                                              'column': 12
                                          }
                                      }
                                  },
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
                              'method': false,
                              'shorthand': true,
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
                          {
                              'type': 'Property',
                              'kind': 'init',
                              'key': {
                                  'type': 'Identifier',
                                  'name': 'bar',
                                  'start': 13,
                                  'end': 16,
                                  'loc': {
                                      'start': {
                                          'line': 1,
                                          'column': 13
                                      },
                                      'end': {
                                          'line': 1,
                                          'column': 16
                                      }
                                  }
                              },
                              'computed': false,
                              'value': {
                                  'type': 'Identifier',
                                  'name': 'bar',
                                  'start': 13,
                                  'end': 16,
                                  'loc': {
                                      'start': {
                                          'line': 1,
                                          'column': 13
                                      },
                                      'end': {
                                          'line': 1,
                                          'column': 16
                                      }
                                  }
                              },
                              'method': false,
                              'shorthand': true,
                              'start': 13,
                              'end': 16,
                              'loc': {
                                  'start': {
                                      'line': 1,
                                      'column': 13
                                  },
                                  'end': {
                                      'line': 1,
                                      'column': 16
                                  }
                              }
                          }
                      ],
                      'start': 6,
                      'end': 17,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 6
                          },
                          'end': {
                              'line': 1,
                              'column': 17
                          }
                      }
                  },
                  'start': 6,
                  'end': 21,
                  'loc': {
                      'start': {
                          'line': 1,
                          'column': 6
                      },
                      'end': {
                          'line': 1,
                          'column': 21
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
['const {foo:a=b} = x;', 'const {foo:a=b} = x;', Context.OptionsRanges | Context.OptionsLoc, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'VariableDeclaration',
          'kind': 'const',
          'declarations': [
              {
                  'type': 'VariableDeclarator',
                  'init': {
                      'type': 'Identifier',
                      'name': 'x',
                      'start': 18,
                      'end': 19,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 18
                          },
                          'end': {
                              'line': 1,
                              'column': 19
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
                              'computed': false,
                              'value': {
                                  'type': 'AssignmentPattern',
                                  'left': {
                                      'type': 'Identifier',
                                      'name': 'a',
                                      'start': 11,
                                      'end': 12,
                                      'loc': {
                                          'start': {
                                              'line': 1,
                                              'column': 11
                                          },
                                          'end': {
                                              'line': 1,
                                              'column': 12
                                          }
                                      }
                                  },
                                  'right': {
                                      'type': 'Identifier',
                                      'name': 'b',
                                      'start': 13,
                                      'end': 14,
                                      'loc': {
                                          'start': {
                                              'line': 1,
                                              'column': 13
                                          },
                                          'end': {
                                              'line': 1,
                                              'column': 14
                                          }
                                      }
                                  },
                                  'start': 11,
                                  'end': 14,
                                  'loc': {
                                      'start': {
                                          'line': 1,
                                          'column': 11
                                      },
                                      'end': {
                                          'line': 1,
                                          'column': 14
                                      }
                                  }
                              },
                              'method': false,
                              'shorthand': false,
                              'start': 7,
                              'end': 14,
                              'loc': {
                                  'start': {
                                      'line': 1,
                                      'column': 7
                                  },
                                  'end': {
                                      'line': 1,
                                      'column': 14
                                  }
                              }
                          }
                      ],
                      'start': 6,
                      'end': 15,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 6
                          },
                          'end': {
                              'line': 1,
                              'column': 15
                          }
                      }
                  },
                  'start': 6,
                  'end': 19,
                  'loc': {
                      'start': {
                          'line': 1,
                          'column': 6
                      },
                      'end': {
                          'line': 1,
                          'column': 19
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
];

pass('Declarations - Const (pass)', valids);

});

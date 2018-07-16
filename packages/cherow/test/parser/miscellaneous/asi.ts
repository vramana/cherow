import { Context } from '../../../src/common';
import { pass } from '../../test-utils';

describe('Miscellaneous - ASI', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [

  [';;1;;1;;1', ';;1;;1;;1', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'EmptyStatement',
            'start': 0,
            'end': 1,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 1
                }
            }
        },
        {
            'type': 'EmptyStatement',
            'start': 1,
            'end': 2,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 1
                },
                'end': {
                    'line': 1,
                    'column': 2
                }
            }
        },
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'Literal',
                raw: null,
                'value': 1,
                'start': 2,
                'end': 3,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 2
                    },
                    'end': {
                        'line': 1,
                        'column': 3
                    }
                }
            },
            'start': 2,
            'end': 4,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 2
                },
                'end': {
                    'line': 1,
                    'column': 4
                }
            }
        },
        {
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
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'Literal',
                raw: null,
                'value': 1,
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
            'end': 7,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 5
                },
                'end': {
                    'line': 1,
                    'column': 7
                }
            }
        },
        {
            'type': 'EmptyStatement',
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
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'Literal',
                raw: null,
                'value': 1,
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
        }
    ],
    'start': 0,
    'end': 9,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 9
        }
    }
}],
[';;;;', ';;;;', Context.OptionsRanges | Context.OptionsLoc, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'EmptyStatement',
          'start': 0,
          'end': 1,
          'loc': {
              'start': {
                  'line': 1,
                  'column': 0
              },
              'end': {
                  'line': 1,
                  'column': 1
              }
          }
      },
      {
          'type': 'EmptyStatement',
          'start': 1,
          'end': 2,
          'loc': {
              'start': {
                  'line': 1,
                  'column': 1
              },
              'end': {
                  'line': 1,
                  'column': 2
              }
          }
      },
      {
          'type': 'EmptyStatement',
          'start': 2,
          'end': 3,
          'loc': {
              'start': {
                  'line': 1,
                  'column': 2
              },
              'end': {
                  'line': 1,
                  'column': 3
              }
          }
      },
      {
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
      }
  ],
  'start': 0,
  'end': 4,
  'loc': {
      'start': {
          'line': 1,
          'column': 0
      },
      'end': {
          'line': 1,
          'column': 4
      }
  }
}],
 [`{ var x = 14, y = 3
  z; }`, `{ var x = 14, y = 3
    z; }`, Context.OptionsRanges | Context.OptionsLoc, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'BlockStatement',
              'body': [
                  {
                      'type': 'VariableDeclaration',
                      'kind': 'var',
                      'declarations': [
                          {
                              'type': 'VariableDeclarator',
                              'init': {
                                  'type': 'Literal',
                                  raw: null,
                                  'value': 14,
                                  'start': 10,
                                  'end': 12,
                                  'loc': {
                                      'start': {
                                          'line': 1,
                                          'column': 10
                                      },
                                      'end': {
                                          'line': 1,
                                          'column': 12
                                      }
                                  }
                              },
                              'id': {
                                  'type': 'Identifier',
                                  'name': 'x',
                                  'start': 6,
                                  'end': 7,
                                  'loc': {
                                      'start': {
                                          'line': 1,
                                          'column': 6
                                      },
                                      'end': {
                                          'line': 1,
                                          'column': 7
                                      }
                                  }
                              },
                              'start': 6,
                              'end': 12,
                              'loc': {
                                  'start': {
                                      'line': 1,
                                      'column': 6
                                  },
                                  'end': {
                                      'line': 1,
                                      'column': 12
                                  }
                              }
                          },
                          {
                              'type': 'VariableDeclarator',
                              'init': {
                                  'type': 'Literal',
                                  raw: null,
                                  'value': 3,
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
                                  'type': 'Identifier',
                                  'name': 'y',
                                  'start': 14,
                                  'end': 15,
                                  'loc': {
                                      'start': {
                                          'line': 1,
                                          'column': 14
                                      },
                                      'end': {
                                          'line': 1,
                                          'column': 15
                                      }
                                  }
                              },
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
                          }
                      ],
                      'start': 2,
                      'end': 19,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 2
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
                          'type': 'Identifier',
                          'name': 'z',
                          'start': 24,
                          'end': 25,
                          'loc': {
                              'start': {
                                  'line': 2,
                                  'column': 4
                              },
                              'end': {
                                  'line': 2,
                                  'column': 5
                              }
                          }
                      },
                      'start': 24,
                      'end': 26,
                      'loc': {
                          'start': {
                              'line': 2,
                              'column': 4
                          },
                          'end': {
                              'line': 2,
                              'column': 6
                          }
                      }
                  }
              ],
              'start': 0,
              'end': 28,
              'loc': {
                  'start': {
                      'line': 1,
                      'column': 0
                  },
                  'end': {
                      'line': 2,
                      'column': 8
                  }
              }
          }
      ],
      'start': 0,
      'end': 28,
      'loc': {
          'start': {
              'line': 1,
              'column': 0
          },
          'end': {
              'line': 2,
              'column': 8
          }
      }
  }],
 [`do {
} while (false)`, `do {
} while (false)`, Context.OptionsRanges | Context.OptionsLoc, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'DoWhileStatement',
          'body': {
              'type': 'BlockStatement',
              'body': [],
              'start': 3,
              'end': 6,
              'loc': {
                  'start': {
                      'line': 1,
                      'column': 3
                  },
                  'end': {
                      'line': 2,
                      'column': 1
                  }
              }
          },
          'test': {
              'type': 'Literal',
              'value': false,
              'start': 14,
              'end': 19,
              'loc': {
                  'start': {
                      'line': 2,
                      'column': 9
                  },
                  'end': {
                      'line': 2,
                      'column': 14
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
                  'line': 2,
                  'column': 15
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
          'line': 2,
          'column': 15
      }
  }
}],
 [`var
 x
 =
 1`, `var
 x
 =
 1`, Context.OptionsRanges | Context.OptionsLoc, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'VariableDeclaration',
          'kind': 'var',
          'declarations': [
              {
                  'type': 'VariableDeclarator',
                  'init': {
                      'type': 'Literal',
                      raw: null,
                      'value': 1,
                      'start': 11,
                      'end': 12,
                      'loc': {
                          'start': {
                              'line': 4,
                              'column': 1
                          },
                          'end': {
                              'line': 4,
                              'column': 2
                          }
                      }
                  },
                  'id': {
                      'type': 'Identifier',
                      'name': 'x',
                      'start': 5,
                      'end': 6,
                      'loc': {
                          'start': {
                              'line': 2,
                              'column': 1
                          },
                          'end': {
                              'line': 2,
                              'column': 2
                          }
                      }
                  },
                  'start': 5,
                  'end': 12,
                  'loc': {
                      'start': {
                          'line': 2,
                          'column': 1
                      },
                      'end': {
                          'line': 4,
                          'column': 2
                      }
                  }
              }
          ],
          'start': 0,
          'end': 12,
          'loc': {
              'start': {
                  'line': 1,
                  'column': 0
              },
              'end': {
                  'line': 4,
                  'column': 2
              }
          }
      }
  ],
  'start': 0,
  'end': 12,
  'loc': {
      'start': {
          'line': 1,
          'column': 0
      },
      'end': {
          'line': 4,
          'column': 2
      }
  }
}],
 [`var
 x
 ,y = 1`, `var
 x
 ,y = 1`, Context.OptionsRanges | Context.OptionsLoc, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'VariableDeclaration',
          'kind': 'var',
          'declarations': [
              {
                  'type': 'VariableDeclarator',
                  'init': null,
                  'id': {
                      'type': 'Identifier',
                      'name': 'x',
                      'start': 5,
                      'end': 6,
                      'loc': {
                          'start': {
                              'line': 2,
                              'column': 1
                          },
                          'end': {
                              'line': 2,
                              'column': 2
                          }
                      }
                  },
                  'start': 5,
                  'end': 6,
                  'loc': {
                      'start': {
                          'line': 2,
                          'column': 1
                      },
                      'end': {
                          'line': 2,
                          'column': 2
                      }
                  }
              },
              {
                  'type': 'VariableDeclarator',
                  'init': {
                      'type': 'Literal',
                      raw: null,
                      'value': 1,
                      'start': 13,
                      'end': 14,
                      'loc': {
                          'start': {
                              'line': 3,
                              'column': 6
                          },
                          'end': {
                              'line': 3,
                              'column': 7
                          }
                      }
                  },
                  'id': {
                      'type': 'Identifier',
                      'name': 'y',
                      'start': 9,
                      'end': 10,
                      'loc': {
                          'start': {
                              'line': 3,
                              'column': 2
                          },
                          'end': {
                              'line': 3,
                              'column': 3
                          }
                      }
                  },
                  'start': 9,
                  'end': 14,
                  'loc': {
                      'start': {
                          'line': 3,
                          'column': 2
                      },
                      'end': {
                          'line': 3,
                          'column': 7
                      }
                  }
              }
          ],
          'start': 0,
          'end': 14,
          'loc': {
              'start': {
                  'line': 1,
                  'column': 0
              },
              'end': {
                  'line': 3,
                  'column': 7
              }
          }
      }
  ],
  'start': 0,
  'end': 14,
  'loc': {
      'start': {
          'line': 1,
          'column': 0
      },
      'end': {
          'line': 3,
          'column': 7
      }
  }
}],
 [`while (true) { break
  there; }`, `while (true) { break
    there; }`, Context.OptionsRanges | Context.OptionsLoc, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'WhileStatement',
              'test': {
                  'type': 'Literal',
                  'value': true,
                  'start': 7,
                  'end': 11,
                  'loc': {
                      'start': {
                          'line': 1,
                          'column': 7
                      },
                      'end': {
                          'line': 1,
                          'column': 11
                      }
                  }
              },
              'body': {
                  'type': 'BlockStatement',
                  'body': [
                      {
                          'type': 'BreakStatement',
                          'label': null,
                          'start': 15,
                          'end': 20,
                          'loc': {
                              'start': {
                                  'line': 1,
                                  'column': 15
                              },
                              'end': {
                                  'line': 1,
                                  'column': 20
                              }
                          }
                      },
                      {
                          'type': 'ExpressionStatement',
                          'expression': {
                              'type': 'Identifier',
                              'name': 'there',
                              'start': 25,
                              'end': 30,
                              'loc': {
                                  'start': {
                                      'line': 2,
                                      'column': 4
                                  },
                                  'end': {
                                      'line': 2,
                                      'column': 9
                                  }
                              }
                          },
                          'start': 25,
                          'end': 31,
                          'loc': {
                              'start': {
                                  'line': 2,
                                  'column': 4
                              },
                              'end': {
                                  'line': 2,
                                  'column': 10
                              }
                          }
                      }
                  ],
                  'start': 13,
                  'end': 33,
                  'loc': {
                      'start': {
                          'line': 1,
                          'column': 13
                      },
                      'end': {
                          'line': 2,
                          'column': 12
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
                      'line': 2,
                      'column': 12
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
              'line': 2,
              'column': 12
          }
      }
  }],
 ['var x /* comment */;', 'var x /* comment */;', Context.OptionsRanges | Context.OptionsLoc, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'VariableDeclaration',
          'kind': 'var',
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
 [`{ var x = 14, y = 3
  z; }`, `{ var x = 14, y = 3
    z; }`, Context.OptionsRanges | Context.OptionsLoc, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'BlockStatement',
              'body': [
                  {
                      'type': 'VariableDeclaration',
                      'kind': 'var',
                      'declarations': [
                          {
                              'type': 'VariableDeclarator',
                              'init': {
                                  'type': 'Literal',
                                  raw: null,
                                  'value': 14,
                                  'start': 10,
                                  'end': 12,
                                  'loc': {
                                      'start': {
                                          'line': 1,
                                          'column': 10
                                      },
                                      'end': {
                                          'line': 1,
                                          'column': 12
                                      }
                                  }
                              },
                              'id': {
                                  'type': 'Identifier',
                                  'name': 'x',
                                  'start': 6,
                                  'end': 7,
                                  'loc': {
                                      'start': {
                                          'line': 1,
                                          'column': 6
                                      },
                                      'end': {
                                          'line': 1,
                                          'column': 7
                                      }
                                  }
                              },
                              'start': 6,
                              'end': 12,
                              'loc': {
                                  'start': {
                                      'line': 1,
                                      'column': 6
                                  },
                                  'end': {
                                      'line': 1,
                                      'column': 12
                                  }
                              }
                          },
                          {
                              'type': 'VariableDeclarator',
                              'init': {
                                  'type': 'Literal',
                                  raw: null,
                                  'value': 3,
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
                                  'type': 'Identifier',
                                  'name': 'y',
                                  'start': 14,
                                  'end': 15,
                                  'loc': {
                                      'start': {
                                          'line': 1,
                                          'column': 14
                                      },
                                      'end': {
                                          'line': 1,
                                          'column': 15
                                      }
                                  }
                              },
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
                          }
                      ],
                      'start': 2,
                      'end': 19,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 2
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
                          'type': 'Identifier',
                          'name': 'z',
                          'start': 24,
                          'end': 25,
                          'loc': {
                              'start': {
                                  'line': 2,
                                  'column': 4
                              },
                              'end': {
                                  'line': 2,
                                  'column': 5
                              }
                          }
                      },
                      'start': 24,
                      'end': 26,
                      'loc': {
                          'start': {
                              'line': 2,
                              'column': 4
                          },
                          'end': {
                              'line': 2,
                              'column': 6
                          }
                      }
                  }
              ],
              'start': 0,
              'end': 28,
              'loc': {
                  'start': {
                      'line': 1,
                      'column': 0
                  },
                  'end': {
                      'line': 2,
                      'column': 8
                  }
              }
          }
      ],
      'start': 0,
      'end': 28,
      'loc': {
          'start': {
              'line': 1,
              'column': 0
          },
          'end': {
              'line': 2,
              'column': 8
          }
      }
  }],
 [`for(
  ;;
) {
break;
}`, `for(
  ;;
) {
break;
}`, Context.OptionsRanges | Context.OptionsLoc, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ForStatement',
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
                              'line': 4,
                              'column': 0
                          },
                          'end': {
                              'line': 4,
                              'column': 6
                          }
                      }
                  }
              ],
              'start': 12,
              'end': 22,
              'loc': {
                  'start': {
                      'line': 3,
                      'column': 2
                  },
                  'end': {
                      'line': 5,
                      'column': 1
                  }
              }
          },
          'init': null,
          'test': null,
          'update': null,
          'start': 0,
          'end': 22,
          'loc': {
              'start': {
                  'line': 1,
                  'column': 0
              },
              'end': {
                  'line': 5,
                  'column': 1
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
          'line': 5,
          'column': 1
      }
  }
}],
 [`for(false
  ;false
  ;false
) {
break;
}`, `for(false
  ;false
  ;false
) {
break;
}`, Context.OptionsRanges | Context.OptionsLoc, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ForStatement',
          'body': {
              'type': 'BlockStatement',
              'body': [
                  {
                      'type': 'BreakStatement',
                      'label': null,
                      'start': 32,
                      'end': 38,
                      'loc': {
                          'start': {
                              'line': 5,
                              'column': 0
                          },
                          'end': {
                              'line': 5,
                              'column': 6
                          }
                      }
                  }
              ],
              'start': 30,
              'end': 40,
              'loc': {
                  'start': {
                      'line': 4,
                      'column': 2
                  },
                  'end': {
                      'line': 6,
                      'column': 1
                  }
              }
          },
          'init': {
              'type': 'Literal',
              'value': false,
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
          'test': {
              'type': 'Literal',
              'value': false,
              'start': 13,
              'end': 18,
              'loc': {
                  'start': {
                      'line': 2,
                      'column': 3
                  },
                  'end': {
                      'line': 2,
                      'column': 8
                  }
              }
          },
          'update': {
              'type': 'Literal',
              'value': false,
              'start': 22,
              'end': 27,
              'loc': {
                  'start': {
                      'line': 3,
                      'column': 3
                  },
                  'end': {
                      'line': 3,
                      'column': 8
                  }
              }
          },
          'start': 0,
          'end': 40,
          'loc': {
              'start': {
                  'line': 1,
                  'column': 0
              },
              'end': {
                  'line': 6,
                  'column': 1
              }
          }
      }
  ],
  'start': 0,
  'end': 40,
  'loc': {
      'start': {
          'line': 1,
          'column': 0
      },
      'end': {
          'line': 6,
          'column': 1
      }
  }
}],
 [`var x = 0;
 if (false)
 x = 1`, `var x = 0;
 if (false)
 x = 1`, Context.OptionsRanges | Context.OptionsLoc, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'VariableDeclaration',
          'kind': 'var',
          'declarations': [
              {
                  'type': 'VariableDeclarator',
                  'init': {
                      'type': 'Literal',
                      raw: null,
                      'value': 0,
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
      },
      {
          'type': 'IfStatement',
          'test': {
              'type': 'Literal',
              'value': false,
              'start': 16,
              'end': 21,
              'loc': {
                  'start': {
                      'line': 2,
                      'column': 5
                  },
                  'end': {
                      'line': 2,
                      'column': 10
                  }
              }
          },
          'consequent': {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'AssignmentExpression',
                  'left': {
                      'type': 'Identifier',
                      'name': 'x',
                      'start': 24,
                      'end': 25,
                      'loc': {
                          'start': {
                              'line': 3,
                              'column': 1
                          },
                          'end': {
                              'line': 3,
                              'column': 2
                          }
                      }
                  },
                  'operator': '=',
                  'right': {
                      'type': 'Literal',
                      raw: null,
                      'value': 1,
                      'start': 28,
                      'end': 29,
                      'loc': {
                          'start': {
                              'line': 3,
                              'column': 5
                          },
                          'end': {
                              'line': 3,
                              'column': 6
                          }
                      }
                  },
                  'start': 24,
                  'end': 29,
                  'loc': {
                      'start': {
                          'line': 3,
                          'column': 1
                      },
                      'end': {
                          'line': 3,
                          'column': 6
                      }
                  }
              },
              'start': 24,
              'end': 29,
              'loc': {
                  'start': {
                      'line': 3,
                      'column': 1
                  },
                  'end': {
                      'line': 3,
                      'column': 6
                  }
              }
          },
          'alternate': null,
          'start': 12,
          'end': 29,
          'loc': {
              'start': {
                  'line': 2,
                  'column': 1
              },
              'end': {
                  'line': 3,
                  'column': 6
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
          'line': 3,
          'column': 6
      }
  }
}],
 ['debugger\n;', 'debugger\n;', Context.Empty, {
    'body': [
      {
        'type': 'DebuggerStatement'
      }
    ],
    'sourceType': 'script',
    'type': 'Program'
  }],
 [`throw 0\n;`, `throw 0\n;`, Context.Empty, {
   'body': [
      {
        'argument': {
          'raw': null,
          'type': 'Literal',
          'value': 0,
        },
       'type': 'ThrowStatement',
      },
    ],
    'sourceType': 'script',
    'type': 'Program'
  }],
 [`x: while(true) { continue x\n; }`, `x: while(true) { continue x\n; }`, Context.Empty, {
    'body': [
      {
        'body': {
          'body': {
            'body': [
              {
                'label': {
                 'name': 'x',
                  'type': 'Identifier',
                },
                'type': 'ContinueStatement',
              },
            ],
            'type': 'BlockStatement',
          },
          'test': {
            'type': 'Literal',
            'value': true,
          },
          'type': 'WhileStatement',
        },
        'label': {
          'name': 'x',
          'type': 'Identifier',
        },
        'type': 'LabeledStatement',
      },
    ],
    'sourceType': 'script',
    'type': 'Program',
  }],
 [`{1
  2} 3`, `{1
    2} 3`, Context.Empty, {
        'body': [
          {
            'body': [
              {
                'expression': {
                  'raw': null,
                  'type': 'Literal',
                  'value': 1,
                },
                'type': 'ExpressionStatement',
              },
              {
                'expression': {
                  'raw': null,
                  'type': 'Literal',
                  'value': 2,
                },
                'type': 'ExpressionStatement',
              },
            ],
            'type': 'BlockStatement',
          },
          {
            'expression': {
              'raw': null,
              'type': 'Literal',
              'value': 3,
            },
            'type': 'ExpressionStatement',
          },
        ],
        'sourceType': 'script',
        'type': 'Program'
      }],
 [`while (true) { break // Comment
  there; }`, `while (true) { break // Comment
    there; }`, Context.OptionsRanges | Context.OptionsLoc, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'WhileStatement',
              'test': {
                  'type': 'Literal',
                  'value': true,
                  'start': 7,
                  'end': 11,
                  'loc': {
                      'start': {
                          'line': 1,
                          'column': 7
                      },
                      'end': {
                          'line': 1,
                          'column': 11
                      }
                  }
              },
              'body': {
                  'type': 'BlockStatement',
                  'body': [
                      {
                          'type': 'BreakStatement',
                          'label': null,
                          'start': 15,
                          'end': 20,
                          'loc': {
                              'start': {
                                  'line': 1,
                                  'column': 15
                              },
                              'end': {
                                  'line': 1,
                                  'column': 20
                              }
                          }
                      },
                      {
                          'type': 'ExpressionStatement',
                          'expression': {
                              'type': 'Identifier',
                              'name': 'there',
                              'start': 36,
                              'end': 41,
                              'loc': {
                                  'start': {
                                      'line': 2,
                                      'column': 4
                                  },
                                  'end': {
                                      'line': 2,
                                      'column': 9
                                  }
                              }
                          },
                          'start': 36,
                          'end': 42,
                          'loc': {
                              'start': {
                                  'line': 2,
                                  'column': 4
                              },
                              'end': {
                                  'line': 2,
                                  'column': 10
                              }
                          }
                      }
                  ],
                  'start': 13,
                  'end': 44,
                  'loc': {
                      'start': {
                          'line': 1,
                          'column': 13
                      },
                      'end': {
                          'line': 2,
                          'column': 12
                      }
                  }
              },
              'start': 0,
              'end': 44,
              'loc': {
                  'start': {
                      'line': 1,
                      'column': 0
                  },
                  'end': {
                      'line': 2,
                      'column': 12
                  }
              }
          }
      ],
      'start': 0,
      'end': 44,
      'loc': {
          'start': {
              'line': 1,
              'column': 0
          },
          'end': {
              'line': 2,
              'column': 12
          }
      }
  }],
];

pass('Miscellaneous - ASI (pass)', valids);

});

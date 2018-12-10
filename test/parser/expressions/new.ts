import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - New', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [

 ['typeof new x()', 'typeof new x()', Context.OptionsRanges, {
  'type': 'Program',
  'start': 0,
  'end': 14,
  'body': [
    {
      'type': 'ExpressionStatement',
      'start': 0,
      'end': 14,
      'expression': {
        'type': 'UnaryExpression',
        'start': 0,
        'end': 14,
        'operator': 'typeof',
        'prefix': true,
        'argument': {
          'type': 'NewExpression',
          'start': 7,
          'end': 14,
          'callee': {
            'type': 'Identifier',
            'start': 11,
            'end': 12,
            'name': 'x'
          },
          'arguments': []
        }
      }
    }
  ],
  'sourceType': 'script'
}],
 ['new x().y++', 'new x().y++', Context.OptionsRanges, {
  'type': 'Program',
  'start': 0,
  'end': 11,
  'body': [
    {
      'type': 'ExpressionStatement',
      'start': 0,
      'end': 11,
      'expression': {
        'type': 'UpdateExpression',
        'start': 0,
        'end': 11,
        'operator': '++',
        'prefix': false,
        'argument': {
          'type': 'MemberExpression',
          'start': 0,
          'end': 9,
          'object': {
            'type': 'NewExpression',
            'start': 0,
            'end': 7,
            'callee': {
              'type': 'Identifier',
              'start': 4,
              'end': 5,
              'name': 'x'
            },
            'arguments': []
          },
          'property': {
            'type': 'Identifier',
            'start': 8,
            'end': 9,
            'name': 'y'
          },
          'computed': false
        }
      }
    }
  ],
  'sourceType': 'script'
}],
 ['new x()[y] + z', 'new x()[y] + z', Context.OptionsRanges, {
  'type': 'Program',
  'start': 0,
  'end': 14,
  'body': [
    {
      'type': 'ExpressionStatement',
      'start': 0,
      'end': 14,
      'expression': {
        'type': 'BinaryExpression',
        'start': 0,
        'end': 14,
        'left': {
          'type': 'MemberExpression',
          'start': 0,
          'end': 9,
          'object': {
            'type': 'NewExpression',
            'start': 0,
            'end': 7,
            'callee': {
              'type': 'Identifier',
              'start': 4,
              'end': 5,
              'name': 'x'
            },
            'arguments': []
          },
          'property': {
            'type': 'Identifier',
            'start': 8,
            'end': 9,
            'name': 'y'
          },
          'computed': true
        },
        'operator': '+',
        'right': {
          'type': 'Identifier',
          'start': 13,
          'end': 14,
          'name': 'z'
        }
      }
    }
  ],
  'sourceType': 'script'
}],
 ['f(new /z/())', 'f(new /z/())', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'CallExpression',
              'callee': {
                  'type': 'Identifier',
                  'name': 'f',
                  'start': 0,
                  'end': 1
              },
              'arguments': [
                  {
                      'type': 'NewExpression',
                      'callee': {
                          'type': 'Literal',
                          'value': {},
                          'regex': {
                              'pattern': 'z',
                              'flags': ''
                          },
                          'start': 6,
                          'end': 9
                      },
                      'arguments': [],
                      'start': 2,
                      'end': 11
                  }
              ],
              'start': 0,
              'end': 12
          },
          'start': 0,
          'end': 12
      }
  ],
  'start': 0,
  'end': 12
}],
 ['f(new /z/.foo)', 'f(new /z/.foo)', Context.OptionsRanges, {
    'body': [
      {
        'end': 14,
        'expression': {
          'arguments': [
            {
              'arguments': [],
              'callee': {
                'computed': false,
                'end': 13,
                'object': {
                  'end': 9,
                  'regex': {
                    'flags': '',
                    'pattern': 'z',
                  },
                  'start': 6,
                 'type': 'Literal',
                  'value': /z/,
                },
                'property': {
                  'end': 13,
                  'name': 'foo',
                  'start': 10,
                  'type': 'Identifier',
                },
                'start': 6,
                'type': 'MemberExpression',
              },
              'end': 13,
              'start': 2,
              'type': 'NewExpression',
            },
          ],
          'callee': {
            'end': 1,
            'name': 'f',
            'start': 0,
            'type': 'Identifier',
          },
          'end': 14,
          'start': 0,
          'type': 'CallExpression',
        },
        'start': 0,
       'type': 'ExpressionStatement',
      },
    ],
    'end': 14,
    'sourceType': 'script',
    'start': 0,
    'type': 'Program',
  }],
 ['f(new /z/)', 'f(new /z/)', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'CallExpression',
              'callee': {
                  'type': 'Identifier',
                  'name': 'f',
                  'start': 0,
                  'end': 1
              },
              'arguments': [
                  {
                      'type': 'NewExpression',
                      'callee': {
                          'type': 'Literal',
                          'value': {},
                          'regex': {
                              'pattern': 'z',
                              'flags': ''
                          },
                          'start': 6,
                          'end': 9
                      },
                      'arguments': [],
                      'start': 2,
                      'end': 9
                  }
              ],
              'start': 0,
              'end': 10
          },
          'start': 0,
          'end': 10
      }
  ],
  'start': 0,
  'end': 10
}],
 ['new x\n/y', 'new x\n/y', Context.OptionsRanges, {
    'body': [
      {
        'end': 8,
        'expression': {
          'end': 8,
          'left': {
            'arguments': [],
            'callee': {
              'end': 5,
              'name': 'x',
              'start': 4,
              'type': 'Identifier',
            },
            'end': 5,
            'start': 0,
            'type': 'NewExpression',
          },
          'operator': '/',
          'right': {
            'end': 8,
            'name': 'y',
            'start': 7,
            'type': 'Identifier',
          },
          'start': 0,
         'type': 'BinaryExpression',
        },
        'start': 0,
        'type': 'ExpressionStatement',
      },
    ],
    'end': 8,
    'sourceType': 'script',
    'start': 0,
    'type': 'Program'
  }],
 ['new x\n/y/g', 'new x\n/y/g', Context.OptionsRanges, {
    'body': [
      {
        'end': 10,
        'expression': {
         'end': 10,
          'left': {
            'end': 8,
            'left': {
              'arguments': [],
              'callee': {
                'end': 5,
                'name': 'x',
                'start': 4,
                'type': 'Identifier',
              },
              'end': 5,
              'start': 0,
              'type': 'NewExpression',
            },
            'operator': '/',
           'right': {
              'end': 8,
              'name': 'y',
              'start': 7,
              'type': 'Identifier',
            },
            'start': 0,
            'type': 'BinaryExpression',
          },
          'operator': '/',
          'right': {
            'end': 10,
            'name': 'g',
            'start': 9,
           'type': 'Identifier',
          },
          'start': 0,
          'type': 'BinaryExpression',
        },
        'start': 0,
        'type': 'ExpressionStatement',
      },
    ],
    'end': 10,
    'sourceType': 'script',
    'start': 0,
    'type': 'Program',
  }],
 ['new x().y++', 'new x().y++', Context.OptionsRanges, {
  'type': 'Program',
  'start': 0,
  'end': 11,
  'body': [
    {
      'type': 'ExpressionStatement',
      'start': 0,
      'end': 11,
      'expression': {
        'type': 'UpdateExpression',
        'start': 0,
        'end': 11,
        'operator': '++',
        'prefix': false,
        'argument': {
          'type': 'MemberExpression',
          'start': 0,
          'end': 9,
          'object': {
            'type': 'NewExpression',
            'start': 0,
            'end': 7,
            'callee': {
              'type': 'Identifier',
              'start': 4,
              'end': 5,
              'name': 'x'
            },
            'arguments': []
          },
          'property': {
            'type': 'Identifier',
            'start': 8,
            'end': 9,
            'name': 'y'
          },
          'computed': false
        }
      }
    }
  ],
  'sourceType': 'script'
}],
 ['delete new x().y', 'delete new x().y', Context.OptionsRanges, {
  'type': 'Program',
  'start': 0,
  'end': 16,
  'body': [
    {
      'type': 'ExpressionStatement',
      'start': 0,
      'end': 16,
      'expression': {
        'type': 'UnaryExpression',
        'start': 0,
        'end': 16,
        'operator': 'delete',
        'prefix': true,
        'argument': {
          'type': 'MemberExpression',
          'start': 7,
          'end': 16,
          'object': {
            'type': 'NewExpression',
            'start': 7,
            'end': 14,
            'callee': {
              'type': 'Identifier',
              'start': 11,
              'end': 12,
              'name': 'x'
            },
            'arguments': []
          },
          'property': {
            'type': 'Identifier',
            'start': 15,
            'end': 16,
            'name': 'y'
          },
          'computed': false
        }
      }
    }
  ],
  'sourceType': 'script'
}],
 ['new x().y = z', 'new x().y = z', Context.OptionsRanges, {
  'type': 'Program',
  'start': 0,
  'end': 13,
  'body': [
    {
      'type': 'ExpressionStatement',
      'start': 0,
      'end': 13,
      'expression': {
        'type': 'AssignmentExpression',
        'start': 0,
        'end': 13,
        'operator': '=',
        'left': {
          'type': 'MemberExpression',
          'start': 0,
          'end': 9,
          'object': {
            'type': 'NewExpression',
            'start': 0,
            'end': 7,
            'callee': {
              'type': 'Identifier',
              'start': 4,
              'end': 5,
              'name': 'x'
            },
            'arguments': []
          },
          'property': {
            'type': 'Identifier',
            'start': 8,
            'end': 9,
            'name': 'y'
          },
          'computed': false
        },
        'right': {
          'type': 'Identifier',
          'start': 12,
          'end': 13,
          'name': 'z'
        }
      }
    }
  ],
  'sourceType': 'script'
}],
 ['new x().y + z', 'new x().y + z', Context.OptionsRanges, {
  'type': 'Program',
  'start': 0,
  'end': 13,
  'body': [
    {
      'type': 'ExpressionStatement',
      'start': 0,
      'end': 13,
      'expression': {
        'type': 'BinaryExpression',
        'start': 0,
        'end': 13,
        'left': {
          'type': 'MemberExpression',
          'start': 0,
          'end': 9,
          'object': {
            'type': 'NewExpression',
            'start': 0,
            'end': 7,
            'callee': {
              'type': 'Identifier',
              'start': 4,
              'end': 5,
              'name': 'x'
            },
            'arguments': []
          },
          'property': {
            'type': 'Identifier',
            'start': 8,
            'end': 9,
            'name': 'y'
          },
          'computed': false
        },
        'operator': '+',
        'right': {
          'type': 'Identifier',
          'start': 12,
          'end': 13,
          'name': 'z'
        }
      }
    }
  ],
  'sourceType': 'script'
}],
 ['new x().y', 'new x().y', Context.OptionsRanges, {
  'type': 'Program',
  'start': 0,
  'end': 9,
  'body': [
    {
      'type': 'ExpressionStatement',
      'start': 0,
      'end': 9,
      'expression': {
        'type': 'MemberExpression',
        'start': 0,
        'end': 9,
        'object': {
          'type': 'NewExpression',
          'start': 0,
          'end': 7,
          'callee': {
            'type': 'Identifier',
            'start': 4,
            'end': 5,
            'name': 'x'
          },
          'arguments': []
        },
        'property': {
          'type': 'Identifier',
          'start': 8,
          'end': 9,
          'name': 'y'
        },
        'computed': false
      }
    }
  ],
  'sourceType': 'script'
}],
 ['new x()[y]', 'new x()[y]', Context.OptionsRanges, {
  'type': 'Program',
  'start': 0,
  'end': 10,
  'body': [
    {
      'type': 'ExpressionStatement',
      'start': 0,
      'end': 10,
      'expression': {
        'type': 'MemberExpression',
        'start': 0,
        'end': 9,
        'object': {
          'type': 'NewExpression',
          'start': 0,
          'end': 7,
          'callee': {
            'type': 'Identifier',
            'start': 4,
            'end': 5,
            'name': 'x'
          },
          'arguments': []
        },
        'property': {
          'type': 'Identifier',
          'start': 8,
          'end': 9,
          'name': 'y'
        },
        'computed': true
      }
    }
  ],
  'sourceType': 'script'
}],
 ['new x()();', 'new x()();', Context.OptionsRanges, {
  'type': 'Program',
  'start': 0,
  'end': 10,
  'body': [
    {
      'type': 'ExpressionStatement',
      'start': 0,
      'end': 10,
      'expression': {
        'type': 'CallExpression',
        'start': 0,
        'end': 9,
        'callee': {
          'type': 'NewExpression',
          'start': 0,
          'end': 7,
          'callee': {
            'type': 'Identifier',
            'start': 4,
            'end': 5,
            'name': 'x'
          },
          'arguments': []
        },
        'arguments': []
      }
    }
  ],
  'sourceType': 'script'
}],
 ['new Foo.Bar(X)', 'new Foo.Bar(X)', Context.OptionsRanges, {
  'type': 'Program',
  'start': 0,
  'end': 14,
  'body': [
    {
      'type': 'ExpressionStatement',
      'start': 0,
      'end': 14,
      'expression': {
        'type': 'NewExpression',
        'start': 0,
        'end': 14,
        'callee': {
          'type': 'MemberExpression',
          'start': 4,
          'end': 11,
          'object': {
            'type': 'Identifier',
            'start': 4,
            'end': 7,
            'name': 'Foo'
          },
          'property': {
            'type': 'Identifier',
            'start': 8,
            'end': 11,
            'name': 'Bar'
          },
          'computed': false
        },
        'arguments': [
          {
            'type': 'Identifier',
            'start': 12,
            'end': 13,
            'name': 'X'
          }
        ]
      }
    }
  ],
  'sourceType': 'script'
}],
 ['new Button(a)', 'new Button(a)', Context.OptionsRanges | Context.OptionsLoc, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'NewExpression',
              'callee': {
                  'type': 'Identifier',
                  'name': 'Button',
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
              },
              'arguments': [
                  {
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
                  }
              ],
              'start': 0,
              'end': 13,
              'loc': {
                  'start': {
                      'line': 1,
                      'column': 0
                  },
                  'end': {
                      'line': 1,
                      'column': 13
                  }
              }
          },
          'start': 0,
          'end': 13,
          'loc': {
              'start': {
                  'line': 1,
                  'column': 0
              },
              'end': {
                  'line': 1,
                  'column': 13
              }
          }
      }
  ],
  'start': 0,
  'end': 13,
  'loc': {
      'start': {
          'line': 1,
          'column': 0
      },
      'end': {
          'line': 1,
          'column': 13
      }
  }
}],
  ['(new new Function("this.x = 1")).x;', '(new new Function("this.x = 1")).x;', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'MemberExpression',
                'object': {
                    'type': 'NewExpression',
                    'callee': {
                        'type': 'NewExpression',
                        'callee': {
                            'type': 'Identifier',
                            'name': 'Function',
                            'start': 9,
                            'end': 17,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 9
                                },
                                'end': {
                                    'line': 1,
                                    'column': 17
                                }
                            }
                        },
                        'arguments': [
                            {
                                'type': 'Literal',
                                raw: null,
                                'value': 'this.x = 1',
                                'start': 18,
                                'end': 30,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 18
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 30
                                    }
                                }
                            }
                        ],
                        'start': 5,
                        'end': 31,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 5
                            },
                            'end': {
                                'line': 1,
                                'column': 31
                            }
                        }
                    },
                    'arguments': [],
                    'start': 1,
                    'end': 31,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 1
                        },
                        'end': {
                            'line': 1,
                            'column': 31
                        }
                    }
                },
                'computed': false,
                'property': {
                    'type': 'Identifier',
                    'name': 'x',
                    'start': 33,
                    'end': 34,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 33
                        },
                        'end': {
                            'line': 1,
                            'column': 34
                        }
                    }
                },
                'start': 0,
                'end': 34,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 0
                    },
                    'end': {
                        'line': 1,
                        'column': 34
                    }
                }
            },
            'start': 0,
            'end': 35,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 35
                }
            }
        }
    ],
    'start': 0,
    'end': 35,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 35
        }
    }
}],
  ['new a(b,c)', 'new a(b,c)', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'NewExpression',
                'callee': {
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
                'arguments': [
                    {
                        'type': 'Identifier',
                        'name': 'b',
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
                    {
                        'type': 'Identifier',
                        'name': 'c',
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
  ['new function() {}(...[]);', 'new function() {}(...[]);', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'NewExpression',
                'callee': {
                    'type': 'FunctionExpression',
                    'params': [],
                    'body': {
                        'type': 'BlockStatement',
                        'body': [],
                        'start': 15,
                        'end': 17,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 15
                            },
                            'end': {
                                'line': 1,
                                'column': 17
                            }
                        }
                    },
                    'async': false,
                    'generator': false,
                    'expression': false,
                    'id': null,
                    'start': 4,
                    'end': 17,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 4
                        },
                        'end': {
                            'line': 1,
                            'column': 17
                        }
                    }
                },
                'arguments': [
                    {
                        'type': 'SpreadElement',
                        'argument': {
                            'type': 'ArrayExpression',
                            'elements': [],
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
                        'start': 18,
                        'end': 23,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 18
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
            },
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
  ['new function() {}(...target = [2, 3, 4]);', 'new function() {}(...target = [2, 3, 4]);', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'NewExpression',
                'callee': {
                    'type': 'FunctionExpression',
                    'params': [],
                    'body': {
                        'type': 'BlockStatement',
                        'body': [],
                        'start': 15,
                        'end': 17,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 15
                            },
                            'end': {
                                'line': 1,
                                'column': 17
                            }
                        }
                    },
                    'async': false,
                    'generator': false,
                    'expression': false,
                    'id': null,
                    'start': 4,
                    'end': 17,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 4
                        },
                        'end': {
                            'line': 1,
                            'column': 17
                        }
                    }
                },
                'arguments': [
                    {
                        'type': 'SpreadElement',
                        'argument': {
                            'type': 'AssignmentExpression',
                            'left': {
                                'type': 'Identifier',
                                'name': 'target',
                                'start': 21,
                                'end': 27,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 21
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 27
                                    }
                                }
                            },
                            'operator': '=',
                            'right': {
                                'type': 'ArrayExpression',
                                'elements': [
                                    {
                                        'type': 'Literal',
                                        raw: null,
                                        'value': 2,
                                        'start': 31,
                                        'end': 32,
                                        'loc': {
                                            'start': {
                                                'line': 1,
                                                'column': 31
                                            },
                                            'end': {
                                                'line': 1,
                                                'column': 32
                                            }
                                        }
                                    },
                                    {
                                        'type': 'Literal',
                                        raw: null,
                                        'value': 3,
                                        'start': 34,
                                        'end': 35,
                                        'loc': {
                                            'start': {
                                                'line': 1,
                                                'column': 34
                                            },
                                            'end': {
                                                'line': 1,
                                                'column': 35
                                            }
                                        }
                                    },
                                    {
                                        'type': 'Literal',
                                        raw: null,
                                        'value': 4,
                                        'start': 37,
                                        'end': 38,
                                        'loc': {
                                            'start': {
                                                'line': 1,
                                                'column': 37
                                            },
                                            'end': {
                                                'line': 1,
                                                'column': 38
                                            }
                                        }
                                    }
                                ],
                                'start': 30,
                                'end': 39,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 30
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 39
                                    }
                                }
                            },
                            'start': 21,
                            'end': 39,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 21
                                },
                                'end': {
                                    'line': 1,
                                    'column': 39
                                }
                            }
                        },
                        'start': 18,
                        'end': 39,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 18
                            },
                            'end': {
                                'line': 1,
                                'column': 39
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
                        'line': 1,
                        'column': 40
                    }
                }
            },
            'start': 0,
            'end': 41,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 41
                }
            }
        }
    ],
    'start': 0,
    'end': 41,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 41
        }
    }
}],
  ['new function() {}(1, 2, 3, ...[]);', 'new function() {}(1, 2, 3, ...[]);', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'NewExpression',
                'callee': {
                    'type': 'FunctionExpression',
                    'params': [],
                    'body': {
                        'type': 'BlockStatement',
                        'body': [],
                        'start': 15,
                        'end': 17,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 15
                            },
                            'end': {
                                'line': 1,
                                'column': 17
                            }
                        }
                    },
                    'async': false,
                    'generator': false,
                    'expression': false,
                    'id': null,
                    'start': 4,
                    'end': 17,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 4
                        },
                        'end': {
                            'line': 1,
                            'column': 17
                        }
                    }
                },
                'arguments': [
                    {
                        'type': 'Literal',
                        raw: null,
                        'value': 1,
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
                    {
                        'type': 'Literal',
                        raw: null,
                        'value': 2,
                        'start': 21,
                        'end': 22,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 21
                            },
                            'end': {
                                'line': 1,
                                'column': 22
                            }
                        }
                    },
                    {
                        'type': 'Literal',
                        raw: null,
                        'value': 3,
                        'start': 24,
                        'end': 25,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 24
                            },
                            'end': {
                                'line': 1,
                                'column': 25
                            }
                        }
                    },
                    {
                        'type': 'SpreadElement',
                        'argument': {
                            'type': 'ArrayExpression',
                            'elements': [],
                            'start': 30,
                            'end': 32,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 30
                                },
                                'end': {
                                    'line': 1,
                                    'column': 32
                                }
                            }
                        },
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
            },
            'start': 0,
            'end': 34,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 34
                }
            }
        }
    ],
    'start': 0,
    'end': 34,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 34
        }
    }
}],
  ['new f(...a)', 'new f(...a)', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'NewExpression',
                'callee': {
                    'type': 'Identifier',
                    'name': 'f',
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
                'arguments': [
                    {
                        'type': 'SpreadElement',
                        'argument': {
                            'type': 'Identifier',
                            'name': 'a',
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
            },
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
  ['new f(...a, ...b)', 'new f(...a, ...b)', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'NewExpression',
                'callee': {
                    'type': 'Identifier',
                    'name': 'f',
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
                'arguments': [
                    {
                        'type': 'SpreadElement',
                        'argument': {
                            'type': 'Identifier',
                            'name': 'a',
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
                    {
                        'type': 'SpreadElement',
                        'argument': {
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
                        },
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
  ['function f(a = new.target){}', 'function f(a = new.target){}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'FunctionDeclaration',
            'params': [
                {
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
                        'meta': {
                            'type': 'Identifier',
                            'name': 'new',
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
                        'type': 'MetaProperty',
                        'property': {
                            'type': 'Identifier',
                            'name': 'target',
                            'start': 19,
                            'end': 25,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 19
                                },
                                'end': {
                                    'line': 1,
                                    'column': 25
                                }
                            }
                        },
                        'start': 15,
                        'end': 25,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 15
                            },
                            'end': {
                                'line': 1,
                                'column': 25
                            }
                        }
                    },
                    'start': 11,
                    'end': 25,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 11
                        },
                        'end': {
                            'line': 1,
                            'column': 25
                        }
                    }
                }
            ],
            'body': {
                'type': 'BlockStatement',
                'body': [],
                'start': 26,
                'end': 28,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 26
                    },
                    'end': {
                        'line': 1,
                        'column': 28
                    }
                }
            },
            'async': false,
            'generator': false,
            'expression': false,
            'id': {
                'type': 'Identifier',
                'name': 'f',
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
            'start': 0,
            'end': 28,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 28
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
            'line': 1,
            'column': 28
        }
    }
}],
  ['function f() { new["target"]; }', 'function f() { new["target"]; }', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'FunctionDeclaration',
            'params': [],
            'body': {
                'type': 'BlockStatement',
                'body': [
                    {
                        'type': 'ExpressionStatement',
                        'expression': {
                            'type': 'NewExpression',
                            'callee': {
                                'type': 'ArrayExpression',
                                'elements': [
                                    {
                                        'type': 'Literal',
                                        raw: null,
                                        'value': 'target',
                                        'start': 19,
                                        'end': 27,
                                        'loc': {
                                            'start': {
                                                'line': 1,
                                                'column': 19
                                            },
                                            'end': {
                                                'line': 1,
                                                'column': 27
                                            }
                                        }
                                    }
                                ],
                                'start': 18,
                                'end': 28,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 18
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 28
                                    }
                                }
                            },
                            'arguments': [],
                            'start': 15,
                            'end': 28,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 15
                                },
                                'end': {
                                    'line': 1,
                                    'column': 28
                                }
                            }
                        },
                        'start': 15,
                        'end': 29,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 15
                            },
                            'end': {
                                'line': 1,
                                'column': 29
                            }
                        }
                    }
                ],
                'start': 13,
                'end': 31,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 13
                    },
                    'end': {
                        'line': 1,
                        'column': 31
                    }
                }
            },
            'async': false,
            'generator': false,
            'expression': false,
            'id': {
                'type': 'Identifier',
                'name': 'f',
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
            'start': 0,
            'end': 31,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 31
                }
            }
        }
    ],
    'start': 0,
    'end': 31,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 31
        }
    }
}],
  ['new a.b.c.d', 'new a.b.c.d', Context.Empty, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'NewExpression',
                'callee': {
                    'type': 'MemberExpression',
                    'object': {
                        'type': 'MemberExpression',
                        'object': {
                            'type': 'MemberExpression',
                            'object': {
                                'type': 'Identifier',
                                'name': 'a'
                            },
                            'computed': false,
                            'property': {
                                'type': 'Identifier',
                                'name': 'b'
                            }
                        },
                        'computed': false,
                        'property': {
                            'type': 'Identifier',
                            'name': 'c'
                        }
                    },
                    'computed': false,
                    'property': {
                        'type': 'Identifier',
                        'name': 'd'
                    }
                },
                'arguments': []
            }
        }
    ]
}],
  ['new Foo.Bar()', 'new Foo.Bar()', Context.Empty, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'NewExpression',
                'callee': {
                    'type': 'MemberExpression',
                    'object': {
                        'type': 'Identifier',
                        'name': 'Foo'
                    },
                    'computed': false,
                    'property': {
                        'type': 'Identifier',
                        'name': 'Bar'
                    }
                },
                'arguments': []
            }
        }
    ]
}],
  ['new Foo["bar"]()', 'new Foo["bar"]()', Context.Empty, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'NewExpression',
                'callee': {
                    'type': 'MemberExpression',
                    'object': {
                        'type': 'Identifier',
                        'name': 'Foo'
                    },
                    'computed': true,
                    'property': {
                        'type': 'Literal',
                        raw: null,
                        'value': 'bar'
                    }
                },
                'arguments': []
            }
        }
    ]
}],

  ['new async function(){}', 'new async function(){}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'NewExpression',
                'callee': {
                    'type': 'FunctionExpression',
                    'params': [],
                    'body': {
                        'type': 'BlockStatement',
                        'body': [],
                        'start': 20,
                        'end': 22,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 20
                            },
                            'end': {
                                'line': 1,
                                'column': 22
                            }
                        }
                    },
                    'async': true,
                    'generator': false,
                    'expression': false,
                    'id': null,
                    'start': 4,
                    'end': 22,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 4
                        },
                        'end': {
                            'line': 1,
                            'column': 22
                        }
                    }
                },
                'arguments': [],
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
  ['new async()', 'new async()', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'NewExpression',
                'callee': {
                    'type': 'Identifier',
                    'name': 'async',
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
                'arguments': [],
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
            },
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
  ['new class{}', 'new class{}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'NewExpression',
                'callee': {
                    'type': 'ClassExpression',
                    'id': null,
                    'superClass': null,
                    'body': {
                        'type': 'ClassBody',
                        'body': [],
                        'start': 9,
                        'end': 11,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 9
                            },
                            'end': {
                                'line': 1,
                                'column': 11
                            }
                        }
                    },
                    'start': 4,
                    'end': 11,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 4
                        },
                        'end': {
                            'line': 1,
                            'column': 11
                        }
                    }
                },
                'arguments': [],
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
            },
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
  ['new class extends x{}', 'new class extends x{}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'NewExpression',
                'callee': {
                    'type': 'ClassExpression',
                    'id': null,
                    'superClass': {
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
                    'body': {
                        'type': 'ClassBody',
                        'body': [],
                        'start': 19,
                        'end': 21,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 19
                            },
                            'end': {
                                'line': 1,
                                'column': 21
                            }
                        }
                    },
                    'start': 4,
                    'end': 21,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 4
                        },
                        'end': {
                            'line': 1,
                            'column': 21
                        }
                    }
                },
                'arguments': [],
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
  ['class x extends (x) {}', 'class x extends (x) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ClassDeclaration',
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
            'superClass': {
                'type': 'Identifier',
                'name': 'x',
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
            'body': {
                'type': 'ClassBody',
                'body': [],
                'start': 20,
                'end': 22,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 20
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
}],
  ['new eval()', 'new eval()', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'NewExpression',
                'callee': {
                    'type': 'Identifier',
                    'name': 'eval',
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
                'arguments': [],
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
  ['new false.__proto__.constructor', 'new false.__proto__.constructor', Context.Empty, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'NewExpression',
                'callee': {
                    'type': 'MemberExpression',
                    'object': {
                        'type': 'MemberExpression',
                        'object': {
                            'type': 'Literal',
                            'value': false
                        },
                        'computed': false,
                        'property': {
                            'type': 'Identifier',
                            'name': '__proto__'
                        }
                    },
                    'computed': false,
                    'property': {
                        'type': 'Identifier',
                        'name': 'constructor'
                    }
                },
                'arguments': []
            }
        }
    ]
}],
  ['new function(){}', 'new function(){}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'NewExpression',
                'callee': {
                    'type': 'FunctionExpression',
                    'params': [],
                    'body': {
                        'type': 'BlockStatement',
                        'body': [],
                        'start': 14,
                        'end': 16,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 14
                            },
                            'end': {
                                'line': 1,
                                'column': 16
                            }
                        }
                    },
                    'async': false,
                    'generator': false,
                    'expression': false,
                    'id': null,
                    'start': 4,
                    'end': 16,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 4
                        },
                        'end': {
                            'line': 1,
                            'column': 16
                        }
                    }
                },
                'arguments': [],
                'start': 0,
                'end': 16,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 0
                    },
                    'end': {
                        'line': 1,
                        'column': 16
                    }
                }
            },
            'start': 0,
            'end': 16,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 16
                }
            }
        }
    ],
    'start': 0,
    'end': 16,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 16
        }
    }
}],
  ['new function(){}(x)', 'new function(){}(x)', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'NewExpression',
                'callee': {
                    'type': 'FunctionExpression',
                    'params': [],
                    'body': {
                        'type': 'BlockStatement',
                        'body': [],
                        'start': 14,
                        'end': 16,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 14
                            },
                            'end': {
                                'line': 1,
                                'column': 16
                            }
                        }
                    },
                    'async': false,
                    'generator': false,
                    'expression': false,
                    'id': null,
                    'start': 4,
                    'end': 16,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 4
                        },
                        'end': {
                            'line': 1,
                            'column': 16
                        }
                    }
                },
                'arguments': [
                    {
                        'type': 'Identifier',
                        'name': 'x',
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
            },
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
  ['new let', 'new let', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'NewExpression',
                'callee': {
                    'type': 'Identifier',
                    'name': 'let',
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
                'arguments': [],
                'start': 0,
                'end': 7,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 0
                    },
                    'end': {
                        'line': 1,
                        'column': 7
                    }
                }
            },
            'start': 0,
            'end': 7,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 7
                }
            }
        }
    ],
    'start': 0,
    'end': 7,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 7
        }
    }
}],
  ['new new A', 'new new A', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'NewExpression',
                'callee': {
                    'type': 'NewExpression',
                    'callee': {
                        'type': 'Identifier',
                        'name': 'A',
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
                    'arguments': [],
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
                'arguments': [],
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
            },
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
  ['new null', 'new null', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'NewExpression',
                'callee': {
                    'type': 'Literal',
                    'value': null,
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
                'arguments': [],
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
            },
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
  ['new true', 'new true', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'NewExpression',
                'callee': {
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
                'arguments': [],
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
            },
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
  //['function f(){ new new .target; }', 'function f(){ new new .target; }', Context.OptionsRanges | Context.OptionsLoc, {}],
  ['function f(){ new new .target; }', 'function f(){ new new .target; }', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'FunctionDeclaration',
            'params': [],
            'body': {
                'type': 'BlockStatement',
                'body': [
                    {
                        'type': 'ExpressionStatement',
                        'expression': {
                            'type': 'NewExpression',
                            'callee': {
                                'meta': {
                                    'type': 'Identifier',
                                    'name': 'new',
                                    'start': 18,
                                    'end': 21,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 18
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 21
                                        }
                                    }
                                },
                                'type': 'MetaProperty',
                                'property': {
                                    'type': 'Identifier',
                                    'name': 'target',
                                    'start': 23,
                                    'end': 29,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 23
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 29
                                        }
                                    }
                                },
                                'start': 18,
                                'end': 29,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 18
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 29
                                    }
                                }
                            },
                            'arguments': [],
                            'start': 14,
                            'end': 29,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 14
                                },
                                'end': {
                                    'line': 1,
                                    'column': 29
                                }
                            }
                        },
                        'start': 14,
                        'end': 30,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 14
                            },
                            'end': {
                                'line': 1,
                                'column': 30
                            }
                        }
                    }
                ],
                'start': 12,
                'end': 32,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 12
                    },
                    'end': {
                        'line': 1,
                        'column': 32
                    }
                }
            },
            'async': false,
            'generator': false,
            'expression': false,
            'id': {
                'type': 'Identifier',
                'name': 'f',
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
            'start': 0,
            'end': 32,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 32
                }
            }
        }
    ],
    'start': 0,
    'end': 32,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 32
        }
    }
}],
    ['new async', 'new async', Context.OptionsRanges  | Context.OptionsLoc, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'NewExpression',
                  'callee': {
                      'type': 'Identifier',
                      'name': 'async',
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
                  'arguments': [],
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
              },
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
  }]
];

pass('Expressions - New (pass)', valids);

});

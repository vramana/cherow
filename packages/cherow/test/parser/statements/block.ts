import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Statements - Block', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [
  ['{ a(); bt(); }', '{ a(); bt(); }', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'BlockStatement',
            'body': [
                {
                    'type': 'ExpressionStatement',
                    'expression': {
                        'type': 'CallExpression',
                        'callee': {
                            'type': 'Identifier',
                            'name': 'a',
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
                        'arguments': [],
                        'start': 2,
                        'end': 5,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 2
                            },
                            'end': {
                                'line': 1,
                                'column': 5
                            }
                        }
                    },
                    'start': 2,
                    'end': 6,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 2
                        },
                        'end': {
                            'line': 1,
                            'column': 6
                        }
                    }
                },
                {
                    'type': 'ExpressionStatement',
                    'expression': {
                        'type': 'CallExpression',
                        'callee': {
                            'type': 'Identifier',
                            'name': 'bt',
                            'start': 7,
                            'end': 9,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 7
                                },
                                'end': {
                                    'line': 1,
                                    'column': 9
                                }
                            }
                        },
                        'arguments': [],
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
                    'line': 1,
                    'column': 14
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
            'line': 1,
            'column': 14
        }
    }
}],
  ['{ var {foo=3} = {}; };', '{ var {foo=3} = {}; };', Context.OptionsRanges | Context.OptionsLoc, {
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
                                'type': 'ObjectExpression',
                                'properties': [],
                                'start': 16,
                                'end': 18,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 16
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 18
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
                                                'type': 'Literal',
                                                raw: null,
                                                'value': 3,
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
                                    }
                                ],
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
        },
        {
            'type': 'EmptyStatement',
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
['{ var foo = 0; }', '{ var foo = 0; }', Context.OptionsRanges | Context.OptionsLoc, {
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
                              'value': 0,
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
                          'id': {
                              'type': 'Identifier',
                              'name': 'foo',
                              'start': 6,
                              'end': 9,
                              'loc': {
                                  'start': {
                                      'line': 1,
                                      'column': 6
                                  },
                                  'end': {
                                      'line': 1,
                                      'column': 9
                                  }
                              }
                          },
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
                      }
                  ],
                  'start': 2,
                  'end': 14,
                  'loc': {
                      'start': {
                          'line': 1,
                          'column': 2
                      },
                      'end': {
                          'line': 1,
                          'column': 14
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
['{ function foo() {}; };', '{ function foo() {}; };', Context.OptionsRanges | Context.OptionsLoc, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'BlockStatement',
          'body': [
              {
                  'type': 'FunctionDeclaration',
                  'params': [],
                  'body': {
                      'type': 'BlockStatement',
                      'body': [],
                      'start': 17,
                      'end': 19,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 17
                          },
                          'end': {
                              'line': 1,
                              'column': 19
                          }
                      }
                  },
                  'async': false,
                  'generator': false,
                  'expression': false,
                  'id': {
                      'type': 'Identifier',
                      'name': 'foo',
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
                  'type': 'EmptyStatement',
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
      },
      {
          'type': 'EmptyStatement',
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
      }
  ],
  'start': 0,
  'end': 23,
  'loc': {
      'start': {
          'line': 1,
          'column': 0
      },
      'end': {
          'line': 1,
          'column': 23
      }
  }
}],
  ['{}\n/foo/', '{}\n/foo/', Context.Empty, {
      'body': [
        {
          'body': [],
          'type': 'BlockStatement',
        },
        {
          'expression': {
            'regex': {
              'flags': '',
              'pattern': 'foo',
            },
            'type': 'Literal',
            'value': /foo/,
          },
          'type': 'ExpressionStatement',
        },
      ],
      'sourceType': 'script',
      'type': 'Program'
    }],
  ['{}\n/foo/g', '{}\n/foo/g', Context.Empty, {
      'body': [
        {
          'body': [],
          'type': 'BlockStatement',
        },
        {
          'expression': {
            'regex': {
              'flags': 'g',
              'pattern': 'foo',
            },
            'type': 'Literal',
           'value': /foo/g,
          },
          'type': 'ExpressionStatement',
        },
      ],
      'sourceType': 'script',
      'type': 'Program'
    }],
  ['var a; { function a() {} }', 'var a; { function a() {} }', Context.OptionsRanges | Context.OptionsLoc, {
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
        },
        {
            'type': 'BlockStatement',
            'body': [
                {
                    'type': 'FunctionDeclaration',
                    'params': [],
                    'body': {
                        'type': 'BlockStatement',
                        'body': [],
                        'start': 22,
                        'end': 24,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 22
                            },
                            'end': {
                                'line': 1,
                                'column': 24
                            }
                        }
                    },
                    'async': false,
                    'generator': false,
                    'expression': false,
                    'id': {
                        'type': 'Identifier',
                        'name': 'a',
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
                    'start': 9,
                    'end': 24,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 9
                        },
                        'end': {
                            'line': 1,
                            'column': 24
                        }
                    }
                }
            ],
            'start': 7,
            'end': 26,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 7
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
  ['var a; { void 0; function foo() {} }', 'var a; { void 0; function foo() {} }', Context.OptionsRanges | Context.OptionsLoc, {
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
        },
        {
            'type': 'BlockStatement',
            'body': [
                {
                    'type': 'ExpressionStatement',
                    'expression': {
                        'type': 'UnaryExpression',
                        'operator': 'void',
                        'argument': {
                            'type': 'Literal',
                            raw: null,
                            'value': 0,
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
                        'prefix': true,
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
                    'start': 9,
                    'end': 16,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 9
                        },
                        'end': {
                            'line': 1,
                            'column': 16
                        }
                    }
                },
                {
                    'type': 'FunctionDeclaration',
                    'params': [],
                    'body': {
                        'type': 'BlockStatement',
                        'body': [],
                        'start': 32,
                        'end': 34,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 32
                            },
                            'end': {
                                'line': 1,
                                'column': 34
                            }
                        }
                    },
                    'async': false,
                    'generator': false,
                    'expression': false,
                    'id': {
                        'type': 'Identifier',
                        'name': 'foo',
                        'start': 26,
                        'end': 29,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 26
                            },
                            'end': {
                                'line': 1,
                                'column': 29
                            }
                        }
                    },
                    'start': 17,
                    'end': 34,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 17
                        },
                        'end': {
                            'line': 1,
                            'column': 34
                        }
                    }
                }
            ],
            'start': 7,
            'end': 36,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 7
                },
                'end': {
                    'line': 1,
                    'column': 36
                }
            }
        }
    ],
    'start': 0,
    'end': 36,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 36
        }
    }
}],
  ['function a() {} { function a() {} }', 'function a() {} { function a() {} }', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'FunctionDeclaration',
            'params': [],
            'body': {
                'type': 'BlockStatement',
                'body': [],
                'start': 13,
                'end': 15,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 13
                    },
                    'end': {
                        'line': 1,
                        'column': 15
                    }
                }
            },
            'async': false,
            'generator': false,
            'expression': false,
            'id': {
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
            'start': 0,
            'end': 15,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 15
                }
            }
        },
        {
            'type': 'BlockStatement',
            'body': [
                {
                    'type': 'FunctionDeclaration',
                    'params': [],
                    'body': {
                        'type': 'BlockStatement',
                        'body': [],
                        'start': 31,
                        'end': 33,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 31
                            },
                            'end': {
                                'line': 1,
                                'column': 33
                            }
                        }
                    },
                    'async': false,
                    'generator': false,
                    'expression': false,
                    'id': {
                        'type': 'Identifier',
                        'name': 'a',
                        'start': 27,
                        'end': 28,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 27
                            },
                            'end': {
                                'line': 1,
                                'column': 28
                            }
                        }
                    },
                    'start': 18,
                    'end': 33,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 18
                        },
                        'end': {
                            'line': 1,
                            'column': 33
                        }
                    }
                }
            ],
            'start': 16,
            'end': 35,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 16
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
  ['{debugger;}', '{debugger;}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'BlockStatement',
            'body': [
                {
                    'type': 'DebuggerStatement',
                    'start': 1,
                    'end': 10,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 1
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
}]
];

const invalids: Array < [string, string, Context, any] > = [
  ['do{};while()', 'do{};while()', Context.Empty, {}],
  ['if{};else{}', 'if{};else{}', Context.Empty, {}],
  ['try{};catch{};finally{}', 'try{};catch{};finally{}', Context.Empty, {}],
  ['try{};catch(){}', 'try{};catch(){}', Context.Empty, {}],
  ['y={function __func(){};}();', 'y={function __func(){};}();', Context.Empty, {}],
  ['y={x;};', 'y={x;};', Context.Empty, {}],
];

pass('Statements - Block (pass)', valids);
fail('Statements - Block (failure)', invalids);

});

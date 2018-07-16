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
];

pass('Statements - Block (pass)', valids);
fail('Statements - Block (failure)', invalids);

});

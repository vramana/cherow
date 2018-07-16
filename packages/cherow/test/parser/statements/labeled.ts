import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Statements - Labeled', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [
  ['foo:/bar/', 'foo:/bar/', Context.Empty, {
      'body': [
       {
          'body': {
            'expression': {
              'regex': {
                'flags': '',
                'pattern': 'bar',
              },
              'type': 'Literal',
              'value': /bar/,
            },
           'type': 'ExpressionStatement',
          },
          'label': {
            'name': 'foo',
            'type': 'Identifier',
          },
          'type': 'LabeledStatement',
        },
      ],
      'sourceType': 'script',
      'type': 'Program',
    }],
  ['L: let\nx', 'L: let\nx', Context.OptionsRanges | Context.OptionsLoc, {
      'body': [
        {
          'body': {
            'end': 6,
            'expression': {
              'end': 6,
              'loc': {
                'end': {
                  'column': 6,
                  'line': 1,
                },
                'start': {
                  'column': 3,
                  'line': 1,
                },
              },
              'name': 'let',
              'start': 3,
              'type': 'Identifier',
            },
            'loc': {
              'end': {
                'column': 6,
                'line': 1,
              },
              'start': {
                'column': 3,
                'line': 1,
              }
            },
            'start': 3,
            'type': 'ExpressionStatement',
          },
          'end': 6,
          'label': {
            'end': 1,
            'loc': {
              'end': {
                'column': 1,
                'line': 1,
              },
              'start': {
                'column': 0,
                'line': 1,
             }
            },
            'name': 'L',
            'start': 0,
            'type': 'Identifier',
          },
          'loc': {
            'end': {
              'column': 6,
              'line': 1,
            },
            'start': {
              'column': 0,
              'line': 1,
            },
          },
          'start': 0,
          'type': 'LabeledStatement',
        },
        {
         'end': 8,
          'expression': {
            'end': 8,
            'loc': {
             'end': {
                'column': 1,
                'line': 2,
              },
              'start': {
                'column': 0,
                'line': 2,
             }
            },
            'name': 'x',
            'start': 7,
            'type': 'Identifier',
          },
          'loc': {
            'end': {
              'column': 1,
              'line': 2,
            },
            'start': {
              'column': 0,
             'line': 2,
            },
          },
          'start': 7,
          'type': 'ExpressionStatement',
        },
      ],
      'end': 8,
      'loc': {
        'end': {
          'column': 1,
          'line': 2,
        },
        'start': {
          'column': 0,
          'line': 1,
        }
      },
      'sourceType': 'script',
      'start': 0,
      'type': 'Program'
    }],

  ['start: while (true) break start', 'start: while (true) break start', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'LabeledStatement',
            'label': {
                'type': 'Identifier',
                'name': 'start',
                'start': 0,
                'end': 5,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 0
                    },
                    'end': {
                        'line': 1,
                        'column': 5
                    }
                }
            },
            'body': {
                'type': 'WhileStatement',
                'test': {
                    'type': 'Literal',
                    'value': true,
                    'start': 14,
                    'end': 18,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 14
                        },
                        'end': {
                            'line': 1,
                            'column': 18
                        }
                    }
                },
                'body': {
                    'type': 'BreakStatement',
                    'label': {
                        'type': 'Identifier',
                        'name': 'start',
                        'start': 26,
                        'end': 31,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 26
                            },
                            'end': {
                                'line': 1,
                                'column': 31
                            }
                        }
                    },
                    'start': 20,
                    'end': 31,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 20
                        },
                        'end': {
                            'line': 1,
                            'column': 31
                        }
                    }
                },
                'start': 7,
                'end': 31,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 7
                    },
                    'end': {
                        'line': 1,
                        'column': 31
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
  ['async: await', 'async: await', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'LabeledStatement',
            'label': {
                'type': 'Identifier',
                'name': 'async',
                'start': 0,
                'end': 5,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 0
                    },
                    'end': {
                        'line': 1,
                        'column': 5
                    }
                }
            },
            'body': {
                'type': 'ExpressionStatement',
                'expression': {
                    'type': 'Identifier',
                    'name': 'await',
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
            'start': 0,
            'end': 12,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 12
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
            'line': 1,
            'column': 12
        }
    }
}],
  ['__proto__: test', '__proto__: test', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'LabeledStatement',
            'label': {
                'type': 'Identifier',
                'name': '__proto__',
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
            'body': {
                'type': 'ExpressionStatement',
                'expression': {
                    'type': 'Identifier',
                    'name': 'test',
                    'start': 11,
                    'end': 15,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 11
                        },
                        'end': {
                            'line': 1,
                            'column': 15
                        }
                    }
                },
                'start': 11,
                'end': 15,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 11
                    },
                    'end': {
                        'line': 1,
                        'column': 15
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
        }
    ],
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
}],
  ['__proto__: while (true) { break __proto__; }', '__proto__: while (true) { break __proto__; }', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'LabeledStatement',
            'label': {
                'type': 'Identifier',
                'name': '__proto__',
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
            'body': {
                'type': 'WhileStatement',
                'test': {
                    'type': 'Literal',
                    'value': true,
                    'start': 18,
                    'end': 22,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 18
                        },
                        'end': {
                            'line': 1,
                            'column': 22
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
                                'name': '__proto__',
                                'start': 32,
                                'end': 41,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 32
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 41
                                    }
                                }
                            },
                            'start': 26,
                            'end': 42,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 26
                                },
                                'end': {
                                    'line': 1,
                                    'column': 42
                                }
                            }
                        }
                    ],
                    'start': 24,
                    'end': 44,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 24
                        },
                        'end': {
                            'line': 1,
                            'column': 44
                        }
                    }
                },
                'start': 11,
                'end': 44,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 11
                    },
                    'end': {
                        'line': 1,
                        'column': 44
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
                    'line': 1,
                    'column': 44
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
            'line': 1,
            'column': 44
        }
    }
}],
  ['a: function foo() {}', 'a: function foo() {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'LabeledStatement',
            'label': {
                'type': 'Identifier',
                'name': 'a',
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
            'body': {
                'type': 'FunctionDeclaration',
                'params': [],
                'body': {
                    'type': 'BlockStatement',
                    'body': [],
                    'start': 18,
                    'end': 20,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 18
                        },
                        'end': {
                            'line': 1,
                            'column': 20
                        }
                    }
                },
                'async': false,
                'generator': false,
                'expression': false,
                'id': {
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
                'start': 3,
                'end': 20,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 3
                    },
                    'end': {
                        'line': 1,
                        'column': 20
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
  ['a:{break a;}', 'a:{break a;}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'LabeledStatement',
            'label': {
                'type': 'Identifier',
                'name': 'a',
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
            'body': {
                'type': 'BlockStatement',
                'body': [
                    {
                        'type': 'BreakStatement',
                        'label': {
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
                        'start': 3,
                        'end': 11,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 3
                            },
                            'end': {
                                'line': 1,
                                'column': 11
                            }
                        }
                    }
                ],
                'start': 2,
                'end': 12,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 2
                    },
                    'end': {
                        'line': 1,
                        'column': 12
                    }
                }
            },
            'start': 0,
            'end': 12,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 12
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
            'line': 1,
            'column': 12
        }
    }
}],

];

const invalids: Array < [string, string, Context, any] > = [
  ['label: class C {};', 'label: class C {};', Context.OptionsRanges | Context.OptionsLoc, {}],
  ['label: let x;', 'label: let x;', Context.OptionsRanges | Context.OptionsLoc, {}],
  ['a: async function* a(){}', 'a: async function* a(){}', Context.OptionsRanges | Context.OptionsLoc, {}],
  //['label: function* g() {}', 'label: function* g() {}', Context.OptionsRanges | Context.OptionsLoc, {}],
  ['label: const x = null;', 'label: const x = null;', Context.OptionsRanges | Context.OptionsLoc, {}],
  ['label: function g() {}', 'label: function g() {}', Context.Strict, {}],
  ['label: let x;', 'label: let x;', Context.OptionsRanges | Context.OptionsLoc, {}],
  ['yi\\u0065ld: 1;', 'yi\\u0065ld: 1;', Context.Strict, {}],
  ['await: 1;', 'await: 1;', Context.Strict | Context.Module, {}],
  ['yield: 1;', 'yield: 1;', Context.Strict, {}],
  ['label: class C {};', 'label: class C {};', Context.OptionsRanges | Context.OptionsLoc, {}],
  ['label: class C {};', 'label: class C {};', Context.OptionsRanges | Context.OptionsLoc, {}],
  ['label: class C {};', 'label: class C {};', Context.OptionsRanges | Context.OptionsLoc, {}],
  ['label: class C {};', 'label: class C {};', Context.OptionsRanges | Context.OptionsLoc, {}],
  ['label: class C {};', 'label: class C {};', Context.OptionsRanges | Context.OptionsLoc, {}],
  ['do { test262: { continue test262; } } while (false)', 'do { test262: { continue test262; } } while (false)', Context.OptionsRanges | Context.OptionsLoc, {}],
];

fail('Statements - Labeled (pass)', invalids);
pass('Statements - Labeled (pass)', valids);

});

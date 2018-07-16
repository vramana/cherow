import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Miscellaneous - Directives', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [
  // ['("use strict")', '("use strict")', Context.OptionsRanges | Context.OptionsLoc, {}],
  ['\'use\\x20strict\'', '\'use\\x20strict\'', Context.OptionsRanges | Context.OptionsLoc, {
      'body': [
        {
          'directive': 'use\\x20strict',
          'end': 15,
          'expression': {
            'end': 15,
            'loc': {
              'end': {
                'column': 15,
                'line': 1,
              },
              'start': {
                'column': 0,
                'line': 1,
              },
           },
            'raw': null,
            'start': 0,
            'type': 'Literal',
            'value': 'use strict',
          },
          'loc': {
           'end': {
              'column': 15,
              'line': 1,
           },
            'start': {
              'column': 0,
              'line': 1,
            },
          },
          'start': 0,
          'type': 'ExpressionStatement',
        }
      ],
      'end': 15,
      'loc': {
        'end': {
          'column': 15,
          'line': 1,
        },
        'start': {
          'column': 0,
          'line': 1,
        }
      },
      'sourceType': 'script',
      'start': 0,
      'type': 'Program',
    }],
   ['\'use asm\'', '\'use asm\'', Context.OptionsRanges | Context.OptionsLoc, {
      'body': [
        {
          'directive': 'use asm',
          'end': 9,
          'expression': {
            'end': 9,
            'loc': {
              'end': {
                'column': 9,
                'line': 1,
             },
              'start': {
                'column': 0,
                'line': 1,
              },
            },
            'raw': null,
            'start': 0,
            'type': 'Literal',
            'value': 'use asm',
          },
          'loc': {
            'end': {
              'column': 9,
              'line': 1,
            },
            'start': {
              'column': 0,
              'line': 1,
            },
          },
          'start': 0,
          'type': 'ExpressionStatement'
        }
      ],
      'end': 9,
      'loc': {
        'end': {
          'column': 9,
          'line': 1,
        },
        'start': {
          'column': 0,
          'line': 1,
        },
      },
      'sourceType': 'script',
      'start': 0,
      'type': 'Program',
    }],
   ['("use strict"); foo', '("use strict"); foo', Context.Empty, {
      'body': [
        {
          'expression': {
            'raw': null,
            'type': 'Literal',
            'value': 'use strict',
          },
          'type': 'ExpressionStatement',
       },
        {
          'expression': {
            'name': 'foo',
            'type': 'Identifier',
          },
          'type': 'ExpressionStatement',
       },
      ],
     'sourceType': 'script',
      'type': 'Program'
    }],
   ['function a(a = function() { "use strict"; foo }) { "use strict" }', 'function a(a = function() { "use strict"; foo }) { "use strict" }', Context.Empty, {
      'body': [
        {
          'async': false,
          'body': {
            'body': [
              {
                'directive': 'use strict',
                'expression': {
                  'raw': null,
                  'type': 'Literal',
                  'value': 'use strict',
                },
                'type': 'ExpressionStatement',
              }
            ],
            'type': 'BlockStatement',
          },
          'expression': false,
          'generator': false,
          'id': {
            'name': 'a',
            'type': 'Identifier',
          },
          'params': [
            {
              'left': {
                'name': 'a',
                'type': 'Identifier',
              },
              'right': {
                'async': false,
                'body': {
                  'body': [
                    {
                      'directive': 'use strict',
                      'expression': {
                        'raw': null,
                        'type': 'Literal',
                        'value': 'use strict',
                      },
                      'type': 'ExpressionStatement',
                    },
                    {
                      'expression': {
                        'name': 'foo',
                        'type': 'Identifier',
                      },
                      'type': 'ExpressionStatement',
                    }
                  ],
                  'type': 'BlockStatement',
                },
                'expression': false,
                'generator': false,
               'id': null,
                'params': [],
                'type': 'FunctionExpression'
              },
              'type': 'AssignmentPattern'
            }
          ],
          'type': 'FunctionDeclaration'
        }
      ],
      'sourceType': 'script',
      'type': 'Program'
    }],
   ['try { "use strict"; var public = 1; } catch (e) {}', 'try { "use strict"; var public = 1; } catch (e) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'TryStatement',
            'block': {
                'type': 'BlockStatement',
                'body': [
                    {
                        'type': 'ExpressionStatement',
                        'expression': {
                            'type': 'Literal',
                            raw: null,
                            'value': 'use strict',
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
                    },
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
                                'id': {
                                    'type': 'Identifier',
                                    'name': 'public',
                                    'start': 24,
                                    'end': 30,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 24
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 30
                                        }
                                    }
                                },
                                'start': 24,
                                'end': 34,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 24
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 34
                                    }
                                }
                            }
                        ],
                        'start': 20,
                        'end': 35,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 20
                            },
                            'end': {
                                'line': 1,
                                'column': 35
                            }
                        }
                    }
                ],
                'start': 4,
                'end': 37,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 4
                    },
                    'end': {
                        'line': 1,
                        'column': 37
                    }
                }
            },
            'handler': {
                'type': 'CatchClause',
                'param': {
                    'type': 'Identifier',
                    'name': 'e',
                    'start': 45,
                    'end': 46,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 45
                        },
                        'end': {
                            'line': 1,
                            'column': 46
                        }
                    }
                },
                'body': {
                    'type': 'BlockStatement',
                    'body': [],
                    'start': 48,
                    'end': 50,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 48
                        },
                        'end': {
                            'line': 1,
                            'column': 50
                        }
                    }
                },
                'start': 38,
                'end': 50,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 38
                    },
                    'end': {
                        'line': 1,
                        'column': 50
                    }
                }
            },
            'finalizer': null,
            'start': 0,
            'end': 50,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 50
                }
            }
        }
    ],
    'start': 0,
    'end': 50,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 50
        }
    }
}],
   ['function wrap() { { "use strict" } foo }', 'function wrap() { { "use strict" } foo }', Context.OptionsRanges | Context.OptionsLoc, {
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
                        'type': 'BlockStatement',
                        'body': [
                            {
                                'type': 'ExpressionStatement',
                                'expression': {
                                    'type': 'Literal',
                                    raw: null,
                                    'value': 'use strict',
                                    'start': 20,
                                    'end': 32,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 20
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 32
                                        }
                                    }
                                },
                                'start': 20,
                                'end': 32,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 20
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 32
                                    }
                                }
                            }
                        ],
                        'start': 18,
                        'end': 34,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 18
                            },
                            'end': {
                                'line': 1,
                                'column': 34
                            }
                        }
                    },
                    {
                        'type': 'ExpressionStatement',
                        'expression': {
                            'type': 'Identifier',
                            'name': 'foo',
                            'start': 35,
                            'end': 38,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 35
                                },
                                'end': {
                                    'line': 1,
                                    'column': 38
                                }
                            }
                        },
                        'start': 35,
                        'end': 38,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 35
                            },
                            'end': {
                                'line': 1,
                                'column': 38
                            }
                        }
                    }
                ],
                'start': 16,
                'end': 40,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 16
                    },
                    'end': {
                        'line': 1,
                        'column': 40
                    }
                }
            },
            'async': false,
            'generator': false,
            'expression': false,
            'id': {
                'type': 'Identifier',
                'name': 'wrap',
                'start': 9,
                'end': 13,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 9
                    },
                    'end': {
                        'line': 1,
                        'column': 13
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
                    'line': 1,
                    'column': 40
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
}],
  ['("use strict")', '("use strict")', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'Literal',
                raw: null,
                'value': 'use strict',
                'start': 1,
                'end': 13,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 1
                    },
                    'end': {
                        'line': 1,
                        'column': 13
                    }
                }
            },
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
}]
];

const invalids: Array < [string, string, Context, any] > = [
  ['\'random\\xx foo\'', '\'random\\xx foo\'', Context.OptionsRanges | Context.OptionsLoc, {}],
  ['"use strict"; with (a) b = c;', '"use strict"; with (a) b = c;', Context.OptionsRanges | Context.OptionsLoc, {}],
  ['"\\1;" "use strict"; null', '"\\1;" "use strict"; null', Context.OptionsRanges | Context.OptionsLoc, {}],
  ['"use strict"; function f(){"\\1";}', '"use strict"; function f(){"\\1";}', Context.OptionsRanges | Context.OptionsLoc, {}],
  ['function foo() { "use strict"; with (a) b = c; }', 'function foo() { "use strict"; with (a) b = c; }', Context.OptionsRanges | Context.OptionsLoc, {}],
  ['"random\\u{a\nnewline"', '"random\\u{a\nnewline"', Context.OptionsRanges | Context.OptionsLoc, {}],
  ['\'random\\x foo\'', '\'random\\x foo\'', Context.OptionsRanges | Context.OptionsLoc, {}],
  ['\'random\\ua\\ foo\'', '\'random\\ua\\ foo\'', Context.OptionsRanges | Context.OptionsLoc, {}],
];

fail('Miscellaneous - Directives (pass)', invalids);
pass('Miscellaneous - Directives (pass)', valids);

});

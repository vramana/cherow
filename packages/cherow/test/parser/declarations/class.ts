import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Class', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [
  ['class Foo{ a() {} }', 'class Foo{ a() {} }', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ClassDeclaration',
            'id': {
                'type': 'Identifier',
                'name': 'Foo',
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
            'superClass': null,
            'body': {
                'type': 'ClassBody',
                'body': [
                    {
                        'type': 'MethodDefinition',
                        'kind': 'method',
                        'static': false,
                        'computed': false,
                        'key': {
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
                        'value': {
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
                    }
                ],
                'start': 9,
                'end': 19,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 9
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
['var foo = bar;', 'var foo = bar;', Context.OptionsRanges | Context.OptionsLoc, {
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
                      'type': 'Identifier',
                      'name': 'bar',
                      'start': 10,
                      'end': 13,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 10
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
                  'end': 13,
                  'loc': {
                      'start': {
                          'line': 1,
                          'column': 4
                      },
                      'end': {
                          'line': 1,
                          'column': 13
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
];

pass('Declarations - Class (pass)', valids);

});

import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - New target', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [

  ['function f() { (function a(b = new.target){}) }', 'function f() { (function a(b = new.target){}) }', Context.OptionsRanges | Context.OptionsLoc, {
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
                            'type': 'FunctionExpression',
                            'params': [
                                {
                                    'type': 'AssignmentPattern',
                                    'left': {
                                        'type': 'Identifier',
                                        'name': 'b',
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
                                    'right': {
                                        'meta': {
                                            'type': 'Identifier',
                                            'name': 'new',
                                            'start': 31,
                                            'end': 34,
                                            'loc': {
                                                'start': {
                                                    'line': 1,
                                                    'column': 31
                                                },
                                                'end': {
                                                    'line': 1,
                                                    'column': 34
                                                }
                                            }
                                        },
                                        'type': 'MetaProperty',
                                        'property': {
                                            'type': 'Identifier',
                                            'name': 'target',
                                            'start': 35,
                                            'end': 41,
                                            'loc': {
                                                'start': {
                                                    'line': 1,
                                                    'column': 35
                                                },
                                                'end': {
                                                    'line': 1,
                                                    'column': 41
                                                }
                                            }
                                        },
                                        'start': 31,
                                        'end': 41,
                                        'loc': {
                                            'start': {
                                                'line': 1,
                                                'column': 31
                                            },
                                            'end': {
                                                'line': 1,
                                                'column': 41
                                            }
                                        }
                                    },
                                    'start': 27,
                                    'end': 41,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 27
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 41
                                        }
                                    }
                                }
                            ],
                            'body': {
                                'type': 'BlockStatement',
                                'body': [],
                                'start': 42,
                                'end': 44,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 42
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 44
                                    }
                                }
                            },
                            'async': false,
                            'generator': false,
                            'expression': false,
                            'id': {
                                'type': 'Identifier',
                                'name': 'a',
                                'start': 25,
                                'end': 26,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 25
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 26
                                    }
                                }
                            },
                            'start': 16,
                            'end': 44,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 16
                                },
                                'end': {
                                    'line': 1,
                                    'column': 44
                                }
                            }
                        },
                        'start': 15,
                        'end': 45,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 15
                            },
                            'end': {
                                'line': 1,
                                'column': 45
                            }
                        }
                    }
                ],
                'start': 13,
                'end': 47,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 13
                    },
                    'end': {
                        'line': 1,
                        'column': 47
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
            'end': 47,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 47
                }
            }
        }
    ],
    'start': 0,
    'end': 47,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 47
        }
    }
}],

['function f() { class C {get x() { { new.target } }} }', 'function f() { class C {get x() { { new.target } }} }', Context.OptionsRanges | Context.OptionsLoc, {
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
                      'type': 'ClassDeclaration',
                      'id': {
                          'type': 'Identifier',
                          'name': 'C',
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
                      'superClass': null,
                      'body': {
                          'type': 'ClassBody',
                          'body': [
                              {
                                  'type': 'MethodDefinition',
                                  'kind': 'get',
                                  'static': false,
                                  'computed': false,
                                  'key': {
                                      'type': 'Identifier',
                                      'name': 'x',
                                      'start': 28,
                                      'end': 29,
                                      'loc': {
                                          'start': {
                                              'line': 1,
                                              'column': 28
                                          },
                                          'end': {
                                              'line': 1,
                                              'column': 29
                                          }
                                      }
                                  },
                                  'value': {
                                      'type': 'FunctionExpression',
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
                                                              'meta': {
                                                                  'type': 'Identifier',
                                                                  'name': 'new',
                                                                  'start': 36,
                                                                  'end': 39,
                                                                  'loc': {
                                                                      'start': {
                                                                          'line': 1,
                                                                          'column': 36
                                                                      },
                                                                      'end': {
                                                                          'line': 1,
                                                                          'column': 39
                                                                      }
                                                                  }
                                                              },
                                                              'type': 'MetaProperty',
                                                              'property': {
                                                                  'type': 'Identifier',
                                                                  'name': 'target',
                                                                  'start': 40,
                                                                  'end': 46,
                                                                  'loc': {
                                                                      'start': {
                                                                          'line': 1,
                                                                          'column': 40
                                                                      },
                                                                      'end': {
                                                                          'line': 1,
                                                                          'column': 46
                                                                      }
                                                                  }
                                                              },
                                                              'start': 36,
                                                              'end': 46,
                                                              'loc': {
                                                                  'start': {
                                                                      'line': 1,
                                                                      'column': 36
                                                                  },
                                                                  'end': {
                                                                      'line': 1,
                                                                      'column': 46
                                                                  }
                                                              }
                                                          },
                                                          'start': 36,
                                                          'end': 46,
                                                          'loc': {
                                                              'start': {
                                                                  'line': 1,
                                                                  'column': 36
                                                              },
                                                              'end': {
                                                                  'line': 1,
                                                                  'column': 46
                                                              }
                                                          }
                                                      }
                                                  ],
                                                  'start': 34,
                                                  'end': 48,
                                                  'loc': {
                                                      'start': {
                                                          'line': 1,
                                                          'column': 34
                                                      },
                                                      'end': {
                                                          'line': 1,
                                                          'column': 48
                                                      }
                                                  }
                                              }
                                          ],
                                          'start': 32,
                                          'end': 50,
                                          'loc': {
                                              'start': {
                                                  'line': 1,
                                                  'column': 32
                                              },
                                              'end': {
                                                  'line': 1,
                                                  'column': 50
                                              }
                                          }
                                      },
                                      'async': false,
                                      'generator': false,
                                      'expression': false,
                                      'id': null,
                                      'start': 29,
                                      'end': 50,
                                      'loc': {
                                          'start': {
                                              'line': 1,
                                              'column': 29
                                          },
                                          'end': {
                                              'line': 1,
                                              'column': 50
                                          }
                                      }
                                  },
                                  'start': 24,
                                  'end': 50,
                                  'loc': {
                                      'start': {
                                          'line': 1,
                                          'column': 24
                                      },
                                      'end': {
                                          'line': 1,
                                          'column': 50
                                      }
                                  }
                              }
                          ],
                          'start': 23,
                          'end': 51,
                          'loc': {
                              'start': {
                                  'line': 1,
                                  'column': 23
                              },
                              'end': {
                                  'line': 1,
                                  'column': 51
                              }
                          }
                      },
                      'start': 15,
                      'end': 51,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 15
                          },
                          'end': {
                              'line': 1,
                              'column': 51
                          }
                      }
                  }
              ],
              'start': 13,
              'end': 53,
              'loc': {
                  'start': {
                      'line': 1,
                      'column': 13
                  },
                  'end': {
                      'line': 1,
                      'column': 53
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
          'end': 53,
          'loc': {
              'start': {
                  'line': 1,
                  'column': 0
              },
              'end': {
                  'line': 1,
                  'column': 53
              }
          }
      }
  ],
  'start': 0,
  'end': 53,
  'loc': {
      'start': {
          'line': 1,
          'column': 0
      },
      'end': {
          'line': 1,
          'column': 53
      }
  }
}],
['function f() { if (1) { new.target } }', 'function f() { if (1) { new.target } }', Context.OptionsRanges, {
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
                      'type': 'IfStatement',
                      'test': {
                          'type': 'Literal',
                          raw: null,
                          'value': 1,
                          'start': 19,
                          'end': 20
                      },
                      'consequent': {
                          'type': 'BlockStatement',
                          'body': [
                              {
                                  'type': 'ExpressionStatement',
                                  'expression': {
                                      'meta': {
                                          'type': 'Identifier',
                                          'name': 'new',
                                          'start': 24,
                                          'end': 27
                                      },
                                      'type': 'MetaProperty',
                                      'property': {
                                          'type': 'Identifier',
                                          'name': 'target',
                                          'start': 28,
                                          'end': 34
                                      },
                                      'start': 24,
                                      'end': 34
                                  },
                                  'start': 24,
                                  'end': 34
                              }
                          ],
                          'start': 22,
                          'end': 36
                      },
                      'alternate': null,
                      'start': 15,
                      'end': 36
                  }
              ],
              'start': 13,
              'end': 38
          },
          'async': false,
          'generator': false,
          'expression': false,
          'id': {
              'type': 'Identifier',
              'name': 'f',
              'start': 9,
              'end': 10
          },
          'start': 0,
          'end': 38
      }
  ],
  'start': 0,
  'end': 38
}],
['function f() { new.target }', 'function f() { new.target }', Context.OptionsRanges, {
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
                          'meta': {
                              'type': 'Identifier',
                              'name': 'new',
                              'start': 15,
                              'end': 18
                          },
                          'type': 'MetaProperty',
                          'property': {
                              'type': 'Identifier',
                              'name': 'target',
                              'start': 19,
                              'end': 25
                          },
                          'start': 15,
                          'end': 25
                      },
                      'start': 15,
                      'end': 25
                  }
              ],
              'start': 13,
              'end': 27
          },
          'async': false,
          'generator': false,
          'expression': false,
          'id': {
              'type': 'Identifier',
              'name': 'f',
              'start': 9,
              'end': 10
          },
          'start': 0,
          'end': 27
      }
  ],
  'start': 0,
  'end': 27
}],
['function f() { () => { new.target } }', 'function f() { () => { new.target } }', Context.OptionsRanges, {
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
                          'type': 'ArrowFunctionExpression',
                          'body': {
                              'type': 'BlockStatement',
                              'body': [
                                  {
                                      'type': 'ExpressionStatement',
                                      'expression': {
                                          'meta': {
                                              'type': 'Identifier',
                                              'name': 'new',
                                              'start': 23,
                                              'end': 26
                                          },
                                          'type': 'MetaProperty',
                                          'property': {
                                              'type': 'Identifier',
                                              'name': 'target',
                                              'start': 27,
                                              'end': 33
                                          },
                                          'start': 23,
                                          'end': 33
                                      },
                                      'start': 23,
                                      'end': 33
                                  }
                              ],
                              'start': 21,
                              'end': 35
                          },
                          'params': [],
                          'id': null,
                          'async': false,
                          'generator': false,
                          'expression': false,
                          'start': 15,
                          'end': 35
                      },
                      'start': 15,
                      'end': 35
                  }
              ],
              'start': 13,
              'end': 37
          },
          'async': false,
          'generator': false,
          'expression': false,
          'id': {
              'type': 'Identifier',
              'name': 'f',
              'start': 9,
              'end': 10
          },
          'start': 0,
          'end': 37
      }
  ],
  'start': 0,
  'end': 37
}],
['function f() { if (1) {} else { new.target } }', 'function f() { if (1) {} else { new.target } }', Context.OptionsRanges, {
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
                      'type': 'IfStatement',
                      'test': {
                          'type': 'Literal',
                          raw: null,
                          'value': 1,
                          'start': 19,
                          'end': 20
                      },
                      'consequent': {
                          'type': 'BlockStatement',
                          'body': [],
                          'start': 22,
                          'end': 24
                      },
                      'alternate': {
                          'type': 'BlockStatement',
                          'body': [
                              {
                                  'type': 'ExpressionStatement',
                                  'expression': {
                                      'meta': {
                                          'type': 'Identifier',
                                          'name': 'new',
                                          'start': 32,
                                          'end': 35
                                      },
                                      'type': 'MetaProperty',
                                      'property': {
                                          'type': 'Identifier',
                                          'name': 'target',
                                          'start': 36,
                                          'end': 42
                                      },
                                      'start': 32,
                                      'end': 42
                                  },
                                  'start': 32,
                                  'end': 42
                              }
                          ],
                          'start': 30,
                          'end': 44
                      },
                      'start': 15,
                      'end': 44
                  }
              ],
              'start': 13,
              'end': 46
          },
          'async': false,
          'generator': false,
          'expression': false,
          'id': {
              'type': 'Identifier',
              'name': 'f',
              'start': 9,
              'end': 10
          },
          'start': 0,
          'end': 46
      }
  ],
  'start': 0,
  'end': 46
}],
['function f() { function f() { let x = new.target; } }', 'function f() { function f() { let x = new.target; } }', Context.OptionsRanges, {
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
                      'type': 'FunctionDeclaration',
                      'params': [],
                      'body': {
                          'type': 'BlockStatement',
                          'body': [
                              {
                                  'type': 'VariableDeclaration',
                                  'kind': 'let',
                                  'declarations': [
                                      {
                                          'type': 'VariableDeclarator',
                                          'init': {
                                              'meta': {
                                                  'type': 'Identifier',
                                                  'name': 'new',
                                                  'start': 38,
                                                  'end': 41
                                              },
                                              'type': 'MetaProperty',
                                              'property': {
                                                  'type': 'Identifier',
                                                  'name': 'target',
                                                  'start': 42,
                                                  'end': 48
                                              },
                                              'start': 38,
                                              'end': 48
                                          },
                                          'id': {
                                              'type': 'Identifier',
                                              'name': 'x',
                                              'start': 34,
                                              'end': 35
                                          },
                                          'start': 34,
                                          'end': 48
                                      }
                                  ],
                                  'start': 30,
                                  'end': 49
                              }
                          ],
                          'start': 28,
                          'end': 51
                      },
                      'async': false,
                      'generator': false,
                      'expression': false,
                      'id': {
                          'type': 'Identifier',
                          'name': 'f',
                          'start': 24,
                          'end': 25
                      },
                      'start': 15,
                      'end': 51
                  }
              ],
              'start': 13,
              'end': 53
          },
          'async': false,
          'generator': false,
          'expression': false,
          'id': {
              'type': 'Identifier',
              'name': 'f',
              'start': 9,
              'end': 10
          },
          'start': 0,
          'end': 53
      }
  ],
  'start': 0,
  'end': 53
}],
];

pass('Expressions - New target (pass)', valids);

});

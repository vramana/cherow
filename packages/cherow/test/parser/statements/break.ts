import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Break', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [
  ['while ( foo ) Label: break Label;', 'while ( foo ) Label: break Label;', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'WhileStatement',
            'test': {
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
            'body': {
                'type': 'LabeledStatement',
                'label': {
                    'type': 'Identifier',
                    'name': 'Label',
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
                },
                'body': {
                    'type': 'BreakStatement',
                    'label': {
                        'type': 'Identifier',
                        'name': 'Label',
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
                    },
                    'start': 21,
                    'end': 33,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 21
                        },
                        'end': {
                            'line': 1,
                            'column': 33
                        }
                    }
                },
                'start': 14,
                'end': 33,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 14
                    },
                    'end': {
                        'line': 1,
                        'column': 33
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
                    'line': 1,
                    'column': 33
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
}],
[`(function(){
  FOR : for(;;){
      try{
          x++;
          if(x===10)return;
          throw 1;
      } catch(e){
          break FOR;
      }
  }
  })();`, `(function(){
    FOR : for(;;){
        try{
            x++;
            if(x===10)return;
            throw 1;
        } catch(e){
            break FOR;
        }
    }
    })();`, Context.OptionsRanges | Context.OptionsLoc, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'CallExpression',
                  'callee': {
                      'type': 'FunctionExpression',
                      'params': [],
                      'body': {
                          'type': 'BlockStatement',
                          'body': [
                              {
                                  'type': 'LabeledStatement',
                                  'label': {
                                      'type': 'Identifier',
                                      'name': 'FOR',
                                      'start': 17,
                                      'end': 20,
                                      'loc': {
                                          'start': {
                                              'line': 2,
                                              'column': 4
                                          },
                                          'end': {
                                              'line': 2,
                                              'column': 7
                                          }
                                      }
                                  },
                                  'body': {
                                      'type': 'ForStatement',
                                      'body': {
                                          'type': 'BlockStatement',
                                          'body': [
                                              {
                                                  'type': 'TryStatement',
                                                  'block': {
                                                      'type': 'BlockStatement',
                                                      'body': [
                                                          {
                                                              'type': 'ExpressionStatement',
                                                              'expression': {
                                                                  'type': 'UpdateExpression',
                                                                  'argument': {
                                                                      'type': 'Identifier',
                                                                      'name': 'x',
                                                                      'start': 57,
                                                                      'end': 58,
                                                                      'loc': {
                                                                          'start': {
                                                                              'line': 4,
                                                                              'column': 12
                                                                          },
                                                                          'end': {
                                                                              'line': 4,
                                                                              'column': 13
                                                                          }
                                                                      }
                                                                  },
                                                                  'operator': '++',
                                                                  'prefix': false,
                                                                  'start': 57,
                                                                  'end': 60,
                                                                  'loc': {
                                                                      'start': {
                                                                          'line': 4,
                                                                          'column': 12
                                                                      },
                                                                      'end': {
                                                                          'line': 4,
                                                                          'column': 15
                                                                      }
                                                                  }
                                                              },
                                                              'start': 57,
                                                              'end': 61,
                                                              'loc': {
                                                                  'start': {
                                                                      'line': 4,
                                                                      'column': 12
                                                                  },
                                                                  'end': {
                                                                      'line': 4,
                                                                      'column': 16
                                                                  }
                                                              }
                                                          },
                                                          {
                                                              'type': 'IfStatement',
                                                              'test': {
                                                                  'type': 'BinaryExpression',
                                                                  'left': {
                                                                      'type': 'Identifier',
                                                                      'name': 'x',
                                                                      'start': 77,
                                                                      'end': 78,
                                                                      'loc': {
                                                                          'start': {
                                                                              'line': 5,
                                                                              'column': 15
                                                                          },
                                                                          'end': {
                                                                              'line': 5,
                                                                              'column': 16
                                                                          }
                                                                      }
                                                                  },
                                                                  'right': {
                                                                      'type': 'Literal',
                                                                      raw: null,
                                                                      'value': 10,
                                                                      'start': 81,
                                                                      'end': 83,
                                                                      'loc': {
                                                                          'start': {
                                                                              'line': 5,
                                                                              'column': 19
                                                                          },
                                                                          'end': {
                                                                              'line': 5,
                                                                              'column': 21
                                                                          }
                                                                      }
                                                                  },
                                                                  'operator': '===',
                                                                  'start': 77,
                                                                  'end': 83,
                                                                  'loc': {
                                                                      'start': {
                                                                          'line': 5,
                                                                          'column': 15
                                                                      },
                                                                      'end': {
                                                                          'line': 5,
                                                                          'column': 21
                                                                      }
                                                                  }
                                                              },
                                                              'consequent': {
                                                                  'type': 'ReturnStatement',
                                                                  'argument': null,
                                                                  'start': 84,
                                                                  'end': 91,
                                                                  'loc': {
                                                                      'start': {
                                                                          'line': 5,
                                                                          'column': 22
                                                                      },
                                                                      'end': {
                                                                          'line': 5,
                                                                          'column': 29
                                                                      }
                                                                  }
                                                              },
                                                              'alternate': null,
                                                              'start': 74,
                                                              'end': 91,
                                                              'loc': {
                                                                  'start': {
                                                                      'line': 5,
                                                                      'column': 12
                                                                  },
                                                                  'end': {
                                                                      'line': 5,
                                                                      'column': 29
                                                                  }
                                                              }
                                                          },
                                                          {
                                                              'type': 'ThrowStatement',
                                                              'argument': {
                                                                  'type': 'Literal',
                                                                  raw: null,
                                                                  'value': 1,
                                                                  'start': 110,
                                                                  'end': 111,
                                                                  'loc': {
                                                                      'start': {
                                                                          'line': 6,
                                                                          'column': 18
                                                                      },
                                                                      'end': {
                                                                          'line': 6,
                                                                          'column': 19
                                                                      }
                                                                  }
                                                              },
                                                              'start': 104,
                                                              'end': 112,
                                                              'loc': {
                                                                  'start': {
                                                                      'line': 6,
                                                                      'column': 12
                                                                  },
                                                                  'end': {
                                                                      'line': 6,
                                                                      'column': 20
                                                                  }
                                                              }
                                                          }
                                                      ],
                                                      'start': 43,
                                                      'end': 122,
                                                      'loc': {
                                                          'start': {
                                                              'line': 3,
                                                              'column': 11
                                                          },
                                                          'end': {
                                                              'line': 7,
                                                              'column': 9
                                                          }
                                                      }
                                                  },
                                                  'handler': {
                                                      'type': 'CatchClause',
                                                      'param': {
                                                          'type': 'Identifier',
                                                          'name': 'e',
                                                          'start': 129,
                                                          'end': 130,
                                                          'loc': {
                                                              'start': {
                                                                  'line': 7,
                                                                  'column': 16
                                                              },
                                                              'end': {
                                                                  'line': 7,
                                                                  'column': 17
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
                                                                      'name': 'FOR',
                                                                      'start': 151,
                                                                      'end': 154,
                                                                      'loc': {
                                                                          'start': {
                                                                              'line': 8,
                                                                              'column': 18
                                                                          },
                                                                          'end': {
                                                                              'line': 8,
                                                                              'column': 21
                                                                          }
                                                                      }
                                                                  },
                                                                  'start': 145,
                                                                  'end': 155,
                                                                  'loc': {
                                                                      'start': {
                                                                          'line': 8,
                                                                          'column': 12
                                                                      },
                                                                      'end': {
                                                                          'line': 8,
                                                                          'column': 22
                                                                      }
                                                                  }
                                                              }
                                                          ],
                                                          'start': 131,
                                                          'end': 165,
                                                          'loc': {
                                                              'start': {
                                                                  'line': 7,
                                                                  'column': 18
                                                              },
                                                              'end': {
                                                                  'line': 9,
                                                                  'column': 9
                                                              }
                                                          }
                                                      },
                                                      'start': 123,
                                                      'end': 165,
                                                      'loc': {
                                                          'start': {
                                                              'line': 7,
                                                              'column': 10
                                                          },
                                                          'end': {
                                                              'line': 9,
                                                              'column': 9
                                                          }
                                                      }
                                                  },
                                                  'finalizer': null,
                                                  'start': 40,
                                                  'end': 165,
                                                  'loc': {
                                                      'start': {
                                                          'line': 3,
                                                          'column': 8
                                                      },
                                                      'end': {
                                                          'line': 9,
                                                          'column': 9
                                                      }
                                                  }
                                              }
                                          ],
                                          'start': 30,
                                          'end': 171,
                                          'loc': {
                                              'start': {
                                                  'line': 2,
                                                  'column': 17
                                              },
                                              'end': {
                                                  'line': 10,
                                                  'column': 5
                                              }
                                          }
                                      },
                                      'init': null,
                                      'test': null,
                                      'update': null,
                                      'start': 23,
                                      'end': 171,
                                      'loc': {
                                          'start': {
                                              'line': 2,
                                              'column': 10
                                          },
                                          'end': {
                                              'line': 10,
                                              'column': 5
                                          }
                                      }
                                  },
                                  'start': 17,
                                  'end': 171,
                                  'loc': {
                                      'start': {
                                          'line': 2,
                                          'column': 4
                                      },
                                      'end': {
                                          'line': 10,
                                          'column': 5
                                      }
                                  }
                              }
                          ],
                          'start': 11,
                          'end': 177,
                          'loc': {
                              'start': {
                                  'line': 1,
                                  'column': 11
                              },
                              'end': {
                                  'line': 11,
                                  'column': 5
                              }
                          }
                      },
                      'async': false,
                      'generator': false,
                      'expression': false,
                      'id': null,
                      'start': 1,
                      'end': 177,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 1
                          },
                          'end': {
                              'line': 11,
                              'column': 5
                          }
                      }
                  },
                  'arguments': [],
                  'start': 0,
                  'end': 180,
                  'loc': {
                      'start': {
                          'line': 1,
                          'column': 0
                      },
                      'end': {
                          'line': 11,
                          'column': 8
                      }
                  }
              },
              'start': 0,
              'end': 181,
              'loc': {
                  'start': {
                      'line': 1,
                      'column': 0
                  },
                  'end': {
                      'line': 11,
                      'column': 9
                  }
              }
          }
      ],
      'start': 0,
      'end': 181,
      'loc': {
          'start': {
              'line': 1,
              'column': 0
          },
          'end': {
              'line': 11,
              'column': 9
          }
      }
  }],
[`LABEL_OUT : var x=0, y=0, xx=0, yy=0;
(function(){
LABEL_DO_LOOP : do {
    LABEL_IN : x++;
    if(x===10)return;
    LABEL_NESTED_LOOP : do {
        LABEL_IN_NESTED : xx++;
        if(xx===10)return;
        break LABEL_DO_LOOP;
        LABEL_IN_NESTED_2 : yy++;
    } while (0);
    LABEL_IN_2 : y++;
    function IN_DO_FUNC(){}
} while(0);
LABEL_ANOTHER_LOOP : do {
    ;
} while(0);
function OUT_FUNC(){}
})();`, `LABEL_OUT : var x=0, y=0, xx=0, yy=0;
(function(){
LABEL_DO_LOOP : do {
    LABEL_IN : x++;
    if(x===10)return;
    LABEL_NESTED_LOOP : do {
        LABEL_IN_NESTED : xx++;
        if(xx===10)return;
        break LABEL_DO_LOOP;
        LABEL_IN_NESTED_2 : yy++;
    } while (0);
    LABEL_IN_2 : y++;
    function IN_DO_FUNC(){}
} while(0);
LABEL_ANOTHER_LOOP : do {
    ;
} while(0);
function OUT_FUNC(){}
})();`, Context.OptionsRanges | Context.OptionsLoc, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'LabeledStatement',
          'label': {
              'type': 'Identifier',
              'name': 'LABEL_OUT',
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
              'type': 'VariableDeclaration',
              'kind': 'var',
              'declarations': [
                  {
                      'type': 'VariableDeclarator',
                      'init': {
                          'type': 'Literal',
                          raw: null,
                          'value': 0,
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
                          'name': 'x',
                          'start': 16,
                          'end': 17,
                          'loc': {
                              'start': {
                                  'line': 1,
                                  'column': 16
                              },
                              'end': {
                                  'line': 1,
                                  'column': 17
                              }
                          }
                      },
                      'start': 16,
                      'end': 19,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 16
                          },
                          'end': {
                              'line': 1,
                              'column': 19
                          }
                      }
                  },
                  {
                      'type': 'VariableDeclarator',
                      'init': {
                          'type': 'Literal',
                          raw: null,
                          'value': 0,
                          'start': 23,
                          'end': 24,
                          'loc': {
                              'start': {
                                  'line': 1,
                                  'column': 23
                              },
                              'end': {
                                  'line': 1,
                                  'column': 24
                              }
                          }
                      },
                      'id': {
                          'type': 'Identifier',
                          'name': 'y',
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
                  {
                      'type': 'VariableDeclarator',
                      'init': {
                          'type': 'Literal',
                          raw: null,
                          'value': 0,
                          'start': 29,
                          'end': 30,
                          'loc': {
                              'start': {
                                  'line': 1,
                                  'column': 29
                              },
                              'end': {
                                  'line': 1,
                                  'column': 30
                              }
                          }
                      },
                      'id': {
                          'type': 'Identifier',
                          'name': 'xx',
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
                      'start': 26,
                      'end': 30,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 26
                          },
                          'end': {
                              'line': 1,
                              'column': 30
                          }
                      }
                  },
                  {
                      'type': 'VariableDeclarator',
                      'init': {
                          'type': 'Literal',
                          raw: null,
                          'value': 0,
                          'start': 35,
                          'end': 36,
                          'loc': {
                              'start': {
                                  'line': 1,
                                  'column': 35
                              },
                              'end': {
                                  'line': 1,
                                  'column': 36
                              }
                          }
                      },
                      'id': {
                          'type': 'Identifier',
                          'name': 'yy',
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
                      'start': 32,
                      'end': 36,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 32
                          },
                          'end': {
                              'line': 1,
                              'column': 36
                          }
                      }
                  }
              ],
              'start': 12,
              'end': 37,
              'loc': {
                  'start': {
                      'line': 1,
                      'column': 12
                  },
                  'end': {
                      'line': 1,
                      'column': 37
                  }
              }
          },
          'start': 0,
          'end': 37,
          'loc': {
              'start': {
                  'line': 1,
                  'column': 0
              },
              'end': {
                  'line': 1,
                  'column': 37
              }
          }
      },
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'CallExpression',
              'callee': {
                  'type': 'FunctionExpression',
                  'params': [],
                  'body': {
                      'type': 'BlockStatement',
                      'body': [
                          {
                              'type': 'LabeledStatement',
                              'label': {
                                  'type': 'Identifier',
                                  'name': 'LABEL_DO_LOOP',
                                  'start': 51,
                                  'end': 64,
                                  'loc': {
                                      'start': {
                                          'line': 3,
                                          'column': 0
                                      },
                                      'end': {
                                          'line': 3,
                                          'column': 13
                                      }
                                  }
                              },
                              'body': {
                                  'type': 'DoWhileStatement',
                                  'body': {
                                      'type': 'BlockStatement',
                                      'body': [
                                          {
                                              'type': 'LabeledStatement',
                                              'label': {
                                                  'type': 'Identifier',
                                                  'name': 'LABEL_IN',
                                                  'start': 76,
                                                  'end': 84,
                                                  'loc': {
                                                      'start': {
                                                          'line': 4,
                                                          'column': 4
                                                      },
                                                      'end': {
                                                          'line': 4,
                                                          'column': 12
                                                      }
                                                  }
                                              },
                                              'body': {
                                                  'type': 'ExpressionStatement',
                                                  'expression': {
                                                      'type': 'UpdateExpression',
                                                      'argument': {
                                                          'type': 'Identifier',
                                                          'name': 'x',
                                                          'start': 87,
                                                          'end': 88,
                                                          'loc': {
                                                              'start': {
                                                                  'line': 4,
                                                                  'column': 15
                                                              },
                                                              'end': {
                                                                  'line': 4,
                                                                  'column': 16
                                                              }
                                                          }
                                                      },
                                                      'operator': '++',
                                                      'prefix': false,
                                                      'start': 87,
                                                      'end': 90,
                                                      'loc': {
                                                          'start': {
                                                              'line': 4,
                                                              'column': 15
                                                          },
                                                          'end': {
                                                              'line': 4,
                                                              'column': 18
                                                          }
                                                      }
                                                  },
                                                  'start': 87,
                                                  'end': 91,
                                                  'loc': {
                                                      'start': {
                                                          'line': 4,
                                                          'column': 15
                                                      },
                                                      'end': {
                                                          'line': 4,
                                                          'column': 19
                                                      }
                                                  }
                                              },
                                              'start': 76,
                                              'end': 91,
                                              'loc': {
                                                  'start': {
                                                      'line': 4,
                                                      'column': 4
                                                  },
                                                  'end': {
                                                      'line': 4,
                                                      'column': 19
                                                  }
                                              }
                                          },
                                          {
                                              'type': 'IfStatement',
                                              'test': {
                                                  'type': 'BinaryExpression',
                                                  'left': {
                                                      'type': 'Identifier',
                                                      'name': 'x',
                                                      'start': 99,
                                                      'end': 100,
                                                      'loc': {
                                                          'start': {
                                                              'line': 5,
                                                              'column': 7
                                                          },
                                                          'end': {
                                                              'line': 5,
                                                              'column': 8
                                                          }
                                                      }
                                                  },
                                                  'right': {
                                                      'type': 'Literal',
                                                      raw: null,
                                                      'value': 10,
                                                      'start': 103,
                                                      'end': 105,
                                                      'loc': {
                                                          'start': {
                                                              'line': 5,
                                                              'column': 11
                                                          },
                                                          'end': {
                                                              'line': 5,
                                                              'column': 13
                                                          }
                                                      }
                                                  },
                                                  'operator': '===',
                                                  'start': 99,
                                                  'end': 105,
                                                  'loc': {
                                                      'start': {
                                                          'line': 5,
                                                          'column': 7
                                                      },
                                                      'end': {
                                                          'line': 5,
                                                          'column': 13
                                                      }
                                                  }
                                              },
                                              'consequent': {
                                                  'type': 'ReturnStatement',
                                                  'argument': null,
                                                  'start': 106,
                                                  'end': 113,
                                                  'loc': {
                                                      'start': {
                                                          'line': 5,
                                                          'column': 14
                                                      },
                                                      'end': {
                                                          'line': 5,
                                                          'column': 21
                                                      }
                                                  }
                                              },
                                              'alternate': null,
                                              'start': 96,
                                              'end': 113,
                                              'loc': {
                                                  'start': {
                                                      'line': 5,
                                                      'column': 4
                                                  },
                                                  'end': {
                                                      'line': 5,
                                                      'column': 21
                                                  }
                                              }
                                          },
                                          {
                                              'type': 'LabeledStatement',
                                              'label': {
                                                  'type': 'Identifier',
                                                  'name': 'LABEL_NESTED_LOOP',
                                                  'start': 118,
                                                  'end': 135,
                                                  'loc': {
                                                      'start': {
                                                          'line': 6,
                                                          'column': 4
                                                      },
                                                      'end': {
                                                          'line': 6,
                                                          'column': 21
                                                      }
                                                  }
                                              },
                                              'body': {
                                                  'type': 'DoWhileStatement',
                                                  'body': {
                                                      'type': 'BlockStatement',
                                                      'body': [
                                                          {
                                                              'type': 'LabeledStatement',
                                                              'label': {
                                                                  'type': 'Identifier',
                                                                  'name': 'LABEL_IN_NESTED',
                                                                  'start': 151,
                                                                  'end': 166,
                                                                  'loc': {
                                                                      'start': {
                                                                          'line': 7,
                                                                          'column': 8
                                                                      },
                                                                      'end': {
                                                                          'line': 7,
                                                                          'column': 23
                                                                      }
                                                                  }
                                                              },
                                                              'body': {
                                                                  'type': 'ExpressionStatement',
                                                                  'expression': {
                                                                      'type': 'UpdateExpression',
                                                                      'argument': {
                                                                          'type': 'Identifier',
                                                                          'name': 'xx',
                                                                          'start': 169,
                                                                          'end': 171,
                                                                          'loc': {
                                                                              'start': {
                                                                                  'line': 7,
                                                                                  'column': 26
                                                                              },
                                                                              'end': {
                                                                                  'line': 7,
                                                                                  'column': 28
                                                                              }
                                                                          }
                                                                      },
                                                                      'operator': '++',
                                                                      'prefix': false,
                                                                      'start': 169,
                                                                      'end': 173,
                                                                      'loc': {
                                                                          'start': {
                                                                              'line': 7,
                                                                              'column': 26
                                                                          },
                                                                          'end': {
                                                                              'line': 7,
                                                                              'column': 30
                                                                          }
                                                                      }
                                                                  },
                                                                  'start': 169,
                                                                  'end': 174,
                                                                  'loc': {
                                                                      'start': {
                                                                          'line': 7,
                                                                          'column': 26
                                                                      },
                                                                      'end': {
                                                                          'line': 7,
                                                                          'column': 31
                                                                      }
                                                                  }
                                                              },
                                                              'start': 151,
                                                              'end': 174,
                                                              'loc': {
                                                                  'start': {
                                                                      'line': 7,
                                                                      'column': 8
                                                                  },
                                                                  'end': {
                                                                      'line': 7,
                                                                      'column': 31
                                                                  }
                                                              }
                                                          },
                                                          {
                                                              'type': 'IfStatement',
                                                              'test': {
                                                                  'type': 'BinaryExpression',
                                                                  'left': {
                                                                      'type': 'Identifier',
                                                                      'name': 'xx',
                                                                      'start': 186,
                                                                      'end': 188,
                                                                      'loc': {
                                                                          'start': {
                                                                              'line': 8,
                                                                              'column': 11
                                                                          },
                                                                          'end': {
                                                                              'line': 8,
                                                                              'column': 13
                                                                          }
                                                                      }
                                                                  },
                                                                  'right': {
                                                                      'type': 'Literal',
                                                                      raw: null,
                                                                      'value': 10,
                                                                      'start': 191,
                                                                      'end': 193,
                                                                      'loc': {
                                                                          'start': {
                                                                              'line': 8,
                                                                              'column': 16
                                                                          },
                                                                          'end': {
                                                                              'line': 8,
                                                                              'column': 18
                                                                          }
                                                                      }
                                                                  },
                                                                  'operator': '===',
                                                                  'start': 186,
                                                                  'end': 193,
                                                                  'loc': {
                                                                      'start': {
                                                                          'line': 8,
                                                                          'column': 11
                                                                      },
                                                                      'end': {
                                                                          'line': 8,
                                                                          'column': 18
                                                                      }
                                                                  }
                                                              },
                                                              'consequent': {
                                                                  'type': 'ReturnStatement',
                                                                  'argument': null,
                                                                  'start': 194,
                                                                  'end': 201,
                                                                  'loc': {
                                                                      'start': {
                                                                          'line': 8,
                                                                          'column': 19
                                                                      },
                                                                      'end': {
                                                                          'line': 8,
                                                                          'column': 26
                                                                      }
                                                                  }
                                                              },
                                                              'alternate': null,
                                                              'start': 183,
                                                              'end': 201,
                                                              'loc': {
                                                                  'start': {
                                                                      'line': 8,
                                                                      'column': 8
                                                                  },
                                                                  'end': {
                                                                      'line': 8,
                                                                      'column': 26
                                                                  }
                                                              }
                                                          },
                                                          {
                                                              'type': 'BreakStatement',
                                                              'label': {
                                                                  'type': 'Identifier',
                                                                  'name': 'LABEL_DO_LOOP',
                                                                  'start': 216,
                                                                  'end': 229,
                                                                  'loc': {
                                                                      'start': {
                                                                          'line': 9,
                                                                          'column': 14
                                                                      },
                                                                      'end': {
                                                                          'line': 9,
                                                                          'column': 27
                                                                      }
                                                                  }
                                                              },
                                                              'start': 210,
                                                              'end': 230,
                                                              'loc': {
                                                                  'start': {
                                                                      'line': 9,
                                                                      'column': 8
                                                                  },
                                                                  'end': {
                                                                      'line': 9,
                                                                      'column': 28
                                                                  }
                                                              }
                                                          },
                                                          {
                                                              'type': 'LabeledStatement',
                                                              'label': {
                                                                  'type': 'Identifier',
                                                                  'name': 'LABEL_IN_NESTED_2',
                                                                  'start': 239,
                                                                  'end': 256,
                                                                  'loc': {
                                                                      'start': {
                                                                          'line': 10,
                                                                          'column': 8
                                                                      },
                                                                      'end': {
                                                                          'line': 10,
                                                                          'column': 25
                                                                      }
                                                                  }
                                                              },
                                                              'body': {
                                                                  'type': 'ExpressionStatement',
                                                                  'expression': {
                                                                      'type': 'UpdateExpression',
                                                                      'argument': {
                                                                          'type': 'Identifier',
                                                                          'name': 'yy',
                                                                          'start': 259,
                                                                          'end': 261,
                                                                          'loc': {
                                                                              'start': {
                                                                                  'line': 10,
                                                                                  'column': 28
                                                                              },
                                                                              'end': {
                                                                                  'line': 10,
                                                                                  'column': 30
                                                                              }
                                                                          }
                                                                      },
                                                                      'operator': '++',
                                                                      'prefix': false,
                                                                      'start': 259,
                                                                      'end': 263,
                                                                      'loc': {
                                                                          'start': {
                                                                              'line': 10,
                                                                              'column': 28
                                                                          },
                                                                          'end': {
                                                                              'line': 10,
                                                                              'column': 32
                                                                          }
                                                                      }
                                                                  },
                                                                  'start': 259,
                                                                  'end': 264,
                                                                  'loc': {
                                                                      'start': {
                                                                          'line': 10,
                                                                          'column': 28
                                                                      },
                                                                      'end': {
                                                                          'line': 10,
                                                                          'column': 33
                                                                      }
                                                                  }
                                                              },
                                                              'start': 239,
                                                              'end': 264,
                                                              'loc': {
                                                                  'start': {
                                                                      'line': 10,
                                                                      'column': 8
                                                                  },
                                                                  'end': {
                                                                      'line': 10,
                                                                      'column': 33
                                                                  }
                                                              }
                                                          }
                                                      ],
                                                      'start': 141,
                                                      'end': 270,
                                                      'loc': {
                                                          'start': {
                                                              'line': 6,
                                                              'column': 27
                                                          },
                                                          'end': {
                                                              'line': 11,
                                                              'column': 5
                                                          }
                                                      }
                                                  },
                                                  'test': {
                                                      'type': 'Literal',
                                                      raw: null,
                                                      'value': 0,
                                                      'start': 278,
                                                      'end': 279,
                                                      'loc': {
                                                          'start': {
                                                              'line': 11,
                                                              'column': 13
                                                          },
                                                          'end': {
                                                              'line': 11,
                                                              'column': 14
                                                          }
                                                      }
                                                  },
                                                  'start': 138,
                                                  'end': 281,
                                                  'loc': {
                                                      'start': {
                                                          'line': 6,
                                                          'column': 24
                                                      },
                                                      'end': {
                                                          'line': 11,
                                                          'column': 16
                                                      }
                                                  }
                                              },
                                              'start': 118,
                                              'end': 281,
                                              'loc': {
                                                  'start': {
                                                      'line': 6,
                                                      'column': 4
                                                  },
                                                  'end': {
                                                      'line': 11,
                                                      'column': 16
                                                  }
                                              }
                                          },
                                          {
                                              'type': 'LabeledStatement',
                                              'label': {
                                                  'type': 'Identifier',
                                                  'name': 'LABEL_IN_2',
                                                  'start': 286,
                                                  'end': 296,
                                                  'loc': {
                                                      'start': {
                                                          'line': 12,
                                                          'column': 4
                                                      },
                                                      'end': {
                                                          'line': 12,
                                                          'column': 14
                                                      }
                                                  }
                                              },
                                              'body': {
                                                  'type': 'ExpressionStatement',
                                                  'expression': {
                                                      'type': 'UpdateExpression',
                                                      'argument': {
                                                          'type': 'Identifier',
                                                          'name': 'y',
                                                          'start': 299,
                                                          'end': 300,
                                                          'loc': {
                                                              'start': {
                                                                  'line': 12,
                                                                  'column': 17
                                                              },
                                                              'end': {
                                                                  'line': 12,
                                                                  'column': 18
                                                              }
                                                          }
                                                      },
                                                      'operator': '++',
                                                      'prefix': false,
                                                      'start': 299,
                                                      'end': 302,
                                                      'loc': {
                                                          'start': {
                                                              'line': 12,
                                                              'column': 17
                                                          },
                                                          'end': {
                                                              'line': 12,
                                                              'column': 20
                                                          }
                                                      }
                                                  },
                                                  'start': 299,
                                                  'end': 303,
                                                  'loc': {
                                                      'start': {
                                                          'line': 12,
                                                          'column': 17
                                                      },
                                                      'end': {
                                                          'line': 12,
                                                          'column': 21
                                                      }
                                                  }
                                              },
                                              'start': 286,
                                              'end': 303,
                                              'loc': {
                                                  'start': {
                                                      'line': 12,
                                                      'column': 4
                                                  },
                                                  'end': {
                                                      'line': 12,
                                                      'column': 21
                                                  }
                                              }
                                          },
                                          {
                                              'type': 'FunctionDeclaration',
                                              'params': [],
                                              'body': {
                                                  'type': 'BlockStatement',
                                                  'body': [],
                                                  'start': 329,
                                                  'end': 331,
                                                  'loc': {
                                                      'start': {
                                                          'line': 13,
                                                          'column': 25
                                                      },
                                                      'end': {
                                                          'line': 13,
                                                          'column': 27
                                                      }
                                                  }
                                              },
                                              'async': false,
                                              'generator': false,
                                              'expression': false,
                                              'id': {
                                                  'type': 'Identifier',
                                                  'name': 'IN_DO_FUNC',
                                                  'start': 317,
                                                  'end': 327,
                                                  'loc': {
                                                      'start': {
                                                          'line': 13,
                                                          'column': 13
                                                      },
                                                      'end': {
                                                          'line': 13,
                                                          'column': 23
                                                      }
                                                  }
                                              },
                                              'start': 308,
                                              'end': 331,
                                              'loc': {
                                                  'start': {
                                                      'line': 13,
                                                      'column': 4
                                                  },
                                                  'end': {
                                                      'line': 13,
                                                      'column': 27
                                                  }
                                              }
                                          }
                                      ],
                                      'start': 70,
                                      'end': 333,
                                      'loc': {
                                          'start': {
                                              'line': 3,
                                              'column': 19
                                          },
                                          'end': {
                                              'line': 14,
                                              'column': 1
                                          }
                                      }
                                  },
                                  'test': {
                                      'type': 'Literal',
                                      raw: null,
                                      'value': 0,
                                      'start': 340,
                                      'end': 341,
                                      'loc': {
                                          'start': {
                                              'line': 14,
                                              'column': 8
                                          },
                                          'end': {
                                              'line': 14,
                                              'column': 9
                                          }
                                      }
                                  },
                                  'start': 67,
                                  'end': 343,
                                  'loc': {
                                      'start': {
                                          'line': 3,
                                          'column': 16
                                      },
                                      'end': {
                                          'line': 14,
                                          'column': 11
                                      }
                                  }
                              },
                              'start': 51,
                              'end': 343,
                              'loc': {
                                  'start': {
                                      'line': 3,
                                      'column': 0
                                  },
                                  'end': {
                                      'line': 14,
                                      'column': 11
                                  }
                              }
                          },
                          {
                              'type': 'LabeledStatement',
                              'label': {
                                  'type': 'Identifier',
                                  'name': 'LABEL_ANOTHER_LOOP',
                                  'start': 344,
                                  'end': 362,
                                  'loc': {
                                      'start': {
                                          'line': 15,
                                          'column': 0
                                      },
                                      'end': {
                                          'line': 15,
                                          'column': 18
                                      }
                                  }
                              },
                              'body': {
                                  'type': 'DoWhileStatement',
                                  'body': {
                                      'type': 'BlockStatement',
                                      'body': [
                                          {
                                              'type': 'EmptyStatement',
                                              'start': 374,
                                              'end': 375,
                                              'loc': {
                                                  'start': {
                                                      'line': 16,
                                                      'column': 4
                                                  },
                                                  'end': {
                                                      'line': 16,
                                                      'column': 5
                                                  }
                                              }
                                          }
                                      ],
                                      'start': 368,
                                      'end': 377,
                                      'loc': {
                                          'start': {
                                              'line': 15,
                                              'column': 24
                                          },
                                          'end': {
                                              'line': 17,
                                              'column': 1
                                          }
                                      }
                                  },
                                  'test': {
                                      'type': 'Literal',
                                      raw: null,
                                      'value': 0,
                                      'start': 384,
                                      'end': 385,
                                      'loc': {
                                          'start': {
                                              'line': 17,
                                              'column': 8
                                          },
                                          'end': {
                                              'line': 17,
                                              'column': 9
                                          }
                                      }
                                  },
                                  'start': 365,
                                  'end': 387,
                                  'loc': {
                                      'start': {
                                          'line': 15,
                                          'column': 21
                                      },
                                      'end': {
                                          'line': 17,
                                          'column': 11
                                      }
                                  }
                              },
                              'start': 344,
                              'end': 387,
                              'loc': {
                                  'start': {
                                      'line': 15,
                                      'column': 0
                                  },
                                  'end': {
                                      'line': 17,
                                      'column': 11
                                  }
                              }
                          },
                          {
                              'type': 'FunctionDeclaration',
                              'params': [],
                              'body': {
                                  'type': 'BlockStatement',
                                  'body': [],
                                  'start': 407,
                                  'end': 409,
                                  'loc': {
                                      'start': {
                                          'line': 18,
                                          'column': 19
                                      },
                                      'end': {
                                          'line': 18,
                                          'column': 21
                                      }
                                  }
                              },
                              'async': false,
                              'generator': false,
                              'expression': false,
                              'id': {
                                  'type': 'Identifier',
                                  'name': 'OUT_FUNC',
                                  'start': 397,
                                  'end': 405,
                                  'loc': {
                                      'start': {
                                          'line': 18,
                                          'column': 9
                                      },
                                      'end': {
                                          'line': 18,
                                          'column': 17
                                      }
                                  }
                              },
                              'start': 388,
                              'end': 409,
                              'loc': {
                                  'start': {
                                      'line': 18,
                                      'column': 0
                                  },
                                  'end': {
                                      'line': 18,
                                      'column': 21
                                  }
                              }
                          }
                      ],
                      'start': 49,
                      'end': 411,
                      'loc': {
                          'start': {
                              'line': 2,
                              'column': 11
                          },
                          'end': {
                              'line': 19,
                              'column': 1
                          }
                      }
                  },
                  'async': false,
                  'generator': false,
                  'expression': false,
                  'id': null,
                  'start': 39,
                  'end': 411,
                  'loc': {
                      'start': {
                          'line': 2,
                          'column': 1
                      },
                      'end': {
                          'line': 19,
                          'column': 1
                      }
                  }
              },
              'arguments': [],
              'start': 38,
              'end': 414,
              'loc': {
                  'start': {
                      'line': 2,
                      'column': 0
                  },
                  'end': {
                      'line': 19,
                      'column': 4
                  }
              }
          },
          'start': 38,
          'end': 415,
          'loc': {
              'start': {
                  'line': 2,
                  'column': 0
              },
              'end': {
                  'line': 19,
                  'column': 5
              }
          }
      }
  ],
  'start': 0,
  'end': 415,
  'loc': {
      'start': {
          'line': 1,
          'column': 0
      },
      'end': {
          'line': 19,
          'column': 5
      }
  }
}],
['do {  test262: {  break test262; } } while (a)', 'do {  test262: {  break test262; } } while (a)', Context.OptionsRanges | Context.OptionsLoc, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'DoWhileStatement',
          'body': {
              'type': 'BlockStatement',
              'body': [
                  {
                      'type': 'LabeledStatement',
                      'label': {
                          'type': 'Identifier',
                          'name': 'test262',
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
                      'body': {
                          'type': 'BlockStatement',
                          'body': [
                              {
                                  'type': 'BreakStatement',
                                  'label': {
                                      'type': 'Identifier',
                                      'name': 'test262',
                                      'start': 24,
                                      'end': 31,
                                      'loc': {
                                          'start': {
                                              'line': 1,
                                              'column': 24
                                          },
                                          'end': {
                                              'line': 1,
                                              'column': 31
                                          }
                                      }
                                  },
                                  'start': 18,
                                  'end': 32,
                                  'loc': {
                                      'start': {
                                          'line': 1,
                                          'column': 18
                                      },
                                      'end': {
                                          'line': 1,
                                          'column': 32
                                      }
                                  }
                              }
                          ],
                          'start': 15,
                          'end': 34,
                          'loc': {
                              'start': {
                                  'line': 1,
                                  'column': 15
                              },
                              'end': {
                                  'line': 1,
                                  'column': 34
                              }
                          }
                      },
                      'start': 6,
                      'end': 34,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 6
                          },
                          'end': {
                              'line': 1,
                              'column': 34
                          }
                      }
                  }
              ],
              'start': 3,
              'end': 36,
              'loc': {
                  'start': {
                      'line': 1,
                      'column': 3
                  },
                  'end': {
                      'line': 1,
                      'column': 36
                  }
              }
          },
          'test': {
              'type': 'Identifier',
              'name': 'a',
              'start': 44,
              'end': 45,
              'loc': {
                  'start': {
                      'line': 1,
                      'column': 44
                  },
                  'end': {
                      'line': 1,
                      'column': 45
                  }
              }
          },
          'start': 0,
          'end': 46,
          'loc': {
              'start': {
                  'line': 1,
                  'column': 0
              },
              'end': {
                  'line': 1,
                  'column': 46
              }
          }
      }
  ],
  'start': 0,
  'end': 46,
  'loc': {
      'start': {
          'line': 1,
          'column': 0
      },
      'end': {
          'line': 1,
          'column': 46
      }
  }
}],
['do {  test262: {  break test262; } } while (a)', 'do {  test262: {  break test262; } } while (a)', Context.OptionsRanges | Context.OptionsLoc, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'DoWhileStatement',
          'body': {
              'type': 'BlockStatement',
              'body': [
                  {
                      'type': 'LabeledStatement',
                      'label': {
                          'type': 'Identifier',
                          'name': 'test262',
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
                      'body': {
                          'type': 'BlockStatement',
                          'body': [
                              {
                                  'type': 'BreakStatement',
                                  'label': {
                                      'type': 'Identifier',
                                      'name': 'test262',
                                      'start': 24,
                                      'end': 31,
                                      'loc': {
                                          'start': {
                                              'line': 1,
                                              'column': 24
                                          },
                                          'end': {
                                              'line': 1,
                                              'column': 31
                                          }
                                      }
                                  },
                                  'start': 18,
                                  'end': 32,
                                  'loc': {
                                      'start': {
                                          'line': 1,
                                          'column': 18
                                      },
                                      'end': {
                                          'line': 1,
                                          'column': 32
                                      }
                                  }
                              }
                          ],
                          'start': 15,
                          'end': 34,
                          'loc': {
                              'start': {
                                  'line': 1,
                                  'column': 15
                              },
                              'end': {
                                  'line': 1,
                                  'column': 34
                              }
                          }
                      },
                      'start': 6,
                      'end': 34,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 6
                          },
                          'end': {
                              'line': 1,
                              'column': 34
                          }
                      }
                  }
              ],
              'start': 3,
              'end': 36,
              'loc': {
                  'start': {
                      'line': 1,
                      'column': 3
                  },
                  'end': {
                      'line': 1,
                      'column': 36
                  }
              }
          },
          'test': {
              'type': 'Identifier',
              'name': 'a',
              'start': 44,
              'end': 45,
              'loc': {
                  'start': {
                      'line': 1,
                      'column': 44
                  },
                  'end': {
                      'line': 1,
                      'column': 45
                  }
              }
          },
          'start': 0,
          'end': 46,
          'loc': {
              'start': {
                  'line': 1,
                  'column': 0
              },
              'end': {
                  'line': 1,
                  'column': 46
              }
          }
      }
  ],
  'start': 0,
  'end': 46,
  'loc': {
      'start': {
          'line': 1,
          'column': 0
      },
      'end': {
          'line': 1,
          'column': 46
      }
  }
}],
['while (foo) { break; }', 'while (foo) { break; }', Context.OptionsRanges | Context.OptionsLoc, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'WhileStatement',
          'test': {
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
                              'line': 1,
                              'column': 14
                          },
                          'end': {
                              'line': 1,
                              'column': 20
                          }
                      }
                  }
              ],
              'start': 12,
              'end': 22,
              'loc': {
                  'start': {
                      'line': 1,
                      'column': 12
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
}]
];

const invalids: Array < [string, string, Context, any] > = [
  ['break', 'break', Context.Empty, {}],
  ['foo: function() {}', 'foo: function() {}', Context.Strict | Context.Module, {}],
  ['loop1: function a() {}  while (true) { continue loop1; }', 'loop1: function a() {}  while (true) { continue loop1; }', Context.Empty, {}],
  ['{  break foo; var y=2; }', '{  break foo; var y=2; }', Context.Empty, {}],
  ['loop1: while (true) { loop2: function a() { break loop2; } }', 'loop1: while (true) { loop2: function a() { break loop2; } }', Context.Empty, {}],
  [`(function(){
    OuterLabel : var x=0, y=0;
    LABEL_DO_LOOP : do {
        LABEL_IN : x++;
        if(x===10)
            return;
        break LABEL_ANOTHER_LOOP;
        LABEL_IN_2 : y++;
        function IN_DO_FUNC(){}
    } while(0);
    LABEL_ANOTHER_LOOP : do {
        ;
    } while(0);
    function OUT_FUNC(){}
})();`, `(function(){
  OuterLabel : var x=0, y=0;
  LABEL_DO_LOOP : do {
      LABEL_IN : x++;
      if(x===10)
          return;
      break LABEL_ANOTHER_LOOP;
      LABEL_IN_2 : y++;
      function IN_DO_FUNC(){}
  } while(0);
  LABEL_ANOTHER_LOOP : do {
      ;
  } while(0);
  function OUT_FUNC(){}
})();`, Context.Empty, {}],
  [`LABEL1 : do {
    x++;
    (function(){break LABEL1;})();
    y++;
} while(0);`, `LABEL1 : do {
  x++;
  (function(){break LABEL1;})();
  y++;
} while(0);`, Context.Empty, {}],
[`(function(){
  OuterLabel : var x=0, y=0;
  LABEL_DO_LOOP : do {
      LABEL_IN : x++;
      if(x===10)
          return;
      break IN_DO_FUNC;
      LABEL_IN_2 : y++;
      function IN_DO_FUNC(){}
  } while(0);
  LABEL_ANOTHER_LOOP : do {
      ;
  } while(0);
  function OUT_FUNC(){}
})();`, `(function(){
  OuterLabel : var x=0, y=0;
  LABEL_DO_LOOP : do {
      LABEL_IN : x++;
      if(x===10)
          return;
      break IN_DO_FUNC;
      LABEL_IN_2 : y++;
      function IN_DO_FUNC(){}
  } while(0);
  LABEL_ANOTHER_LOOP : do {
      ;
  } while(0);
  function OUT_FUNC(){}
})();`, Context.Empty, {}],
[`(function(){
  OuterLabel : var x=0, y=0;
  LABEL_DO_LOOP : do {
      LABEL_IN : x++;
      if(x===10)
          return;
      break LABEL_IN;
      LABEL_IN_2 : y++;
      function IN_DO_FUNC(){}
  } while(0);
  LABEL_ANOTHER_LOOP : do {
      ;
  } while(0);
  function OUT_FUNC(){}
})();`, `(function(){
  OuterLabel : var x=0, y=0;
  LABEL_DO_LOOP : do {
      LABEL_IN : x++;
      if(x===10)
          return;
      break LABEL_IN;
      LABEL_IN_2 : y++;
      function IN_DO_FUNC(){}
  } while(0);
  LABEL_ANOTHER_LOOP : do {
      ;
  } while(0);
  function OUT_FUNC(){}
})();`, Context.Empty, {}],
[`(function(){
  OuterLabel : var x=0, y=0;
  LABEL_DO_LOOP : do {
      LABEL_IN : x++;
      if(x===10)
          return;
      break LABEL_IN;
      LABEL_IN_2 : y++;
      function IN_DO_FUNC(){}
  } while(0);
  LABEL_ANOTHER_LOOP : do {
      ;
  } while(0);
  function OUT_FUNC(){}
})();`, `(function(){
  OuterLabel : var x=0, y=0;
  LABEL_DO_LOOP : do {
      LABEL_IN : x++;
      if(x===10)
          return;
      break LABEL_IN;
      LABEL_IN_2 : y++;
      function IN_DO_FUNC(){}
  } while(0);
  LABEL_ANOTHER_LOOP : do {
      ;
  } while(0);
  function OUT_FUNC(){}
})();`, Context.Empty, {}],
[`var x=0,y=0;
try{
  LABEL1 : do {
    x++;
    throw "gonna leave it";
    y++;
  } while(0);
  $ERROR('#1: throw "gonna leave it" lead to throwing exception');
} catch(e){
  break;
  LABEL2 : do {
    x++;
    y++;
  } while(0);
}`, `var x=0,y=0;
try{
  LABEL1 : do {
    x++;
    throw "gonna leave it";
    y++;
  } while(0);
  $ERROR('#1: throw "gonna leave it" lead to throwing exception');
} catch(e){
  break;
  LABEL2 : do {
    x++;
    y++;
  } while(0);
}`, Context.Empty, {}],
['loop1: while (true) { loop2: function a() { break loop1; } }', 'loop1: while (true) { loop2: function a() { break loop1; } }', Context.Empty, {}],
['loop; while (true) { break loop1; }', 'loop; while (true) { break loop1; }', Context.Empty, {}],
];

pass('Statements - Block (pass)', valids);
fail('Statements - Block (failure)', invalids);

});

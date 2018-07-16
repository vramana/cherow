import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Return', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [
  ['_ => { return /a/g; }', '_ => { return /a/g; }', Context.OptionsRanges | Context.OptionsLoc, {
      "body": [
        {
          "end": 21,
          "expression": {
            "async": false,
            "body": {
              "body": [
                {
                  "argument": {
                    "end": 18,
                    "loc": {
                      "end": {
                        "column": 16,
                        "line": 1,
                      },
                      "start": {
                        "column": 14,
                        "line": 1,
                      }
                    },
                   "regex": {
                      "flags": "g",
                      "pattern": "a",
                    },
                    "start": 14,
                   "type": "Literal",
                    "value": /a/g,
                  },
                  "end": 19,
                  "loc": {
                    "end": {
                      "column": 17,
                      "line": 1,
                    },
                    "start": {
                      "column": 7,
                      "line": 1,
                    }
                  },
                  "start": 7,
                  "type": "ReturnStatement",
                }
              ],
              "end": 21,
              "loc": {
                "end": {
                  "column": 19,
                  "line": 1,
                },
                "start": {
                  "column": 5,
                  "line": 1,
                },
              },
              "start": 5,
              "type": "BlockStatement",
            },
           "end": 21,
            "expression": false,
            "generator": false,
            "id": null,
            "loc": {
              "end": {
                "column": 19,
                "line": 1,
              },
              "start": {
                "column": 0,
                "line": 1,
              }
            },
            "params": [
             {
                "end": 1,
                "loc": {
                  "end": {
                    "column": 1,
                    "line": 1,
                  },
                  "start": {
                    "column": 0,
                    "line": 1,
                  },
                },
                "name": "_",
                "start": 0,
                "type": "Identifier",
              },
            ],
            "start": 0,
            "type": "ArrowFunctionExpression",
          },
          "loc": {
            "end": {
              "column": 19,
              "line": 1,
            },
           "start": {
              "column": 0,
              "line": 1,
            },
         },
          "start": 0,
          "type": "ExpressionStatement",
        },
     ],
      "end": 21,
     "loc": {
        "end": {
          "column": 19,
          "line": 1,
        },
        "start": {
          "column": 0,
          "line": 1,
        },
      },
      "sourceType": "script",
      "start": 0,
      "type": "Program",
    }],
  ['_ => { return 0; }', '_ => { return 0; }', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'ArrowFunctionExpression',
                'body': {
                    'type': 'BlockStatement',
                    'body': [
                        {
                            'type': 'ReturnStatement',
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
                            'start': 7,
                            'end': 16,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 7
                                },
                                'end': {
                                    'line': 1,
                                    'column': 16
                                }
                            }
                        }
                    ],
                    'start': 5,
                    'end': 18,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 5
                        },
                        'end': {
                            'line': 1,
                            'column': 18
                        }
                    }
                },
                'params': [
                    {
                        'type': 'Identifier',
                        'name': '_',
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
                    }
                ],
                'id': null,
                'async': false,
                'generator': false,
                'expression': false,
                'start': 0,
                'end': 18,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 0
                    },
                    'end': {
                        'line': 1,
                        'column': 18
                    }
                }
            },
            'start': 0,
            'end': 18,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 18
                }
            }
        }
    ],
    'start': 0,
    'end': 18,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 18
        }
    }
}],
  ['(function(){ return x * y })', '(function(){ return x * y })', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'FunctionExpression',
                'params': [],
                'body': {
                    'type': 'BlockStatement',
                    'body': [
                        {
                            'type': 'ReturnStatement',
                            'argument': {
                                'type': 'BinaryExpression',
                                'left': {
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
                                'right': {
                                    'type': 'Identifier',
                                    'name': 'y',
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
                                'operator': '*',
                                'start': 20,
                                'end': 25,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 20
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 25
                                    }
                                }
                            },
                            'start': 13,
                            'end': 25,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 13
                                },
                                'end': {
                                    'line': 1,
                                    'column': 25
                                }
                            }
                        }
                    ],
                    'start': 11,
                    'end': 27,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 11
                        },
                        'end': {
                            'line': 1,
                            'column': 27
                        }
                    }
                },
                'async': false,
                'generator': false,
                'expression': false,
                'id': null,
                'start': 1,
                'end': 27,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 1
                    },
                    'end': {
                        'line': 1,
                        'column': 27
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
  ['(function(){ return x; })', '(function(){ return x; })', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'FunctionExpression',
                'params': [],
                'body': {
                    'type': 'BlockStatement',
                    'body': [
                        {
                            'type': 'ReturnStatement',
                            'argument': {
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
                            'start': 13,
                            'end': 22,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 13
                                },
                                'end': {
                                    'line': 1,
                                    'column': 22
                                }
                            }
                        }
                    ],
                    'start': 11,
                    'end': 24,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 11
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
                'id': null,
                'start': 1,
                'end': 24,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 1
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
  ['(function(){ return; })', '(function(){ return; })', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'FunctionExpression',
                'params': [],
                'body': {
                    'type': 'BlockStatement',
                    'body': [
                        {
                            'type': 'ReturnStatement',
                            'argument': null,
                            'start': 13,
                            'end': 20,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 13
                                },
                                'end': {
                                    'line': 1,
                                    'column': 20
                                }
                            }
                        }
                    ],
                    'start': 11,
                    'end': 22,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 11
                        },
                        'end': {
                            'line': 1,
                            'column': 22
                        }
                    }
                },
                'async': false,
                'generator': false,
                'expression': false,
                'id': null,
                'start': 1,
                'end': 22,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 1
                    },
                    'end': {
                        'line': 1,
                        'column': 22
                    }
                }
            },
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
  ['(function(){ return })', '(function(){ return })', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'FunctionExpression',
                'params': [],
                'body': {
                    'type': 'BlockStatement',
                    'body': [
                        {
                            'type': 'ReturnStatement',
                            'argument': null,
                            'start': 13,
                            'end': 19,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 13
                                },
                                'end': {
                                    'line': 1,
                                    'column': 19
                                }
                            }
                        }
                    ],
                    'start': 11,
                    'end': 21,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 11
                        },
                        'end': {
                            'line': 1,
                            'column': 21
                        }
                    }
                },
                'async': false,
                'generator': false,
                'expression': false,
                'id': null,
                'start': 1,
                'end': 21,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 1
                    },
                    'end': {
                        'line': 1,
                        'column': 21
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
  ['return;', 'return;', Context.OptionsRanges | Context.OptionsLoc, {}],
  ['{ return; }', '{ return; }', Context.OptionsRanges | Context.OptionsLoc, {}],
  ['if (false) { return; }', 'if (false) { return; }', Context.OptionsRanges | Context.OptionsLoc, {}],
  ['do { return; } while(0);', 'do { return; } while(0);', Context.OptionsRanges | Context.OptionsLoc, {}],
];

fail('Statements - Return (failure)', invalids);
pass('Statements - Return (pass)', valids);

});

import * as t from 'assert';
import { pass } from '../../test-utils';
import { Context } from '../../../src/common';
import { parseSource } from '../../../src/parser/parser'

describe('Statements - While', () => {

  describe('Failure', () => {

    const invalidSyntax = [
        `while 1 break;`,
        'while 0 break;',
        'while false break;',
        `while 'hood' break;`,
        `while (false) async function* g() {}`,
        `while (false) label1: label2: function f() {}`,
        'while (false) function f() {}',
        'while (false) function* g() {}',
        'while (false) class C {}',
        'while (false) let x = 1;',
        'while (false) async function f() {}',
        'while 0 break;',
        'while true break;',
        'while "hood" break;',
        'while ( false ) Label: continue Label;',
        `while '' break;`,
        `while() {}`,
    ];

    for (const arg of invalidSyntax) {
        it(`${arg}`, () => {
            t.throws(() => {
                parseSource(`${arg}`, undefined, Context.Empty);
            });
        });
    }
  });

  describe('Pass', () => {

    pass('while (i-->0) {}', Context.OptionsLoc | Context.OptionsRanges, {
      source: 'while (i-->0) {}',
      expected: {
        "type": "Program",
        "sourceType": "script",
        "body": [
            {
                "type": "WhileStatement",
                "test": {
                    "type": "BinaryExpression",
                    "left": {
                        "type": "UpdateExpression",
                        "argument": {
                            "type": "Identifier",
                            "name": "i",
                            "start": 7,
                            "end": 8,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 7
                                },
                                "end": {
                                    "line": 1,
                                    "column": 8
                                }
                            }
                        },
                        "operator": "--",
                        "prefix": false,
                        "start": 7,
                        "end": 10,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 7
                            },
                            "end": {
                                "line": 1,
                                "column": 10
                            }
                        }
                    },
                    "right": {
                        "type": "Literal",
                        "value": 0,
                        "start": 11,
                        "end": 12,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 11
                            },
                            "end": {
                                "line": 1,
                                "column": 12
                            }
                        }
                    },
                    "operator": ">",
                    "start": 7,
                    "end": 12,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 7
                        },
                        "end": {
                            "line": 1,
                            "column": 12
                        }
                    }
                },
                "body": {
                    "type": "BlockStatement",
                    "body": [],
                    "start": 14,
                    "end": 16,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 14
                        },
                        "end": {
                            "line": 1,
                            "column": 16
                        }
                    }
                },
                "start": 0,
                "end": 16,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 16
                    }
                }
            }
        ],
        "start": 0,
        "end": 16,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 1,
                "column": 16
            }
        }
    }
    });

    pass('while (x < 10) { x++; y--; }', Context.OptionsLoc | Context.OptionsRanges, {
      source: 'while (x < 10) { x++; y--; }',
      expected: {
        "type": "Program",
        "sourceType": "script",
        "body": [
            {
                "type": "WhileStatement",
                "test": {
                    "type": "BinaryExpression",
                    "left": {
                        "type": "Identifier",
                        "name": "x",
                        "start": 7,
                        "end": 8,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 7
                            },
                            "end": {
                                "line": 1,
                                "column": 8
                            }
                        }
                    },
                    "right": {
                        "type": "Literal",
                        "value": 10,
                        "start": 11,
                        "end": 13,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 11
                            },
                            "end": {
                                "line": 1,
                                "column": 13
                            }
                        }
                    },
                    "operator": "<",
                    "start": 7,
                    "end": 13,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 7
                        },
                        "end": {
                            "line": 1,
                            "column": 13
                        }
                    }
                },
                "body": {
                    "type": "BlockStatement",
                    "body": [
                        {
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "UpdateExpression",
                                "argument": {
                                    "type": "Identifier",
                                    "name": "x",
                                    "start": 17,
                                    "end": 18,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 17
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 18
                                        }
                                    }
                                },
                                "operator": "++",
                                "prefix": false,
                                "start": 17,
                                "end": 20,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 17
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 20
                                    }
                                }
                            },
                            "start": 17,
                            "end": 21,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 17
                                },
                                "end": {
                                    "line": 1,
                                    "column": 21
                                }
                            }
                        },
                        {
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "UpdateExpression",
                                "argument": {
                                    "type": "Identifier",
                                    "name": "y",
                                    "start": 22,
                                    "end": 23,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 22
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 23
                                        }
                                    }
                                },
                                "operator": "--",
                                "prefix": false,
                                "start": 22,
                                "end": 25,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 22
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 25
                                    }
                                }
                            },
                            "start": 22,
                            "end": 26,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 22
                                },
                                "end": {
                                    "line": 1,
                                    "column": 26
                                }
                            }
                        }
                    ],
                    "start": 15,
                    "end": 28,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 15
                        },
                        "end": {
                            "line": 1,
                            "column": 28
                        }
                    }
                },
                "start": 0,
                "end": 28,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 28
                    }
                }
            }
        ],
        "start": 0,
        "end": 28,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 1,
                "column": 28
            }
        }
    }
    });

    pass('while(1);', Context.OptionsLoc | Context.OptionsRanges, {
      source: 'while(1);',
      expected: {
        "type": "Program",
        "sourceType": "script",
        "body": [
            {
                "type": "WhileStatement",
                "test": {
                    "type": "Literal",
                    "value": 1,
                    "start": 6,
                    "end": 7,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 6
                        },
                        "end": {
                            "line": 1,
                            "column": 7
                        }
                    }
                },
                "body": {
                    "type": "EmptyStatement",
                    "start": 8,
                    "end": 9,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 8
                        },
                        "end": {
                            "line": 1,
                            "column": 9
                        }
                    }
                },
                "start": 0,
                "end": 9,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 9
                    }
                }
            }
        ],
        "start": 0,
        "end": 9,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 1,
                "column": 9
            }
        }
    }
    });


       pass('while(function a(){return 1;}()){ break }', Context.OptionsLoc | Context.OptionsRanges, {
            source: 'while(function a(){return 1;}()){ break }',
            expected: {
              "type": "Program",
              "sourceType": "script",
              "body": [
                  {
                      "type": "WhileStatement",
                      "test": {
                          "type": "CallExpression",
                          "callee": {
                              "type": "FunctionExpression",
                              "params": [],
                              "body": {
                                  "type": "BlockStatement",
                                  "body": [
                                      {
                                          "type": "ReturnStatement",
                                          "argument": {
                                              "type": "Literal",
                                              "value": 1,
                                              "start": 26,
                                              "end": 27,
                                              "loc": {
                                                  "start": {
                                                      "line": 1,
                                                      "column": 26
                                                  },
                                                  "end": {
                                                      "line": 1,
                                                      "column": 27
                                                  }
                                              }
                                          },
                                          "start": 19,
                                          "end": 28,
                                          "loc": {
                                              "start": {
                                                  "line": 1,
                                                  "column": 19
                                              },
                                              "end": {
                                                  "line": 1,
                                                  "column": 28
                                              }
                                          }
                                      }
                                  ],
                                  "start": 18,
                                  "end": 29,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 18
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 29
                                      }
                                  }
                              },
                              "async": false,
                              "generator": false,
                              "expression": false,
                              "id": {
                                  "type": "Identifier",
                                  "name": "a",
                                  "start": 15,
                                  "end": 16,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 15
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 16
                                      }
                                  }
                              },
                              "start": 6,
                              "end": 29,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 6
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 29
                                  }
                              }
                          },
                          "arguments": [],
                          "start": 6,
                          "end": 31,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 6
                              },
                              "end": {
                                  "line": 1,
                                  "column": 31
                              }
                          }
                      },
                      "body": {
                          "type": "BlockStatement",
                          "body": [
                              {
                                  "type": "BreakStatement",
                                  "label": null,
                                  "start": 34,
                                  "end": 39,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 34
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 39
                                      }
                                  }
                              }
                          ],
                          "start": 32,
                          "end": 41,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 32
                              },
                              "end": {
                                  "line": 1,
                                  "column": 41
                              }
                          }
                      },
                      "start": 0,
                      "end": 41,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 0
                          },
                          "end": {
                              "line": 1,
                              "column": 41
                          }
                      }
                  }
              ],
              "start": 0,
              "end": 41,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 41
                  }
              }
          }
       });
    });
});

import { pass, fail } from '../utils';

describe('Miscellaneous - ASI', () => {

  fail(`Variable1 \n ++ \n ++ \n Variable2 construction`, {
    source: `var x=0, y=0;
    var z=
    x
    ++
    ++
    y`,
});    

fail(`invalid Do-While Statement ASI`, {
  source: `do {}; \n while(false)`,
});    

fail(`for header is (false \n false \n)`, {
  source: `for(false
    false
) {
  break;
}`,
});    

fail(`for header is (\n false \n)`, {
  source: `for(
    false
) {
  break;
}`,
});    

fail(`for header is (\n semicolon false)`, {
  source: `for(
    ;false) {
      break;
    }`,
});    

  fail(`for(false;false;;false) { break; }`, {
        source: `for(false;false;;false) {
            break;
          }`,
    });    

    fail(`\n while(false)`, {
        source: `\n while(false)`,
    });    

    pass(`;;1;;1;;1`, {
      source: `;;1;;1;;1`,
      loc: true,
      ranges: true,
      raw: true,
      expected: {
        "type": "Program",
        "body": [
            {
                "type": "EmptyStatement",
                "start": 0,
                "end": 1,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 1
                    }
                }
            },
            {
                "type": "EmptyStatement",
                "start": 1,
                "end": 2,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 1
                    },
                    "end": {
                        "line": 1,
                        "column": 2
                    }
                }
            },
            {
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": 1,
                    "start": 2,
                    "end": 3,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 2
                        },
                        "end": {
                            "line": 1,
                            "column": 3
                        }
                    },
                    "raw": "1"
                },
                "start": 2,
                "end": 4,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 2
                    },
                    "end": {
                        "line": 1,
                        "column": 4
                    }
                }
            },
            {
                "type": "EmptyStatement",
                "start": 4,
                "end": 5,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 4
                    },
                    "end": {
                        "line": 1,
                        "column": 5
                    }
                }
            },
            {
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": 1,
                    "start": 5,
                    "end": 6,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 5
                        },
                        "end": {
                            "line": 1,
                            "column": 6
                        }
                    },
                    "raw": "1"
                },
                "start": 5,
                "end": 7,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 5
                    },
                    "end": {
                        "line": 1,
                        "column": 7
                    }
                }
            },
            {
                "type": "EmptyStatement",
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
            {
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": 1,
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
                    },
                    "raw": "1"
                },
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
            }
        ],
        "sourceType": "script",
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

    pass(`;;;;`, {
      source: `;;;;`,
      loc: true,
      ranges: true,
      raw: true,
      expected: {
        "type": "Program",
        "body": [
            {
                "type": "EmptyStatement",
                "start": 0,
                "end": 1,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 1
                    }
                }
            },
            {
                "type": "EmptyStatement",
                "start": 1,
                "end": 2,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 1
                    },
                    "end": {
                        "line": 1,
                        "column": 2
                    }
                }
            },
            {
                "type": "EmptyStatement",
                "start": 2,
                "end": 3,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 2
                    },
                    "end": {
                        "line": 1,
                        "column": 3
                    }
                }
            },
            {
                "type": "EmptyStatement",
                "start": 3,
                "end": 4,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 3
                    },
                    "end": {
                        "line": 1,
                        "column": 4
                    }
                }
            }
        ],
        "sourceType": "script",
        "start": 0,
        "end": 4,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 1,
                "column": 4
            }
        }
    }
    });

    pass(`0\n;`, {
      source: `0\n;`,
      raw: true,
      expected: {
          "body": [
            {
              "expression": {
                "raw": "0",
                "type": "Literal",
                "value": 0,
              },
              "type": "ExpressionStatement"
            }
          ],
          "sourceType": "script",
          "type": "Program"
        }
    });

    pass(`x: while(true) { continue x\n; }`, {
      source: `    \t \f\v 'abc'  \t `,
      raw: true,
      expected: {
          "body": [
            {
              "directive": "abc",
              "expression": {
                "raw": "'abc'",
                "type": "Literal",
                "value": "abc"
              },
             "type": "ExpressionStatement"
            }
          ],
          "sourceType": "script",
          "type": "Program"
        }
    });

    pass(`    \t \f\v\n 'abc'  \t `, {
      source: `    \t \f\v\n 'abc'  \t `,
      raw: true,
      expected: {
          "body": [
            {
              "directive": "abc",
              "expression": {
                "raw": "'abc'",
                "type": "Literal",
                "value": "abc",
              },
              "type": "ExpressionStatement"
            },
          ],
          "sourceType": "script",
          "type": "Program"
        }
    });

    pass(`    \t \f\v\n`, {
      source: `    \t \f\v\n`,
      raw: true,
      expected: {
          "body": [],
          "sourceType": "script",
          "type": "Program"
        }
    });

    pass(`x: while(true) { continue x\n; }`, {
        source: `x: while(true) { continue x
            ; }`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            "type": "Program",
            "start": 0,
            "end": 43,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 2,
                "column": 15
              }
            },
            "body": [
              {
                "type": "LabeledStatement",
                "start": 0,
                "end": 43,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 2,
                    "column": 15
                  }
                },
                "body": {
                  "type": "WhileStatement",
                  "start": 3,
                  "end": 43,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 3
                    },
                    "end": {
                      "line": 2,
                      "column": 15
                    }
                  },
                  "test": {
                    "type": "Literal",
                    "start": 9,
                    "end": 13,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 9
                      },
                      "end": {
                        "line": 1,
                        "column": 13
                      }
                    },
                    
                    "value": true,
                    "raw": "true"
                  },
                  "body": {
                    "type": "BlockStatement",
                    "start": 15,
                    "end": 43,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 15
                      },
                      "end": {
                        "line": 2,
                        "column": 15
                      }
                    },
                    "body": [
                      {
                        "type": "ContinueStatement",
                        "start": 17,
                        "end": 41,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 17
                          },
                          "end": {
                            "line": 2,
                            "column": 13
                          }
                        },
                        "label": {
                          "type": "Identifier",
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
                          },
                          "name": "x"
                        }
                      }
                    ]
                  }
                },
                "label": {
                  "type": "Identifier",
                  "start": 0,
                  "end": 1,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 0
                    },
                    "end": {
                      "line": 1,
                      "column": 1
                    }
                  },
                  "name": "x"
                }
              }
            ],
            "sourceType": "script"
          }
    });
/*
    pass(`function f() { return\n; }`, {
      source: `function f() { return
          ; }`,
      loc: true,
      ranges: true,
      raw: true,    
      expected: {}
    });

    pass(`function f() { return\n; }`, {
      source: `function f() { return
          ; }`,
      loc: true,
      ranges: true,
      raw: true,    
      expected: {}
    });

    pass(`function f() { return\n; }`, {
      source: `function f() { return
          ; }`,
      loc: true,
      ranges: true,
      raw: true,    
      expected: {}
    });

    pass(`function f() { return\n; }`, {
      source: `function f() { return
          ; }`,
      loc: true,
      ranges: true,
      raw: true,    
      expected: {}
    });
*/
    pass(`function f() { return\n; }`, {
        source: `function f() { return
            ; }`,
        loc: true,
        ranges: true,
        raw: true,    
        expected: {
            "type": "Program",
            "start": 0,
            "end": 37,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 2,
                "column": 15
              }
            },
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 37,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 2,
                    "column": 15
                  }
                },
                "id": {
                  "type": "Identifier",
                  "start": 9,
                  "end": 10,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 9
                    },
                    "end": {
                      "line": 1,
                      "column": 10
                    }
                  },
                  "name": "f"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 13,
                  "end": 37,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 13
                    },
                    "end": {
                      "line": 2,
                      "column": 15
                    }
                  },
                  "body": [
                    {
                      "type": "ReturnStatement",
                      "start": 15,
                      "end": 35,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 15
                        },
                        "end": {
                          "line": 2,
                          "column": 13
                        }
                      },
                      "argument": null
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          }
    });

    pass(`if(a)b\n;else c;`, {
        source: `if(a)b
        ;else c;`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            "type": "Program",
            "start": 0,
            "end": 23,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 2,
                "column": 16
              }
            },
            "body": [
              {
                "type": "IfStatement",
                "start": 0,
                "end": 23,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 2,
                    "column": 16
                  }
                },
                "test": {
                  "type": "Identifier",
                  "start": 3,
                  "end": 4,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 3
                    },
                    "end": {
                      "line": 1,
                      "column": 4
                    }
                  },
                  "name": "a"
                },
                "consequent": {
                  "type": "ExpressionStatement",
                  "start": 5,
                  "end": 16,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 5
                    },
                    "end": {
                      "line": 2,
                      "column": 9
                    }
                  },
                  "expression": {
                    "type": "Identifier",
                    "start": 5,
                    "end": 6,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 5
                      },
                      "end": {
                        "line": 1,
                        "column": 6
                      }
                    },
                    "name": "b"
                  }
                },
                "alternate": {
                  "type": "ExpressionStatement",
                  "start": 21,
                  "end": 23,
                  "loc": {
                    "start": {
                      "line": 2,
                      "column": 14
                    },
                    "end": {
                      "line": 2,
                      "column": 16
                    }
                  },
                  "expression": {
                    "type": "Identifier",
                    "start": 21,
                    "end": 22,
                    "loc": {
                      "start": {
                        "line": 2,
                        "column": 14
                      },
                      "end": {
                        "line": 2,
                        "column": 15
                      }
                    },
                    "name": "c"
                  }
                }
              }
            ],
            "sourceType": "script"
          }
    });

    pass(`do {} \n while(false)`, {
        source: `do {} 
         while(false)`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            "type": "Program",
            "start": 0,
            "end": 28,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 2,
                "column": 21
              }
            },
            "body": [
              {
                "type": "DoWhileStatement",
                "start": 0,
                "end": 28,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 2,
                    "column": 21
                  }
                },
                "body": {
                  "type": "BlockStatement",
                  "start": 3,
                  "end": 5,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 3
                    },
                    "end": {
                      "line": 1,
                      "column": 5
                    }
                  },
                  "body": []
                },
                "test": {
                  "type": "Literal",
                  "start": 22,
                  "end": 27,
                  "loc": {
                    "start": {
                      "line": 2,
                      "column": 15
                    },
                    "end": {
                      "line": 2,
                      "column": 20
                    }
                  },
                  "value": false,
                  "raw": "false"
                }
              }
            ],
            "sourceType": "script"
          }
    });
});
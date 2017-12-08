import { pass, fail } from '../utils';

describe('Miscellaneous - ASI', () => {

    fail(`for(false;false;;false) { break; }`, {
        source: `for(false;false;;false) {
            break;
          }`,
    });    

    fail(`\n while(false)`, {
        source: `\n while(false)`,
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
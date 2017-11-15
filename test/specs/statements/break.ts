import { fail, pass } from '../utils/test-utils';

describe('Statement - Break', () => {

    fail('break appear without an iteration statement', 'var x=1; break; var y=2;');
    fail('break appear within "try/catch"', 'try{} catch(e){ break; }');

    fail(' break appear within a block', 'var x=1; break; var y=2;');

    pass('should parse semicolon newline', `while (true) {
            if (x) break
            ;
            else y;
        }`, {
          "type": "Program",
          "start": 0,
          "end": 83,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 5,
              "column": 9
            }
          },
          "body": [
            {
              "type": "WhileStatement",
              "start": 0,
              "end": 83,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 5,
                  "column": 9
                }
              },
              "test": {
                "type": "Literal",
                "start": 7,
                "end": 11,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 7
                  },
                  "end": {
                    "line": 1,
                    "column": 11
                  }
                },
                "value": true,
                "raw": "true"
              },
              "body": {
                "type": "BlockStatement",
                "start": 13,
                "end": 83,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 13
                  },
                  "end": {
                    "line": 5,
                    "column": 9
                  }
                },
                "body": [
                  {
                    "type": "IfStatement",
                    "start": 27,
                    "end": 73,
                    "loc": {
                      "start": {
                        "line": 2,
                        "column": 12
                      },
                      "end": {
                        "line": 4,
                        "column": 19
                      }
                    },
                    "test": {
                      "type": "Identifier",
                      "start": 31,
                      "end": 32,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 16
                        },
                        "end": {
                          "line": 2,
                          "column": 17
                        }
                      },
                      "name": "x"
                    },
                    "consequent": {
                      "type": "BreakStatement",
                      "start": 34,
                      "end": 53,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 19
                        },
                        "end": {
                          "line": 3,
                          "column": 13
                        }
                      },
                      "label": null
                    },
                    "alternate": {
                      "type": "ExpressionStatement",
                      "start": 71,
                      "end": 73,
                      "loc": {
                        "start": {
                          "line": 4,
                          "column": 17
                        },
                        "end": {
                          "line": 4,
                          "column": 19
                        }
                      },
                      "expression": {
                        "type": "Identifier",
                        "start": 71,
                        "end": 72,
                        "loc": {
                          "start": {
                            "line": 4,
                            "column": 17
                          },
                          "end": {
                            "line": 4,
                            "column": 18
                          }
                        },
                        "name": "y"
                      }
                    }
                  }
                ]
              }
            }
          ],
          "sourceType": "script"
        });

    pass('should parse "done: while (true) { break done; }"', 'done: while (true) { break done; }', {
      "type": "Program",
      "body": [
          {
              "type": "LabeledStatement",
              "label": {
                  "type": "Identifier",
                  "name": "done",
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
              },
              "body": {
                  "type": "WhileStatement",
                  "test": {
                      "type": "Literal",
                      "value": true,
                      "start": 13,
                      "end": 17,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 13
                          },
                          "end": {
                              "line": 1,
                              "column": 17
                          }
                      },
                      "raw": "true"
                  },
                  "body": {
                      "type": "BlockStatement",
                      "body": [
                          {
                              "type": "BreakStatement",
                              "label": {
                                  "type": "Identifier",
                                  "name": "done",
                                  "start": 27,
                                  "end": 31,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 27
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 31
                                      }
                                  }
                              },
                              "start": 21,
                              "end": 32,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 21
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 32
                                  }
                              }
                          }
                      ],
                      "start": 19,
                      "end": 34,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 19
                          },
                          "end": {
                              "line": 1,
                              "column": 34
                          }
                      }
                  },
                  "start": 6,
                  "end": 34,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 6
                      },
                      "end": {
                          "line": 1,
                          "column": 34
                      }
                  }
              },
              "start": 0,
              "end": 34,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 34
                  }
              }
          }
      ],
      "sourceType": "script",
      "start": 0,
      "end": 34,
      "loc": {
          "start": {
              "line": 1,
              "column": 0
          },
          "end": {
              "line": 1,
              "column": 34
          }
      }
  });

    pass('should parse __proto__: while (true) { break __proto__; }', '__proto__: while (true) { break __proto__; }', {
      "type": "Program",
      "body": [
          {
              "type": "LabeledStatement",
              "label": {
                  "type": "Identifier",
                  "name": "__proto__",
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
              },
              "body": {
                  "type": "WhileStatement",
                  "test": {
                      "type": "Literal",
                      "value": true,
                      "start": 18,
                      "end": 22,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 18
                          },
                          "end": {
                              "line": 1,
                              "column": 22
                          }
                      },
                      "raw": "true"
                  },
                  "body": {
                      "type": "BlockStatement",
                      "body": [
                          {
                              "type": "BreakStatement",
                              "label": {
                                  "type": "Identifier",
                                  "name": "__proto__",
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
                              "start": 26,
                              "end": 42,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 26
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 42
                                  }
                              }
                          }
                      ],
                      "start": 24,
                      "end": 44,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 24
                          },
                          "end": {
                              "line": 1,
                              "column": 44
                          }
                      }
                  },
                  "start": 11,
                  "end": 44,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 11
                      },
                      "end": {
                          "line": 1,
                          "column": 44
                      }
                  }
              },
              "start": 0,
              "end": 44,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 44
                  }
              }
          }
      ],
      "sourceType": "script",
      "start": 0,
      "end": 44,
      "loc": {
          "start": {
              "line": 1,
              "column": 0
          },
          "end": {
              "line": 1,
              "column": 44
          }
      }
  });
});
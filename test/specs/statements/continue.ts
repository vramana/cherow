import { fail, pass } from '../utils/test-utils';

describe('Statement - Continue', () => {

  fail ('appearing of continue without an iteration statement', 'var x=1; continue; var y=2;');

  pass('while (true) { continue }', "while (true) { continue }", {
    "type": "Program",
    "body": [
        {
            "type": "WhileStatement",
            "test": {
                "type": "Literal",
                "value": true,
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
                "raw": "true"
            },
            "body": {
                "type": "BlockStatement",
                "body": [
                    {
                        "type": "ContinueStatement",
                        "label": null,
                        "start": 15,
                        "end": 23,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 15
                            },
                            "end": {
                                "line": 1,
                                "column": 23
                            }
                        }
                    }
                ],
                "start": 13,
                "end": 25,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 13
                    },
                    "end": {
                        "line": 1,
                        "column": 25
                    }
                }
            },
            "start": 0,
            "end": 25,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 25
                }
            }
        }
    ],
    "sourceType": "script",
    "start": 0,
    "end": 25,
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 1,
            "column": 25
        }
    }
});

  pass('should parse labeled continue', `label: for (let x = 0; x < 10;) {
            while (true) {
              x++;
              continue label;
            }
          }`, {
          "type": "Program",
          "start": 0,
          "end": 135,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 6,
              "column": 11
            }
          },
          "body": [
            {
              "type": "LabeledStatement",
              "start": 0,
              "end": 135,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 6,
                  "column": 11
                }
              },
              "body": {
                "type": "ForStatement",
                "start": 7,
                "end": 135,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 7
                  },
                  "end": {
                    "line": 6,
                    "column": 11
                  }
                },
                "init": {
                  "type": "VariableDeclaration",
                  "start": 12,
                  "end": 21,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 12
                    },
                    "end": {
                      "line": 1,
                      "column": 21
                    }
                  },
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
                      "start": 16,
                      "end": 21,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 16
                        },
                        "end": {
                          "line": 1,
                          "column": 21
                        }
                      },
                      "id": {
                        "type": "Identifier",
                        "start": 16,
                        "end": 17,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 16
                          },
                          "end": {
                            "line": 1,
                            "column": 17
                          }
                        },
                        "name": "x"
                      },
                      "init": {
                        "type": "Literal",
                        "start": 20,
                        "end": 21,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 20
                          },
                          "end": {
                            "line": 1,
                            "column": 21
                          }
                        },
                        "value": 0,
                        "raw": "0"
                      }
                    }
                  ],
                  "kind": "let"
                },
                "test": {
                  "type": "BinaryExpression",
                  "start": 23,
                  "end": 29,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 23
                    },
                    "end": {
                      "line": 1,
                      "column": 29
                    }
                  },
                  "left": {
                    "type": "Identifier",
                    "start": 23,
                    "end": 24,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 23
                      },
                      "end": {
                        "line": 1,
                        "column": 24
                      }
                    },
                    "name": "x"
                  },
                  "operator": "<",
                  "right": {
                    "type": "Literal",
                    "start": 27,
                    "end": 29,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 27
                      },
                      "end": {
                        "line": 1,
                        "column": 29
                      }
                    },
                    "value": 10,
                    "raw": "10"
                  }
                },
                "update": null,
                "body": {
                  "type": "BlockStatement",
                  "start": 32,
                  "end": 135,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 32
                    },
                    "end": {
                      "line": 6,
                      "column": 11
                    }
                  },
                  "body": [
                    {
                      "type": "WhileStatement",
                      "start": 46,
                      "end": 123,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 12
                        },
                        "end": {
                          "line": 5,
                          "column": 13
                        }
                      },
                      "test": {
                        "type": "Literal",
                        "start": 53,
                        "end": 57,
                        "loc": {
                          "start": {
                            "line": 2,
                            "column": 19
                          },
                          "end": {
                            "line": 2,
                            "column": 23
                          }
                        },
                        "value": true,
                        "raw": "true"
                      },
                      "body": {
                        "type": "BlockStatement",
                        "start": 59,
                        "end": 123,
                        "loc": {
                          "start": {
                            "line": 2,
                            "column": 25
                          },
                          "end": {
                            "line": 5,
                            "column": 13
                          }
                        },
                        "body": [
                          {
                            "type": "ExpressionStatement",
                            "start": 75,
                            "end": 79,
                            "loc": {
                              "start": {
                                "line": 3,
                                "column": 14
                              },
                              "end": {
                                "line": 3,
                                "column": 18
                              }
                            },
                            "expression": {
                              "type": "UpdateExpression",
                              "start": 75,
                              "end": 78,
                              "loc": {
                                "start": {
                                  "line": 3,
                                  "column": 14
                                },
                                "end": {
                                  "line": 3,
                                  "column": 17
                                }
                              },
                              "operator": "++",
                              "prefix": false,
                              "argument": {
                                "type": "Identifier",
                                "start": 75,
                                "end": 76,
                                "loc": {
                                  "start": {
                                    "line": 3,
                                    "column": 14
                                  },
                                  "end": {
                                    "line": 3,
                                    "column": 15
                                  }
                                },
                                "name": "x"
                              }
                            }
                          },
                          {
                            "type": "ContinueStatement",
                            "start": 94,
                            "end": 109,
                            "loc": {
                              "start": {
                                "line": 4,
                                "column": 14
                              },
                              "end": {
                                "line": 4,
                                "column": 29
                              }
                            },
                            "label": {
                              "type": "Identifier",
                              "start": 103,
                              "end": 108,
                              "loc": {
                                "start": {
                                  "line": 4,
                                  "column": 23
                                },
                                "end": {
                                  "line": 4,
                                  "column": 28
                                }
                              },
                              "name": "label"
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              "label": {
                "type": "Identifier",
                "start": 0,
                "end": 5,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 5
                  }
                },
                "name": "label"
              }
            }
          ],
          "sourceType": "script"
        });
});
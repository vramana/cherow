import { fail, pass } from '../utils/test-utils';

describe('Block scope - For In', () => {

  fail('disallow multiple lexical bindings, with and without initializer', 'for (let x = 3, y in {}) { }');
  fail('disallow multiple lexical bindings, with initializer', 'for (let x = 3, y = 4 in {}) { }');
  fail('statement position if statement expression', '"use strict"; if (true) function g() {}');

  pass('should parse with mixed values in iteration', `function fn(x) {
            let a = [];
            for (let p in x) {
            }
            let k = 0;
            for (let q in x) {
              ++k;
            }
          }`, {
          "type": "Program",
          "start": 0,
          "end": 184,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 9,
              "column": 11
            }
          },
          "body": [
            {
              "type": "FunctionDeclaration",
              "start": 0,
              "end": 184,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 9,
                  "column": 11
                }
              },
              "id": {
                "type": "Identifier",
                "start": 9,
                "end": 11,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 9
                  },
                  "end": {
                    "line": 1,
                    "column": 11
                  }
                },
                "name": "fn"
              },
              "generator": false,
              "expression": false,
              "async": false,
              "params": [
                {
                  "type": "Identifier",
                  "start": 12,
                  "end": 13,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 12
                    },
                    "end": {
                      "line": 1,
                      "column": 13
                    }
                  },
                  "name": "x"
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 15,
                "end": 184,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 15
                  },
                  "end": {
                    "line": 9,
                    "column": 11
                  }
                },
                "body": [
                  {
                    "type": "VariableDeclaration",
                    "start": 29,
                    "end": 40,
                    "loc": {
                      "start": {
                        "line": 2,
                        "column": 12
                      },
                      "end": {
                        "line": 2,
                        "column": 23
                      }
                    },
                    "declarations": [
                      {
                        "type": "VariableDeclarator",
                        "start": 33,
                        "end": 39,
                        "loc": {
                          "start": {
                            "line": 2,
                            "column": 16
                          },
                          "end": {
                            "line": 2,
                            "column": 22
                          }
                        },
                        "id": {
                          "type": "Identifier",
                          "start": 33,
                          "end": 34,
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
                          "name": "a"
                        },
                        "init": {
                          "type": "ArrayExpression",
                          "start": 37,
                          "end": 39,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 20
                            },
                            "end": {
                              "line": 2,
                              "column": 22
                            }
                          },
                          "elements": []
                        }
                      }
                    ],
                    "kind": "let"
                  },
                  {
                    "type": "ForInStatement",
                    "start": 53,
                    "end": 85,
                    "loc": {
                      "start": {
                        "line": 3,
                        "column": 12
                      },
                      "end": {
                        "line": 4,
                        "column": 13
                      }
                    },
                    "left": {
                      "type": "VariableDeclaration",
                      "start": 58,
                      "end": 63,
                      "loc": {
                        "start": {
                          "line": 3,
                          "column": 17
                        },
                        "end": {
                          "line": 3,
                          "column": 22
                        }
                      },
                      "declarations": [
                        {
                          "type": "VariableDeclarator",
                          "start": 62,
                          "end": 63,
                          "loc": {
                            "start": {
                              "line": 3,
                              "column": 21
                            },
                            "end": {
                              "line": 3,
                              "column": 22
                            }
                          },
                          "id": {
                            "type": "Identifier",
                            "start": 62,
                            "end": 63,
                            "loc": {
                              "start": {
                                "line": 3,
                                "column": 21
                              },
                              "end": {
                                "line": 3,
                                "column": 22
                              }
                            },
                            "name": "p"
                          },
                          "init": null
                        }
                      ],
                      "kind": "let"
                    },
                    "right": {
                      "type": "Identifier",
                      "start": 67,
                      "end": 68,
                      "loc": {
                        "start": {
                          "line": 3,
                          "column": 26
                        },
                        "end": {
                          "line": 3,
                          "column": 27
                        }
                      },
                      "name": "x"
                    },
                    "body": {
                      "type": "BlockStatement",
                      "start": 70,
                      "end": 85,
                      "loc": {
                        "start": {
                          "line": 3,
                          "column": 29
                        },
                        "end": {
                          "line": 4,
                          "column": 13
                        }
                      },
                      "body": []
                    }
                  },
                  {
                    "type": "VariableDeclaration",
                    "start": 98,
                    "end": 108,
                    "loc": {
                      "start": {
                        "line": 5,
                        "column": 12
                      },
                      "end": {
                        "line": 5,
                        "column": 22
                      }
                    },
                    "declarations": [
                      {
                        "type": "VariableDeclarator",
                        "start": 102,
                        "end": 107,
                        "loc": {
                          "start": {
                            "line": 5,
                            "column": 16
                          },
                          "end": {
                            "line": 5,
                            "column": 21
                          }
                        },
                        "id": {
                          "type": "Identifier",
                          "start": 102,
                          "end": 103,
                          "loc": {
                            "start": {
                              "line": 5,
                              "column": 16
                            },
                            "end": {
                              "line": 5,
                              "column": 17
                            }
                          },
                          "name": "k"
                        },
                        "init": {
                          "type": "Literal",
                          "start": 106,
                          "end": 107,
                          "loc": {
                            "start": {
                              "line": 5,
                              "column": 20
                            },
                            "end": {
                              "line": 5,
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
                  {
                    "type": "ForInStatement",
                    "start": 121,
                    "end": 172,
                    "loc": {
                      "start": {
                        "line": 6,
                        "column": 12
                      },
                      "end": {
                        "line": 8,
                        "column": 13
                      }
                    },
                    "left": {
                      "type": "VariableDeclaration",
                      "start": 126,
                      "end": 131,
                      "loc": {
                        "start": {
                          "line": 6,
                          "column": 17
                        },
                        "end": {
                          "line": 6,
                          "column": 22
                        }
                      },
                      "declarations": [
                        {
                          "type": "VariableDeclarator",
                          "start": 130,
                          "end": 131,
                          "loc": {
                            "start": {
                              "line": 6,
                              "column": 21
                            },
                            "end": {
                              "line": 6,
                              "column": 22
                            }
                          },
                          "id": {
                            "type": "Identifier",
                            "start": 130,
                            "end": 131,
                            "loc": {
                              "start": {
                                "line": 6,
                                "column": 21
                              },
                              "end": {
                                "line": 6,
                                "column": 22
                              }
                            },
                            "name": "q"
                          },
                          "init": null
                        }
                      ],
                      "kind": "let"
                    },
                    "right": {
                      "type": "Identifier",
                      "start": 135,
                      "end": 136,
                      "loc": {
                        "start": {
                          "line": 6,
                          "column": 26
                        },
                        "end": {
                          "line": 6,
                          "column": 27
                        }
                      },
                      "name": "x"
                    },
                    "body": {
                      "type": "BlockStatement",
                      "start": 138,
                      "end": 172,
                      "loc": {
                        "start": {
                          "line": 6,
                          "column": 29
                        },
                        "end": {
                          "line": 8,
                          "column": 13
                        }
                      },
                      "body": [
                        {
                          "type": "ExpressionStatement",
                          "start": 154,
                          "end": 158,
                          "loc": {
                            "start": {
                              "line": 7,
                              "column": 14
                            },
                            "end": {
                              "line": 7,
                              "column": 18
                            }
                          },
                          "expression": {
                            "type": "UpdateExpression",
                            "start": 154,
                            "end": 157,
                            "loc": {
                              "start": {
                                "line": 7,
                                "column": 14
                              },
                              "end": {
                                "line": 7,
                                "column": 17
                              }
                            },
                            "operator": "++",
                            "prefix": true,
                            "argument": {
                              "type": "Identifier",
                              "start": 156,
                              "end": 157,
                              "loc": {
                                "start": {
                                  "line": 7,
                                  "column": 16
                                },
                                "end": {
                                  "line": 7,
                                  "column": 17
                                }
                              },
                              "name": "k"
                            }
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            }
          ],
          "sourceType": "script"
        });
});
import { pass, fail } from '../utils';

describe('Statements - Do while', () => {
  
      pass(`do keep(); while (true);`, {
          source: 'do keep(); while (true);',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
            "type": "Program",
            "start": 0,
            "end": 24,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 24
              }
            },
            "body": [
              {
                "type": "DoWhileStatement",
                "start": 0,
                "end": 24,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 24
                  }
                },
                "body": {
                  "type": "ExpressionStatement",
                  "start": 3,
                  "end": 10,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 3
                    },
                    "end": {
                      "line": 1,
                      "column": 10
                    }
                  },
                  "expression": {
                    "type": "CallExpression",
                    "start": 3,
                    "end": 9,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 3
                      },
                      "end": {
                        "line": 1,
                        "column": 9
                      }
                    },
                    "callee": {
                      "type": "Identifier",
                      "start": 3,
                      "end": 7,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 3
                        },
                        "end": {
                          "line": 1,
                          "column": 7
                        }
                      },
                      "name": "keep"
                    },
                    "arguments": []
                  }
                },
                "test": {
                  "type": "Literal",
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
                  "value": true,
                  "raw": "true"
                }
              }
            ],
            "sourceType": "script"
          }
      });
  
      pass(`do continue; while(1);`, {
          source: 'do continue; while(1);',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
            "type": "Program",
            "start": 0,
            "end": 22,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 22
              }
            },
            "body": [
              {
                "type": "DoWhileStatement",
                "start": 0,
                "end": 22,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 22
                  }
                },
                "body": {
                  "type": "ContinueStatement",
                  "start": 3,
                  "end": 12,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 3
                    },
                    "end": {
                      "line": 1,
                      "column": 12
                    }
                  },
                  "label": null
                },
                "test": {
                  "type": "Literal",
                  "start": 19,
                  "end": 20,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 19
                    },
                    "end": {
                      "line": 1,
                      "column": 20
                    }
                  },
                  "value": 1,
                  "raw": "1"
                }
              }
            ],
            "sourceType": "script"
          }
      });
  
      pass(`do ; while (true)`, {
          source: 'do ; while (true)',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
            "type": "Program",
            "start": 0,
            "end": 17,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 17
              }
            },
            "body": [
              {
                "type": "DoWhileStatement",
                "start": 0,
                "end": 17,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 17
                  }
                },
                "body": {
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
                },
                "test": {
                  "type": "Literal",
                  "start": 12,
                  "end": 16,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 12
                    },
                    "end": {
                      "line": 1,
                      "column": 16
                    }
                  },
                  "value": true,
                  "raw": "true"
                }
              }
            ],
            "sourceType": "script"
          }
      });
  
      pass(`do {} while (true)`, {
          source: 'do {} while (true)',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
            "type": "Program",
            "start": 0,
            "end": 18,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 18
              }
            },
            "body": [
              {
                "type": "DoWhileStatement",
                "start": 0,
                "end": 18,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 18
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
                  "value": true,
                  "raw": "true"
                }
              }
            ],
            "sourceType": "script"
          }
      });
  
      pass(`{do ; while(false); false}`, {
          source: '{do ; while(false); false}',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
            "type": "Program",
            "start": 0,
            "end": 26,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 26
              }
            },
            "body": [
              {
                "type": "BlockStatement",
                "start": 0,
                "end": 26,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 26
                  }
                },
                "body": [
                  {
                    "type": "DoWhileStatement",
                    "start": 1,
                    "end": 19,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 1
                      },
                      "end": {
                        "line": 1,
                        "column": 19
                      }
                    },
                    "body": {
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
                    "test": {
                      "type": "Literal",
                      "start": 12,
                      "end": 17,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 12
                        },
                        "end": {
                          "line": 1,
                          "column": 17
                        }
                      },
                      "value": false,
                      "raw": "false"
                    }
                  },
                  {
                    "type": "ExpressionStatement",
                    "start": 20,
                    "end": 25,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 20
                      },
                      "end": {
                        "line": 1,
                        "column": 25
                      }
                    },
                    "expression": {
                      "type": "Literal",
                      "start": 20,
                      "end": 25,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 20
                        },
                        "end": {
                          "line": 1,
                          "column": 25
                        }
                      },
                      "value": false,
                      "raw": "false"
                    }
                  }
                ]
              }
            ],
            "sourceType": "script"
          }
      });
    });
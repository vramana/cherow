import { pass, fail } from '../utils';

describe('Miscellaneous - Keywords', () => {
  
      fail(`var cla\\u0073s = 123;`, {
          source: `var cla\\u0073s = 123;`,
          loc: true,
          ranges: true,
          raw: true,
      });
  
      fail(`var \\uD83B\\uDE00`, {
          source: `var \\uD83B\\uDE00`,
          loc: true,
          ranges: true,
          raw: true,
      });
  
      fail(`var 🀒`, {
          source: `var 🀒`,
          loc: true,
          ranges: true,
          raw: true,
      });
  
      fail(`var \\u{63}ontinue = 123;`, {
          source: `var \\u{63}ontinue = 123;`,
          loc: true,
          ranges: true,
          raw: true,
      });
  
      fail(`var default = 123;`, {
          source: `var default = 123;`,
          loc: true,
          ranges: true,
          raw: true,
      });
  
      fail(`var true = 123;`, {
          source: `var true = 123;`,
          loc: true,
          ranges: true,
          raw: true,
      });
  
      fail(`var \\u{74 = 123;`, {
          source: `var \\u{74 = 123;`,
          loc: true,
          ranges: true,
          raw: true,
      });
  
      pass(`var \\u0024 = 1;`, {
          source: 'var \\u0024 = 1;',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              "type": "Program",
              "start": 0,
              "end": 15,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 15
                  }
              },
              "body": [{
                  "type": "VariableDeclaration",
                  "start": 0,
                  "end": 15,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 0
                      },
                      "end": {
                          "line": 1,
                          "column": 15
                      }
                  },
                  "declarations": [{
                      "type": "VariableDeclarator",
                      "start": 4,
                      "end": 14,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 4
                          },
                          "end": {
                              "line": 1,
                              "column": 14
                          }
                      },
                      "id": {
                          "type": "Identifier",
                          "start": 4,
                          "end": 10,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 4
                              },
                              "end": {
                                  "line": 1,
                                  "column": 10
                              }
                          },
                          "name": "$"
                      },
                      "init": {
                          "type": "Literal",
                          "start": 13,
                          "end": 14,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 13
                              },
                              "end": {
                                  "line": 1,
                                  "column": 14
                              }
                          },
                          "value": 1,
                          "raw": "1"
                      }
                  }],
                  "kind": "var"
              }],
              "sourceType": "script"
          }
      });
  
      pass(`var \\u{41}\\u{42}\\u{43};`, {
          source: 'var \\u{41}\\u{42}\\u{43};',
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
                      "line": 1,
                      "column": 23
                  }
              },
              "body": [{
                  "type": "VariableDeclaration",
                  "start": 0,
                  "end": 23,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 0
                      },
                      "end": {
                          "line": 1,
                          "column": 23
                      }
                  },
                  "declarations": [{
                      "type": "VariableDeclarator",
                      "start": 4,
                      "end": 22,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 4
                          },
                          "end": {
                              "line": 1,
                              "column": 22
                          }
                      },
                      "id": {
                          "type": "Identifier",
                          "start": 4,
                          "end": 22,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 4
                              },
                              "end": {
                                  "line": 1,
                                  "column": 22
                              }
                          },
                          "name": "ABC"
                      },
                      "init": null
                  }],
                  "kind": "var"
              }],
              "sourceType": "script"
          }
      });
  
      pass(`var _\\u{1EE03}`, {
          source: 'var _\\u{1EE03}',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              "type": "Program",
              "start": 0,
              "end": 14,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 14
                  }
              },
              "body": [{
                  "type": "VariableDeclaration",
                  "start": 0,
                  "end": 14,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 0
                      },
                      "end": {
                          "line": 1,
                          "column": 14
                      }
                  },
                  "declarations": [{
                      "type": "VariableDeclarator",
                      "start": 4,
                      "end": 14,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 4
                          },
                          "end": {
                              "line": 1,
                              "column": 14
                          }
                      },
                      "id": {
                          "type": "Identifier",
                          "start": 4,
                          "end": 14,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 4
                              },
                              "end": {
                                  "line": 1,
                                  "column": 14
                              }
                          },
                          "name": "_𞸃"
                      },
                      "init": null
                  }],
                  "kind": "var"
              }],
              "sourceType": "script"
          }
      });
  
      pass(`var \\u{1EE0A}\\u{1EE0B}`, {
          source: 'var \\u{1EE0A}\\u{1EE0B}',
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
              "body": [{
                  "type": "VariableDeclaration",
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
                  "declarations": [{
                      "type": "VariableDeclarator",
                      "start": 4,
                      "end": 22,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 4
                          },
                          "end": {
                              "line": 1,
                              "column": 22
                          }
                      },
                      "id": {
                          "type": "Identifier",
                          "start": 4,
                          "end": 22,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 4
                              },
                              "end": {
                                  "line": 1,
                                  "column": 22
                              }
                          },
                          "name": "𞸊𞸋"
                      },
                      "init": null
                  }],
                  "kind": "var"
              }],
              "sourceType": "script"
          }
      });
  
  
      pass(`var A\\u{42}C;`, {
          source: 'var A\\u{42}C;',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              "type": "Program",
              "start": 0,
              "end": 13,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 13
                  }
              },
              "body": [{
                  "type": "VariableDeclaration",
                  "start": 0,
                  "end": 13,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 0
                      },
                      "end": {
                          "line": 1,
                          "column": 13
                      }
                  },
                  "declarations": [{
                      "type": "VariableDeclarator",
                      "start": 4,
                      "end": 12,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 4
                          },
                          "end": {
                              "line": 1,
                              "column": 12
                          }
                      },
                      "id": {
                          "type": "Identifier",
                          "start": 4,
                          "end": 12,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 4
                              },
                              "end": {
                                  "line": 1,
                                  "column": 12
                              }
                          },
                          "name": "ABC"
                      },
                      "init": null
                  }],
                  "kind": "var"
              }],
              "sourceType": "script"
          }
      });
  
  
      pass(`let ℮`, {
          source: 'let ℮',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
            "type": "Program",
            "body": [
                {
                    "type": "VariableDeclaration",
                    "declarations": [
                        {
                            "type": "VariableDeclarator",
                            "init": null,
                            "id": {
                                "type": "Identifier",
                                "name": "℮",
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
                        }
                    ],
                    "kind": "let",
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
                    }
                }
            ],
            "sourceType": "script",
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
            }
        }
      });
    
      pass(`var ℘;`, {
          source: 'var ℘;',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              "type": "Program",
              "start": 0,
              "end": 6,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 6
                  }
              },
              "body": [{
                  "type": "VariableDeclaration",
                  "start": 0,
                  "end": 6,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 0
                      },
                      "end": {
                          "line": 1,
                          "column": 6
                      }
                  },
                  "declarations": [{
                      "type": "VariableDeclarator",
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
                      },
                      "id": {
                          "type": "Identifier",
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
                          },
                          "name": "℘"
                      },
                      "init": null
                  }],
                  "kind": "var"
              }],
              "sourceType": "script"
          }
      });
  });
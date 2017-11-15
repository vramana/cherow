import { pass, fail } from '../utils/test-utils';

describe('Binding - Object pattern', () => {
  
      fail('({set a({e: a.b}){}})', '({set a({e: a.b}){}})');
      fail('({*a({e: a.b}){}})', '({*a({e: a.b}){}})');
      fail('({e: a.b}) => 0', '({e: a.b}) => 0');
      fail('function a({e: a.b}) {}', 'function a({e: a.b}) {}');
      fail('({set a({e: a.b}){}})', '({set a({e: a.b}){}})');
      fail('({set a({e: a.b}){}})', '({set a({e: a.b}){}})');
  
      pass('allow duplicate __proto__ fields', `function fn({
        __proto__: a,
       __proto__: b
     }) {}`, {
      "type": "Program",
      "body": [
          {
              "type": "FunctionDeclaration",
              "params": [
                  {
                      "type": "ObjectPattern",
                      "properties": [
                          {
                              "type": "Property",
                              "kind": "init",
                              "key": {
                                  "type": "Identifier",
                                  "name": "__proto__",
                                  "start": 22,
                                  "end": 31,
                                  "loc": {
                                      "start": {
                                          "line": 2,
                                          "column": 8
                                      },
                                      "end": {
                                          "line": 2,
                                          "column": 17
                                      }
                                  }
                              },
                              "computed": false,
                              "value": {
                                  "type": "Identifier",
                                  "name": "a",
                                  "start": 33,
                                  "end": 34,
                                  "loc": {
                                      "start": {
                                          "line": 2,
                                          "column": 19
                                      },
                                      "end": {
                                          "line": 2,
                                          "column": 20
                                      }
                                  }
                              },
                              "method": false,
                              "shorthand": false,
                              "start": 22,
                              "end": 34,
                              "loc": {
                                  "start": {
                                      "line": 2,
                                      "column": 8
                                  },
                                  "end": {
                                      "line": 2,
                                      "column": 20
                                  }
                              }
                          },
                          {
                              "type": "Property",
                              "kind": "init",
                              "key": {
                                  "type": "Identifier",
                                  "name": "__proto__",
                                  "start": 43,
                                  "end": 52,
                                  "loc": {
                                      "start": {
                                          "line": 3,
                                          "column": 7
                                      },
                                      "end": {
                                          "line": 3,
                                          "column": 16
                                      }
                                  }
                              },
                              "computed": false,
                              "value": {
                                  "type": "Identifier",
                                  "name": "b",
                                  "start": 54,
                                  "end": 55,
                                  "loc": {
                                      "start": {
                                          "line": 3,
                                          "column": 18
                                      },
                                      "end": {
                                          "line": 3,
                                          "column": 19
                                      }
                                  }
                              },
                              "method": false,
                              "shorthand": false,
                              "start": 43,
                              "end": 55,
                              "loc": {
                                  "start": {
                                      "line": 3,
                                      "column": 7
                                  },
                                  "end": {
                                      "line": 3,
                                      "column": 19
                                  }
                              }
                          }
                      ],
                      "start": 12,
                      "end": 62,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 12
                          },
                          "end": {
                              "line": 4,
                              "column": 6
                          }
                      }
                  }
              ],
              "body": {
                  "type": "BlockStatement",
                  "body": [],
                  "start": 64,
                  "end": 66,
                  "loc": {
                      "start": {
                          "line": 4,
                          "column": 8
                      },
                      "end": {
                          "line": 4,
                          "column": 10
                      }
                  }
              },
              "async": false,
              "generator": false,
              "expression": false,
              "id": {
                  "type": "Identifier",
                  "name": "fn",
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
                  }
              },
              "start": 0,
              "end": 66,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 4,
                      "column": 10
                  }
              }
          }
      ],
      "sourceType": "script",
      "start": 0,
      "end": 66,
      "loc": {
          "start": {
              "line": 1,
              "column": 0
          },
          "end": {
              "line": 4,
              "column": 10
          }
      }
  });
  
      pass('should parse object pattern with no property list', `function fn({}) {}`, {
        "type": "Program",
        "body": [
            {
                "type": "FunctionDeclaration",
                "params": [
                    {
                        "type": "ObjectPattern",
                        "properties": [],
                        "start": 12,
                        "end": 14,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 12
                            },
                            "end": {
                                "line": 1,
                                "column": 14
                            }
                        }
                    }
                ],
                "body": {
                    "type": "BlockStatement",
                    "body": [],
                    "start": 16,
                    "end": 18,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 16
                        },
                        "end": {
                            "line": 1,
                            "column": 18
                        }
                    }
                },
                "async": false,
                "generator": false,
                "expression": false,
                "id": {
                    "type": "Identifier",
                    "name": "fn",
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
                    }
                },
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
                }
            }
        ],
        "sourceType": "script",
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
        }
    });
  
      pass('should parse binding element w/ SingleNameBinding', `function fna({x: y}) {}`, {
        "type": "Program",
        "body": [
            {
                "type": "FunctionDeclaration",
                "params": [
                    {
                        "type": "ObjectPattern",
                        "properties": [
                            {
                                "type": "Property",
                                "kind": "init",
                                "key": {
                                    "type": "Identifier",
                                    "name": "x",
                                    "start": 14,
                                    "end": 15,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 14
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 15
                                        }
                                    }
                                },
                                "computed": false,
                                "value": {
                                    "type": "Identifier",
                                    "name": "y",
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
                                "method": false,
                                "shorthand": false,
                                "start": 14,
                                "end": 18,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 14
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 18
                                    }
                                }
                            }
                        ],
                        "start": 13,
                        "end": 19,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 13
                            },
                            "end": {
                                "line": 1,
                                "column": 19
                            }
                        }
                    }
                ],
                "body": {
                    "type": "BlockStatement",
                    "body": [],
                    "start": 21,
                    "end": 23,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 21
                        },
                        "end": {
                            "line": 1,
                            "column": 23
                        }
                    }
                },
                "async": false,
                "generator": false,
                "expression": false,
                "id": {
                    "type": "Identifier",
                    "name": "fna",
                    "start": 9,
                    "end": 12,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 9
                        },
                        "end": {
                            "line": 1,
                            "column": 12
                        }
                    }
                },
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
                }
            }
        ],
        "sourceType": "script",
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
        }
    });
  
  
      pass('should parse  binding element w/ SingleNameBinding with initializer', `function fnb({x: y = 42}) {}`, {
        "type": "Program",
        "body": [
            {
                "type": "FunctionDeclaration",
                "params": [
                    {
                        "type": "ObjectPattern",
                        "properties": [
                            {
                                "type": "Property",
                                "kind": "init",
                                "key": {
                                    "type": "Identifier",
                                    "name": "x",
                                    "start": 14,
                                    "end": 15,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 14
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 15
                                        }
                                    }
                                },
                                "computed": false,
                                "value": {
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "y",
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
                                    "right": {
                                        "type": "Literal",
                                        "value": 42,
                                        "start": 21,
                                        "end": 23,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 21
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 23
                                            }
                                        },
                                        "raw": "42"
                                    },
                                    "start": 17,
                                    "end": 23,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 17
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 23
                                        }
                                    }
                                },
                                "method": false,
                                "shorthand": false,
                                "start": 14,
                                "end": 23,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 14
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 23
                                    }
                                }
                            }
                        ],
                        "start": 13,
                        "end": 24,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 13
                            },
                            "end": {
                                "line": 1,
                                "column": 24
                            }
                        }
                    }
                ],
                "body": {
                    "type": "BlockStatement",
                    "body": [],
                    "start": 26,
                    "end": 28,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 26
                        },
                        "end": {
                            "line": 1,
                            "column": 28
                        }
                    }
                },
                "async": false,
                "generator": false,
                "expression": false,
                "id": {
                    "type": "Identifier",
                    "name": "fnb",
                    "start": 9,
                    "end": 12,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 9
                        },
                        "end": {
                            "line": 1,
                            "column": 12
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
        "sourceType": "script",
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
    });
  
      pass('should parse binding element w/ binding pattern', `function fnd({x: {y}}) {}`, {
        "type": "Program",
        "body": [
            {
                "type": "FunctionDeclaration",
                "params": [
                    {
                        "type": "ObjectPattern",
                        "properties": [
                            {
                                "type": "Property",
                                "kind": "init",
                                "key": {
                                    "type": "Identifier",
                                    "name": "x",
                                    "start": 14,
                                    "end": 15,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 14
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 15
                                        }
                                    }
                                },
                                "computed": false,
                                "value": {
                                    "type": "ObjectPattern",
                                    "properties": [
                                        {
                                            "type": "Property",
                                            "kind": "init",
                                            "key": {
                                                "type": "Identifier",
                                                "name": "y",
                                                "start": 18,
                                                "end": 19,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 18
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 19
                                                    }
                                                }
                                            },
                                            "computed": false,
                                            "value": {
                                                "type": "Identifier",
                                                "name": "y",
                                                "start": 18,
                                                "end": 19,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 18
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 19
                                                    }
                                                }
                                            },
                                            "method": false,
                                            "shorthand": true,
                                            "start": 18,
                                            "end": 19,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 18
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 19
                                                }
                                            }
                                        }
                                    ],
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
                                "method": false,
                                "shorthand": false,
                                "start": 14,
                                "end": 20,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 14
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 20
                                    }
                                }
                            }
                        ],
                        "start": 13,
                        "end": 21,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 13
                            },
                            "end": {
                                "line": 1,
                                "column": 21
                            }
                        }
                    }
                ],
                "body": {
                    "type": "BlockStatement",
                    "body": [],
                    "start": 23,
                    "end": 25,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 23
                        },
                        "end": {
                            "line": 1,
                            "column": 25
                        }
                    }
                },
                "async": false,
                "generator": false,
                "expression": false,
                "id": {
                    "type": "Identifier",
                    "name": "fnd",
                    "start": 9,
                    "end": 12,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 9
                        },
                        "end": {
                            "line": 1,
                            "column": 12
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
  
      pass('should parse binding element w/ binding pattern w/ initializer', `function fnf({x: {y} = 42}) {}`, {
        "type": "Program",
        "body": [
            {
                "type": "FunctionDeclaration",
                "params": [
                    {
                        "type": "ObjectPattern",
                        "properties": [
                            {
                                "type": "Property",
                                "kind": "init",
                                "key": {
                                    "type": "Identifier",
                                    "name": "x",
                                    "start": 14,
                                    "end": 15,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 14
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 15
                                        }
                                    }
                                },
                                "computed": false,
                                "value": {
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "ObjectPattern",
                                        "properties": [
                                            {
                                                "type": "Property",
                                                "kind": "init",
                                                "key": {
                                                    "type": "Identifier",
                                                    "name": "y",
                                                    "start": 18,
                                                    "end": 19,
                                                    "loc": {
                                                        "start": {
                                                            "line": 1,
                                                            "column": 18
                                                        },
                                                        "end": {
                                                            "line": 1,
                                                            "column": 19
                                                        }
                                                    }
                                                },
                                                "computed": false,
                                                "value": {
                                                    "type": "Identifier",
                                                    "name": "y",
                                                    "start": 18,
                                                    "end": 19,
                                                    "loc": {
                                                        "start": {
                                                            "line": 1,
                                                            "column": 18
                                                        },
                                                        "end": {
                                                            "line": 1,
                                                            "column": 19
                                                        }
                                                    }
                                                },
                                                "method": false,
                                                "shorthand": true,
                                                "start": 18,
                                                "end": 19,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 18
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 19
                                                    }
                                                }
                                            }
                                        ],
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
                                    "right": {
                                        "type": "Literal",
                                        "value": 42,
                                        "start": 23,
                                        "end": 25,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 23
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 25
                                            }
                                        },
                                        "raw": "42"
                                    },
                                    "start": 17,
                                    "end": 25,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 17
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 25
                                        }
                                    }
                                },
                                "method": false,
                                "shorthand": false,
                                "start": 14,
                                "end": 25,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 14
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 25
                                    }
                                }
                            }
                        ],
                        "start": 13,
                        "end": 26,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 13
                            },
                            "end": {
                                "line": 1,
                                "column": 26
                            }
                        }
                    }
                ],
                "body": {
                    "type": "BlockStatement",
                    "body": [],
                    "start": 28,
                    "end": 30,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 28
                        },
                        "end": {
                            "line": 1,
                            "column": 30
                        }
                    }
                },
                "async": false,
                "generator": false,
                "expression": false,
                "id": {
                    "type": "Identifier",
                    "name": "fnf",
                    "start": 9,
                    "end": 12,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 9
                        },
                        "end": {
                            "line": 1,
                            "column": 12
                        }
                    }
                },
                "start": 0,
                "end": 30,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 30
                    }
                }
            }
        ],
        "sourceType": "script",
        "start": 0,
        "end": 30,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 1,
                "column": 30
            }
        }
    });
  
      pass('should parse elison', `let {a,} = 0`, {
        "type": "Program",
        "body": [
            {
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "init": {
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
                            },
                            "raw": "0"
                        },
                        "id": {
                            "type": "ObjectPattern",
                            "properties": [
                                {
                                    "type": "Property",
                                    "kind": "init",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "a",
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
                                        }
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "Identifier",
                                        "name": "a",
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
                                        }
                                    },
                                    "method": false,
                                    "shorthand": true,
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
                                    }
                                }
                            ],
                            "start": 4,
                            "end": 8,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 4
                                },
                                "end": {
                                    "line": 1,
                                    "column": 8
                                }
                            }
                        },
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
                        }
                    }
                ],
                "kind": "let",
                "start": 0,
                "end": 12,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 12
                    }
                }
            }
        ],
        "sourceType": "script",
        "start": 0,
        "end": 12,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 1,
                "column": 12
            }
        }
    });
  
      pass('should parse empty pattern catch param', `try { } catch ({}) {}`, {
        "type": "Program",
        "body": [
            {
                "type": "TryStatement",
                "block": {
                    "type": "BlockStatement",
                    "body": [],
                    "start": 4,
                    "end": 7,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 4
                        },
                        "end": {
                            "line": 1,
                            "column": 7
                        }
                    }
                },
                "handler": {
                    "type": "CatchClause",
                    "param": {
                        "type": "ObjectPattern",
                        "properties": [],
                        "start": 15,
                        "end": 17,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 15
                            },
                            "end": {
                                "line": 1,
                                "column": 17
                            }
                        }
                    },
                    "body": {
                        "type": "BlockStatement",
                        "body": [],
                        "start": 19,
                        "end": 21,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 19
                            },
                            "end": {
                                "line": 1,
                                "column": 21
                            }
                        }
                    },
                    "start": 8,
                    "end": 21,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 8
                        },
                        "end": {
                            "line": 1,
                            "column": 21
                        }
                    }
                },
                "finalizer": null,
                "start": 0,
                "end": 21,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 21
                    }
                }
            }
        ],
        "sourceType": "script",
        "start": 0,
        "end": 21,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 1,
                "column": 21
            }
        }
    });
  
      pass('should parse empty pattern function', `function a({}) {}`, {
        "type": "Program",
        "body": [
            {
                "type": "FunctionDeclaration",
                "params": [
                    {
                        "type": "ObjectPattern",
                        "properties": [],
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
                    }
                ],
                "body": {
                    "type": "BlockStatement",
                    "body": [],
                    "start": 15,
                    "end": 17,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 15
                        },
                        "end": {
                            "line": 1,
                            "column": 17
                        }
                    }
                },
                "async": false,
                "generator": false,
                "expression": false,
                "id": {
                    "type": "Identifier",
                    "name": "a",
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
                    }
                },
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
                }
            }
        ],
        "sourceType": "script",
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
        }
    });
  
      pass('should parse "var {let, yield} = 0;"', `var {let, yield} = 0;`, {
        "type": "Program",
        "body": [
            {
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "init": {
                            "type": "Literal",
                            "value": 0,
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
                            "raw": "0"
                        },
                        "id": {
                            "type": "ObjectPattern",
                            "properties": [
                                {
                                    "type": "Property",
                                    "kind": "init",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "let",
                                        "start": 5,
                                        "end": 8,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 5
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 8
                                            }
                                        }
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "Identifier",
                                        "name": "let",
                                        "start": 5,
                                        "end": 8,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 5
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 8
                                            }
                                        }
                                    },
                                    "method": false,
                                    "shorthand": true,
                                    "start": 5,
                                    "end": 8,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 5
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 8
                                        }
                                    }
                                },
                                {
                                    "type": "Property",
                                    "kind": "init",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "yield",
                                        "start": 10,
                                        "end": 15,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 10
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 15
                                            }
                                        }
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "Identifier",
                                        "name": "yield",
                                        "start": 10,
                                        "end": 15,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 10
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 15
                                            }
                                        }
                                    },
                                    "method": false,
                                    "shorthand": true,
                                    "start": 10,
                                    "end": 15,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 10
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 15
                                        }
                                    }
                                }
                            ],
                            "start": 4,
                            "end": 16,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 4
                                },
                                "end": {
                                    "line": 1,
                                    "column": 16
                                }
                            }
                        },
                        "start": 4,
                        "end": 20,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 4
                            },
                            "end": {
                                "line": 1,
                                "column": 20
                            }
                        }
                    }
                ],
                "kind": "var",
                "start": 0,
                "end": 21,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 21
                    }
                }
            }
        ],
        "sourceType": "script",
        "start": 0,
        "end": 21,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 1,
                "column": 21
            }
        }
    });
  
      pass('should parse "({let} = 0);"', `({let} = 0);`, {
        "type": "Program",
        "body": [
            {
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "left": {
                        "type": "ObjectPattern",
                        "properties": [
                            {
                                "type": "Property",
                                "key": {
                                    "type": "Identifier",
                                    "name": "let",
                                    "start": 2,
                                    "end": 5,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 2
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 5
                                        }
                                    }
                                },
                                "value": {
                                    "type": "Identifier",
                                    "name": "let",
                                    "start": 2,
                                    "end": 5,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 2
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 5
                                        }
                                    }
                                },
                                "kind": "init",
                                "computed": false,
                                "method": false,
                                "shorthand": true,
                                "start": 2,
                                "end": 5,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 2
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 5
                                    }
                                }
                            }
                        ],
                        "start": 1,
                        "end": 6,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 1
                            },
                            "end": {
                                "line": 1,
                                "column": 6
                            }
                        }
                    },
                    "operator": "=",
                    "right": {
                        "type": "Literal",
                        "value": 0,
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
                        "raw": "0"
                    },
                    "start": 1,
                    "end": 10,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 1
                        },
                        "end": {
                            "line": 1,
                            "column": 10
                        }
                    }
                },
                "start": 0,
                "end": 12,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 12
                    }
                }
            }
        ],
        "sourceType": "script",
        "start": 0,
        "end": 12,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 1,
                "column": 12
            }
        }
    });
  
      pass('should parse "({a:let} = 0);"', `({a:let} = 0);`, {
        "type": "Program",
        "body": [
            {
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "left": {
                        "type": "ObjectPattern",
                        "properties": [
                            {
                                "type": "Property",
                                "key": {
                                    "type": "Identifier",
                                    "name": "a",
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
                                "value": {
                                    "type": "Identifier",
                                    "name": "let",
                                    "start": 4,
                                    "end": 7,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 4
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 7
                                        }
                                    }
                                },
                                "kind": "init",
                                "computed": false,
                                "method": false,
                                "shorthand": false,
                                "start": 2,
                                "end": 7,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 2
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 7
                                    }
                                }
                            }
                        ],
                        "start": 1,
                        "end": 8,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 1
                            },
                            "end": {
                                "line": 1,
                                "column": 8
                            }
                        }
                    },
                    "operator": "=",
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
                        },
                        "raw": "0"
                    },
                    "start": 1,
                    "end": 12,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 1
                        },
                        "end": {
                            "line": 1,
                            "column": 12
                        }
                    }
                },
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
                }
            }
        ],
        "sourceType": "script",
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
        }
    });
  
      pass('should parse empty pattern lexical', `for (let {} in 0);`, {
        "type": "Program",
        "body": [
            {
                "type": "ForInStatement",
                "body": {
                    "type": "EmptyStatement",
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
                "left": {
                    "type": "VariableDeclaration",
                    "declarations": [
                        {
                            "type": "VariableDeclarator",
                            "init": null,
                            "id": {
                                "type": "ObjectPattern",
                                "properties": [],
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
                                }
                            },
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
                            }
                        }
                    ],
                    "kind": "let",
                    "start": 5,
                    "end": 11,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 5
                        },
                        "end": {
                            "line": 1,
                            "column": 11
                        }
                    }
                },
                "right": {
                    "type": "Literal",
                    "value": 0,
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
                    },
                    "raw": "0"
                },
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
                }
            }
        ],
        "sourceType": "script",
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
        }
    });
  
      pass('should parse empty pattern lexical', `let {} = 0`, {
        "type": "Program",
        "body": [
            {
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "init": {
                            "type": "Literal",
                            "value": 0,
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
                            "raw": "0"
                        },
                        "id": {
                            "type": "ObjectPattern",
                            "properties": [],
                            "start": 4,
                            "end": 6,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 4
                                },
                                "end": {
                                    "line": 1,
                                    "column": 6
                                }
                            }
                        },
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
                        }
                    }
                ],
                "kind": "let",
                "start": 0,
                "end": 10,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 10
                    }
                }
            }
        ],
        "sourceType": "script",
        "start": 0,
        "end": 10,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 1,
                "column": 10
            }
        }
    });
  
      pass('should parse empty pattern var', `var {} = 0`, {
        "type": "Program",
        "body": [
            {
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "init": {
                            "type": "Literal",
                            "value": 0,
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
                            "raw": "0"
                        },
                        "id": {
                            "type": "ObjectPattern",
                            "properties": [],
                            "start": 4,
                            "end": 6,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 4
                                },
                                "end": {
                                    "line": 1,
                                    "column": 6
                                }
                            }
                        },
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
                        }
                    }
                ],
                "kind": "var",
                "start": 0,
                "end": 10,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 10
                    }
                }
            }
        ],
        "sourceType": "script",
        "start": 0,
        "end": 10,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 1,
                "column": 10
            }
        }
    });
  
      pass('should parse pattern var array object', `var [{a = 0}] = 0;`, {
        "type": "Program",
        "body": [
            {
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "init": {
                            "type": "Literal",
                            "value": 0,
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
                            "raw": "0"
                        },
                        "id": {
                            "type": "ArrayPattern",
                            "elements": [
                                {
                                    "type": "ObjectPattern",
                                    "properties": [
                                        {
                                            "type": "Property",
                                            "kind": "init",
                                            "key": {
                                                "type": "Identifier",
                                                "name": "a",
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
                                            "computed": false,
                                            "value": {
                                                "type": "AssignmentPattern",
                                                "left": {
                                                    "type": "Identifier",
                                                    "name": "a",
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
                                                "right": {
                                                    "type": "Literal",
                                                    "value": 0,
                                                    "start": 10,
                                                    "end": 11,
                                                    "loc": {
                                                        "start": {
                                                            "line": 1,
                                                            "column": 10
                                                        },
                                                        "end": {
                                                            "line": 1,
                                                            "column": 11
                                                        }
                                                    },
                                                    "raw": "0"
                                                },
                                                "start": 6,
                                                "end": 11,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 6
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 11
                                                    }
                                                }
                                            },
                                            "method": false,
                                            "shorthand": true,
                                            "start": 6,
                                            "end": 11,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 6
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 11
                                                }
                                            }
                                        }
                                    ],
                                    "start": 5,
                                    "end": 12,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 5
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 12
                                        }
                                    }
                                }
                            ],
                            "start": 4,
                            "end": 13,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 4
                                },
                                "end": {
                                    "line": 1,
                                    "column": 13
                                }
                            }
                        },
                        "start": 4,
                        "end": 17,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 4
                            },
                            "end": {
                                "line": 1,
                                "column": 17
                            }
                        }
                    }
                ],
                "kind": "var",
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
                }
            }
        ],
        "sourceType": "script",
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
        }
    });
  
      pass('should parse pattern var', `var {a} = 0`, {
        "type": "Program",
        "body": [
            {
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "init": {
                            "type": "Literal",
                            "value": 0,
                            "start": 10,
                            "end": 11,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 10
                                },
                                "end": {
                                    "line": 1,
                                    "column": 11
                                }
                            },
                            "raw": "0"
                        },
                        "id": {
                            "type": "ObjectPattern",
                            "properties": [
                                {
                                    "type": "Property",
                                    "kind": "init",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "a",
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
                                        }
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "Identifier",
                                        "name": "a",
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
                                        }
                                    },
                                    "method": false,
                                    "shorthand": true,
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
                                    }
                                }
                            ],
                            "start": 4,
                            "end": 7,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 4
                                },
                                "end": {
                                    "line": 1,
                                    "column": 7
                                }
                            }
                        },
                        "start": 4,
                        "end": 11,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 4
                            },
                            "end": {
                                "line": 1,
                                "column": 11
                            }
                        }
                    }
                ],
                "kind": "var",
                "start": 0,
                "end": 11,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 11
                    }
                }
            }
        ],
        "sourceType": "script",
        "start": 0,
        "end": 11,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 1,
                "column": 11
            }
        }
    });
  
      pass('should parse nested', `let {a:{}} = 0`, {
        "type": "Program",
        "body": [
            {
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "init": {
                            "type": "Literal",
                            "value": 0,
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
                            "raw": "0"
                        },
                        "id": {
                            "type": "ObjectPattern",
                            "properties": [
                                {
                                    "type": "Property",
                                    "kind": "init",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "a",
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
                                        }
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "ObjectPattern",
                                        "properties": [],
                                        "start": 7,
                                        "end": 9,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 7
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 9
                                            }
                                        }
                                    },
                                    "method": false,
                                    "shorthand": false,
                                    "start": 5,
                                    "end": 9,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 5
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 9
                                        }
                                    }
                                }
                            ],
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
                            }
                        },
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
                        }
                    }
                ],
                "kind": "let",
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
                }
            }
        ],
        "sourceType": "script",
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
        }
    });
  
      pass('should parse properties', `let {a,b=0,c:d,e:f=0,[g]:[h]}=0`, {
        "type": "Program",
        "body": [
            {
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "init": {
                            "type": "Literal",
                            "value": 0,
                            "start": 30,
                            "end": 31,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 30
                                },
                                "end": {
                                    "line": 1,
                                    "column": 31
                                }
                            },
                            "raw": "0"
                        },
                        "id": {
                            "type": "ObjectPattern",
                            "properties": [
                                {
                                    "type": "Property",
                                    "kind": "init",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "a",
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
                                        }
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "Identifier",
                                        "name": "a",
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
                                        }
                                    },
                                    "method": false,
                                    "shorthand": true,
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
                                    }
                                },
                                {
                                    "type": "Property",
                                    "kind": "init",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "b",
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
                                    "computed": false,
                                    "value": {
                                        "type": "AssignmentPattern",
                                        "left": {
                                            "type": "Identifier",
                                            "name": "b",
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
                                            "value": 0,
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
                                            "raw": "0"
                                        },
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
                                    "method": false,
                                    "shorthand": true,
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
                                {
                                    "type": "Property",
                                    "kind": "init",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "c",
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
                                    "computed": false,
                                    "value": {
                                        "type": "Identifier",
                                        "name": "d",
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
                                        }
                                    },
                                    "method": false,
                                    "shorthand": false,
                                    "start": 11,
                                    "end": 14,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 11
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 14
                                        }
                                    }
                                },
                                {
                                    "type": "Property",
                                    "kind": "init",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "e",
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
                                    "computed": false,
                                    "value": {
                                        "type": "AssignmentPattern",
                                        "left": {
                                            "type": "Identifier",
                                            "name": "f",
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
                                        "right": {
                                            "type": "Literal",
                                            "value": 0,
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
                                            "raw": "0"
                                        },
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
                                    "method": false,
                                    "shorthand": false,
                                    "start": 15,
                                    "end": 20,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 15
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 20
                                        }
                                    }
                                },
                                {
                                    "type": "Property",
                                    "kind": "init",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "g",
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
                                    "computed": true,
                                    "value": {
                                        "type": "ArrayPattern",
                                        "elements": [
                                            {
                                                "type": "Identifier",
                                                "name": "h",
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
                                            }
                                        ],
                                        "start": 25,
                                        "end": 28,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 25
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 28
                                            }
                                        }
                                    },
                                    "method": false,
                                    "shorthand": false,
                                    "start": 21,
                                    "end": 28,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 21
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 28
                                        }
                                    }
                                }
                            ],
                            "start": 4,
                            "end": 29,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 4
                                },
                                "end": {
                                    "line": 1,
                                    "column": 29
                                }
                            }
                        },
                        "start": 4,
                        "end": 31,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 4
                            },
                            "end": {
                                "line": 1,
                                "column": 31
                            }
                        }
                    }
                ],
                "kind": "let",
                "start": 0,
                "end": 31,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 31
                    }
                }
            }
        ],
        "sourceType": "script",
        "start": 0,
        "end": 31,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 1,
                "column": 31
            }
        }
    });
  
      pass('should parse var for in', `for (var {x, y} in z);`, {
        "type": "Program",
        "body": [
            {
                "type": "ForInStatement",
                "body": {
                    "type": "EmptyStatement",
                    "start": 21,
                    "end": 22,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 21
                        },
                        "end": {
                            "line": 1,
                            "column": 22
                        }
                    }
                },
                "left": {
                    "type": "VariableDeclaration",
                    "declarations": [
                        {
                            "type": "VariableDeclarator",
                            "init": null,
                            "id": {
                                "type": "ObjectPattern",
                                "properties": [
                                    {
                                        "type": "Property",
                                        "kind": "init",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "x",
                                            "start": 10,
                                            "end": 11,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 10
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 11
                                                }
                                            }
                                        },
                                        "computed": false,
                                        "value": {
                                            "type": "Identifier",
                                            "name": "x",
                                            "start": 10,
                                            "end": 11,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 10
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 11
                                                }
                                            }
                                        },
                                        "method": false,
                                        "shorthand": true,
                                        "start": 10,
                                        "end": 11,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 10
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 11
                                            }
                                        }
                                    },
                                    {
                                        "type": "Property",
                                        "kind": "init",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "y",
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
                                            }
                                        },
                                        "computed": false,
                                        "value": {
                                            "type": "Identifier",
                                            "name": "y",
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
                                            }
                                        },
                                        "method": false,
                                        "shorthand": true,
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
                                        }
                                    }
                                ],
                                "start": 9,
                                "end": 15,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 9
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 15
                                    }
                                }
                            },
                            "start": 9,
                            "end": 15,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 9
                                },
                                "end": {
                                    "line": 1,
                                    "column": 15
                                }
                            }
                        }
                    ],
                    "kind": "var",
                    "start": 5,
                    "end": 15,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 5
                        },
                        "end": {
                            "line": 1,
                            "column": 15
                        }
                    }
                },
                "right": {
                    "type": "Identifier",
                    "name": "z",
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
                    }
                },
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
                }
            }
        ],
        "sourceType": "script",
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
        }
    });
  
      pass('should parse "var [{__proto__:a, __proto__:b}] = 0;"', `var [{__proto__:a, __proto__:b}] = 0;`, {
        "type": "Program",
        "body": [
            {
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "init": {
                            "type": "Literal",
                            "value": 0,
                            "start": 35,
                            "end": 36,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 35
                                },
                                "end": {
                                    "line": 1,
                                    "column": 36
                                }
                            },
                            "raw": "0"
                        },
                        "id": {
                            "type": "ArrayPattern",
                            "elements": [
                                {
                                    "type": "ObjectPattern",
                                    "properties": [
                                        {
                                            "type": "Property",
                                            "kind": "init",
                                            "key": {
                                                "type": "Identifier",
                                                "name": "__proto__",
                                                "start": 6,
                                                "end": 15,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 6
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 15
                                                    }
                                                }
                                            },
                                            "computed": false,
                                            "value": {
                                                "type": "Identifier",
                                                "name": "a",
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
                                                }
                                            },
                                            "method": false,
                                            "shorthand": false,
                                            "start": 6,
                                            "end": 17,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 6
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 17
                                                }
                                            }
                                        },
                                        {
                                            "type": "Property",
                                            "kind": "init",
                                            "key": {
                                                "type": "Identifier",
                                                "name": "__proto__",
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
                                            },
                                            "computed": false,
                                            "value": {
                                                "type": "Identifier",
                                                "name": "b",
                                                "start": 29,
                                                "end": 30,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 29
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 30
                                                    }
                                                }
                                            },
                                            "method": false,
                                            "shorthand": false,
                                            "start": 19,
                                            "end": 30,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 19
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 30
                                                }
                                            }
                                        }
                                    ],
                                    "start": 5,
                                    "end": 31,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 5
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 31
                                        }
                                    }
                                }
                            ],
                            "start": 4,
                            "end": 32,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 4
                                },
                                "end": {
                                    "line": 1,
                                    "column": 32
                                }
                            }
                        },
                        "start": 4,
                        "end": 36,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 4
                            },
                            "end": {
                                "line": 1,
                                "column": 36
                            }
                        }
                    }
                ],
                "kind": "var",
                "start": 0,
                "end": 37,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 37
                    }
                }
            }
        ],
        "sourceType": "script",
        "start": 0,
        "end": 37,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 1,
                "column": 37
            }
        }
    });
  
      pass('should parse "var {a, x: {y: a}} = 0;"', `var {a, x: {y: a}} = 0;`, {
        "type": "Program",
        "body": [
            {
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "init": {
                            "type": "Literal",
                            "value": 0,
                            "start": 21,
                            "end": 22,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 21
                                },
                                "end": {
                                    "line": 1,
                                    "column": 22
                                }
                            },
                            "raw": "0"
                        },
                        "id": {
                            "type": "ObjectPattern",
                            "properties": [
                                {
                                    "type": "Property",
                                    "kind": "init",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "a",
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
                                        }
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "Identifier",
                                        "name": "a",
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
                                        }
                                    },
                                    "method": false,
                                    "shorthand": true,
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
                                    }
                                },
                                {
                                    "type": "Property",
                                    "kind": "init",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "x",
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
                                    "computed": false,
                                    "value": {
                                        "type": "ObjectPattern",
                                        "properties": [
                                            {
                                                "type": "Property",
                                                "kind": "init",
                                                "key": {
                                                    "type": "Identifier",
                                                    "name": "y",
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
                                                    }
                                                },
                                                "computed": false,
                                                "value": {
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
                                                "method": false,
                                                "shorthand": false,
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
                                                }
                                            }
                                        ],
                                        "start": 11,
                                        "end": 17,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 11
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 17
                                            }
                                        }
                                    },
                                    "method": false,
                                    "shorthand": false,
                                    "start": 8,
                                    "end": 17,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 8
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 17
                                        }
                                    }
                                }
                            ],
                            "start": 4,
                            "end": 18,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 4
                                },
                                "end": {
                                    "line": 1,
                                    "column": 18
                                }
                            }
                        },
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
                        }
                    }
                ],
                "kind": "var",
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
                }
            }
        ],
        "sourceType": "script",
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
        }
    });
  
      pass('should parse "var a, {x: {y: a}} = 0;"', `var a, {x: {y: a}} = 0;`, {
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
                            "name": "a",
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
                    },
                    {
                        "type": "VariableDeclarator",
                        "init": {
                            "type": "Literal",
                            "value": 0,
                            "start": 21,
                            "end": 22,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 21
                                },
                                "end": {
                                    "line": 1,
                                    "column": 22
                                }
                            },
                            "raw": "0"
                        },
                        "id": {
                            "type": "ObjectPattern",
                            "properties": [
                                {
                                    "type": "Property",
                                    "kind": "init",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "x",
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
                                    "computed": false,
                                    "value": {
                                        "type": "ObjectPattern",
                                        "properties": [
                                            {
                                                "type": "Property",
                                                "kind": "init",
                                                "key": {
                                                    "type": "Identifier",
                                                    "name": "y",
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
                                                    }
                                                },
                                                "computed": false,
                                                "value": {
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
                                                "method": false,
                                                "shorthand": false,
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
                                                }
                                            }
                                        ],
                                        "start": 11,
                                        "end": 17,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 11
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 17
                                            }
                                        }
                                    },
                                    "method": false,
                                    "shorthand": false,
                                    "start": 8,
                                    "end": 17,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 8
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 17
                                        }
                                    }
                                }
                            ],
                            "start": 7,
                            "end": 18,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 7
                                },
                                "end": {
                                    "line": 1,
                                    "column": 18
                                }
                            }
                        },
                        "start": 7,
                        "end": 22,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 7
                            },
                            "end": {
                                "line": 1,
                                "column": 22
                            }
                        }
                    }
                ],
                "kind": "var",
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
                }
            }
        ],
        "sourceType": "script",
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
        }
    });
  
      pass('should parse "var {let, yield} = 0;"', `var {let, yield} = 0;`, {
        "type": "Program",
        "body": [
            {
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "init": {
                            "type": "Literal",
                            "value": 0,
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
                            "raw": "0"
                        },
                        "id": {
                            "type": "ObjectPattern",
                            "properties": [
                                {
                                    "type": "Property",
                                    "kind": "init",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "let",
                                        "start": 5,
                                        "end": 8,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 5
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 8
                                            }
                                        }
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "Identifier",
                                        "name": "let",
                                        "start": 5,
                                        "end": 8,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 5
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 8
                                            }
                                        }
                                    },
                                    "method": false,
                                    "shorthand": true,
                                    "start": 5,
                                    "end": 8,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 5
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 8
                                        }
                                    }
                                },
                                {
                                    "type": "Property",
                                    "kind": "init",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "yield",
                                        "start": 10,
                                        "end": 15,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 10
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 15
                                            }
                                        }
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "Identifier",
                                        "name": "yield",
                                        "start": 10,
                                        "end": 15,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 10
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 15
                                            }
                                        }
                                    },
                                    "method": false,
                                    "shorthand": true,
                                    "start": 10,
                                    "end": 15,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 10
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 15
                                        }
                                    }
                                }
                            ],
                            "start": 4,
                            "end": 16,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 4
                                },
                                "end": {
                                    "line": 1,
                                    "column": 16
                                }
                            }
                        },
                        "start": 4,
                        "end": 20,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 4
                            },
                            "end": {
                                "line": 1,
                                "column": 20
                            }
                        }
                    }
                ],
                "kind": "var",
                "start": 0,
                "end": 21,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 21
                    }
                }
            }
        ],
        "sourceType": "script",
        "start": 0,
        "end": 21,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 1,
                "column": 21
            }
        }
    });
  
      pass('should parse formal parameter', `(a, b, [c]) => 0`, {
        "type": "Program",
        "body": [
            {
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ArrowFunctionExpression",
                    "body": {
                        "type": "Literal",
                        "value": 0,
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
                        },
                        "raw": "0"
                    },
                    "params": [
                        {
                            "type": "Identifier",
                            "name": "a",
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
                            "type": "Identifier",
                            "name": "b",
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
                            "type": "ArrayPattern",
                            "elements": [
                                {
                                    "type": "Identifier",
                                    "name": "c",
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
                        }
                    ],
                    "id": null,
                    "async": false,
                    "generator": false,
                    "expression": true,
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
        "sourceType": "script",
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
    });
  
      pass('should parse catch clause', `try {} catch ({e}) {}`, {
        "type": "Program",
        "body": [
            {
                "type": "TryStatement",
                "block": {
                    "type": "BlockStatement",
                    "body": [],
                    "start": 4,
                    "end": 6,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 4
                        },
                        "end": {
                            "line": 1,
                            "column": 6
                        }
                    }
                },
                "handler": {
                    "type": "CatchClause",
                    "param": {
                        "type": "ObjectPattern",
                        "properties": [
                            {
                                "type": "Property",
                                "kind": "init",
                                "key": {
                                    "type": "Identifier",
                                    "name": "e",
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
                                "computed": false,
                                "value": {
                                    "type": "Identifier",
                                    "name": "e",
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
                                "method": false,
                                "shorthand": true,
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
                            }
                        ],
                        "start": 14,
                        "end": 17,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 14
                            },
                            "end": {
                                "line": 1,
                                "column": 17
                            }
                        }
                    },
                    "body": {
                        "type": "BlockStatement",
                        "body": [],
                        "start": 19,
                        "end": 21,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 19
                            },
                            "end": {
                                "line": 1,
                                "column": 21
                            }
                        }
                    },
                    "start": 7,
                    "end": 21,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 7
                        },
                        "end": {
                            "line": 1,
                            "column": 21
                        }
                    }
                },
                "finalizer": null,
                "start": 0,
                "end": 21,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 21
                    }
                }
            }
        ],
        "sourceType": "script",
        "start": 0,
        "end": 21,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 1,
                "column": 21
            }
        }
    });
  
      pass('should parse "try {} catch ({e = 0}) {}"', `try {} catch ({e = 0}) {}`, {
        "type": "Program",
        "body": [
            {
                "type": "TryStatement",
                "block": {
                    "type": "BlockStatement",
                    "body": [],
                    "start": 4,
                    "end": 6,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 4
                        },
                        "end": {
                            "line": 1,
                            "column": 6
                        }
                    }
                },
                "handler": {
                    "type": "CatchClause",
                    "param": {
                        "type": "ObjectPattern",
                        "properties": [
                            {
                                "type": "Property",
                                "kind": "init",
                                "key": {
                                    "type": "Identifier",
                                    "name": "e",
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
                                "computed": false,
                                "value": {
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "e",
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
                                    "right": {
                                        "type": "Literal",
                                        "value": 0,
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
                                        "raw": "0"
                                    },
                                    "start": 15,
                                    "end": 20,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 15
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 20
                                        }
                                    }
                                },
                                "method": false,
                                "shorthand": true,
                                "start": 15,
                                "end": 20,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 15
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 20
                                    }
                                }
                            }
                        ],
                        "start": 14,
                        "end": 21,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 14
                            },
                            "end": {
                                "line": 1,
                                "column": 21
                            }
                        }
                    },
                    "body": {
                        "type": "BlockStatement",
                        "body": [],
                        "start": 23,
                        "end": 25,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 23
                            },
                            "end": {
                                "line": 1,
                                "column": 25
                            }
                        }
                    },
                    "start": 7,
                    "end": 25,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 7
                        },
                        "end": {
                            "line": 1,
                            "column": 25
                        }
                    }
                },
                "finalizer": null,
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
  });
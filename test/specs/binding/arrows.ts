import { pass, fail } from '../utils/test-utils';

describe('Binding - Arrows', () => {
  
  fail('invalid rest in object pattern', '({a,...b}) => 0;');
  fail('pattern without parenthesis', '({}=>0)');
  fail('invalid nested param', '([[[[[[[[[[[[[[[[[[[[{a:b[0]}]]]]]]]]]]]]]]]]]]]])=>0;');
  fail('invalid method in pattern', '({get a(){}}) => 0;');
  fail('invalid member expression', '({a:b[0]})=>0');
  fail('invalid dup param', '([a,[b],...b])=>0;');

  pass('should handle array binding pattern empty', `([])=>0;`, {
            "type": "Program",
            "start": 0,
            "end": 8,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 8
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 8,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 8
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 0,
                  "end": 7,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 0
                    },
                    "end": {
                      "line": 1,
                      "column": 7
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "ArrayPattern",
                      "start": 1,
                      "end": 3,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 1
                        },
                        "end": {
                          "line": 1,
                          "column": 3
                        }
                      },
                      "elements": []
                    }
                  ],
                  "body": {
                    "type": "Literal",
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
                    },
                    "value": 0,
                    "raw": "0"
                  }
                }
              }
            ],
            "sourceType": "script"
          });

    pass('should handle array binding pattern empty', `([a]) => [0];`, {
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
            "body": [
              {
                "type": "ExpressionStatement",
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
                "expression": {
                  "type": "ArrowFunctionExpression",
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
                  },
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "ArrayPattern",
                      "start": 1,
                      "end": 4,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 1
                        },
                        "end": {
                          "line": 1,
                          "column": 4
                        }
                      },
                      "elements": [
                        {
                          "type": "Identifier",
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
                          "name": "a"
                        }
                      ]
                    }
                  ],
                  "body": {
                    "type": "ArrayExpression",
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
                    },
                    "elements": [
                      {
                        "type": "Literal",
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
                        "value": 0,
                        "raw": "0"
                      }
                    ]
                  }
                }
              }
            ],
            "sourceType": "script"
          });

    pass('should handle array binding pattern #2', `([a,b])=>0;`, {
            "type": "Program",
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
            },
            "body": [
              {
                "type": "ExpressionStatement",
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
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
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
                  },
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "ArrayPattern",
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
                      },
                      "elements": [
                        {
                          "type": "Identifier",
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
                          "name": "a"
                        },
                        {
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
                          "name": "b"
                        }
                      ]
                    }
                  ],
                  "body": {
                    "type": "Literal",
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
                    "value": 0,
                    "raw": "0"
                  }
                }
              }
            ],
            "sourceType": "script"
          });

    pass('should handle array binding pattern #3', `([a,...b])=>0;`, {
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
            "body": [
              {
                "type": "ExpressionStatement",
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
                "expression": {
                  "type": "ArrowFunctionExpression",
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
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "ArrayPattern",
                      "start": 1,
                      "end": 9,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 1
                        },
                        "end": {
                          "line": 1,
                          "column": 9
                        }
                      },
                      "elements": [
                        {
                          "type": "Identifier",
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
                          "name": "a"
                        },
                        {
                          "type": "RestElement",
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
                          },
                          "argument": {
                            "type": "Identifier",
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
                            },
                            "name": "b"
                          }
                        }
                      ]
                    }
                  ],
                  "body": {
                    "type": "Literal",
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
                    "value": 0,
                    "raw": "0"
                  }
                }
              }
            ],
            "sourceType": "script"
          });

      pass('should handle array binding pattern elison', `([,,])=>0`, {
            "type": "Program",
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
            },
            "body": [
              {
                "type": "ExpressionStatement",
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
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
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
                  },
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "ArrayPattern",
                      "start": 1,
                      "end": 5,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 1
                        },
                        "end": {
                          "line": 1,
                          "column": 5
                        }
                      },
                      "elements": [
                        null,
                        null
                      ]
                    }
                  ],
                  "body": {
                    "type": "Literal",
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
                    "value": 0,
                    "raw": "0"
                  }
                }
              }
            ],
            "sourceType": "script"
          });

    pass('should handle array binding pattern empty', `([[[[[[[[[[[[[[[[[[[[{a=b}]]]]]]]]]]]]]]]]]]]])=>0;`, {
            "type": "Program",
            "start": 0,
            "end": 51,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 51
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 51,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 51
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 0,
                  "end": 50,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 0
                    },
                    "end": {
                      "line": 1,
                      "column": 50
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "ArrayPattern",
                      "start": 1,
                      "end": 46,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 1
                        },
                        "end": {
                          "line": 1,
                          "column": 46
                        }
                      },
                      "elements": [
                        {
                          "type": "ArrayPattern",
                          "start": 2,
                          "end": 45,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 2
                            },
                            "end": {
                              "line": 1,
                              "column": 45
                            }
                          },
                          "elements": [
                            {
                              "type": "ArrayPattern",
                              "start": 3,
                              "end": 44,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 3
                                },
                                "end": {
                                  "line": 1,
                                  "column": 44
                                }
                              },
                              "elements": [
                                {
                                  "type": "ArrayPattern",
                                  "start": 4,
                                  "end": 43,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 4
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 43
                                    }
                                  },
                                  "elements": [
                                    {
                                      "type": "ArrayPattern",
                                      "start": 5,
                                      "end": 42,
                                      "loc": {
                                        "start": {
                                          "line": 1,
                                          "column": 5
                                        },
                                        "end": {
                                          "line": 1,
                                          "column": 42
                                        }
                                      },
                                      "elements": [
                                        {
                                          "type": "ArrayPattern",
                                          "start": 6,
                                          "end": 41,
                                          "loc": {
                                            "start": {
                                              "line": 1,
                                              "column": 6
                                            },
                                            "end": {
                                              "line": 1,
                                              "column": 41
                                            }
                                          },
                                          "elements": [
                                            {
                                              "type": "ArrayPattern",
                                              "start": 7,
                                              "end": 40,
                                              "loc": {
                                                "start": {
                                                  "line": 1,
                                                  "column": 7
                                                },
                                                "end": {
                                                  "line": 1,
                                                  "column": 40
                                                }
                                              },
                                              "elements": [
                                                {
                                                  "type": "ArrayPattern",
                                                  "start": 8,
                                                  "end": 39,
                                                  "loc": {
                                                    "start": {
                                                      "line": 1,
                                                      "column": 8
                                                    },
                                                    "end": {
                                                      "line": 1,
                                                      "column": 39
                                                    }
                                                  },
                                                  "elements": [
                                                    {
                                                      "type": "ArrayPattern",
                                                      "start": 9,
                                                      "end": 38,
                                                      "loc": {
                                                        "start": {
                                                          "line": 1,
                                                          "column": 9
                                                        },
                                                        "end": {
                                                          "line": 1,
                                                          "column": 38
                                                        }
                                                      },
                                                      "elements": [
                                                        {
                                                          "type": "ArrayPattern",
                                                          "start": 10,
                                                          "end": 37,
                                                          "loc": {
                                                            "start": {
                                                              "line": 1,
                                                              "column": 10
                                                            },
                                                            "end": {
                                                              "line": 1,
                                                              "column": 37
                                                            }
                                                          },
                                                          "elements": [
                                                            {
                                                              "type": "ArrayPattern",
                                                              "start": 11,
                                                              "end": 36,
                                                              "loc": {
                                                                "start": {
                                                                  "line": 1,
                                                                  "column": 11
                                                                },
                                                                "end": {
                                                                  "line": 1,
                                                                  "column": 36
                                                                }
                                                              },
                                                              "elements": [
                                                                {
                                                                  "type": "ArrayPattern",
                                                                  "start": 12,
                                                                  "end": 35,
                                                                  "loc": {
                                                                    "start": {
                                                                      "line": 1,
                                                                      "column": 12
                                                                    },
                                                                    "end": {
                                                                      "line": 1,
                                                                      "column": 35
                                                                    }
                                                                  },
                                                                  "elements": [
                                                                    {
                                                                      "type": "ArrayPattern",
                                                                      "start": 13,
                                                                      "end": 34,
                                                                      "loc": {
                                                                        "start": {
                                                                          "line": 1,
                                                                          "column": 13
                                                                        },
                                                                        "end": {
                                                                          "line": 1,
                                                                          "column": 34
                                                                        }
                                                                      },
                                                                      "elements": [
                                                                        {
                                                                          "type": "ArrayPattern",
                                                                          "start": 14,
                                                                          "end": 33,
                                                                          "loc": {
                                                                            "start": {
                                                                              "line": 1,
                                                                              "column": 14
                                                                            },
                                                                            "end": {
                                                                              "line": 1,
                                                                              "column": 33
                                                                            }
                                                                          },
                                                                          "elements": [
                                                                            {
                                                                              "type": "ArrayPattern",
                                                                              "start": 15,
                                                                              "end": 32,
                                                                              "loc": {
                                                                                "start": {
                                                                                  "line": 1,
                                                                                  "column": 15
                                                                                },
                                                                                "end": {
                                                                                  "line": 1,
                                                                                  "column": 32
                                                                                }
                                                                              },
                                                                              "elements": [
                                                                                {
                                                                                  "type": "ArrayPattern",
                                                                                  "start": 16,
                                                                                  "end": 31,
                                                                                  "loc": {
                                                                                    "start": {
                                                                                      "line": 1,
                                                                                      "column": 16
                                                                                    },
                                                                                    "end": {
                                                                                      "line": 1,
                                                                                      "column": 31
                                                                                    }
                                                                                  },
                                                                                  "elements": [
                                                                                    {
                                                                                      "type": "ArrayPattern",
                                                                                      "start": 17,
                                                                                      "end": 30,
                                                                                      "loc": {
                                                                                        "start": {
                                                                                          "line": 1,
                                                                                          "column": 17
                                                                                        },
                                                                                        "end": {
                                                                                          "line": 1,
                                                                                          "column": 30
                                                                                        }
                                                                                      },
                                                                                      "elements": [
                                                                                        {
                                                                                          "type": "ArrayPattern",
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
                                                                                          },
                                                                                          "elements": [
                                                                                            {
                                                                                              "type": "ArrayPattern",
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
                                                                                              },
                                                                                              "elements": [
                                                                                                {
                                                                                                  "type": "ArrayPattern",
                                                                                                  "start": 20,
                                                                                                  "end": 27,
                                                                                                  "loc": {
                                                                                                    "start": {
                                                                                                      "line": 1,
                                                                                                      "column": 20
                                                                                                    },
                                                                                                    "end": {
                                                                                                      "line": 1,
                                                                                                      "column": 27
                                                                                                    }
                                                                                                  },
                                                                                                  "elements": [
                                                                                                    {
                                                                                                      "type": "ObjectPattern",
                                                                                                      "start": 21,
                                                                                                      "end": 26,
                                                                                                      "loc": {
                                                                                                        "start": {
                                                                                                          "line": 1,
                                                                                                          "column": 21
                                                                                                        },
                                                                                                        "end": {
                                                                                                          "line": 1,
                                                                                                          "column": 26
                                                                                                        }
                                                                                                      },
                                                                                                      "properties": [
                                                                                                        {
                                                                                                          "type": "Property",
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
                                                                                                          },
                                                                                                          "method": false,
                                                                                                          "shorthand": true,
                                                                                                          "computed": false,
                                                                                                          "key": {
                                                                                                            "type": "Identifier",
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
                                                                                                            },
                                                                                                            "name": "a"
                                                                                                          },
                                                                                                          "kind": "init",
                                                                                                          "value": {
                                                                                                            "type": "AssignmentPattern",
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
                                                                                                            },
                                                                                                            "left": {
                                                                                                              "type": "Identifier",
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
                                                                                                              },
                                                                                                              "name": "a"
                                                                                                            },
                                                                                                            "right": {
                                                                                                              "type": "Identifier",
                                                                                                              "start": 24,
                                                                                                              "end": 25,
                                                                                                              "loc": {
                                                                                                                "start": {
                                                                                                                  "line": 1,
                                                                                                                  "column": 24
                                                                                                                },
                                                                                                                "end": {
                                                                                                                  "line": 1,
                                                                                                                  "column": 25
                                                                                                                }
                                                                                                              },
                                                                                                              "name": "b"
                                                                                                            }
                                                                                                          }
                                                                                                        }
                                                                                                      ]
                                                                                                    }
                                                                                                  ]
                                                                                                }
                                                                                              ]
                                                                                            }
                                                                                          ]
                                                                                        }
                                                                                      ]
                                                                                    }
                                                                                  ]
                                                                                }
                                                                              ]
                                                                            }
                                                                          ]
                                                                        }
                                                                      ]
                                                                    }
                                                                  ]
                                                                }
                                                              ]
                                                            }
                                                          ]
                                                        }
                                                      ]
                                                    }
                                                  ]
                                                }
                                              ]
                                            }
                                          ]
                                        }
                                      ]
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ],
                  "body": {
                    "type": "Literal",
                    "start": 49,
                    "end": 50,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 49
                      },
                      "end": {
                        "line": 1,
                        "column": 50
                      }
                    },
                    "value": 0,
                    "raw": "0"
                  }
                }
              }
            ],
            "sourceType": "script"
          });

    pass('should handle array binding pattern empty', `({a,b=b,a:c,[a]:[d]})=>0;`, {
            "type": "Program",
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
            },
            "body": [
              {
                "type": "ExpressionStatement",
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
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
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
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "ObjectPattern",
                      "start": 1,
                      "end": 20,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 1
                        },
                        "end": {
                          "line": 1,
                          "column": 20
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
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
                          "method": false,
                          "shorthand": true,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
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
                            "name": "a"
                          },
                          "kind": "init",
                          "value": {
                            "type": "Identifier",
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
                            "name": "a"
                          }
                        },
                        {
                          "type": "Property",
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
                          },
                          "method": false,
                          "shorthand": true,
                          "computed": false,
                          "key": {
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
                            "name": "b"
                          },
                          "kind": "init",
                          "value": {
                            "type": "AssignmentPattern",
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
                            },
                            "left": {
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
                              "name": "b"
                            },
                            "right": {
                              "type": "Identifier",
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
                              },
                              "name": "b"
                            }
                          }
                        },
                        {
                          "type": "Property",
                          "start": 8,
                          "end": 11,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 8
                            },
                            "end": {
                              "line": 1,
                              "column": 11
                            }
                          },
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
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
                            "name": "a"
                          },
                          "value": {
                            "type": "Identifier",
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
                            "name": "c"
                          },
                          "kind": "init"
                        },
                        {
                          "type": "Property",
                          "start": 12,
                          "end": 19,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 12
                            },
                            "end": {
                              "line": 1,
                              "column": 19
                            }
                          },
                          "method": false,
                          "shorthand": false,
                          "computed": true,
                          "key": {
                            "type": "Identifier",
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
                            "name": "a"
                          },
                          "value": {
                            "type": "ArrayPattern",
                            "start": 16,
                            "end": 19,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 16
                              },
                              "end": {
                                "line": 1,
                                "column": 19
                              }
                            },
                            "elements": [
                              {
                                "type": "Identifier",
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
                                },
                                "name": "d"
                              }
                            ]
                          },
                          "kind": "init"
                        }
                      ]
                    }
                  ],
                  "body": {
                    "type": "Literal",
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
                    "value": 0,
                    "raw": "0"
                  }
                }
              }
            ],
            "sourceType": "script"
          });

    pass('should handle array binding pattern empty', `({})=>0;`, {
            "type": "Program",
            "start": 0,
            "end": 8,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 8
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 8,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 8
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 0,
                  "end": 7,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 0
                    },
                    "end": {
                      "line": 1,
                      "column": 7
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "ObjectPattern",
                      "start": 1,
                      "end": 3,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 1
                        },
                        "end": {
                          "line": 1,
                          "column": 3
                        }
                      },
                      "properties": []
                    }
                  ],
                  "body": {
                    "type": "Literal",
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
                    },
                    "value": 0,
                    "raw": "0"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    
      pass('should handle array binding pattern empty', `[a,a,,...a]=0;`, {
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
            "body": [
              {
                "type": "ExpressionStatement",
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
                "expression": {
                  "type": "AssignmentExpression",
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
                  "operator": "=",
                  "left": {
                    "type": "ArrayPattern",
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
                    },
                    "elements": [
                      {
                        "type": "Identifier",
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
                        },
                        "name": "a"
                      },
                      {
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
                      null,
                      {
                        "type": "RestElement",
                        "start": 6,
                        "end": 10,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 6
                          },
                          "end": {
                            "line": 1,
                            "column": 10
                          }
                        },
                        "argument": {
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
                          "name": "a"
                        }
                      }
                    ]
                  },
                  "right": {
                    "type": "Literal",
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
                    "value": 0,
                    "raw": "0"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
});
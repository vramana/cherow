import { pass, fail } from '../utils';

describe('Statements - If', () => {
  
    fail(`if (true) async function f() {  }`, {
      source: 'if (true) async function f() {  }',
  });

  pass(`label: function g() {}`, {
    source: 'label: function g() {}',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
      "type": "Program",
      "body": [
          {
              "type": "LabeledStatement",
              "label": {
                  "type": "Identifier",
                  "name": "label",
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
              },
              "body": {
                  "type": "FunctionDeclaration",
                  "params": [],
                  "body": {
                      "type": "BlockStatement",
                      "body": [],
                      "start": 20,
                      "end": 22,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 20
                          },
                          "end": {
                              "line": 1,
                              "column": 22
                          }
                      }
                  },
                  "async": false,
                  "generator": false,
                  "expression": false,
                  "id": {
                      "type": "Identifier",
                      "name": "g",
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
  }
  });

  pass(`label1: label2: function f() {}`, {
    source: 'label1: label2: function f() {}',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
      "type": "Program",
      "body": [
          {
              "type": "LabeledStatement",
              "label": {
                  "type": "Identifier",
                  "name": "label1",
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
                  }
              },
              "body": {
                  "type": "LabeledStatement",
                  "label": {
                      "type": "Identifier",
                      "name": "label2",
                      "start": 8,
                      "end": 14,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 8
                          },
                          "end": {
                              "line": 1,
                              "column": 14
                          }
                      }
                  },
                  "body": {
                      "type": "FunctionDeclaration",
                      "params": [],
                      "body": {
                          "type": "BlockStatement",
                          "body": [],
                          "start": 29,
                          "end": 31,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 29
                              },
                              "end": {
                                  "line": 1,
                                  "column": 31
                              }
                          }
                      },
                      "async": false,
                      "generator": false,
                      "expression": false,
                      "id": {
                          "type": "Identifier",
                          "name": "f",
                          "start": 25,
                          "end": 26,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 25
                              },
                              "end": {
                                  "line": 1,
                                  "column": 26
                              }
                          }
                      },
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
                      }
                  },
                  "start": 8,
                  "end": 31,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 8
                      },
                      "end": {
                          "line": 1,
                          "column": 31
                      }
                  }
              },
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
  }
  });

      pass(`if (morning) goodMorning()`, {
          source: 'if (morning) goodMorning()',
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
                "type": "IfStatement",
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
                "test": {
                  "type": "Identifier",
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
                  },
                  "name": "morning"
                },
                "consequent": {
                  "type": "ExpressionStatement",
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
                  },
                  "expression": {
                    "type": "CallExpression",
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
                    },
                    "callee": {
                      "type": "Identifier",
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
                      },
                      "name": "goodMorning"
                    },
                    "arguments": []
                  }
                },
                "alternate": null
              }
            ],
            "sourceType": "script"
          }
      });
  
      pass(`if (morning) (function(){})`, {
          source: 'if (morning) (function(){})',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
            "type": "Program",
            "start": 0,
            "end": 27,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 27
              }
            },
            "body": [
              {
                "type": "IfStatement",
                "start": 0,
                "end": 27,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 27
                  }
                },
                "test": {
                  "type": "Identifier",
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
                  },
                  "name": "morning"
                },
                "consequent": {
                  "type": "ExpressionStatement",
                  "start": 13,
                  "end": 27,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 13
                    },
                    "end": {
                      "line": 1,
                      "column": 27
                    }
                  },
                  "expression": {
                    "type": "FunctionExpression",
                    "start": 14,
                    "end": 26,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 14
                      },
                      "end": {
                        "line": 1,
                        "column": 26
                      }
                    },
                    "id": null,
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [],
                    "body": {
                      "type": "BlockStatement",
                      "start": 24,
                      "end": 26,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 24
                        },
                        "end": {
                          "line": 1,
                          "column": 26
                        }
                      },
                      "body": []
                    }
                  }
                },
                "alternate": null
              }
            ],
            "sourceType": "script"
          }
      });
  
      pass(`if (morning) var x = 0;`, {
          source: 'if (morning) var x = 0;',
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
                    "line": 1,
                    "column": 23
                  }
                },
                "test": {
                  "type": "Identifier",
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
                  },
                  "name": "morning"
                },
                "consequent": {
                  "type": "VariableDeclaration",
                  "start": 13,
                  "end": 23,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 13
                    },
                    "end": {
                      "line": 1,
                      "column": 23
                    }
                  },
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
                      "start": 17,
                      "end": 22,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 17
                        },
                        "end": {
                          "line": 1,
                          "column": 22
                        }
                      },
                      "id": {
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
                        "name": "x"
                      },
                      "init": {
                        "type": "Literal",
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
                        "value": 0,
                        "raw": "0"
                      }
                    }
                  ],
                  "kind": "var"
                },
                "alternate": null
              }
            ],
            "sourceType": "script"
          }
      });
  
      pass(`if (morning) goodMorning(); else goodDay()`, {
          source: 'if (morning) goodMorning(); else goodDay()',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
            "type": "Program",
            "start": 0,
            "end": 42,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 42
              }
            },
            "body": [
              {
                "type": "IfStatement",
                "start": 0,
                "end": 42,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 42
                  }
                },
                "test": {
                  "type": "Identifier",
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
                  },
                  "name": "morning"
                },
                "consequent": {
                  "type": "ExpressionStatement",
                  "start": 13,
                  "end": 27,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 13
                    },
                    "end": {
                      "line": 1,
                      "column": 27
                    }
                  },
                  "expression": {
                    "type": "CallExpression",
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
                    },
                    "callee": {
                      "type": "Identifier",
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
                      },
                      "name": "goodMorning"
                    },
                    "arguments": []
                  }
                },
                "alternate": {
                  "type": "ExpressionStatement",
                  "start": 33,
                  "end": 42,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 33
                    },
                    "end": {
                      "line": 1,
                      "column": 42
                    }
                  },
                  "expression": {
                    "type": "CallExpression",
                    "start": 33,
                    "end": 42,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 33
                      },
                      "end": {
                        "line": 1,
                        "column": 42
                      }
                    },
                    "callee": {
                      "type": "Identifier",
                      "start": 33,
                      "end": 40,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 33
                        },
                        "end": {
                          "line": 1,
                          "column": 40
                        }
                      },
                      "name": "goodDay"
                    },
                    "arguments": []
                  }
                }
              }
            ],
            "sourceType": "script"
          }
      });
  
      pass(`if(a)b;`, {
          source: 'if(a)b;',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
            "type": "Program",
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
            "body": [
              {
                "type": "IfStatement",
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
                "alternate": null
              }
            ],
            "sourceType": "script"
          }
      });
  
      pass(`if(a)b;else c;`, {
        source: 'if(a)b;else c;',
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
            "body": [
              {
                "type": "IfStatement",
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
                  },
                  "expression": {
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
                    "name": "c"
                  }
                }
              }
            ],
            "sourceType": "script"
          }
      });
  });
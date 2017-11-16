import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Generators', () => {

  it('should fail if yield are used as parameter', () => {
    expect(() => {
        parseScript(`var g = function*(yield) {};`)
    }).to.throw('');
});

it('should fail if yield are used as parameter', () => {
  expect(() => {
      parseScript(`function* f(x = 0, x) {}`)
  }).to.throw('');
});

it('should fail on yield weak binding', () => {
  expect(() => {
      parseScript(`var g = function*() { yield 3 + yield 4; };`)
  }).to.throw('');
});

it('should fail if yield are used as parameter', () => {
  expect(() => {
      parseScript(`var g = function*(yield) {};`)
  }).to.throw('');
});
    
  it('should parse yield as a valid identifier in a function body inside a generator body in non strict mode', () => {
    expect(parseScript(`var gen = function *() {
      return (function(arg) {
          var yield = arg + 1;
          return yield;
        }(yield))
    };`, {
      raw: true,
    ranges: true,
    locations: true,
    next: true
  })).to.eql({
    "type": "Program",
    "start": 0,
    "end": 134,
    "loc": {
      "start": {
        "line": 1,
        "column": 0
      },
      "end": {
        "line": 6,
        "column": 6
      }
    },
    "body": [
      {
        "type": "VariableDeclaration",
        "start": 0,
        "end": 134,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 6
          }
        },
        "declarations": [
          {
            "type": "VariableDeclarator",
            "start": 4,
            "end": 133,
            "loc": {
              "start": {
                "line": 1,
                "column": 4
              },
              "end": {
                "line": 6,
                "column": 5
              }
            },
            "id": {
              "type": "Identifier",
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
              "name": "gen"
            },
            "init": {
              "type": "FunctionExpression",
              "start": 10,
              "end": 133,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 10
                },
                "end": {
                  "line": 6,
                  "column": 5
                }
              },
              "id": null,
              "generator": true,
              "expression": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 23,
                "end": 133,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 23
                  },
                  "end": {
                    "line": 6,
                    "column": 5
                  }
                },
                "body": [
                  {
                    "type": "ReturnStatement",
                    "start": 31,
                    "end": 127,
                    "loc": {
                      "start": {
                        "line": 2,
                        "column": 6
                      },
                      "end": {
                        "line": 5,
                        "column": 17
                      }
                    },
                    "argument": {
                      "type": "CallExpression",
                      "start": 39,
                      "end": 126,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 14
                        },
                        "end": {
                          "line": 5,
                          "column": 16
                        }
                      },
                      "callee": {
                        "type": "FunctionExpression",
                        "start": 39,
                        "end": 119,
                        "loc": {
                          "start": {
                            "line": 2,
                            "column": 14
                          },
                          "end": {
                            "line": 5,
                            "column": 9
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [
                          {
                            "type": "Identifier",
                            "start": 48,
                            "end": 51,
                            "loc": {
                              "start": {
                                "line": 2,
                                "column": 23
                              },
                              "end": {
                                "line": 2,
                                "column": 26
                              }
                            },
                            "name": "arg"
                          }
                        ],
                        "body": {
                          "type": "BlockStatement",
                          "start": 53,
                          "end": 119,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 28
                            },
                            "end": {
                              "line": 5,
                              "column": 9
                            }
                          },
                          "body": [
                            {
                              "type": "VariableDeclaration",
                              "start": 65,
                              "end": 85,
                              "loc": {
                                "start": {
                                  "line": 3,
                                  "column": 10
                                },
                                "end": {
                                  "line": 3,
                                  "column": 30
                                }
                              },
                              "declarations": [
                                {
                                  "type": "VariableDeclarator",
                                  "start": 69,
                                  "end": 84,
                                  "loc": {
                                    "start": {
                                      "line": 3,
                                      "column": 14
                                    },
                                    "end": {
                                      "line": 3,
                                      "column": 29
                                    }
                                  },
                                  "id": {
                                    "type": "Identifier",
                                    "start": 69,
                                    "end": 74,
                                    "loc": {
                                      "start": {
                                        "line": 3,
                                        "column": 14
                                      },
                                      "end": {
                                        "line": 3,
                                        "column": 19
                                      }
                                    },
                                    "name": "yield"
                                  },
                                  "init": {
                                    "type": "BinaryExpression",
                                    "start": 77,
                                    "end": 84,
                                    "loc": {
                                      "start": {
                                        "line": 3,
                                        "column": 22
                                      },
                                      "end": {
                                        "line": 3,
                                        "column": 29
                                      }
                                    },
                                    "left": {
                                      "type": "Identifier",
                                      "start": 77,
                                      "end": 80,
                                      "loc": {
                                        "start": {
                                          "line": 3,
                                          "column": 22
                                        },
                                        "end": {
                                          "line": 3,
                                          "column": 25
                                        }
                                      },
                                      "name": "arg"
                                    },
                                    "operator": "+",
                                    "right": {
                                      "type": "Literal",
                                      "start": 83,
                                      "end": 84,
                                      "loc": {
                                        "start": {
                                          "line": 3,
                                          "column": 28
                                        },
                                        "end": {
                                          "line": 3,
                                          "column": 29
                                        }
                                      },
                                      "value": 1,
                                      "raw": "1"
                                    }
                                  }
                                }
                              ],
                              "kind": "var"
                            },
                            {
                              "type": "ReturnStatement",
                              "start": 96,
                              "end": 109,
                              "loc": {
                                "start": {
                                  "line": 4,
                                  "column": 10
                                },
                                "end": {
                                  "line": 4,
                                  "column": 23
                                }
                              },
                              "argument": {
                                "type": "Identifier",
                                "start": 103,
                                "end": 108,
                                "loc": {
                                  "start": {
                                    "line": 4,
                                    "column": 17
                                  },
                                  "end": {
                                    "line": 4,
                                    "column": 22
                                  }
                                },
                                "name": "yield"
                              }
                            }
                          ]
                        }
                      },
                      "arguments": [
                        {
                          "type": "YieldExpression",
                          "start": 120,
                          "end": 125,
                          "loc": {
                            "start": {
                              "line": 5,
                              "column": 10
                            },
                            "end": {
                              "line": 5,
                              "column": 15
                            }
                          },
                          "delegate": false,
                          "argument": null
                        }
                      ]
                    }
                  }
                ]
              }
            }
          }
        ],
        "kind": "var"
      }
    ],
    "sourceType": "script"
  });
});

it('should parse yield spread multiple', () => {
  expect(parseScript(`var gen = function *() {
    yield [...yield yield];
  };`, {
    raw: true,
  ranges: true,
  locations: true,
  next: true
})).to.eql({
  "type": "Program",
  "start": 0,
  "end": 57,
  "loc": {
    "start": {
      "line": 1,
      "column": 0
    },
    "end": {
      "line": 3,
      "column": 4
    }
  },
  "body": [
    {
      "type": "VariableDeclaration",
      "start": 0,
      "end": 57,
      "loc": {
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 3,
          "column": 4
        }
      },
      "declarations": [
        {
          "type": "VariableDeclarator",
          "start": 4,
          "end": 56,
          "loc": {
            "start": {
              "line": 1,
              "column": 4
            },
            "end": {
              "line": 3,
              "column": 3
            }
          },
          "id": {
            "type": "Identifier",
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
            "name": "gen"
          },
          "init": {
            "type": "FunctionExpression",
            "start": 10,
            "end": 56,
            "loc": {
              "start": {
                "line": 1,
                "column": 10
              },
              "end": {
                "line": 3,
                "column": 3
              }
            },
            "id": null,
            "generator": true,
            "expression": false,
            "async": false,
            "params": [],
            "body": {
              "type": "BlockStatement",
              "start": 23,
              "end": 56,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 23
                },
                "end": {
                  "line": 3,
                  "column": 3
                }
              },
              "body": [
                {
                  "type": "ExpressionStatement",
                  "start": 29,
                  "end": 52,
                  "loc": {
                    "start": {
                      "line": 2,
                      "column": 4
                    },
                    "end": {
                      "line": 2,
                      "column": 27
                    }
                  },
                  "expression": {
                    "type": "YieldExpression",
                    "start": 29,
                    "end": 51,
                    "loc": {
                      "start": {
                        "line": 2,
                        "column": 4
                      },
                      "end": {
                        "line": 2,
                        "column": 26
                      }
                    },
                    "delegate": false,
                    "argument": {
                      "type": "ArrayExpression",
                      "start": 35,
                      "end": 51,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 10
                        },
                        "end": {
                          "line": 2,
                          "column": 26
                        }
                      },
                      "elements": [
                        {
                          "type": "SpreadElement",
                          "start": 36,
                          "end": 50,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 11
                            },
                            "end": {
                              "line": 2,
                              "column": 25
                            }
                          },
                          "argument": {
                            "type": "YieldExpression",
                            "start": 39,
                            "end": 50,
                            "loc": {
                              "start": {
                                "line": 2,
                                "column": 14
                              },
                              "end": {
                                "line": 2,
                                "column": 25
                              }
                            },
                            "delegate": false,
                            "argument": {
                              "type": "YieldExpression",
                              "start": 45,
                              "end": 50,
                              "loc": {
                                "start": {
                                  "line": 2,
                                  "column": 20
                                },
                                "end": {
                                  "line": 2,
                                  "column": 25
                                }
                              },
                              "delegate": false,
                              "argument": null
                            }
                          }
                        }
                      ]
                    }
                  }
                }
              ]
            }
          }
        }
      ],
      "kind": "var"
    }
  ],
  "sourceType": "script"
});
});

it('should parse yield spread single', () => {
  expect(parseScript(`var gen = function *() {
    yield [...yield];
  };`, {
    raw: true,
  ranges: true,
  locations: true,
  next: true
})).to.eql({
  "type": "Program",
  "start": 0,
  "end": 51,
  "loc": {
    "start": {
      "line": 1,
      "column": 0
    },
    "end": {
      "line": 3,
      "column": 4
    }
  },
  "body": [
    {
      "type": "VariableDeclaration",
      "start": 0,
      "end": 51,
      "loc": {
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 3,
          "column": 4
        }
      },
      "declarations": [
        {
          "type": "VariableDeclarator",
          "start": 4,
          "end": 50,
          "loc": {
            "start": {
              "line": 1,
              "column": 4
            },
            "end": {
              "line": 3,
              "column": 3
            }
          },
          "id": {
            "type": "Identifier",
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
            "name": "gen"
          },
          "init": {
            "type": "FunctionExpression",
            "start": 10,
            "end": 50,
            "loc": {
              "start": {
                "line": 1,
                "column": 10
              },
              "end": {
                "line": 3,
                "column": 3
              }
            },
            "id": null,
            "generator": true,
            "expression": false,
            "async": false,
            "params": [],
            "body": {
              "type": "BlockStatement",
              "start": 23,
              "end": 50,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 23
                },
                "end": {
                  "line": 3,
                  "column": 3
                }
              },
              "body": [
                {
                  "type": "ExpressionStatement",
                  "start": 29,
                  "end": 46,
                  "loc": {
                    "start": {
                      "line": 2,
                      "column": 4
                    },
                    "end": {
                      "line": 2,
                      "column": 21
                    }
                  },
                  "expression": {
                    "type": "YieldExpression",
                    "start": 29,
                    "end": 45,
                    "loc": {
                      "start": {
                        "line": 2,
                        "column": 4
                      },
                      "end": {
                        "line": 2,
                        "column": 20
                      }
                    },
                    "delegate": false,
                    "argument": {
                      "type": "ArrayExpression",
                      "start": 35,
                      "end": 45,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 10
                        },
                        "end": {
                          "line": 2,
                          "column": 20
                        }
                      },
                      "elements": [
                        {
                          "type": "SpreadElement",
                          "start": 36,
                          "end": 44,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 11
                            },
                            "end": {
                              "line": 2,
                              "column": 19
                            }
                          },
                          "argument": {
                            "type": "YieldExpression",
                            "start": 39,
                            "end": 44,
                            "loc": {
                              "start": {
                                "line": 2,
                                "column": 14
                              },
                              "end": {
                                "line": 2,
                                "column": 19
                              }
                            },
                            "delegate": false,
                            "argument": null
                          }
                        }
                      ]
                    }
                  }
                }
              ]
            }
          }
        }
      ],
      "kind": "var"
    }
  ],
  "sourceType": "script"
});
});

 it('should parse yield as statement', () => {
  expect(parseScript(`var g1 = function*() { yield; };
  var g2 = function*() { yield 1; };`, {
      raw: true,
      ranges: true,
      locations: true,
      next: true
  })).to.eql({
    "type": "Program",
    "start": 0,
    "end": 69,
    "loc": {
      "start": {
        "line": 1,
        "column": 0
      },
      "end": {
        "line": 2,
        "column": 36
      }
    },
    "body": [
      {
        "type": "VariableDeclaration",
        "start": 0,
        "end": 32,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 32
          }
        },
        "declarations": [
          {
            "type": "VariableDeclarator",
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
            },
            "id": {
              "type": "Identifier",
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
              },
              "name": "g1"
            },
            "init": {
              "type": "FunctionExpression",
              "start": 9,
              "end": 31,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 9
                },
                "end": {
                  "line": 1,
                  "column": 31
                }
              },
              "id": null,
              "generator": true,
              "expression": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 21,
                "end": 31,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 21
                  },
                  "end": {
                    "line": 1,
                    "column": 31
                  }
                },
                "body": [
                  {
                    "type": "ExpressionStatement",
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
                    "expression": {
                      "type": "YieldExpression",
                      "start": 23,
                      "end": 28,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 23
                        },
                        "end": {
                          "line": 1,
                          "column": 28
                        }
                      },
                      "delegate": false,
                      "argument": null
                    }
                  }
                ]
              }
            }
          }
        ],
        "kind": "var"
      },
      {
        "type": "VariableDeclaration",
        "start": 35,
        "end": 69,
        "loc": {
          "start": {
            "line": 2,
            "column": 2
          },
          "end": {
            "line": 2,
            "column": 36
          }
        },
        "declarations": [
          {
            "type": "VariableDeclarator",
            "start": 39,
            "end": 68,
            "loc": {
              "start": {
                "line": 2,
                "column": 6
              },
              "end": {
                "line": 2,
                "column": 35
              }
            },
            "id": {
              "type": "Identifier",
              "start": 39,
              "end": 41,
              "loc": {
                "start": {
                  "line": 2,
                  "column": 6
                },
                "end": {
                  "line": 2,
                  "column": 8
                }
              },
              "name": "g2"
            },
            "init": {
              "type": "FunctionExpression",
              "start": 44,
              "end": 68,
              "loc": {
                "start": {
                  "line": 2,
                  "column": 11
                },
                "end": {
                  "line": 2,
                  "column": 35
                }
              },
              "id": null,
              "generator": true,
              "expression": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 56,
                "end": 68,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 23
                  },
                  "end": {
                    "line": 2,
                    "column": 35
                  }
                },
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 58,
                    "end": 66,
                    "loc": {
                      "start": {
                        "line": 2,
                        "column": 25
                      },
                      "end": {
                        "line": 2,
                        "column": 33
                      }
                    },
                    "expression": {
                      "type": "YieldExpression",
                      "start": 58,
                      "end": 65,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 25
                        },
                        "end": {
                          "line": 2,
                          "column": 32
                        }
                      },
                      "delegate": false,
                      "argument": {
                        "type": "Literal",
                        "start": 64,
                        "end": 65,
                        "loc": {
                          "start": {
                            "line": 2,
                            "column": 31
                          },
                          "end": {
                            "line": 2,
                            "column": 32
                          }
                        },
                        "value": 1,
                        "raw": "1"
                      }
                    }
                  }
                ]
              }
            }
          }
        ],
        "kind": "var"
      }
    ],
    "sourceType": "script"
  });
});
  
  // Acorn fails on this
  it('should parse yield property name', () => {
    expect(parseScript(`var g = function*() {
      ({  yield: 1 });
    };`, {
        raw: true,
        ranges: true,
        locations: true,
        next: true
    })).to.eql({
      "type": "Program",
      "body": [
          {
              "type": "VariableDeclaration",
              "declarations": [
                  {
                      "type": "VariableDeclarator",
                      "init": {
                          "type": "FunctionExpression",
                          "params": [],
                          "body": {
                              "type": "BlockStatement",
                              "body": [
                                  {
                                      "type": "ExpressionStatement",
                                      "expression": {
                                          "type": "ObjectExpression",
                                          "properties": [
                                              {
                                                  "type": "Property",
                                                  "key": {
                                                      "type": "Identifier",
                                                      "name": "yield",
                                                      "start": 32,
                                                      "end": 37,
                                                      "loc": {
                                                          "start": {
                                                              "line": 2,
                                                              "column": 10
                                                          },
                                                          "end": {
                                                              "line": 2,
                                                              "column": 15
                                                          }
                                                      }
                                                  },
                                                  "value": {
                                                      "type": "Literal",
                                                      "value": 1,
                                                      "start": 39,
                                                      "end": 40,
                                                      "loc": {
                                                          "start": {
                                                              "line": 2,
                                                              "column": 17
                                                          },
                                                          "end": {
                                                              "line": 2,
                                                              "column": 18
                                                          }
                                                      },
                                                      "raw": "1"
                                                  },
                                                  "kind": "init",
                                                  "computed": false,
                                                  "method": false,
                                                  "shorthand": false,
                                                  "start": 32,
                                                  "end": 40,
                                                  "loc": {
                                                      "start": {
                                                          "line": 2,
                                                          "column": 10
                                                      },
                                                      "end": {
                                                          "line": 2,
                                                          "column": 18
                                                      }
                                                  }
                                              }
                                          ],
                                          "start": 29,
                                          "end": 42,
                                          "loc": {
                                              "start": {
                                                  "line": 2,
                                                  "column": 7
                                              },
                                              "end": {
                                                  "line": 2,
                                                  "column": 20
                                              }
                                          }
                                      },
                                      "start": 28,
                                      "end": 44,
                                      "loc": {
                                          "start": {
                                              "line": 2,
                                              "column": 6
                                          },
                                          "end": {
                                              "line": 2,
                                              "column": 22
                                          }
                                      }
                                  }
                              ],
                              "start": 20,
                              "end": 50,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 20
                                  },
                                  "end": {
                                      "line": 3,
                                      "column": 5
                                  }
                              }
                          },
                          "async": false,
                          "generator": true,
                          "expression": false,
                          "id": null,
                          "start": 8,
                          "end": 50,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 8
                              },
                              "end": {
                                  "line": 3,
                                  "column": 5
                              }
                          }
                      },
                      "id": {
                          "type": "Identifier",
                          "name": "g",
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
                      "end": 50,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 4
                          },
                          "end": {
                              "line": 3,
                              "column": 5
                          }
                      }
                  }
              ],
              "kind": "var",
              "start": 0,
              "end": 51,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 3,
                      "column": 6
                  }
              }
          }
      ],
      "sourceType": "script",
      "start": 0,
      "end": 51,
      "loc": {
          "start": {
              "line": 1,
              "column": 0
          },
          "end": {
              "line": 3,
              "column": 6
          }
      }
  });
  });

  it('should parse yield spread object', () => {
    expect(parseScript(`var gen = function *() {
      yield {
          ...yield,
          y: 1,
          ...yield yield,
        };
    };`, {
        raw: true,
        ranges: true,
        locations: true,
        next: true
    })).to.eql({
      "type": "Program",
      "body": [
          {
              "type": "VariableDeclaration",
              "declarations": [
                  {
                      "type": "VariableDeclarator",
                      "init": {
                          "type": "FunctionExpression",
                          "params": [],
                          "body": {
                              "type": "BlockStatement",
                              "body": [
                                  {
                                      "type": "ExpressionStatement",
                                      "expression": {
                                          "type": "YieldExpression",
                                          "argument": {
                                              "type": "ObjectExpression",
                                              "properties": [
                                                  {
                                                      "type": "SpreadElement",
                                                      "argument": {
                                                          "type": "YieldExpression",
                                                          "argument": null,
                                                          "delegate": false,
                                                          "start": 52,
                                                          "end": 57,
                                                          "loc": {
                                                              "start": {
                                                                  "line": 3,
                                                                  "column": 13
                                                              },
                                                              "end": {
                                                                  "line": 3,
                                                                  "column": 18
                                                              }
                                                          }
                                                      },
                                                      "start": 49,
                                                      "end": 57,
                                                      "loc": {
                                                          "start": {
                                                              "line": 3,
                                                              "column": 10
                                                          },
                                                          "end": {
                                                              "line": 3,
                                                              "column": 18
                                                          }
                                                      }
                                                  },
                                                  {
                                                      "type": "Property",
                                                      "key": {
                                                          "type": "Identifier",
                                                          "name": "y",
                                                          "start": 69,
                                                          "end": 70,
                                                          "loc": {
                                                              "start": {
                                                                  "line": 4,
                                                                  "column": 10
                                                              },
                                                              "end": {
                                                                  "line": 4,
                                                                  "column": 11
                                                              }
                                                          }
                                                      },
                                                      "value": {
                                                          "type": "Literal",
                                                          "value": 1,
                                                          "start": 72,
                                                          "end": 73,
                                                          "loc": {
                                                              "start": {
                                                                  "line": 4,
                                                                  "column": 13
                                                              },
                                                              "end": {
                                                                  "line": 4,
                                                                  "column": 14
                                                              }
                                                          },
                                                          "raw": "1"
                                                      },
                                                      "kind": "init",
                                                      "computed": false,
                                                      "method": false,
                                                      "shorthand": false,
                                                      "start": 69,
                                                      "end": 73,
                                                      "loc": {
                                                          "start": {
                                                              "line": 4,
                                                              "column": 10
                                                          },
                                                          "end": {
                                                              "line": 4,
                                                              "column": 14
                                                          }
                                                      }
                                                  },
                                                  {
                                                      "type": "SpreadElement",
                                                      "argument": {
                                                          "type": "YieldExpression",
                                                          "argument": {
                                                              "type": "YieldExpression",
                                                              "argument": null,
                                                              "delegate": false,
                                                              "start": 94,
                                                              "end": 99,
                                                              "loc": {
                                                                  "start": {
                                                                      "line": 5,
                                                                      "column": 19
                                                                  },
                                                                  "end": {
                                                                      "line": 5,
                                                                      "column": 24
                                                                  }
                                                              }
                                                          },
                                                          "delegate": false,
                                                          "start": 88,
                                                          "end": 99,
                                                          "loc": {
                                                              "start": {
                                                                  "line": 5,
                                                                  "column": 13
                                                              },
                                                              "end": {
                                                                  "line": 5,
                                                                  "column": 24
                                                              }
                                                          }
                                                      },
                                                      "start": 85,
                                                      "end": 99,
                                                      "loc": {
                                                          "start": {
                                                              "line": 5,
                                                              "column": 10
                                                          },
                                                          "end": {
                                                              "line": 5,
                                                              "column": 24
                                                          }
                                                      }
                                                  }
                                              ],
                                              "start": 37,
                                              "end": 110,
                                              "loc": {
                                                  "start": {
                                                      "line": 2,
                                                      "column": 12
                                                  },
                                                  "end": {
                                                      "line": 6,
                                                      "column": 9
                                                  }
                                              }
                                          },
                                          "delegate": false,
                                          "start": 31,
                                          "end": 110,
                                          "loc": {
                                              "start": {
                                                  "line": 2,
                                                  "column": 6
                                              },
                                              "end": {
                                                  "line": 6,
                                                  "column": 9
                                              }
                                          }
                                      },
                                      "start": 31,
                                      "end": 111,
                                      "loc": {
                                          "start": {
                                              "line": 2,
                                              "column": 6
                                          },
                                          "end": {
                                              "line": 6,
                                              "column": 10
                                          }
                                      }
                                  }
                              ],
                              "start": 23,
                              "end": 117,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 23
                                  },
                                  "end": {
                                      "line": 7,
                                      "column": 5
                                  }
                              }
                          },
                          "async": false,
                          "generator": true,
                          "expression": false,
                          "id": null,
                          "start": 10,
                          "end": 117,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 10
                              },
                              "end": {
                                  "line": 7,
                                  "column": 5
                              }
                          }
                      },
                      "id": {
                          "type": "Identifier",
                          "name": "gen",
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
                      "end": 117,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 4
                          },
                          "end": {
                              "line": 7,
                              "column": 5
                          }
                      }
                  }
              ],
              "kind": "var",
              "start": 0,
              "end": 118,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 7,
                      "column": 6
                  }
              }
          }
      ],
      "sourceType": "script",
      "start": 0,
      "end": 118,
      "loc": {
          "start": {
              "line": 1,
              "column": 0
          },
          "end": {
              "line": 7,
              "column": 6
          }
      }
  });
  });

    it('should parse anonymous generator.', () => {
        expect(parseScript(`(function* () { yield v });`, {
            raw: true,
            ranges: true,
            locations: true
        })).to.eql({
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
                "type": "ExpressionStatement",
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
                "expression": {
                  "type": "FunctionExpression",
                  "start": 1,
                  "end": 25,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 25
                    }
                  },
                  "id": null,
                  "generator": true,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
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
                    },
                    "body": [
                      {
                        "type": "ExpressionStatement",
                        "start": 16,
                        "end": 23,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 16
                          },
                          "end": {
                            "line": 1,
                            "column": 23
                          }
                        },
                        "expression": {
                          "type": "YieldExpression",
                          "start": 16,
                          "end": 23,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 16
                            },
                            "end": {
                              "line": 1,
                              "column": 23
                            }
                          },
                          "delegate": false,
                          "argument": {
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
                            "name": "v"
                          }
                        }
                      }
                    ]
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse double yield', () => {
        expect(parseScript(`(function* () { yield yield 10 });`, {
            raw: true,
            ranges: true,
            locations: true
        })).to.eql({
            "type": "Program",
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
            },
            "body": [
              {
                "type": "ExpressionStatement",
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
                },
                "expression": {
                  "type": "FunctionExpression",
                  "start": 1,
                  "end": 32,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 32
                    }
                  },
                  "id": null,
                  "generator": true,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 14,
                    "end": 32,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 14
                      },
                      "end": {
                        "line": 1,
                        "column": 32
                      }
                    },
                    "body": [
                      {
                        "type": "ExpressionStatement",
                        "start": 16,
                        "end": 30,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 16
                          },
                          "end": {
                            "line": 1,
                            "column": 30
                          }
                        },
                        "expression": {
                          "type": "YieldExpression",
                          "start": 16,
                          "end": 30,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 16
                            },
                            "end": {
                              "line": 1,
                              "column": 30
                            }
                          },
                          "delegate": false,
                          "argument": {
                            "type": "YieldExpression",
                            "start": 22,
                            "end": 30,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 22
                              },
                              "end": {
                                "line": 1,
                                "column": 30
                              }
                            },
                            "delegate": false,
                            "argument": {
                              "type": "Literal",
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
                              },
                              "value": 10,
                              "raw": "10"
                            }
                          }
                        }
                      }
                    ]
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse generator declaration', () => {
        expect(parseScript(`function* test () { yield *v };`, {
            raw: true,
            ranges: true,
            locations: true
        })).to.eql({
            "type": "Program",
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
            },
            "body": [
              {
                "type": "FunctionDeclaration",
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
                },
                "id": {
                  "type": "Identifier",
                  "start": 10,
                  "end": 14,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 10
                    },
                    "end": {
                      "line": 1,
                      "column": 14
                    }
                  },
                  "name": "test"
                },
                "generator": true,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 18,
                  "end": 30,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 18
                    },
                    "end": {
                      "line": 1,
                      "column": 30
                    }
                  },
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 20,
                      "end": 28,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 20
                        },
                        "end": {
                          "line": 1,
                          "column": 28
                        }
                      },
                      "expression": {
                        "type": "YieldExpression",
                        "start": 20,
                        "end": 28,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 20
                          },
                          "end": {
                            "line": 1,
                            "column": 28
                          }
                        },
                        "delegate": true,
                        "argument": {
                          "type": "Identifier",
                          "start": 27,
                          "end": 28,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 27
                            },
                            "end": {
                              "line": 1,
                              "column": 28
                            }
                          },
                          "name": "v"
                        }
                      }
                    }
                  ]
                }
              },
              {
                "type": "EmptyStatement",
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
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse yield delegation', () => {
        expect(parseScript(`(function* () { yield *v });`, {
            raw: true,
            ranges: true,
            locations: true
        })).to.eql({
            "type": "Program",
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
            },
            "body": [
              {
                "type": "ExpressionStatement",
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
                },
                "expression": {
                  "type": "FunctionExpression",
                  "start": 1,
                  "end": 26,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 26
                    }
                  },
                  "id": null,
                  "generator": true,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
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
                    "body": [
                      {
                        "type": "ExpressionStatement",
                        "start": 16,
                        "end": 24,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 16
                          },
                          "end": {
                            "line": 1,
                            "column": 24
                          }
                        },
                        "expression": {
                          "type": "YieldExpression",
                          "start": 16,
                          "end": 24,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 16
                            },
                            "end": {
                              "line": 1,
                              "column": 24
                            }
                          },
                          "delegate": true,
                          "argument": {
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
                            "name": "v"
                          }
                        }
                      }
                    ]
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse yield without value in call', () => {
        expect(parseScript(`(function* () { fn(yield); });`, {
            raw: true,
            ranges: true,
            locations: true
        })).to.eql({
            "type": "Program",
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
            },
            "body": [
              {
                "type": "ExpressionStatement",
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
                },
                "expression": {
                  "type": "FunctionExpression",
                  "start": 1,
                  "end": 28,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 28
                    }
                  },
                  "id": null,
                  "generator": true,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 14,
                    "end": 28,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 14
                      },
                      "end": {
                        "line": 1,
                        "column": 28
                      }
                    },
                    "body": [
                      {
                        "type": "ExpressionStatement",
                        "start": 16,
                        "end": 26,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 16
                          },
                          "end": {
                            "line": 1,
                            "column": 26
                          }
                        },
                        "expression": {
                          "type": "CallExpression",
                          "start": 16,
                          "end": 25,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 16
                            },
                            "end": {
                              "line": 1,
                              "column": 25
                            }
                          },
                          "callee": {
                            "type": "Identifier",
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
                            },
                            "name": "fn"
                          },
                          "arguments": [
                            {
                              "type": "YieldExpression",
                              "start": 19,
                              "end": 24,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 19
                                },
                                "end": {
                                  "line": 1,
                                  "column": 24
                                }
                              },
                              "delegate": false,
                              "argument": null
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse yield without value no semicolon', () => {
        expect(parseScript(`(function* () { yield });`, {
            raw: true,
            ranges: true,
            locations: true
        })).to.eql({
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
                  "type": "FunctionExpression",
                  "start": 1,
                  "end": 23,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 23
                    }
                  },
                  "id": null,
                  "generator": true,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
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
                    },
                    "body": [
                      {
                        "type": "ExpressionStatement",
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
                        "expression": {
                          "type": "YieldExpression",
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
                          "delegate": false,
                          "argument": null
                        }
                      }
                    ]
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse yield without value', () => {
        expect(parseScript(`(function* () { yield; });`, {
            raw: true,
            ranges: true,
            locations: true
        })).to.eql({
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
                "type": "ExpressionStatement",
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
                "expression": {
                  "type": "FunctionExpression",
                  "start": 1,
                  "end": 24,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 24
                    }
                  },
                  "id": null,
                  "generator": true,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 14,
                    "end": 24,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 14
                      },
                      "end": {
                        "line": 1,
                        "column": 24
                      }
                    },
                    "body": [
                      {
                        "type": "ExpressionStatement",
                        "start": 16,
                        "end": 22,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 16
                          },
                          "end": {
                            "line": 1,
                            "column": 22
                          }
                        },
                        "expression": {
                          "type": "YieldExpression",
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
                          "delegate": false,
                          "argument": null
                        }
                      }
                    ]
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

});
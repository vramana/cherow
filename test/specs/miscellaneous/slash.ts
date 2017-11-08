import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

// A number of slash-disambiguation corner cases
describe('Miscellaneous - Slash', () => {

    it('should parse global return slash', () => {
        expect(parseScript(`return {} / 2`, {
            ranges: true,
            raw: true,
            locations: true,
            globalReturn: true
        })).to.eql({
              "body": [
                {
                  "argument": {
                    "end": 13,
                    "left": {
                      "end": 9,
                      "loc": {
                        "end": {
                          "column": 9,
                          "line": 1,
                        },
                        "start": {
                          "column": 7,
                          "line": 1,
                        }
                      },
                      "properties": [],
                      "start": 7,
                     "type": "ObjectExpression"
                    },
                    "loc": {
                      "end": {
                        "column": 13,
                        "line": 1,
                      },
                      "start": {
                        "column": 7,
                        "line": 1,
                      }
                    },
                    "operator": "/",
                    "right": {
                      "end": 13,
                      "loc": {
                        "end": {
                          "column": 13,
                         "line": 1,
                        },
                        "start": {
                          "column": 12,
                          "line": 1,
                        }
                      },
                      "raw": "2",
                      "start": 12,
                      "type": "Literal",
                      "value": 2,
                   },
                    "start": 7,
                    "type": "BinaryExpression",
                  },
                 "end": 13,
                  "loc": {
                   "end": {
                      "column": 13,
                      "line": 1,
                   },
                    "start": {
                      "column": 0,
                      "line": 1,
                    }
                  },
                  "start": 0,
                  "type": "ReturnStatement",
                }
              ],
              "end": 13,
              "loc": {
                "end": {
                  "column": 13,
                  "line": 1,
                },
                "start": {
                  "column": 0,
                  "line": 1,
                },
              },
              "sourceType": "script",
              "start": 0,
              "type": "Program",
            });
    });

    it('should parse binary expr + obj expr + slash', () => {
        expect(parseScript(`+{} / 2`, {
            ranges: true,
            raw: true,
            locations: true,
            globalReturn: true
        })).to.eql({
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
                "type": "ExpressionStatement",
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
                "expression": {
                  "type": "BinaryExpression",
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
                  "left": {
                    "type": "UnaryExpression",
                    "start": 0,
                    "end": 3,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 3
                      }
                    },
                    "operator": "+",
                    "prefix": true,
                    "argument": {
                      "type": "ObjectExpression",
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
                  },
                  "operator": "/",
                  "right": {
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
                    "value": 2,
                    "raw": "2"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse while with regexp body', () => {
        expect(parseScript(`while (1) /foo/`, {
            ranges: true,
            raw: true,
            locations: true,
            globalReturn: true
        })).to.eql({
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
            "body": [
              {
                "type": "WhileStatement",
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
                "test": {
                  "type": "Literal",
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
                  "value": 1,
                  "raw": "1"
                },
                "body": {
                  "type": "ExpressionStatement",
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
                  },
                  "expression": {
                    "type": "Literal",
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
                    },
                    "value": /foo/,
                    "raw": "/foo/",
                    "regex": {
                      "pattern": "foo",
                      "flags": ""
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse parenthesis with slash', () => {
        expect(parseScript(`(1) / 2`, {
            ranges: true,
            raw: true,
            locations: true,
            globalReturn: true
        })).to.eql({
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
                "type": "ExpressionStatement",
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
                "expression": {
                  "type": "BinaryExpression",
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
                  "left": {
                    "type": "Literal",
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
                    "value": 1,
                    "raw": "1"
                  },
                  "operator": "/",
                  "right": {
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
                    "value": 2,
                    "raw": "2"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse binary expr with slash', () => {
        expect(parseScript(`+x++ / 2`, {
            ranges: true,
            raw: true,
            locations: true,
            globalReturn: true
        })).to.eql({
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
                  "type": "BinaryExpression",
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
                  "left": {
                    "type": "UnaryExpression",
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
                    },
                    "operator": "+",
                    "prefix": true,
                    "argument": {
                      "type": "UpdateExpression",
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
                      "operator": "++",
                      "prefix": false,
                      "argument": {
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
                        "name": "x"
                      }
                    }
                  },
                  "operator": "/",
                  "right": {
                    "type": "Literal",
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
                    "value": 2,
                    "raw": "2"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse object expr with func expr as key value with regxp in body', () => {
        expect(parseScript(`x = {foo: function x() {} / divide}`, {
            ranges: true,
            raw: true,
            locations: true,
            globalReturn: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 35,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 35
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 35,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 35
                  }
                },
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 0,
                  "end": 35,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 0
                    },
                    "end": {
                      "line": 1,
                      "column": 35
                    }
                  },
                  "operator": "=",
                  "left": {
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
                  },
                  "right": {
                    "type": "ObjectExpression",
                    "start": 4,
                    "end": 35,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 4
                      },
                      "end": {
                        "line": 1,
                        "column": 35
                      }
                    },
                    "properties": [
                      {
                        "type": "Property",
                        "start": 5,
                        "end": 34,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 5
                          },
                          "end": {
                            "line": 1,
                            "column": 34
                          }
                        },
                        "method": false,
                        "shorthand": false,
                        "computed": false,
                        "key": {
                          "type": "Identifier",
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
                          },
                          "name": "foo"
                        },
                        "value": {
                          "type": "BinaryExpression",
                          "start": 10,
                          "end": 34,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 10
                            },
                            "end": {
                              "line": 1,
                              "column": 34
                            }
                          },
                          "left": {
                            "type": "FunctionExpression",
                            "start": 10,
                            "end": 25,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 10
                              },
                              "end": {
                                "line": 1,
                                "column": 25
                              }
                            },
                            "id": {
                              "type": "Identifier",
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
                              "name": "x"
                            },
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                              "type": "BlockStatement",
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
                              "body": []
                            }
                          },
                          "operator": "/",
                          "right": {
                            "type": "Identifier",
                            "start": 28,
                            "end": 34,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 28
                              },
                              "end": {
                                "line": 1,
                                "column": 34
                              }
                            },
                            "name": "divide"
                          }
                        },
                        "kind": "init"
                      }
                    ]
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse identifier + func decl with regExp in func body', () => {
        expect(parseScript(`foo; function f() {} /regexp/`, {
            ranges: true,
            raw: true,
            locations: true,
            globalReturn: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 29,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 29
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
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
                },
                "expression": {
                  "type": "Identifier",
                  "start": 0,
                  "end": 3,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 0
                    },
                    "end": {
                      "line": 1,
                      "column": 3
                    }
                  },
                  "name": "foo"
                }
              },
              {
                "type": "FunctionDeclaration",
                "start": 5,
                "end": 20,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 5
                  },
                  "end": {
                    "line": 1,
                    "column": 20
                  }
                },
                "id": {
                  "type": "Identifier",
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
                  },
                  "name": "f"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 18,
                  "end": 20,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 18
                    },
                    "end": {
                      "line": 1,
                      "column": 20
                    }
                  },
                  "body": []
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 21,
                "end": 29,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 21
                  },
                  "end": {
                    "line": 1,
                    "column": 29
                  }
                },
                "expression": {
                  "type": "Literal",
                  "start": 21,
                  "end": 29,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 21
                    },
                    "end": {
                      "line": 1,
                      "column": 29
                    }
                  },
                  "value": /regexp/,
                  "raw": "/regexp/",
                  "regex": {
                    "pattern": "regexp",
                    "flags": ""
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse function expression with regular expr in func body', () => {
        expect(parseScript(`{function f() {} /regexp/}`, {
            ranges: true,
            raw: true,
            locations: true,
            globalReturn: true
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
                    "type": "FunctionDeclaration",
                    "start": 1,
                    "end": 16,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 1
                      },
                      "end": {
                        "line": 1,
                        "column": 16
                      }
                    },
                    "id": {
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
                      "name": "f"
                    },
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [],
                    "body": {
                      "type": "BlockStatement",
                      "start": 14,
                      "end": 16,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 14
                        },
                        "end": {
                          "line": 1,
                          "column": 16
                        }
                      },
                      "body": []
                    }
                  },
                  {
                    "type": "ExpressionStatement",
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
                    },
                    "expression": {
                      "type": "Literal",
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
                      },
                      "value": /regexp/,
                      "raw": "/regexp/",
                      "regex": {
                        "pattern": "regexp",
                        "flags": ""
                      }
                    }
                  }
                ]
              }
            ],
            "sourceType": "script"
          });
    });
});
import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';
const expect = chai.expect;

describe('Miscellaneous - AnnexB semantics', () => {

  describe('B.3.3.1 Labelled Function Declarations', () => {

    it('should parse block statement in function scope containing a function declaration', () => {
      expect(parseScript('(function() { { function f() {} } f(); }());', {
          ranges: true,
          raw: true,
          locations: true
      })).to.eql({
        "type": "Program",
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
        },
        "body": [
          {
            "type": "ExpressionStatement",
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
            },
            "expression": {
              "type": "CallExpression",
              "start": 1,
              "end": 42,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 1
                },
                "end": {
                  "line": 1,
                  "column": 42
                }
              },
              "callee": {
                "type": "FunctionExpression",
                "start": 1,
                "end": 40,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 1
                  },
                  "end": {
                    "line": 1,
                    "column": 40
                  }
                },
                "id": null,
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 12,
                  "end": 40,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 12
                    },
                    "end": {
                      "line": 1,
                      "column": 40
                    }
                  },
                  "body": [
                    {
                      "type": "BlockStatement",
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
                      "body": [
                        {
                          "type": "FunctionDeclaration",
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
                          "id": {
                            "type": "Identifier",
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
                            },
                            "name": "f"
                          },
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [],
                          "body": {
                            "type": "BlockStatement",
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
                            },
                            "body": []
                          }
                        }
                      ]
                    },
                    {
                      "type": "ExpressionStatement",
                      "start": 34,
                      "end": 38,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 34
                        },
                        "end": {
                          "line": 1,
                          "column": 38
                        }
                      },
                      "expression": {
                        "type": "CallExpression",
                        "start": 34,
                        "end": 37,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 34
                          },
                          "end": {
                            "line": 1,
                            "column": 37
                          }
                        },
                        "callee": {
                          "type": "Identifier",
                          "start": 34,
                          "end": 35,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 34
                            },
                            "end": {
                              "line": 1,
                              "column": 35
                            }
                          },
                          "name": "f"
                        },
                        "arguments": []
                      }
                    }
                  ]
                }
              },
              "arguments": []
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse block declaration function skipping early error in switch', () => {
      expect(parseScript('switch (0) { default: let f; { function f() {  } } }', {
          ranges: true,
          raw: true,
          locations: true
      })).to.eql({
        "type": "Program",
        "body": [
            {
                "type": "SwitchStatement",
                "discriminant": {
                    "type": "Literal",
                    "value": 0,
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
                    "raw": "0"
                },
                "cases": [
                    {
                        "type": "SwitchCase",
                        "test": null,
                        "consequent": [
                            {
                                "type": "VariableDeclaration",
                                "declarations": [
                                    {
                                        "type": "VariableDeclarator",
                                        "init": null,
                                        "id": {
                                            "type": "Identifier",
                                            "name": "f",
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
                                        },
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
                                "kind": "let",
                                "start": 22,
                                "end": 28,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 22
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 28
                                    }
                                }
                            },
                            {
                                "type": "BlockStatement",
                                "body": [
                                    {
                                        "type": "FunctionDeclaration",
                                        "params": [],
                                        "body": {
                                            "type": "BlockStatement",
                                            "body": [],
                                            "start": 44,
                                            "end": 48,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 44
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 48
                                                }
                                            }
                                        },
                                        "async": false,
                                        "generator": false,
                                        "expression": false,
                                        "id": {
                                            "type": "Identifier",
                                            "name": "f",
                                            "start": 40,
                                            "end": 41,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 40
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 41
                                                }
                                            }
                                        },
                                        "start": 31,
                                        "end": 48,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 31
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 48
                                            }
                                        }
                                    }
                                ],
                                "start": 29,
                                "end": 50,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 29
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 50
                                    }
                                }
                            }
                        ],
                        "start": 13,
                        "end": 50,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 13
                            },
                            "end": {
                                "line": 1,
                                "column": 50
                            }
                        }
                    }
                ],
                "start": 0,
                "end": 52,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 52
                    }
                }
            }
        ],
        "sourceType": "script",
        "start": 0,
        "end": 52,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 1,
                "column": 52
            }
        }
    });
    });

    it.skip('should parse block declaration function skipping early error in for of', () => {
      expect(parseScript('for (let f of [0]) { { function f() {  } } }', {
          ranges: true,
          raw: true,
          locations: true
      })).to.eql({
        "type": "Program",
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
        },
        "body": [
          {
            "type": "ForOfStatement",
            "start": 0,
            "end": 44,
            "await": false,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 44
              }
            },
            "left": {
              "type": "VariableDeclaration",
              "start": 5,
              "end": 10,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 5
                },
                "end": {
                  "line": 1,
                  "column": 10
                }
              },
              "declarations": [
                {
                  "type": "VariableDeclarator",
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
                  "id": {
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
                    "name": "f"
                  },
                  "init": null
                }
              ],
              "kind": "let"
            },
            "right": {
              "type": "ArrayExpression",
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
              },
              "elements": [
                {
                  "type": "Literal",
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
                  "value": 0,
                  "raw": "0"
                }
              ]
            },
            "body": {
              "type": "BlockStatement",
              "start": 19,
              "end": 44,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 19
                },
                "end": {
                  "line": 1,
                  "column": 44
                }
              },
              "body": [
                {
                  "type": "BlockStatement",
                  "start": 21,
                  "end": 42,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 21
                    },
                    "end": {
                      "line": 1,
                      "column": 42
                    }
                  },
                  "body": [
                    {
                      "type": "FunctionDeclaration",
                      "start": 23,
                      "end": 40,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 23
                        },
                        "end": {
                          "line": 1,
                          "column": 40
                        }
                      },
                      "id": {
                        "type": "Identifier",
                        "start": 32,
                        "end": 33,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 32
                          },
                          "end": {
                            "line": 1,
                            "column": 33
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
                        "start": 36,
                        "end": 40,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 36
                          },
                          "end": {
                            "line": 1,
                            "column": 40
                          }
                        },
                        "body": []
                      }
                    }
                  ]
                }
              ]
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it.skip('should parse block statemdeclaration skipping early error in for statement', () => {
      expect(parseScript('for (let f; ; ) { { function f() {  } } break; }', {
          ranges: true,
          raw: true,
          locations: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 48,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 48
          }
        },
        "body": [
          {
            "type": "ForStatement",
            "start": 0,
            "end": 48,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 48
              }
            },
            "init": {
              "type": "VariableDeclaration",
              "start": 5,
              "end": 10,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 5
                },
                "end": {
                  "line": 1,
                  "column": 10
                }
              },
              "declarations": [
                {
                  "type": "VariableDeclarator",
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
                  "id": {
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
                    "name": "f"
                  },
                  "init": null
                }
              ],
              "kind": "let"
            },
            "test": null,
            "update": null,
            "body": {
              "type": "BlockStatement",
              "start": 16,
              "end": 48,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 16
                },
                "end": {
                  "line": 1,
                  "column": 48
                }
              },
              "body": [
                {
                  "type": "BlockStatement",
                  "start": 18,
                  "end": 39,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 18
                    },
                    "end": {
                      "line": 1,
                      "column": 39
                    }
                  },
                  "body": [
                    {
                      "type": "FunctionDeclaration",
                      "start": 20,
                      "end": 37,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 20
                        },
                        "end": {
                          "line": 1,
                          "column": 37
                        }
                      },
                      "id": {
                        "type": "Identifier",
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
                        },
                        "name": "f"
                      },
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [],
                      "body": {
                        "type": "BlockStatement",
                        "start": 33,
                        "end": 37,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 33
                          },
                          "end": {
                            "line": 1,
                            "column": 37
                          }
                        },
                        "body": []
                      }
                    }
                  ]
                },
                {
                  "type": "BreakStatement",
                  "start": 40,
                  "end": 46,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 40
                    },
                    "end": {
                      "line": 1,
                      "column": 46
                    }
                  },
                  "label": null
                }
              ]
            }
          }
        ],
        "sourceType": "script"
      });
    });

  });

    describe('B.3.2 Labelled Function Declarations', () => {

        it('should fail if parsing function as label in strict mode', () => {
            expect(() => {
                parseScript('"use strict"; a: function f() {}')
            }).to.throw();
        });

        it('should parse if function as label in sloppy mode', () => {
            expect(parseScript('a: function f() {}', {
                ranges: true,
                raw: true,
                locations: true
            })).to.eql({
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
                    "type": "LabeledStatement",
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
                      "type": "FunctionDeclaration",
                      "start": 3,
                      "end": 18,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 3
                        },
                        "end": {
                          "line": 1,
                          "column": 18
                        }
                      },
                      "id": {
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
                        "name": "f"
                      },
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [],
                      "body": {
                        "type": "BlockStatement",
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
                        "body": []
                      }
                    },
                    "label": {
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
                      "name": "a"
                    }
                  }
                ],
                "sourceType": "script"
              });
        });
    });
    
    describe('B.3.4 FunctionDeclarations in IfStatement Statement Clauses', () => {

        it('should fail on if + function in strict mode', () => {
            expect(() => {
                parseScript('"use strict"; if (x) function f() {}')
            }).to.throw();
        });

        it('should parse "if (x) function f() {}"', () => {
          expect(parseScript('if (x) function f() {}', {
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
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
                "type": "IfStatement",
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
                "test": {
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
                  "name": "x"
                },
                "consequent": {
                  "type": "FunctionDeclaration",
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
                    "name": "f"
                  },
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
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
                    },
                    "body": []
                  }
                },
                "alternate": null
              }
            ],
            "sourceType": "script"
          });
        });

        it('should skip early error in if statement no else for statement', () => {
          expect(parseScript('for (let f; ; ) { if (true) function f() {  } break; }', {
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 54,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 54
              }
            },
            "body": [
              {
                "type": "ForStatement",
                "start": 0,
                "end": 54,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 54
                  }
                },
                "init": {
                  "type": "VariableDeclaration",
                  "start": 5,
                  "end": 10,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 5
                    },
                    "end": {
                      "line": 1,
                      "column": 10
                    }
                  },
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
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
                      "id": {
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
                        "name": "f"
                      },
                      "init": null
                    }
                  ],
                  "kind": "let"
                },
                "test": null,
                "update": null,
                "body": {
                  "type": "BlockStatement",
                  "start": 16,
                  "end": 54,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 16
                    },
                    "end": {
                      "line": 1,
                      "column": 54
                    }
                  },
                  "body": [
                    {
                      "type": "IfStatement",
                      "start": 18,
                      "end": 45,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 18
                        },
                        "end": {
                          "line": 1,
                          "column": 45
                        }
                      },
                      "test": {
                        "type": "Literal",
                        "start": 22,
                        "end": 26,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 22
                          },
                          "end": {
                            "line": 1,
                            "column": 26
                          }
                        },
                        "value": true,
                        "raw": "true"
                      },
                      "consequent": {
                        "type": "FunctionDeclaration",
                        "start": 28,
                        "end": 45,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 28
                          },
                          "end": {
                            "line": 1,
                            "column": 45
                          }
                        },
                        "id": {
                          "type": "Identifier",
                          "start": 37,
                          "end": 38,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 37
                            },
                            "end": {
                              "line": 1,
                              "column": 38
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
                          "start": 41,
                          "end": 45,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 41
                            },
                            "end": {
                              "line": 1,
                              "column": 45
                            }
                          },
                          "body": []
                        }
                      },
                      "alternate": null
                    },
                    {
                      "type": "BreakStatement",
                      "start": 46,
                      "end": 52,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 46
                        },
                        "end": {
                          "line": 1,
                          "column": 52
                        }
                      },
                      "label": null
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
        });

        it('should skip early error in if statement else for statement', () => {
          expect(parseScript('for (let f; ; ) { if (false) ; else function f() {  } break; }', {
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 62,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 62
              }
            },
            "body": [
              {
                "type": "ForStatement",
                "start": 0,
                "end": 62,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 62
                  }
                },
                "init": {
                  "type": "VariableDeclaration",
                  "start": 5,
                  "end": 10,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 5
                    },
                    "end": {
                      "line": 1,
                      "column": 10
                    }
                  },
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
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
                      "id": {
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
                        "name": "f"
                      },
                      "init": null
                    }
                  ],
                  "kind": "let"
                },
                "test": null,
                "update": null,
                "body": {
                  "type": "BlockStatement",
                  "start": 16,
                  "end": 62,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 16
                    },
                    "end": {
                      "line": 1,
                      "column": 62
                    }
                  },
                  "body": [
                    {
                      "type": "IfStatement",
                      "start": 18,
                      "end": 53,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 18
                        },
                        "end": {
                          "line": 1,
                          "column": 53
                        }
                      },
                      "test": {
                        "type": "Literal",
                        "start": 22,
                        "end": 27,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 22
                          },
                          "end": {
                            "line": 1,
                            "column": 27
                          }
                        },
                        "value": false,
                        "raw": "false"
                      },
                      "consequent": {
                        "type": "EmptyStatement",
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
                      "alternate": {
                        "type": "FunctionDeclaration",
                        "start": 36,
                        "end": 53,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 36
                          },
                          "end": {
                            "line": 1,
                            "column": 53
                          }
                        },
                        "id": {
                          "type": "Identifier",
                          "start": 45,
                          "end": 46,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 45
                            },
                            "end": {
                              "line": 1,
                              "column": 46
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
                          "start": 49,
                          "end": 53,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 49
                            },
                            "end": {
                              "line": 1,
                              "column": 53
                            }
                          },
                          "body": []
                        }
                      }
                    },
                    {
                      "type": "BreakStatement",
                      "start": 54,
                      "end": 60,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 54
                        },
                        "end": {
                          "line": 1,
                          "column": 60
                        }
                      },
                      "label": null
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
        });
        
    it('should skip early error in switch parameter', () => {
      expect(parseScript('switch (1) { case 1: function f() {  } }', {
          ranges: true,
          raw: true,
          locations: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 40,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 40
          }
        },
        "body": [
          {
            "type": "SwitchStatement",
            "start": 0,
            "end": 40,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 40
              }
            },
            "discriminant": {
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
              "value": 1,
              "raw": "1"
            },
            "cases": [
              {
                "type": "SwitchCase",
                "start": 13,
                "end": 38,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 13
                  },
                  "end": {
                    "line": 1,
                    "column": 38
                  }
                },
                "consequent": [
                  {
                    "type": "FunctionDeclaration",
                    "start": 21,
                    "end": 38,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 21
                      },
                      "end": {
                        "line": 1,
                        "column": 38
                      }
                    },
                    "id": {
                      "type": "Identifier",
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
                      "name": "f"
                    },
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [],
                    "body": {
                      "type": "BlockStatement",
                      "start": 34,
                      "end": 38,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 34
                        },
                        "end": {
                          "line": 1,
                          "column": 38
                        }
                      },
                      "body": []
                    }
                  }
                ],
                "test": {
                  "type": "Literal",
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
                  },
                  "value": 1,
                  "raw": "1"
                }
              }
            ]
          }
        ],
        "sourceType": "script"
      });
    });

    it.skip('should skip early error in switch function for in', () => {
      expect(parseScript('for (let f in { key: 0 }) { switch (1) { default: function f() {  } } }', {
          ranges: true,
          raw: true,
          locations: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 71,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 71
          }
        },
        "body": [
          {
            "type": "ForInStatement",
            "start": 0,
            "end": 71,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 71
              }
            },
            "left": {
              "type": "VariableDeclaration",
              "start": 5,
              "end": 10,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 5
                },
                "end": {
                  "line": 1,
                  "column": 10
                }
              },
              "declarations": [
                {
                  "type": "VariableDeclarator",
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
                  "id": {
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
                    "name": "f"
                  },
                  "init": null
                }
              ],
              "kind": "let"
            },
            "right": {
              "type": "ObjectExpression",
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
              "properties": [
                {
                  "type": "Property",
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
                  "method": false,
                  "shorthand": false,
                  "computed": false,
                  "key": {
                    "type": "Identifier",
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
                    "name": "key"
                  },
                  "value": {
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
                  },
                  "kind": "init"
                }
              ]
            },
            "body": {
              "type": "BlockStatement",
              "start": 26,
              "end": 71,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 26
                },
                "end": {
                  "line": 1,
                  "column": 71
                }
              },
              "body": [
                {
                  "type": "SwitchStatement",
                  "start": 28,
                  "end": 69,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 28
                    },
                    "end": {
                      "line": 1,
                      "column": 69
                    }
                  },
                  "discriminant": {
                    "type": "Literal",
                    "start": 36,
                    "end": 37,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 36
                      },
                      "end": {
                        "line": 1,
                        "column": 37
                      }
                    },
                    "value": 1,
                    "raw": "1"
                  },
                  "cases": [
                    {
                      "type": "SwitchCase",
                      "start": 41,
                      "end": 67,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 41
                        },
                        "end": {
                          "line": 1,
                          "column": 67
                        }
                      },
                      "consequent": [
                        {
                          "type": "FunctionDeclaration",
                          "start": 50,
                          "end": 67,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 50
                            },
                            "end": {
                              "line": 1,
                              "column": 67
                            }
                          },
                          "id": {
                            "type": "Identifier",
                            "start": 59,
                            "end": 60,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 59
                              },
                              "end": {
                                "line": 1,
                                "column": 60
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
                            "start": 63,
                            "end": 67,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 63
                              },
                              "end": {
                                "line": 1,
                                "column": 67
                              }
                            },
                            "body": []
                          }
                        }
                      ],
                      "test": null
                    }
                  ]
                }
              ]
            }
          }
        ],
        "sourceType": "script"
      });
    });


        it('should parse if function decl else decl skip early error', () => {
          expect(parseScript('function a() {if (false) function _f() {} else function f() {  } }', {
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 66,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 66
              }
            },
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 66,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 66
                  }
                },
                "id": {
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
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 13,
                  "end": 66,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 13
                    },
                    "end": {
                      "line": 1,
                      "column": 66
                    }
                  },
                  "body": [
                    {
                      "type": "IfStatement",
                      "start": 14,
                      "end": 64,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 14
                        },
                        "end": {
                          "line": 1,
                          "column": 64
                        }
                      },
                      "test": {
                        "type": "Literal",
                        "start": 18,
                        "end": 23,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 18
                          },
                          "end": {
                            "line": 1,
                            "column": 23
                          }
                        },
                        "value": false,
                        "raw": "false"
                      },
                      "consequent": {
                        "type": "FunctionDeclaration",
                        "start": 25,
                        "end": 41,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 25
                          },
                          "end": {
                            "line": 1,
                            "column": 41
                          }
                        },
                        "id": {
                          "type": "Identifier",
                          "start": 34,
                          "end": 36,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 34
                            },
                            "end": {
                              "line": 1,
                              "column": 36
                            }
                          },
                          "name": "_f"
                        },
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
                          "start": 39,
                          "end": 41,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 39
                            },
                            "end": {
                              "line": 1,
                              "column": 41
                            }
                          },
                          "body": []
                        }
                      },
                      "alternate": {
                        "type": "FunctionDeclaration",
                        "start": 47,
                        "end": 64,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 47
                          },
                          "end": {
                            "line": 1,
                            "column": 64
                          }
                        },
                        "id": {
                          "type": "Identifier",
                          "start": 56,
                          "end": 57,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 56
                            },
                            "end": {
                              "line": 1,
                              "column": 57
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
                          "start": 60,
                          "end": 64,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 60
                            },
                            "end": {
                              "line": 1,
                              "column": 64
                            }
                          },
                          "body": []
                        }
                      }
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
        });
    
        it('should parse "if (0) function a(){}"', () => {
            expect(parseScript('if (0) function a(){}', {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 21,
                "body": [
                  {
                    "type": "IfStatement",
                    "start": 0,
                    "end": 21,
                    "test": {
                      "type": "Literal",
                      "start": 4,
                      "end": 5,
                      "value": 0,
                      "raw": "0"
                    },
                    "consequent": {
                      "type": "FunctionDeclaration",
                      "start": 7,
                      "end": 21,
                      "id": {
                        "type": "Identifier",
                        "start": 16,
                        "end": 17,
                        "name": "a"
                      },
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [],
                      "body": {
                        "type": "BlockStatement",
                        "start": 19,
                        "end": 21,
                        "body": []
                      }
                    },
                    "alternate": null
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse "if (0) function a(){} else;"', () => {
            expect(parseScript('if (0) function a(){} else;', {
                ranges: true,
                raw: true,
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
                      "type": "Literal",
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
                      "value": 0,
                      "raw": "0"
                    },
                    "consequent": {
                      "type": "FunctionDeclaration",
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
                        "name": "a"
                      },
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [],
                      "body": {
                        "type": "BlockStatement",
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
                        },
                        "body": []
                      }
                    },
                    "alternate": {
                      "type": "EmptyStatement",
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
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse "if (0); else function a(){}"', () => {
            expect(parseScript('if (0); else function a(){}', {
                ranges: true,
                raw: true,
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
                      "type": "Literal",
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
                      "value": 0,
                      "raw": "0"
                    },
                    "consequent": {
                      "type": "EmptyStatement",
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
                    "alternate": {
                      "type": "FunctionDeclaration",
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
                      "id": {
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
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [],
                      "body": {
                        "type": "BlockStatement",
                        "start": 25,
                        "end": 27,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 25
                          },
                          "end": {
                            "line": 1,
                            "column": 27
                          }
                        },
                        "body": []
                      }
                    }
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse "if (0) function a(){} else function b(){}"', () => {
            expect(parseScript('if (0) function a(){} else function b(){}', {
                ranges: true,
                raw: true,
                locations: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 41,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 41
                  }
                },
                "body": [
                  {
                    "type": "IfStatement",
                    "start": 0,
                    "end": 41,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 41
                      }
                    },
                    "test": {
                      "type": "Literal",
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
                      "value": 0,
                      "raw": "0"
                    },
                    "consequent": {
                      "type": "FunctionDeclaration",
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
                        "name": "a"
                      },
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [],
                      "body": {
                        "type": "BlockStatement",
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
                        },
                        "body": []
                      }
                    },
                    "alternate": {
                      "type": "FunctionDeclaration",
                      "start": 27,
                      "end": 41,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 27
                        },
                        "end": {
                          "line": 1,
                          "column": 41
                        }
                      },
                      "id": {
                        "type": "Identifier",
                        "start": 36,
                        "end": 37,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 36
                          },
                          "end": {
                            "line": 1,
                            "column": 37
                          }
                        },
                        "name": "b"
                      },
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [],
                      "body": {
                        "type": "BlockStatement",
                        "start": 39,
                        "end": 41,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 39
                          },
                          "end": {
                            "line": 1,
                            "column": 41
                          }
                        },
                        "body": []
                      }
                    }
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse "try {} catch (e) { if(0) function e(){} }"', () => {
            expect(parseScript('try {} catch (e) { if(0) function e(){} }', {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [
                    {
                        "type": "TryStatement",
                        "block": {
                            "type": "BlockStatement",
                            "body": [],
                            "start": 4,
                            "end": 6
                        },
                        "handler": {
                            "type": "CatchClause",
                            "param": {
                                "type": "Identifier",
                                "name": "e",
                                "start": 14,
                                "end": 15
                            },
                            "body": {
                                "type": "BlockStatement",
                                "body": [
                                    {
                                        "type": "IfStatement",
                                        "test": {
                                            "type": "Literal",
                                            "value": 0,
                                            "start": 22,
                                            "end": 23,
                                            "raw": "0"
                                        },
                                        "alternate": null,
                                        "consequent": {
                                            "type": "FunctionDeclaration",
                                            "params": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [],
                                                "start": 37,
                                                "end": 39
                                            },
                                            "async": false,
                                            "generator": false,
                                            "expression": false,
                                            "id": {
                                                "type": "Identifier",
                                                "name": "e",
                                                "start": 34,
                                                "end": 35
                                            },
                                            "start": 25,
                                            "end": 39
                                        },
                                        "start": 19,
                                        "end": 39
                                    }
                                ],
                                "start": 17,
                                "end": 41
                            },
                            "start": 7,
                            "end": 41
                        },
                        "finalizer": null,
                        "start": 0,
                        "end": 41
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 41
            });
        });

        it('should parse function', () => {
            expect(parseScript('if (x) function f() {}', {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 22,
                "body": [{
                    "type": "IfStatement",
                    "start": 0,
                    "end": 22,
                    "test": {
                        "type": "Identifier",
                        "start": 4,
                        "end": 5,
                        "name": "x"
                    },
                    "consequent": {
                        "type": "FunctionDeclaration",
                        "start": 7,
                        "end": 22,
                        "id": {
                            "type": "Identifier",
                            "start": 16,
                            "end": 17,
                            "name": "f"
                        },
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                            "type": "BlockStatement",
                            "start": 20,
                            "end": 22,
                            "body": []
                        }
                    },
                    "alternate": null
                }],
                "sourceType": "script"
            });
        });

        it('should parse if + multiple functions', () => {
            expect(parseScript('if (x) function _f() { return 23; } else function f() { return 42; }', {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 68,
                "body": [{
                    "type": "IfStatement",
                    "start": 0,
                    "end": 68,
                    "test": {
                        "type": "Identifier",
                        "start": 4,
                        "end": 5,
                        "name": "x"
                    },
                    "consequent": {
                        "type": "FunctionDeclaration",
                        "start": 7,
                        "end": 35,
                        "id": {
                            "type": "Identifier",
                            "start": 16,
                            "end": 18,
                            "name": "_f"
                        },
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                            "type": "BlockStatement",
                            "start": 21,
                            "end": 35,
                            "body": [{
                                "type": "ReturnStatement",
                                "start": 23,
                                "end": 33,
                                "argument": {
                                    "type": "Literal",
                                    "start": 30,
                                    "end": 32,
                                    "value": 23,
                                    "raw": "23"
                                }
                            }]
                        }
                    },
                    "alternate": {
                        "type": "FunctionDeclaration",
                        "start": 41,
                        "end": 68,
                        "id": {
                            "type": "Identifier",
                            "start": 50,
                            "end": 51,
                            "name": "f"
                        },
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                            "type": "BlockStatement",
                            "start": 54,
                            "end": 68,
                            "body": [{
                                "type": "ReturnStatement",
                                "start": 56,
                                "end": 66,
                                "argument": {
                                    "type": "Literal",
                                    "start": 63,
                                    "end": 65,
                                    "value": 42,
                                    "raw": "42"
                                }
                            }]
                        }
                    }
                }],
                "sourceType": "script"
            });
        });
    });

    describe('B.3.5 VariableStatements in Catch Blocks', () => {

      it('should fail on "try { throw null; } catch (f) { { function f() { return 123; } } }"', () => {
        expect(() => {
            parseScript('try { throw null; } catch (f) { { function f() { return 123; } } }')
        }).to.throw();
    });
  
    });
});
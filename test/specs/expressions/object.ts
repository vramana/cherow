import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Espressions - Object', () => {

    it('should fail if eval occurs as the identifier in a property set parameterList of a property assignment', () => {
        expect(() => {
            parseScript(`"use strict"; var obj = { set foo(eval) {}};`);
        }).to.throw('');
    });
    
    it('should fail on invalid cover initialized name', () => {
      expect(() => {
          parseScript(`({ set set})`);
      }).to.throw('');
    });

    it('should fail on escaped yield method', () => {
      expect(() => {
          parseScript(`({
            \\u0061sync m(){}
          });`);
      }).to.throw('');
    });
    
   it('should fail on invalid cover initialized name', () => {
      expect(() => {
          parseScript(`var obj = {
            *method() {
              void yi\\u0065ld;
            }
          };`);
      }).to.throw('');
    });
    
    it('should fail on invalid cover initialized name', () => {
      expect(() => {
          parseScript(`({ acorn esprima })`);
      }).to.throw('');
    });

    it('should fail on invalid cover initialized name', () => {
        expect(() => {
            parseScript(`({ g\\u{65}t x(){} })`);
        }).to.throw('');
    });

    it('should fail on invalid cover initialized name', () => {
        expect(() => {
            parseScript(`({ a = 1 });`);
        }).to.not.throw('');
    });
    
    it('should fail on use of enum', () => {
        expect(() => {
            parseScript(`{ enum: 1} `);
        }).to.throw('');
    });

    it('should fail on invalid setter', () => {
        expect(() => {
            parseScript(`x = { set y() {} }`);
        }).to.throw('');
    });
    
    it('should fail on invalid setter', () => {
        expect(() => {
            parseScript(`x = { set y(a, b) {} }`);
        }).to.throw('');
    });

    it('should fail on invalid comma', () => {
        expect(() => {
            parseScript(`({
                *method(yield) {}
              });`);
        }).to.throw('');
    });

    it('should fail on const param redeclaration', () => {
        expect(() => {
            parseScript(`var obj = {
                *foo(a) {
                    const a = 3;
                }
            };`);
          }).to.throw()
    })

    it('should fail on let param redeclaration', () => {
        expect(() => {
            parseScript(`0, {
                method(x = 0, x) {
                }
              };`);
            }).to.not.throw()
    });

    it('should fail if get have a formal parameter', () => {
        expect(() => {
            parseScript(`0, { get a(param = null) {} };`);
        }).to.throw();
    });

    
    it('should parse computed values as accessor property names (hexadecimal) ', () => {
      expect(parseScript(`({ get async() {} });`, {
          raw: true,
          ranges: true,
          locations: true
      })).to.eql({
        "type": "Program",
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
        },
        "body": [
          {
            "type": "ExpressionStatement",
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
            },
            "expression": {
              "type": "ObjectExpression",
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
              "properties": [
                {
                  "type": "Property",
                  "start": 3,
                  "end": 17,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 3
                    },
                    "end": {
                      "line": 1,
                      "column": 17
                    }
                  },
                  "method": false,
                  "shorthand": false,
                  "computed": false,
                  "key": {
                    "type": "Identifier",
                    "start": 7,
                    "end": 12,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 7
                      },
                      "end": {
                        "line": 1,
                        "column": 12
                      }
                    },
                    "name": "async"
                  },
                  "kind": "get",
                  "value": {
                    "type": "FunctionExpression",
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
                    "id": null,
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [],
                    "body": {
                      "type": "BlockStatement",
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
      
    it('should parse yield return', () => {
        expect(parseScript(`var obj = {
            *foo(a) { yield a+1; return; }
        };`, {
            raw: true,
            ranges: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 65,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 3,
                "column": 10
              }
            },
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 65,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 3,
                    "column": 10
                  }
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 64,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 4
                      },
                      "end": {
                        "line": 3,
                        "column": 9
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
                      "name": "obj"
                    },
                    "init": {
                      "type": "ObjectExpression",
                      "start": 10,
                      "end": 64,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 10
                        },
                        "end": {
                          "line": 3,
                          "column": 9
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 24,
                          "end": 54,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 12
                            },
                            "end": {
                              "line": 2,
                              "column": 42
                            }
                          },
                          "method": true,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 25,
                            "end": 28,
                            "loc": {
                              "start": {
                                "line": 2,
                                "column": 13
                              },
                              "end": {
                                "line": 2,
                                "column": 16
                              }
                            },
                            "name": "foo"
                          },
                          "kind": "init",
                          "value": {
                            "type": "FunctionExpression",
                            "start": 28,
                            "end": 54,
                            "loc": {
                              "start": {
                                "line": 2,
                                "column": 16
                              },
                              "end": {
                                "line": 2,
                                "column": 42
                              }
                            },
                            "id": null,
                            "generator": true,
                            "expression": false,
                            "async": false,
                            "params": [
                              {
                                "type": "Identifier",
                                "start": 29,
                                "end": 30,
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
                                "name": "a"
                              }
                            ],
                            "body": {
                              "type": "BlockStatement",
                              "start": 32,
                              "end": 54,
                              "loc": {
                                "start": {
                                  "line": 2,
                                  "column": 20
                                },
                                "end": {
                                  "line": 2,
                                  "column": 42
                                }
                              },
                              "body": [
                                {
                                  "type": "ExpressionStatement",
                                  "start": 34,
                                  "end": 44,
                                  "loc": {
                                    "start": {
                                      "line": 2,
                                      "column": 22
                                    },
                                    "end": {
                                      "line": 2,
                                      "column": 32
                                    }
                                  },
                                  "expression": {
                                    "type": "YieldExpression",
                                    "start": 34,
                                    "end": 43,
                                    "loc": {
                                      "start": {
                                        "line": 2,
                                        "column": 22
                                      },
                                      "end": {
                                        "line": 2,
                                        "column": 31
                                      }
                                    },
                                    "delegate": false,
                                    "argument": {
                                      "type": "BinaryExpression",
                                      "start": 40,
                                      "end": 43,
                                      "loc": {
                                        "start": {
                                          "line": 2,
                                          "column": 28
                                        },
                                        "end": {
                                          "line": 2,
                                          "column": 31
                                        }
                                      },
                                      "left": {
                                        "type": "Identifier",
                                        "start": 40,
                                        "end": 41,
                                        "loc": {
                                          "start": {
                                            "line": 2,
                                            "column": 28
                                          },
                                          "end": {
                                            "line": 2,
                                            "column": 29
                                          }
                                        },
                                        "name": "a"
                                      },
                                      "operator": "+",
                                      "right": {
                                        "type": "Literal",
                                        "start": 42,
                                        "end": 43,
                                        "loc": {
                                          "start": {
                                            "line": 2,
                                            "column": 30
                                          },
                                          "end": {
                                            "line": 2,
                                            "column": 31
                                          }
                                        },
                                        "value": 1,
                                        "raw": "1"
                                      }
                                    }
                                  }
                                },
                                {
                                  "type": "ReturnStatement",
                                  "start": 45,
                                  "end": 52,
                                  "loc": {
                                    "start": {
                                      "line": 2,
                                      "column": 33
                                    },
                                    "end": {
                                      "line": 2,
                                      "column": 40
                                    }
                                  },
                                  "argument": null
                                }
                              ]
                            }
                          }
                        }
                      ]
                    }
                  }
                ],
                "kind": "var"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse yield as function expression binding identifier', () => {
        expect(parseScript(`var obj = {
            *g() {
              (function yield() {});
            }
          };`, {
            raw: true,
            ranges: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 94,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 5,
                "column": 12
              }
            },
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 94,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 5,
                    "column": 12
                  }
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 93,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 4
                      },
                      "end": {
                        "line": 5,
                        "column": 11
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
                      "name": "obj"
                    },
                    "init": {
                      "type": "ObjectExpression",
                      "start": 10,
                      "end": 93,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 10
                        },
                        "end": {
                          "line": 5,
                          "column": 11
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 24,
                          "end": 81,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 12
                            },
                            "end": {
                              "line": 4,
                              "column": 13
                            }
                          },
                          "method": true,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 25,
                            "end": 26,
                            "loc": {
                              "start": {
                                "line": 2,
                                "column": 13
                              },
                              "end": {
                                "line": 2,
                                "column": 14
                              }
                            },
                            "name": "g"
                          },
                          "kind": "init",
                          "value": {
                            "type": "FunctionExpression",
                            "start": 26,
                            "end": 81,
                            "loc": {
                              "start": {
                                "line": 2,
                                "column": 14
                              },
                              "end": {
                                "line": 4,
                                "column": 13
                              }
                            },
                            "id": null,
                            "generator": true,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                              "type": "BlockStatement",
                              "start": 29,
                              "end": 81,
                              "loc": {
                                "start": {
                                  "line": 2,
                                  "column": 17
                                },
                                "end": {
                                  "line": 4,
                                  "column": 13
                                }
                              },
                              "body": [
                                {
                                  "type": "ExpressionStatement",
                                  "start": 45,
                                  "end": 67,
                                  "loc": {
                                    "start": {
                                      "line": 3,
                                      "column": 14
                                    },
                                    "end": {
                                      "line": 3,
                                      "column": 36
                                    }
                                  },
                                  "expression": {
                                    "type": "FunctionExpression",
                                    "start": 46,
                                    "end": 65,
                                    "loc": {
                                      "start": {
                                        "line": 3,
                                        "column": 15
                                      },
                                      "end": {
                                        "line": 3,
                                        "column": 34
                                      }
                                    },
                                    "id": {
                                      "type": "Identifier",
                                      "start": 55,
                                      "end": 60,
                                      "loc": {
                                        "start": {
                                          "line": 3,
                                          "column": 24
                                        },
                                        "end": {
                                          "line": 3,
                                          "column": 29
                                        }
                                      },
                                      "name": "yield"
                                    },
                                    "generator": false,
                                    "expression": false,
                                    "async": false,
                                    "params": [],
                                    "body": {
                                      "type": "BlockStatement",
                                      "start": 63,
                                      "end": 65,
                                      "loc": {
                                        "start": {
                                          "line": 3,
                                          "column": 32
                                        },
                                        "end": {
                                          "line": 3,
                                          "column": 34
                                        }
                                      },
                                      "body": []
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
                ],
                "kind": "var"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse yield newline', () => {
        expect(parseScript(`var obj = {
            *g() {
              yield
              1
            }
          };`, {
            raw: true,
            ranges: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 93,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 6,
                "column": 12
              }
            },
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 93,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 6,
                    "column": 12
                  }
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 92,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 4
                      },
                      "end": {
                        "line": 6,
                        "column": 11
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
                      "name": "obj"
                    },
                    "init": {
                      "type": "ObjectExpression",
                      "start": 10,
                      "end": 92,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 10
                        },
                        "end": {
                          "line": 6,
                          "column": 11
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 24,
                          "end": 80,
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
                          "method": true,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 25,
                            "end": 26,
                            "loc": {
                              "start": {
                                "line": 2,
                                "column": 13
                              },
                              "end": {
                                "line": 2,
                                "column": 14
                              }
                            },
                            "name": "g"
                          },
                          "kind": "init",
                          "value": {
                            "type": "FunctionExpression",
                            "start": 26,
                            "end": 80,
                            "loc": {
                              "start": {
                                "line": 2,
                                "column": 14
                              },
                              "end": {
                                "line": 5,
                                "column": 13
                              }
                            },
                            "id": null,
                            "generator": true,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                              "type": "BlockStatement",
                              "start": 29,
                              "end": 80,
                              "loc": {
                                "start": {
                                  "line": 2,
                                  "column": 17
                                },
                                "end": {
                                  "line": 5,
                                  "column": 13
                                }
                              },
                              "body": [
                                {
                                  "type": "ExpressionStatement",
                                  "start": 45,
                                  "end": 50,
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
                                  "expression": {
                                    "type": "YieldExpression",
                                    "start": 45,
                                    "end": 50,
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
                                    "delegate": false,
                                    "argument": null
                                  }
                                },
                                {
                                  "type": "ExpressionStatement",
                                  "start": 65,
                                  "end": 66,
                                  "loc": {
                                    "start": {
                                      "line": 4,
                                      "column": 14
                                    },
                                    "end": {
                                      "line": 4,
                                      "column": 15
                                    }
                                  },
                                  "expression": {
                                    "type": "Literal",
                                    "start": 65,
                                    "end": 66,
                                    "loc": {
                                      "start": {
                                        "line": 4,
                                        "column": 14
                                      },
                                      "end": {
                                        "line": 4,
                                        "column": 15
                                      }
                                    },
                                    "value": 1,
                                    "raw": "1"
                                  }
                                }
                              ]
                            }
                          }
                        }
                      ]
                    }
                  }
                ],
                "kind": "var"
              }
            ],
            "sourceType": "script"
          });
    });

});
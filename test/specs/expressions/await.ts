import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Expressions - Await', () => {

    it('should fail on await expression outside of async function', () => {
        expect(() => {
            parseScript(`await a`);
        }).to.throw()
    });

    it('should fail on await without arguments', () => {
        expect(() => {
            parseScript(`async () => await`);
        }).to.throw();
    });

    it('should fail on await not simple assignment target', () => {
        expect(() => {
            parseScript(`async function foo() {
                (await 1) = 1;
              }`);
        }).to.throw();
    });

    it('should fail on await expression in default parameters', () => {
        expect(() => {
            parseScript(`async (a = await b) => {}`);
        }).to.throw()
    });

    it('should fail on invalid plain await (module code)', () => {
        expect(() => {
            parseModule(`await;`);
        }).to.throw()
    });

    it('should fail on invalid plain await arrow', () => {
        expect(() => {
            parseScript(`async () => await;`);
        }).to.throw()
    });

    it('should fail if await expression does not have an argument', () => {
        expect(() => {
            parseScript(`async function foo() { await }`);
        }).to.throw();
    });

    it('should fail if await expression wrapped inside paren does not have an argument ', () => {
        expect(() => {
            parseScript(`(async function foo() { await })`);
        }).to.throw();
    });

    it('should fail if await expression does not have an argument', () => {
        expect(() => {
            parseScript(`({async foo() { await }})`);
        }).to.throw();
    });

    it('should fail on invalid await arrow param', () => {
        expect(() => {
            parseScript(`async await => 1;`);
        }).to.throw()
    });

    it('should fail on invalid await arrow param parens', () => {
        expect(() => {
            parseScript(`async (await) => 1;`);
        }).to.throw()
    });

    it('should fail on invalid await function', () => {
        expect(() => {
            parseScript(`a = async function () { async function await() {} }`);
        }).to.not.throw()
    });

    it('should fail on invalid await identifier', () => {
        expect(() => {
            parseScript(`async function f() { g(await) }`);
        }).to.throw()
    });

    it('should fail on invalid await no arguments', () => {
        expect(() => {
            parseScript(`async function f() { await }`);
        }).to.throw()
    });

    it('should fail on invalid await outside async', () => {
        expect(() => {
            parseScript(`function f(x) { await x }`);
        }).to.throw()
    });

    it('should fail on invalid await property', () => {
        expect(() => {
            parseScript(`async f() { x = { async await(){} } }`);
        }).to.throw()
    });

    it('should fail on await assign in async parrow param list (module code)', () => {
      expect(() => {
          parseModule(`async(e=await)=>l`);
      }).to.throw()
  })
    
    it('should parse async arrow with await assign', () => {
      expect(parseScript(`async(e=await)=>l`, {
          ranges: true,
          raw: true,
          locations: true
      })).to.eql({
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
            "type": "ExpressionStatement",
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
            "expression": {
              "type": "ArrowFunctionExpression",
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
              "id": null,
              "generator": false,
              "expression": true,
              "async": true,
              "params": [
                {
                  "type": "AssignmentPattern",
                  "start": 6,
                  "end": 13,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 6
                    },
                    "end": {
                      "line": 1,
                      "column": 13
                    }
                  },
                  "left": {
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
                    "name": "e"
                  },
                  "right": {
                    "type": "Identifier",
                    "start": 8,
                    "end": 13,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 8
                      },
                      "end": {
                        "line": 1,
                        "column": 13
                      }
                    },
                    "name": "await"
                  }
                }
              ],
              "body": {
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
                "name": "l"
              }
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse await in generator', () => {
        expect(parseScript(`function* foo(await) { yield await; };`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 38,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 38
              }
            },
            "body": [
              {
                "type": "FunctionDeclaration",
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
                },
                "id": {
                  "type": "Identifier",
                  "start": 10,
                  "end": 13,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 10
                    },
                    "end": {
                      "line": 1,
                      "column": 13
                    }
                  },
                  "name": "foo"
                },
                "generator": true,
                "expression": false,
                "async": false,
                "params": [
                  {
                    "type": "Identifier",
                    "start": 14,
                    "end": 19,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 14
                      },
                      "end": {
                        "line": 1,
                        "column": 19
                      }
                    },
                    "name": "await"
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "start": 21,
                  "end": 37,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 21
                    },
                    "end": {
                      "line": 1,
                      "column": 37
                    }
                  },
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 23,
                      "end": 35,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 23
                        },
                        "end": {
                          "line": 1,
                          "column": 35
                        }
                      },
                      "expression": {
                        "type": "YieldExpression",
                        "start": 23,
                        "end": 34,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 23
                          },
                          "end": {
                            "line": 1,
                            "column": 34
                          }
                        },
                        "delegate": false,
                        "argument": {
                          "type": "Identifier",
                          "start": 29,
                          "end": 34,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 29
                            },
                            "end": {
                              "line": 1,
                              "column": 34
                            }
                          },
                          "name": "await"
                        }
                      }
                    }
                  ]
                }
              },
              {
                "type": "EmptyStatement",
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
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse await in nested function', () => {
        expect(parseScript(`var await;
        async function foo() {
          function bar() {
            await = 1;
          }
          bar();
        }
        foo();`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 145,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 8,
                "column": 14
              }
            },
            "body": [
              {
                "type": "VariableDeclaration",
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
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 9,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 4
                      },
                      "end": {
                        "line": 1,
                        "column": 9
                      }
                    },
                    "id": {
                      "type": "Identifier",
                      "start": 4,
                      "end": 9,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 4
                        },
                        "end": {
                          "line": 1,
                          "column": 9
                        }
                      },
                      "name": "await"
                    },
                    "init": null
                  }
                ],
                "kind": "var"
              },
              {
                "type": "FunctionDeclaration",
                "start": 19,
                "end": 130,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 8
                  },
                  "end": {
                    "line": 7,
                    "column": 9
                  }
                },
                "id": {
                  "type": "Identifier",
                  "start": 34,
                  "end": 37,
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
                  "name": "foo"
                },
                "generator": false,
                "expression": false,
                "async": true,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 40,
                  "end": 130,
                  "loc": {
                    "start": {
                      "line": 2,
                      "column": 29
                    },
                    "end": {
                      "line": 7,
                      "column": 9
                    }
                  },
                  "body": [
                    {
                      "type": "FunctionDeclaration",
                      "start": 52,
                      "end": 103,
                      "loc": {
                        "start": {
                          "line": 3,
                          "column": 10
                        },
                        "end": {
                          "line": 5,
                          "column": 11
                        }
                      },
                      "id": {
                        "type": "Identifier",
                        "start": 61,
                        "end": 64,
                        "loc": {
                          "start": {
                            "line": 3,
                            "column": 19
                          },
                          "end": {
                            "line": 3,
                            "column": 22
                          }
                        },
                        "name": "bar"
                      },
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [],
                      "body": {
                        "type": "BlockStatement",
                        "start": 67,
                        "end": 103,
                        "loc": {
                          "start": {
                            "line": 3,
                            "column": 25
                          },
                          "end": {
                            "line": 5,
                            "column": 11
                          }
                        },
                        "body": [
                          {
                            "type": "ExpressionStatement",
                            "start": 81,
                            "end": 91,
                            "loc": {
                              "start": {
                                "line": 4,
                                "column": 12
                              },
                              "end": {
                                "line": 4,
                                "column": 22
                              }
                            },
                            "expression": {
                              "type": "AssignmentExpression",
                              "start": 81,
                              "end": 90,
                              "loc": {
                                "start": {
                                  "line": 4,
                                  "column": 12
                                },
                                "end": {
                                  "line": 4,
                                  "column": 21
                                }
                              },
                              "operator": "=",
                              "left": {
                                "type": "Identifier",
                                "start": 81,
                                "end": 86,
                                "loc": {
                                  "start": {
                                    "line": 4,
                                    "column": 12
                                  },
                                  "end": {
                                    "line": 4,
                                    "column": 17
                                  }
                                },
                                "name": "await"
                              },
                              "right": {
                                "type": "Literal",
                                "start": 89,
                                "end": 90,
                                "loc": {
                                  "start": {
                                    "line": 4,
                                    "column": 20
                                  },
                                  "end": {
                                    "line": 4,
                                    "column": 21
                                  }
                                },
                                "value": 1,
                                "raw": "1"
                              }
                            }
                          }
                        ]
                      }
                    },
                    {
                      "type": "ExpressionStatement",
                      "start": 114,
                      "end": 120,
                      "loc": {
                        "start": {
                          "line": 6,
                          "column": 10
                        },
                        "end": {
                          "line": 6,
                          "column": 16
                        }
                      },
                      "expression": {
                        "type": "CallExpression",
                        "start": 114,
                        "end": 119,
                        "loc": {
                          "start": {
                            "line": 6,
                            "column": 10
                          },
                          "end": {
                            "line": 6,
                            "column": 15
                          }
                        },
                        "callee": {
                          "type": "Identifier",
                          "start": 114,
                          "end": 117,
                          "loc": {
                            "start": {
                              "line": 6,
                              "column": 10
                            },
                            "end": {
                              "line": 6,
                              "column": 13
                            }
                          },
                          "name": "bar"
                        },
                        "arguments": []
                      }
                    }
                  ]
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 139,
                "end": 145,
                "loc": {
                  "start": {
                    "line": 8,
                    "column": 8
                  },
                  "end": {
                    "line": 8,
                    "column": 14
                  }
                },
                "expression": {
                  "type": "CallExpression",
                  "start": 139,
                  "end": 144,
                  "loc": {
                    "start": {
                      "line": 8,
                      "column": 8
                    },
                    "end": {
                      "line": 8,
                      "column": 13
                    }
                  },
                  "callee": {
                    "type": "Identifier",
                    "start": 139,
                    "end": 142,
                    "loc": {
                      "start": {
                        "line": 8,
                        "column": 8
                      },
                      "end": {
                        "line": 8,
                        "column": 11
                      }
                    },
                    "name": "foo"
                  },
                  "arguments": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse await in nested generator', () => {
        expect(parseScript(`var await;
        async function foo() {
          function* bar() {
            await = 1;
          }
          bar().next();
        }
        foo();`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 153,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 8,
                "column": 14
              }
            },
            "body": [
              {
                "type": "VariableDeclaration",
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
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 9,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 4
                      },
                      "end": {
                        "line": 1,
                        "column": 9
                      }
                    },
                    "id": {
                      "type": "Identifier",
                      "start": 4,
                      "end": 9,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 4
                        },
                        "end": {
                          "line": 1,
                          "column": 9
                        }
                      },
                      "name": "await"
                    },
                    "init": null
                  }
                ],
                "kind": "var"
              },
              {
                "type": "FunctionDeclaration",
                "start": 19,
                "end": 138,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 8
                  },
                  "end": {
                    "line": 7,
                    "column": 9
                  }
                },
                "id": {
                  "type": "Identifier",
                  "start": 34,
                  "end": 37,
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
                  "name": "foo"
                },
                "generator": false,
                "expression": false,
                "async": true,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 40,
                  "end": 138,
                  "loc": {
                    "start": {
                      "line": 2,
                      "column": 29
                    },
                    "end": {
                      "line": 7,
                      "column": 9
                    }
                  },
                  "body": [
                    {
                      "type": "FunctionDeclaration",
                      "start": 52,
                      "end": 104,
                      "loc": {
                        "start": {
                          "line": 3,
                          "column": 10
                        },
                        "end": {
                          "line": 5,
                          "column": 11
                        }
                      },
                      "id": {
                        "type": "Identifier",
                        "start": 62,
                        "end": 65,
                        "loc": {
                          "start": {
                            "line": 3,
                            "column": 20
                          },
                          "end": {
                            "line": 3,
                            "column": 23
                          }
                        },
                        "name": "bar"
                      },
                      "generator": true,
                      "expression": false,
                      "async": false,
                      "params": [],
                      "body": {
                        "type": "BlockStatement",
                        "start": 68,
                        "end": 104,
                        "loc": {
                          "start": {
                            "line": 3,
                            "column": 26
                          },
                          "end": {
                            "line": 5,
                            "column": 11
                          }
                        },
                        "body": [
                          {
                            "type": "ExpressionStatement",
                            "start": 82,
                            "end": 92,
                            "loc": {
                              "start": {
                                "line": 4,
                                "column": 12
                              },
                              "end": {
                                "line": 4,
                                "column": 22
                              }
                            },
                            "expression": {
                              "type": "AssignmentExpression",
                              "start": 82,
                              "end": 91,
                              "loc": {
                                "start": {
                                  "line": 4,
                                  "column": 12
                                },
                                "end": {
                                  "line": 4,
                                  "column": 21
                                }
                              },
                              "operator": "=",
                              "left": {
                                "type": "Identifier",
                                "start": 82,
                                "end": 87,
                                "loc": {
                                  "start": {
                                    "line": 4,
                                    "column": 12
                                  },
                                  "end": {
                                    "line": 4,
                                    "column": 17
                                  }
                                },
                                "name": "await"
                              },
                              "right": {
                                "type": "Literal",
                                "start": 90,
                                "end": 91,
                                "loc": {
                                  "start": {
                                    "line": 4,
                                    "column": 20
                                  },
                                  "end": {
                                    "line": 4,
                                    "column": 21
                                  }
                                },
                                "value": 1,
                                "raw": "1"
                              }
                            }
                          }
                        ]
                      }
                    },
                    {
                      "type": "ExpressionStatement",
                      "start": 115,
                      "end": 128,
                      "loc": {
                        "start": {
                          "line": 6,
                          "column": 10
                        },
                        "end": {
                          "line": 6,
                          "column": 23
                        }
                      },
                      "expression": {
                        "type": "CallExpression",
                        "start": 115,
                        "end": 127,
                        "loc": {
                          "start": {
                            "line": 6,
                            "column": 10
                          },
                          "end": {
                            "line": 6,
                            "column": 22
                          }
                        },
                        "callee": {
                          "type": "MemberExpression",
                          "start": 115,
                          "end": 125,
                          "loc": {
                            "start": {
                              "line": 6,
                              "column": 10
                            },
                            "end": {
                              "line": 6,
                              "column": 20
                            }
                          },
                          "object": {
                            "type": "CallExpression",
                            "start": 115,
                            "end": 120,
                            "loc": {
                              "start": {
                                "line": 6,
                                "column": 10
                              },
                              "end": {
                                "line": 6,
                                "column": 15
                              }
                            },
                            "callee": {
                              "type": "Identifier",
                              "start": 115,
                              "end": 118,
                              "loc": {
                                "start": {
                                  "line": 6,
                                  "column": 10
                                },
                                "end": {
                                  "line": 6,
                                  "column": 13
                                }
                              },
                              "name": "bar"
                            },
                            "arguments": []
                          },
                          "property": {
                            "type": "Identifier",
                            "start": 121,
                            "end": 125,
                            "loc": {
                              "start": {
                                "line": 6,
                                "column": 16
                              },
                              "end": {
                                "line": 6,
                                "column": 20
                              }
                            },
                            "name": "next"
                          },
                          "computed": false
                        },
                        "arguments": []
                      }
                    }
                  ]
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 147,
                "end": 153,
                "loc": {
                  "start": {
                    "line": 8,
                    "column": 8
                  },
                  "end": {
                    "line": 8,
                    "column": 14
                  }
                },
                "expression": {
                  "type": "CallExpression",
                  "start": 147,
                  "end": 152,
                  "loc": {
                    "start": {
                      "line": 8,
                      "column": 8
                    },
                    "end": {
                      "line": 8,
                      "column": 13
                    }
                  },
                  "callee": {
                    "type": "Identifier",
                    "start": 147,
                    "end": 150,
                    "loc": {
                      "start": {
                        "line": 8,
                        "column": 8
                      },
                      "end": {
                        "line": 8,
                        "column": 11
                      }
                    },
                    "name": "foo"
                  },
                  "arguments": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse await in function', () => {
        expect(parseScript(`function foo(await) { return await; }`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
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
            },
            "body": [
              {
                "type": "FunctionDeclaration",
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
                },
                "id": {
                  "type": "Identifier",
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
                  "name": "foo"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [
                  {
                    "type": "Identifier",
                    "start": 13,
                    "end": 18,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 13
                      },
                      "end": {
                        "line": 1,
                        "column": 18
                      }
                    },
                    "name": "await"
                  }
                ],
                "body": {
                  "type": "BlockStatement",
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
                  "body": [
                    {
                      "type": "ReturnStatement",
                      "start": 22,
                      "end": 35,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 22
                        },
                        "end": {
                          "line": 1,
                          "column": 35
                        }
                      },
                      "argument": {
                        "type": "Identifier",
                        "start": 29,
                        "end": 34,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 29
                          },
                          "end": {
                            "line": 1,
                            "column": 34
                          }
                        },
                        "name": "await"
                      }
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse async await arrow param', () => {
        expect(parseScript(`async function foo(a = async () => await b) {};`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 47,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 47
                }
            },
            "body": [{
                    "type": "FunctionDeclaration",
                    "start": 0,
                    "end": 46,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 46
                        }
                    },
                    "id": {
                        "type": "Identifier",
                        "start": 15,
                        "end": 18,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 15
                            },
                            "end": {
                                "line": 1,
                                "column": 18
                            }
                        },
                        "name": "foo"
                    },
                    "generator": false,
                    "expression": false,
                    "async": true,
                    "params": [{
                        "type": "AssignmentPattern",
                        "start": 19,
                        "end": 42,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 19
                            },
                            "end": {
                                "line": 1,
                                "column": 42
                            }
                        },
                        "left": {
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
                            "name": "a"
                        },
                        "right": {
                            "type": "ArrowFunctionExpression",
                            "start": 23,
                            "end": 42,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 23
                                },
                                "end": {
                                    "line": 1,
                                    "column": 42
                                }
                            },
                            "id": null,
                            "generator": false,
                            "expression": true,
                            "async": true,
                            "params": [],
                            "body": {
                                "type": "AwaitExpression",
                                "start": 35,
                                "end": 42,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 35
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 42
                                    }
                                },
                                "argument": {
                                    "type": "Identifier",
                                    "start": 41,
                                    "end": 42,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 41
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 42
                                        }
                                    },
                                    "name": "b"
                                }
                            }
                        }
                    }],
                    "body": {
                        "type": "BlockStatement",
                        "start": 44,
                        "end": 46,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 44
                            },
                            "end": {
                                "line": 1,
                                "column": 46
                            }
                        },
                        "body": []
                    }
                },
                {
                    "type": "EmptyStatement",
                    "start": 46,
                    "end": 47,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 46
                        },
                        "end": {
                            "line": 1,
                            "column": 47
                        }
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse call async await', () => {
        expect(parseScript(`a = async(await);`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
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
            "body": [{
                "type": "ExpressionStatement",
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
                "expression": {
                    "type": "AssignmentExpression",
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
                        "name": "a"
                    },
                    "right": {
                        "type": "CallExpression",
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
                        },
                        "callee": {
                            "type": "Identifier",
                            "start": 4,
                            "end": 9,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 4
                                },
                                "end": {
                                    "line": 1,
                                    "column": 9
                                }
                            },
                            "name": "async"
                        },
                        "arguments": [{
                            "type": "Identifier",
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
                            "name": "await"
                        }]
                    }
                }
            }],
            "sourceType": "script"
        });
    });
});
import { parseScript, parseModule } from '../../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Expressions - Async function', () => {

    it('should fail on invalid yield default', () => {
        expect(() => {
            parseScript(`function* wrap() {
          async(a = yield b) => a
        };`);
        }).to.not.throw()
    });

    it('should fail on escaped async function', () => {
        expect(() => {
            parseScript(`void \\u0061sync function f(){}`);
        }).to.throw()
    });

    it('should fail on invalid nested async', () => {
        expect(() => {
            parseScript(`async function wrap() { async function await() { } };`);
        }).to.throw()
    });

    it('should fail on invalid await param', () => {
        expect(() => {
            parseScript(`async function foo(await) { };`);
        }).to.throw()
    });

    it('should fail on invalid await param expression', () => {
        expect(() => {
            parseScript(`(async function foo(await) { });`);
        }).to.throw()
    });

    it('should fail on invalid await function expression', () => {
        expect(() => {
            parseScript(`(async function await() { });`);
        }).to.throw()
    });

    it('should fail on async generators without next flag enabled', () => {
        expect(() => {
            parseModule(`async function* foo() { }`);
        }).to.throw();
    });

    it('should fail on use of "await" inside async functions', () => {
        expect(() => {
            parseScript(`async function wrap() {\nasync function await() { }\n}`);
        }).to.throw();
    });

    it('should fail on use of "await" inside async functions', () => {
        expect(() => {
            parseScript(`async function foo(await) { }`);
        }).to.throw();
    });

    it('should fail on use of "await" inside async functions', () => {
        expect(() => {
            parseScript(`async function foo() { return {await} }`);
        }).to.throw();
    });

    it('should fail if linebreak between async and function', () => {
        expect(() => {
            parseScript(`"(async\nfunction foo() { })`);
        }).to.throw();
    });

    it('should fail if async generator are not set ( function expression)', () => {
        expect(() => {
            parseScript(`(async function* foo() { })`);
        }).to.throw();
    });

    it('should fail if async generator are not set ( function expression)', () => {
        expect(() => {
            parseScript(`(async function foo(await) { })`);
        }).to.throw();
    });

    it('should fail if async generator are not set ( function expression)', () => {
        expect(() => {
            parseScript(`(async function await() { })`);
        }).to.throw();
    });

    it('should fail if async generator are not set ( function expression)', () => {
        expect(() => {
            parseScript(`(async function foo() { return {await} })`);
        }).to.throw();
    });

    it('should fail if async function has await expr in formal param', () => {
        expect(() => {
            parseScript(`async function foo(a = await b) {}`);
        }).to.throw();
    });

    it('should fail if async function expression has await expr in formal param', () => {
        expect(() => {
            parseScript(`(async function foo(a = await b) {})`);
        }).to.throw();
    });

    it('should fail if async function expression has await expr in formal param', () => {
        expect(() => {
            parseScript(`({async foo(a = await b) {}})`);
        }).to.throw();
    });

    it('should parse await expressions inside functions in default parameters', () => {
        expect(parseScript(`async function foo(a = async () => await b) {}`, {
            raw: true,
            locations: true,
            ranges: true
        })).to.eql({
            "type": "Program",
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
            "body": [
              {
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
                "params": [
                  {
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
                  }
                ],
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
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse await expressions inside functions in default parameters', () => {
        expect(parseScript(`async function foo(a = {async bar() { await b }}) {}`, {
            raw: true,
            locations: true,
            ranges: true
        })).to.eql({
            "type": "Program",
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
            },
            "body": [
              {
                "type": "FunctionDeclaration",
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
                "params": [
                  {
                    "type": "AssignmentPattern",
                    "start": 19,
                    "end": 48,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 19
                      },
                      "end": {
                        "line": 1,
                        "column": 48
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
                      "type": "ObjectExpression",
                      "start": 23,
                      "end": 48,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 23
                        },
                        "end": {
                          "line": 1,
                          "column": 48
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 24,
                          "end": 47,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 24
                            },
                            "end": {
                              "line": 1,
                              "column": 47
                            }
                          },
                          "method": true,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 30,
                            "end": 33,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 30
                              },
                              "end": {
                                "line": 1,
                                "column": 33
                              }
                            },
                            "name": "bar"
                          },
                          "kind": "init",
                          "value": {
                            "type": "FunctionExpression",
                            "start": 33,
                            "end": 47,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 33
                              },
                              "end": {
                                "line": 1,
                                "column": 47
                              }
                            },
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": true,
                            "params": [],
                            "body": {
                              "type": "BlockStatement",
                              "start": 36,
                              "end": 47,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 36
                                },
                                "end": {
                                  "line": 1,
                                  "column": 47
                                }
                              },
                              "body": [
                                {
                                  "type": "ExpressionStatement",
                                  "start": 38,
                                  "end": 45,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 38
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 45
                                    }
                                  },
                                  "expression": {
                                    "type": "AwaitExpression",
                                    "start": 38,
                                    "end": 45,
                                    "loc": {
                                      "start": {
                                        "line": 1,
                                        "column": 38
                                      },
                                      "end": {
                                        "line": 1,
                                        "column": 45
                                      }
                                    },
                                    "argument": {
                                      "type": "Identifier",
                                      "start": 44,
                                      "end": 45,
                                      "loc": {
                                        "start": {
                                          "line": 1,
                                          "column": 44
                                        },
                                        "end": {
                                          "line": 1,
                                          "column": 45
                                        }
                                      },
                                      "name": "b"
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
                "body": {
                  "type": "BlockStatement",
                  "start": 50,
                  "end": 52,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 50
                    },
                    "end": {
                      "line": 1,
                      "column": 52
                    }
                  },
                  "body": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse await expressions inside functions in default parameters', () => {
        expect(parseScript(`async function foo(a = class {async bar() { await b }}) {}`, {
            raw: true,
            locations: true,
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 58,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 58
              }
            },
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 58,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 58
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
                "params": [
                  {
                    "type": "AssignmentPattern",
                    "start": 19,
                    "end": 54,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 19
                      },
                      "end": {
                        "line": 1,
                        "column": 54
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
                      "type": "ClassExpression",
                      "start": 23,
                      "end": 54,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 23
                        },
                        "end": {
                          "line": 1,
                          "column": 54
                        }
                      },
                      "id": null,
                      "superClass": null,
                      "body": {
                        "type": "ClassBody",
                        "start": 29,
                        "end": 54,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 29
                          },
                          "end": {
                            "line": 1,
                            "column": 54
                          }
                        },
                        "body": [
                          {
                            "type": "MethodDefinition",
                            "start": 30,
                            "end": 53,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 30
                              },
                              "end": {
                                "line": 1,
                                "column": 53
                              }
                            },
                            "computed": false,
                            "key": {
                              "type": "Identifier",
                              "start": 36,
                              "end": 39,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 36
                                },
                                "end": {
                                  "line": 1,
                                  "column": 39
                                }
                              },
                              "name": "bar"
                            },
                            "static": false,
                            "kind": "method",
                            "value": {
                              "type": "FunctionExpression",
                              "start": 39,
                              "end": 53,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 39
                                },
                                "end": {
                                  "line": 1,
                                  "column": 53
                                }
                              },
                              "id": null,
                              "generator": false,
                              "expression": false,
                              "async": true,
                              "params": [],
                              "body": {
                                "type": "BlockStatement",
                                "start": 42,
                                "end": 53,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 42
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 53
                                  }
                                },
                                "body": [
                                  {
                                    "type": "ExpressionStatement",
                                    "start": 44,
                                    "end": 51,
                                    "loc": {
                                      "start": {
                                        "line": 1,
                                        "column": 44
                                      },
                                      "end": {
                                        "line": 1,
                                        "column": 51
                                      }
                                    },
                                    "expression": {
                                      "type": "AwaitExpression",
                                      "start": 44,
                                      "end": 51,
                                      "loc": {
                                        "start": {
                                          "line": 1,
                                          "column": 44
                                        },
                                        "end": {
                                          "line": 1,
                                          "column": 51
                                        }
                                      },
                                      "argument": {
                                        "type": "Identifier",
                                        "start": 50,
                                        "end": 51,
                                        "loc": {
                                          "start": {
                                            "line": 1,
                                            "column": 50
                                          },
                                          "end": {
                                            "line": 1,
                                            "column": 51
                                          }
                                        },
                                        "name": "b"
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
                "body": {
                  "type": "BlockStatement",
                  "start": 56,
                  "end": 58,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 56
                    },
                    "end": {
                      "line": 1,
                      "column": 58
                    }
                  },
                  "body": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    
    it('should parse await expressions inside functions in default parameters', () => {
        expect(parseScript(`async function wrap() {\n({a = await b} = obj)\n}`, {
        })).to.eql({
              "body": [
                {
                  "async": true,
                  "body": {
                    "body": [
                      {
                        "expression": {
                          "left": {
                            "properties": [
                              {
                                "computed": false,
                                "key": {
                                  "name": "a",
                                  "type": "Identifier",
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": true,
                               "type": "Property",
                                "value": {
                                  "left": {
                                   "name": "a",
                                    "type": "Identifier"
                                  },
                                  "right": {
                                    "argument": {
                                      "name": "b",
                                      "type": "Identifier"
                                    },
                                    "type": "AwaitExpression"
                                  },
                                  "type": "AssignmentPattern"
                                }
                              }
                            ],
                            "type": "ObjectPattern"
                          },
                          "operator": "=",
                          "right": {
                            "name": "obj",
                            "type": "Identifier"
                          },
                          "type": "AssignmentExpression"
                        },
                        "type": "ExpressionStatement"
                      }
                    ],
                    "type": "BlockStatement",
                  },
                  "expression": false,
                  "generator": false,
                  "id": {
                    "name": "wrap",
                    "type": "Identifier"
                  },
                  "params": [],
                  "type": "FunctionDeclaration"
               }
              ],
              "sourceType": "script",
              "type": "Program"
            });
    });

    it('should distinguish ParenthesizedExpression or ArrowFunctionExpression', () => {
        expect(parseScript(`async function foo(a = async function foo() { await b }) {}`, {
            raw: true,
            locations: true,
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 59,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 59
              }
            },
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 59,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 59
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
                "params": [
                  {
                    "type": "AssignmentPattern",
                    "start": 19,
                    "end": 55,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 19
                      },
                      "end": {
                        "line": 1,
                        "column": 55
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
                      "type": "FunctionExpression",
                      "start": 23,
                      "end": 55,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 23
                        },
                        "end": {
                          "line": 1,
                          "column": 55
                        }
                      },
                      "id": {
                        "type": "Identifier",
                        "start": 38,
                        "end": 41,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 38
                          },
                          "end": {
                            "line": 1,
                            "column": 41
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
                        "start": 44,
                        "end": 55,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 44
                          },
                          "end": {
                            "line": 1,
                            "column": 55
                          }
                        },
                        "body": [
                          {
                            "type": "ExpressionStatement",
                            "start": 46,
                            "end": 53,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 46
                              },
                              "end": {
                                "line": 1,
                                "column": 53
                              }
                            },
                            "expression": {
                              "type": "AwaitExpression",
                              "start": 46,
                              "end": 53,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 46
                                },
                                "end": {
                                  "line": 1,
                                  "column": 53
                                }
                              },
                              "argument": {
                                "type": "Identifier",
                                "start": 52,
                                "end": 53,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 52
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 53
                                  }
                                },
                                "name": "b"
                              }
                            }
                          }
                        ]
                      }
                    }
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "start": 57,
                  "end": 59,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 57
                    },
                    "end": {
                      "line": 1,
                      "column": 59
                    }
                  },
                  "body": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse await expression as unary expression', () => {
        expect(parseScript(`async function foo(a, b) { await a + await b }`, {
            raw: true,
            locations: true,
            ranges: true
        })).to.eql({
            "type": "Program",
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
            "body": [
              {
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
                "params": [
                  {
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
                  {
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
                    "name": "b"
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "start": 25,
                  "end": 46,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 25
                    },
                    "end": {
                      "line": 1,
                      "column": 46
                    }
                  },
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 27,
                      "end": 44,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 27
                        },
                        "end": {
                          "line": 1,
                          "column": 44
                        }
                      },
                      "expression": {
                        "type": "BinaryExpression",
                        "start": 27,
                        "end": 44,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 27
                          },
                          "end": {
                            "line": 1,
                            "column": 44
                          }
                        },
                        "left": {
                          "type": "AwaitExpression",
                          "start": 27,
                          "end": 34,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 27
                            },
                            "end": {
                              "line": 1,
                              "column": 34
                            }
                          },
                          "argument": {
                            "type": "Identifier",
                            "start": 33,
                            "end": 34,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 33
                              },
                              "end": {
                                "line": 1,
                                "column": 34
                              }
                            },
                            "name": "a"
                          }
                        },
                        "operator": "+",
                        "right": {
                          "type": "AwaitExpression",
                          "start": 37,
                          "end": 44,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 37
                            },
                            "end": {
                              "line": 1,
                              "column": 44
                            }
                          },
                          "argument": {
                            "type": "Identifier",
                            "start": 43,
                            "end": 44,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 43
                              },
                              "end": {
                                "line": 1,
                                "column": 44
                              }
                            },
                            "name": "b"
                          }
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

    it('should parse await expression in async function', () => {
        expect(parseScript(`async function foo(a, b) { await a }`, {
            raw: true,
            locations: true,
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 36,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 36
              }
            },
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 36,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 36
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
                "params": [
                  {
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
                  {
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
                    "name": "b"
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "start": 25,
                  "end": 36,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 25
                    },
                    "end": {
                      "line": 1,
                      "column": 36
                    }
                  },
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 27,
                      "end": 34,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 27
                        },
                        "end": {
                          "line": 1,
                          "column": 34
                        }
                      },
                      "expression": {
                        "type": "AwaitExpression",
                        "start": 27,
                        "end": 34,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 27
                          },
                          "end": {
                            "line": 1,
                            "column": 34
                          }
                        },
                        "argument": {
                          "type": "Identifier",
                          "start": 33,
                          "end": 34,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 33
                            },
                            "end": {
                              "line": 1,
                              "column": 34
                            }
                          },
                          "name": "a"
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

    it('should parse await as a valid function name', () => {
        expect(parseScript(`async function await() { }`, {
            raw: true,
            locations: true,
            ranges: true
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
                "type": "FunctionDeclaration",
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
                "id": {
                  "type": "Identifier",
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
                  },
                  "name": "await"
                },
                "generator": false,
                "expression": false,
                "async": true,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 23,
                  "end": 26,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 23
                    },
                    "end": {
                      "line": 1,
                      "column": 26
                    }
                  },
                  "body": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse await identifier math', () => {
        expect(parseScript(`async\nfunction foo() { }`, {
            raw: true,
        })).to.eql({
              "body": [
                {
                  "expression": {
                    "name": "async",
                    "type": "Identifier",
                  },
                  "type": "ExpressionStatement"
               },
                {
                  "async": false,
                  "body": {
                    "body": [],
                    "type": "BlockStatement",
                 },
                  "expression": false,
                  "generator": false,
                  "id": {
                    "name": "foo",
                    "type": "Identifier",
                 },
                  "params": [],
                  "type": "FunctionDeclaration",
                },
             ],
              "sourceType": "script",
              "type": "Program",
            });
    });
  
    it('should parse await identifier math', () => {
        expect(parseScript(`async function foo() { await + 1 };`, {
            ranges: true,
            raw: true,
            locations: true
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
            "body": [{
                    "type": "FunctionDeclaration",
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
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "start": 21,
                        "end": 34,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 21
                            },
                            "end": {
                                "line": 1,
                                "column": 34
                            }
                        },
                        "body": [{
                            "type": "ExpressionStatement",
                            "start": 23,
                            "end": 32,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 23
                                },
                                "end": {
                                    "line": 1,
                                    "column": 32
                                }
                            },
                            "expression": {
                                "type": "AwaitExpression",
                                "start": 23,
                                "end": 32,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 23
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 32
                                    }
                                },
                                "argument": {
                                    "type": "UnaryExpression",
                                    "start": 29,
                                    "end": 32,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 29
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 32
                                        }
                                    },
                                    "operator": "+",
                                    "prefix": true,
                                    "argument": {
                                        "type": "Literal",
                                        "start": 31,
                                        "end": 32,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 31
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 32
                                            }
                                        },
                                        "value": 1,
                                        "raw": "1"
                                    }
                                }
                            }
                        }]
                    }
                },
                {
                    "type": "EmptyStatement",
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
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse async await inside parens', () => {
        expect(parseScript(`async function wrap() {
      (a = await b)
  };`, {
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
                    "line": 3,
                    "column": 4
                }
            },
            "body": [{
                    "type": "FunctionDeclaration",
                    "start": 0,
                    "end": 47,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 3,
                            "column": 3
                        }
                    },
                    "id": {
                        "type": "Identifier",
                        "start": 15,
                        "end": 19,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 15
                            },
                            "end": {
                                "line": 1,
                                "column": 19
                            }
                        },
                        "name": "wrap"
                    },
                    "generator": false,
                    "expression": false,
                    "async": true,
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "start": 22,
                        "end": 47,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 22
                            },
                            "end": {
                                "line": 3,
                                "column": 3
                            }
                        },
                        "body": [{
                            "type": "ExpressionStatement",
                            "start": 30,
                            "end": 43,
                            "loc": {
                                "start": {
                                    "line": 2,
                                    "column": 6
                                },
                                "end": {
                                    "line": 2,
                                    "column": 19
                                }
                            },
                            "expression": {
                                "type": "AssignmentExpression",
                                "start": 31,
                                "end": 42,
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 7
                                    },
                                    "end": {
                                        "line": 2,
                                        "column": 18
                                    }
                                },
                                "operator": "=",
                                "left": {
                                    "type": "Identifier",
                                    "start": 31,
                                    "end": 32,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 7
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 8
                                        }
                                    },
                                    "name": "a"
                                },
                                "right": {
                                    "type": "AwaitExpression",
                                    "start": 35,
                                    "end": 42,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 11
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 18
                                        }
                                    },
                                    "argument": {
                                        "type": "Identifier",
                                        "start": 41,
                                        "end": 42,
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
                                        "name": "b"
                                    }
                                }
                            }
                        }]
                    }
                },
                {
                    "type": "EmptyStatement",
                    "start": 47,
                    "end": 48,
                    "loc": {
                        "start": {
                            "line": 3,
                            "column": 3
                        },
                        "end": {
                            "line": 3,
                            "column": 4
                        }
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse argument async function expression', () => {
        expect(parseScript(`f(async function(x) { await x })`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
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
            "body": [{
                "type": "ExpressionStatement",
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
                "expression": {
                    "type": "CallExpression",
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
                    "callee": {
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
                        "name": "f"
                    },
                    "arguments": [{
                        "type": "FunctionExpression",
                        "start": 2,
                        "end": 31,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 2
                            },
                            "end": {
                                "line": 1,
                                "column": 31
                            }
                        },
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": true,
                        "params": [{
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
                        }],
                        "body": {
                            "type": "BlockStatement",
                            "start": 20,
                            "end": 31,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 20
                                },
                                "end": {
                                    "line": 1,
                                    "column": 31
                                }
                            },
                            "body": [{
                                "type": "ExpressionStatement",
                                "start": 22,
                                "end": 29,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 22
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 29
                                    }
                                },
                                "expression": {
                                    "type": "AwaitExpression",
                                    "start": 22,
                                    "end": 29,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 22
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 29
                                        }
                                    },
                                    "argument": {
                                        "type": "Identifier",
                                        "start": 28,
                                        "end": 29,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 28
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 29
                                            }
                                        },
                                        "name": "x"
                                    }
                                }
                            }]
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse async function declaration await', () => {
        expect(parseScript(`async function f(a) { await a }`, {
            ranges: true,
            raw: true,
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
            "body": [{
                "type": "FunctionDeclaration",
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
                "id": {
                    "type": "Identifier",
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
                    "name": "f"
                },
                "generator": false,
                "expression": false,
                "async": true,
                "params": [{
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
                    "name": "a"
                }],
                "body": {
                    "type": "BlockStatement",
                    "start": 20,
                    "end": 31,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 20
                        },
                        "end": {
                            "line": 1,
                            "column": 31
                        }
                    },
                    "body": [{
                        "type": "ExpressionStatement",
                        "start": 22,
                        "end": 29,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 22
                            },
                            "end": {
                                "line": 1,
                                "column": 29
                            }
                        },
                        "expression": {
                            "type": "AwaitExpression",
                            "start": 22,
                            "end": 29,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 22
                                },
                                "end": {
                                    "line": 1,
                                    "column": 29
                                }
                            },
                            "argument": {
                                "type": "Identifier",
                                "start": 28,
                                "end": 29,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 28
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 29
                                    }
                                },
                                "name": "a"
                            }
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse async function declaration', () => {
        expect(parseScript(`async function f() {}`, {
            ranges: true,
            raw: true,
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
            "body": [{
                "type": "FunctionDeclaration",
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
                "id": {
                    "type": "Identifier",
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
                    "name": "f"
                },
                "generator": false,
                "expression": false,
                "async": true,
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
            }],
            "sourceType": "script"
        });
    });

    it('should parse async function expression as parameter', () => {
        expect(parseScript(`f(b, async function(b) { await b }, c)`, {
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
            "body": [{
                "type": "ExpressionStatement",
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
                "expression": {
                    "type": "CallExpression",
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
                    "callee": {
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
                        "name": "f"
                    },
                    "arguments": [{
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
                            "name": "b"
                        },
                        {
                            "type": "FunctionExpression",
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
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": true,
                            "params": [{
                                "type": "Identifier",
                                "start": 20,
                                "end": 21,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 20
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 21
                                    }
                                },
                                "name": "b"
                            }],
                            "body": {
                                "type": "BlockStatement",
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
                                "body": [{
                                    "type": "ExpressionStatement",
                                    "start": 25,
                                    "end": 32,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 25
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 32
                                        }
                                    },
                                    "expression": {
                                        "type": "AwaitExpression",
                                        "start": 25,
                                        "end": 32,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 25
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 32
                                            }
                                        },
                                        "argument": {
                                            "type": "Identifier",
                                            "start": 31,
                                            "end": 32,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 31
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 32
                                                }
                                            },
                                            "name": "b"
                                        }
                                    }
                                }]
                            }
                        },
                        {
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
                            "name": "c"
                        }
                    ]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse async function expression await', () => {
        expect(parseScript(`x = async function(a) { await a }`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 33,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 33
                }
            },
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 33,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 33
                    }
                },
                "expression": {
                    "type": "AssignmentExpression",
                    "start": 0,
                    "end": 33,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 33
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
                        "type": "FunctionExpression",
                        "start": 4,
                        "end": 33,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 4
                            },
                            "end": {
                                "line": 1,
                                "column": 33
                            }
                        },
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": true,
                        "params": [{
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
                        }],
                        "body": {
                            "type": "BlockStatement",
                            "start": 22,
                            "end": 33,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 22
                                },
                                "end": {
                                    "line": 1,
                                    "column": 33
                                }
                            },
                            "body": [{
                                "type": "ExpressionStatement",
                                "start": 24,
                                "end": 31,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 24
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 31
                                    }
                                },
                                "expression": {
                                    "type": "AwaitExpression",
                                    "start": 24,
                                    "end": 31,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 24
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 31
                                        }
                                    },
                                    "argument": {
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
                                        "name": "a"
                                    }
                                }
                            }]
                        }
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse async function expression named await', () => {
        expect(parseScript(`x = async function f(a) { await a }`, {
            ranges: true,
            raw: true,
            locations: true
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
            "body": [{
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
                        "type": "FunctionExpression",
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
                            "name": "f"
                        },
                        "generator": false,
                        "expression": false,
                        "async": true,
                        "params": [{
                            "type": "Identifier",
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
                            "name": "a"
                        }],
                        "body": {
                            "type": "BlockStatement",
                            "start": 24,
                            "end": 35,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 24
                                },
                                "end": {
                                    "line": 1,
                                    "column": 35
                                }
                            },
                            "body": [{
                                "type": "ExpressionStatement",
                                "start": 26,
                                "end": 33,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 26
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 33
                                    }
                                },
                                "expression": {
                                    "type": "AwaitExpression",
                                    "start": 26,
                                    "end": 33,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 26
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 33
                                        }
                                    },
                                    "argument": {
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
                                        "name": "a"
                                    }
                                }
                            }]
                        }
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse async function expression named', () => {
        expect(parseScript(`a = async function f() {}`, {
            ranges: true,
            raw: true,
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
            "body": [{
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
                    "type": "AssignmentExpression",
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
                        "type": "FunctionExpression",
                        "start": 4,
                        "end": 25,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 4
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
                            "name": "f"
                        },
                        "generator": false,
                        "expression": false,
                        "async": true,
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
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse async function expression', () => {
        expect(parseScript(`a = async function() {}`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
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
                "type": "ExpressionStatement",
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
                "expression": {
                    "type": "AssignmentExpression",
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
                        "type": "FunctionExpression",
                        "start": 4,
                        "end": 23,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 4
                            },
                            "end": {
                                "line": 1,
                                "column": 23
                            }
                        },
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": true,
                        "params": [],
                        "body": {
                            "type": "BlockStatement",
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
                            "body": []
                        }
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse inner function async', () => {
        expect(parseScript(`(function(x) { async function inner() { await x } })`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
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
            },
            "body": [{
                "type": "ExpressionStatement",
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
                },
                "expression": {
                    "type": "FunctionExpression",
                    "start": 1,
                    "end": 51,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 1
                        },
                        "end": {
                            "line": 1,
                            "column": 51
                        }
                    },
                    "id": null,
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [{
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
                        "name": "x"
                    }],
                    "body": {
                        "type": "BlockStatement",
                        "start": 13,
                        "end": 51,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 13
                            },
                            "end": {
                                "line": 1,
                                "column": 51
                            }
                        },
                        "body": [{
                            "type": "FunctionDeclaration",
                            "start": 15,
                            "end": 49,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 15
                                },
                                "end": {
                                    "line": 1,
                                    "column": 49
                                }
                            },
                            "id": {
                                "type": "Identifier",
                                "start": 30,
                                "end": 35,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 30
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 35
                                    }
                                },
                                "name": "inner"
                            },
                            "generator": false,
                            "expression": false,
                            "async": true,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "start": 38,
                                "end": 49,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 38
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 49
                                    }
                                },
                                "body": [{
                                    "type": "ExpressionStatement",
                                    "start": 40,
                                    "end": 47,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 40
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 47
                                        }
                                    },
                                    "expression": {
                                        "type": "AwaitExpression",
                                        "start": 40,
                                        "end": 47,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 40
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 47
                                            }
                                        },
                                        "argument": {
                                            "type": "Identifier",
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
                                            },
                                            "name": "x"
                                        }
                                    }
                                }]
                            }
                        }]
                    }
                }
            }],
            "sourceType": "script"
        });
    });
});
import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Espressions - Member', () => {

    it('should parse "function a() { return () => new.target }"', () => {
          expect(parseScript('function a() { return () => new.target }', {
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
              "body": [{
                  "type": "FunctionDeclaration",
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
                      "end": 40,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 13
                          },
                          "end": {
                              "line": 1,
                              "column": 40
                          }
                      },
                      "body": [{
                          "type": "ReturnStatement",
                          "start": 15,
                          "end": 38,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 15
                              },
                              "end": {
                                  "line": 1,
                                  "column": 38
                              }
                          },
                          "argument": {
                              "type": "ArrowFunctionExpression",
                              "start": 22,
                              "end": 38,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 22
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 38
                                  }
                              },
                              "id": null,
                              "generator": false,
                              "expression": true,
                              "async": false,
                              "params": [],
                              "body": {
                                  "type": "MetaProperty",
                                  "start": 28,
                                  "end": 38,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 28
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 38
                                      }
                                  },
                                  "meta": {
                                      "type": "Identifier",
                                      "start": 28,
                                      "end": 31,
                                      "loc": {
                                          "start": {
                                              "line": 1,
                                              "column": 28
                                          },
                                          "end": {
                                              "line": 1,
                                              "column": 31
                                          }
                                      },
                                      "name": "new"
                                  },
                                  "property": {
                                      "type": "Identifier",
                                      "start": 32,
                                      "end": 38,
                                      "loc": {
                                          "start": {
                                              "line": 1,
                                              "column": 32
                                          },
                                          "end": {
                                              "line": 1,
                                              "column": 38
                                          }
                                      },
                                      "name": "target"
                                  }
                              }
                          }
                      }]
                  }
              }],
              "sourceType": "script"
          });
      });

      it('should parse "function a(b = new.target){}"', () => {
        expect(parseScript(`function a(b = new.target){}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 28,
            "body": [{
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 28,
                "id": {
                    "type": "Identifier",
                    "start": 9,
                    "end": 10,
                    "name": "a"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [{
                    "type": "AssignmentPattern",
                    "start": 11,
                    "end": 25,
                    "left": {
                        "type": "Identifier",
                        "start": 11,
                        "end": 12,
                        "name": "b"
                    },
                    "right": {
                        "type": "MetaProperty",
                        "start": 15,
                        "end": 25,
                        "meta": {
                            "type": "Identifier",
                            "start": 15,
                            "end": 18,
                            "name": "new"
                        },
                        "property": {
                            "type": "Identifier",
                            "start": 19,
                            "end": 25,
                            "name": "target"
                        }
                    }
                }],
                "body": {
                    "type": "BlockStatement",
                    "start": 26,
                    "end": 28,
                    "body": []
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse "function a() { var b = arguments.length !== 0 ? arguments[0] : new.target }"', () => {
        expect(parseScript(`function a() {
            var b = arguments.length !== 0 ? arguments[0] : new.target
        }`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 95,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 3,
                "column": 9
              }
            },
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 95,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 3,
                    "column": 9
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
                  "end": 95,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 13
                    },
                    "end": {
                      "line": 3,
                      "column": 9
                    }
                  },
                  "body": [
                    {
                      "type": "VariableDeclaration",
                      "start": 27,
                      "end": 85,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 12
                        },
                        "end": {
                          "line": 2,
                          "column": 70
                        }
                      },
                      "declarations": [
                        {
                          "type": "VariableDeclarator",
                          "start": 31,
                          "end": 85,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 16
                            },
                            "end": {
                              "line": 2,
                              "column": 70
                            }
                          },
                          "id": {
                            "type": "Identifier",
                            "start": 31,
                            "end": 32,
                            "loc": {
                              "start": {
                                "line": 2,
                                "column": 16
                              },
                              "end": {
                                "line": 2,
                                "column": 17
                              }
                            },
                            "name": "b"
                          },
                          "init": {
                            "type": "ConditionalExpression",
                            "start": 35,
                            "end": 85,
                            "loc": {
                              "start": {
                                "line": 2,
                                "column": 20
                              },
                              "end": {
                                "line": 2,
                                "column": 70
                              }
                            },
                            "test": {
                              "type": "BinaryExpression",
                              "start": 35,
                              "end": 57,
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
                              "left": {
                                "type": "MemberExpression",
                                "start": 35,
                                "end": 51,
                                "loc": {
                                  "start": {
                                    "line": 2,
                                    "column": 20
                                  },
                                  "end": {
                                    "line": 2,
                                    "column": 36
                                  }
                                },
                                "object": {
                                  "type": "Identifier",
                                  "start": 35,
                                  "end": 44,
                                  "loc": {
                                    "start": {
                                      "line": 2,
                                      "column": 20
                                    },
                                    "end": {
                                      "line": 2,
                                      "column": 29
                                    }
                                  },
                                  "name": "arguments"
                                },
                                "property": {
                                  "type": "Identifier",
                                  "start": 45,
                                  "end": 51,
                                  "loc": {
                                    "start": {
                                      "line": 2,
                                      "column": 30
                                    },
                                    "end": {
                                      "line": 2,
                                      "column": 36
                                    }
                                  },
                                  "name": "length"
                                },
                                "computed": false
                              },
                              "operator": "!==",
                              "right": {
                                "type": "Literal",
                                "start": 56,
                                "end": 57,
                                "loc": {
                                  "start": {
                                    "line": 2,
                                    "column": 41
                                  },
                                  "end": {
                                    "line": 2,
                                    "column": 42
                                  }
                                },
                                "value": 0,
                                "raw": "0"
                              }
                            },
                            "consequent": {
                              "type": "MemberExpression",
                              "start": 60,
                              "end": 72,
                              "loc": {
                                "start": {
                                  "line": 2,
                                  "column": 45
                                },
                                "end": {
                                  "line": 2,
                                  "column": 57
                                }
                              },
                              "object": {
                                "type": "Identifier",
                                "start": 60,
                                "end": 69,
                                "loc": {
                                  "start": {
                                    "line": 2,
                                    "column": 45
                                  },
                                  "end": {
                                    "line": 2,
                                    "column": 54
                                  }
                                },
                                "name": "arguments"
                              },
                              "property": {
                                "type": "Literal",
                                "start": 70,
                                "end": 71,
                                "loc": {
                                  "start": {
                                    "line": 2,
                                    "column": 55
                                  },
                                  "end": {
                                    "line": 2,
                                    "column": 56
                                  }
                                },
                                "value": 0,
                                "raw": "0"
                              },
                              "computed": true
                            },
                            "alternate": {
                              "type": "MetaProperty",
                              "start": 75,
                              "end": 85,
                              "loc": {
                                "start": {
                                  "line": 2,
                                  "column": 60
                                },
                                "end": {
                                  "line": 2,
                                  "column": 70
                                }
                              },
                              "meta": {
                                "type": "Identifier",
                                "start": 75,
                                "end": 78,
                                "loc": {
                                  "start": {
                                    "line": 2,
                                    "column": 60
                                  },
                                  "end": {
                                    "line": 2,
                                    "column": 63
                                  }
                                },
                                "name": "new"
                              },
                              "property": {
                                "type": "Identifier",
                                "start": 79,
                                "end": 85,
                                "loc": {
                                  "start": {
                                    "line": 2,
                                    "column": 64
                                  },
                                  "end": {
                                    "line": 2,
                                    "column": 70
                                  }
                                },
                                "name": "target"
                              }
                            }
                          }
                        }
                      ],
                      "kind": "var"
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });
    it('should parse "new a()() === a"', () => {
        expect(parseScript('new a()() === a', {
          ranges: true,
          raw: true,
          locations: true
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
              "type": "ExpressionStatement",
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
              "expression": {
                "type": "BinaryExpression",
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
                "left": {
                  "type": "CallExpression",
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
                  "callee": {
                    "type": "NewExpression",
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
                    "callee": {
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
                      "name": "a"
                    },
                    "arguments": []
                  },
                  "arguments": []
                },
                "operator": "===",
                "right": {
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
                  "name": "a"
                }
              }
            }
          ],
          "sourceType": "script"
        });
    });

    it('should parse "new Button()"', () => {
        expect(parseScript('new Button()', {
          ranges: true,
          raw: true,
          locations: true
      })).to.eql({
          "type": "Program",
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
          "body": [
            {
              "type": "ExpressionStatement",
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
              "expression": {
                "type": "NewExpression",
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
                "callee": {
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
                  "name": "Button"
                },
                "arguments": []
              }
            }
          ],
          "sourceType": "script"
        });
    });

    it('should parse "new new foo"', () => {
        expect(parseScript('new new foo', {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
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
            "body": [{
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
                    "type": "NewExpression",
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
                    "callee": {
                        "type": "NewExpression",
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
                        "callee": {
                            "type": "Identifier",
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
                            "name": "foo"
                        },
                        "arguments": []
                    },
                    "arguments": []
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse "new new foo()"', () => {
        expect(parseScript('new new foo()', {
            ranges: true
        })).to.eql({
            "body": [{
                "end": 13,
                "expression": {
                    "arguments": [],
                    "callee": {
                        "arguments": [],
                        "callee": {
                            "end": 11,
                            "name": "foo",
                            "start": 8,
                            "type": "Identifier"
                        },
                        "end": 13,
                        "start": 4,
                        "type": "NewExpression"
                    },
                    "end": 13,
                    "start": 0,
                    "type": "NewExpression"
                },
                "start": 0,
                "type": "ExpressionStatement"
            }, ],
            "end": 13,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse "new f(...a)"', () => {
        expect(parseScript('new f(...a)', {
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "NewExpression",
                    "callee": {
                        "type": "Identifier",
                        "name": "f"
                    },
                    "arguments": [{
                        "type": "SpreadElement",
                        "argument": {
                            "type": "Identifier",
                            "name": "a"
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "new f(...a = b)"', () => {
        expect(parseScript('new f(...a = b)', {
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "NewExpression",
                    "callee": {
                        "type": "Identifier",
                        "name": "f"
                    },
                    "arguments": [{
                        "type": "SpreadElement",
                        "argument": {
                            "type": "AssignmentExpression",
                            "operator": "=",
                            "left": {
                                "type": "Identifier",
                                "name": "a"
                            },
                            "right": {
                                "type": "Identifier",
                                "name": "b"
                            }
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse "new f(...a, b, ...c)"', () => {
        expect(parseScript('new f(...a, b, ...c)', {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 20,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 20
                }
            },
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 20,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 20
                    }
                },
                "expression": {
                    "type": "NewExpression",
                    "start": 0,
                    "end": 20,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 20
                        }
                    },
                    "callee": {
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
                        "name": "f"
                    },
                    "arguments": [{
                            "type": "SpreadElement",
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
                        },
                        {
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
                            "name": "b"
                        },
                        {
                            "type": "SpreadElement",
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
                            "argument": {
                                "type": "Identifier",
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
                                "name": "c"
                            }
                        }
                    ]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "new f(a, ...b, c)"', () => {
        expect(parseScript('new f(a, ...b, c)', {
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
                    "type": "NewExpression",
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
                    "callee": {
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
                        "name": "f"
                    },
                    "arguments": [{
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
                            "name": "a"
                        },
                        {
                            "type": "SpreadElement",
                            "start": 9,
                            "end": 13,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 9
                                },
                                "end": {
                                    "line": 1,
                                    "column": 13
                                }
                            },
                            "argument": {
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
                                "name": "b"
                            }
                        },
                        {
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
                            "name": "c"
                        }
                    ]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "new f(...a, ...b)"', () => {
        expect(parseScript('new f(...a, ...b)', {
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "NewExpression",
                    "callee": {
                        "type": "Identifier",
                        "name": "f"
                    },
                    "arguments": [{
                            "type": "SpreadElement",
                            "argument": {
                                "type": "Identifier",
                                "name": "a"
                            }
                        },
                        {
                            "type": "SpreadElement",
                            "argument": {
                                "type": "Identifier",
                                "name": "b"
                            }
                        }
                    ]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "new a(b,c)"', () => {
        expect(parseScript('new a(b,c)', {
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "NewExpression",
                    "callee": {
                        "type": "Identifier",
                        "name": "a"
                    },
                    "arguments": [{
                            "type": "Identifier",
                            "name": "b"
                        },
                        {
                            "type": "Identifier",
                            "name": "c"
                        }
                    ]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "new(a in b)"', () => {
        expect(parseScript('new(a in b)', {
            ranges: true
        })).to.eql({
            "body": [{
                "end": 11,
                "expression": {
                    "arguments": [],
                    "callee": {
                        "end": 10,
                        "left": {
                            "end": 5,
                            "name": "a",
                            "start": 4,
                            "type": "Identifier"
                        },
                        "operator": "in",
                        "right": {
                            "end": 10,
                            "name": "b",
                            "start": 9,
                            "type": "Identifier"
                        },
                        "start": 4,
                        "type": "BinaryExpression"
                    },
                    "end": 11,
                    "start": 0,
                    "type": "NewExpression"
                },
                "start": 0,
                "type": "ExpressionStatement"
            }],
            "end": 11,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });
});
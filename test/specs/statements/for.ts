import { fail, pass } from '../utils/test-utils';

describe('Statement - For', () => {
  
      fail('for ( ; false; ) const x = null;', 'for ( ; false; ) const x = null;');
      fail('let declarations with initialisers in statement positions ( for ( ;;) Statement )', 'for (;false;) let x = 1;');
      fail('for (var x; false; ) label1: label2: function f() {}', 'for (var x; false; ) label1: label2: function f() {}');
      fail('for (const x; false; ) label1: label2: function f() {}', 'for (const x; false; ) label1: label2: function f() {}');
      fail('for (const x; false; ) label1: label2: function f() {}', 'for (const x; false; ) label1: label2: function f() {}');
      fail('for ( ; false; ) label1: label2: function f() {}', 'for ( ; false; ) label1: label2: function f() {}');
      fail('for(var index=0; index<10; index++; index--);', 'for(var index=0; index<10; index++; index--);');
      fail('for(index=0; index<10; index++; index--) ;', 'for(index=0; index<10; index++; index--) ;');
      fail('for (var x; false; ) label1: label2: function f() {}', 'for (var x; false; ) label1: label2: function f() {}');
      fail('for ( ; false; ) async function* g() {}', 'for ( ; false; ) async function* g() {}');
      fail('for ( ; false; ) async function* g() {}', 'for ( ; false; ) async function* g() {}');
      fail('for ( ; false; ) let x;', 'for ( ; false; ) let x;');
      fail('for (const x; false; ) label1: label2: function f() {}', 'for (const x; false; ) label1: label2: function f() {}');
      fail('for ( ; false; ) label1: label2: function f() {}', 'for ( ; false; ) label1: label2: function f() {}');
      fail('for(var index=0; index<10; index++; index--);', 'for(var index=0; index<10; index++; index--);');
      fail('for ( ; false; ) function* g() {}', 'for ( ; false; ) function* g() {}');
      fail('for (let xd; false; ) label1: label2: function f() {}', 'for (let xd; false; ) label1: label2: function f() {}');
      fail('for ( ; false; ) function* g() {}', 'for ( ; false; ) function* g() {}');
      fail('for(;;) function a(){}', 'for(;;) function a(){}');
  
      pass('should parse "for (let in a) {}"', `for (let in a) {}`, {
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
              "type": "ForInStatement",
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
              "left": {
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
                  "name": "let"
              },
              "right": {
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
                  "name": "a"
              },
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
          }],
          "sourceType": "script"
      });
  
      pass('should parse "for (let();;) ;"', `for (let();;) ;`, {
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
          "body": [{
              "type": "ForStatement",
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
              "init": {
                  "type": "CallExpression",
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
                  "callee": {
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
                      "name": "let"
                  },
                  "arguments": []
              },
              "test": null,
              "update": null,
              "body": {
                  "type": "EmptyStatement",
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
              }
          }],
          "sourceType": "script"
      });
  
      pass('should parse "for(;;);"', `for(;;);`, {
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
          "body": [{
              "type": "ForStatement",
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
              "init": null,
              "test": null,
              "update": null,
              "body": {
                  "type": "EmptyStatement",
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
              }
          }],
          "sourceType": "script"
      });
  
      pass('should parse "for(;;){}"', `for(;;){}`, {
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
          "body": [{
              "type": "ForStatement",
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
              "init": null,
              "test": null,
              "update": null,
              "body": {
                  "type": "BlockStatement",
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
                  },
                  "body": []
              }
          }],
          "sourceType": "script"
      });
  
      pass('should parse "for(x = 0;;);"', `for(x = 0;;);`, {
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
          "body": [{
              "type": "ForStatement",
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
              "init": {
                  "type": "AssignmentExpression",
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
                  "operator": "=",
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
                      "name": "x"
                  },
                  "right": {
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
              },
              "test": null,
              "update": null,
              "body": {
                  "type": "EmptyStatement",
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
              }
          }],
          "sourceType": "script"
      });
  
      pass('should parse complex with for and catch in function body"', `(class ServiceApi extends Component.mixin(AsyncEmitter) {
          *initialize() {
              for (let v in apiDesc) { }
              for (let v in this._api) { }
          }
      })`, {
        "type": "Program",
        "body": [
            {
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ClassExpression",
                    "id": {
                        "type": "Identifier",
                        "name": "ServiceApi",
                        "start": 7,
                        "end": 17,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 7
                            },
                            "end": {
                                "line": 1,
                                "column": 17
                            }
                        }
                    },
                    "superClass": {
                        "type": "CallExpression",
                        "callee": {
                            "type": "MemberExpression",
                            "object": {
                                "type": "Identifier",
                                "name": "Component",
                                "start": 26,
                                "end": 35,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 26
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 35
                                    }
                                }
                            },
                            "computed": false,
                            "property": {
                                "type": "Identifier",
                                "name": "mixin",
                                "start": 36,
                                "end": 41,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 36
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 41
                                    }
                                }
                            },
                            "start": 1,
                            "end": 41,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 1
                                },
                                "end": {
                                    "line": 1,
                                    "column": 41
                                }
                            }
                        },
                        "arguments": [
                            {
                                "type": "Identifier",
                                "name": "AsyncEmitter",
                                "start": 42,
                                "end": 54,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 42
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 54
                                    }
                                }
                            }
                        ],
                        "start": 1,
                        "end": 55,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 1
                            },
                            "end": {
                                "line": 1,
                                "column": 55
                            }
                        }
                    },
                    "body": {
                        "type": "ClassBody",
                        "body": [
                            {
                                "type": "MethodDefinition",
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "name": "initialize",
                                    "start": 69,
                                    "end": 79,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 11
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 21
                                        }
                                    }
                                },
                                "kind": "method",
                                "static": false,
                                "value": {
                                    "type": "FunctionExpression",
                                    "id": null,
                                    "params": [],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": [
                                            {
                                                "type": "ForInStatement",
                                                "body": {
                                                    "type": "BlockStatement",
                                                    "body": [],
                                                    "start": 121,
                                                    "end": 124,
                                                    "loc": {
                                                        "start": {
                                                            "line": 3,
                                                            "column": 37
                                                        },
                                                        "end": {
                                                            "line": 3,
                                                            "column": 40
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
                                                                "type": "Identifier",
                                                                "name": "v",
                                                                "start": 107,
                                                                "end": 108,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 3,
                                                                        "column": 23
                                                                    },
                                                                    "end": {
                                                                        "line": 3,
                                                                        "column": 24
                                                                    }
                                                                }
                                                            },
                                                            "start": 107,
                                                            "end": 108,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 3,
                                                                    "column": 23
                                                                },
                                                                "end": {
                                                                    "line": 3,
                                                                    "column": 24
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    "kind": "let",
                                                    "start": 103,
                                                    "end": 108,
                                                    "loc": {
                                                        "start": {
                                                            "line": 3,
                                                            "column": 19
                                                        },
                                                        "end": {
                                                            "line": 3,
                                                            "column": 24
                                                        }
                                                    }
                                                },
                                                "right": {
                                                    "type": "Identifier",
                                                    "name": "apiDesc",
                                                    "start": 112,
                                                    "end": 119,
                                                    "loc": {
                                                        "start": {
                                                            "line": 3,
                                                            "column": 28
                                                        },
                                                        "end": {
                                                            "line": 3,
                                                            "column": 35
                                                        }
                                                    }
                                                },
                                                "start": 98,
                                                "end": 124,
                                                "loc": {
                                                    "start": {
                                                        "line": 3,
                                                        "column": 14
                                                    },
                                                    "end": {
                                                        "line": 3,
                                                        "column": 40
                                                    }
                                                }
                                            },
                                            {
                                                "type": "ForInStatement",
                                                "body": {
                                                    "type": "BlockStatement",
                                                    "body": [],
                                                    "start": 164,
                                                    "end": 167,
                                                    "loc": {
                                                        "start": {
                                                            "line": 4,
                                                            "column": 39
                                                        },
                                                        "end": {
                                                            "line": 4,
                                                            "column": 42
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
                                                                "type": "Identifier",
                                                                "name": "v",
                                                                "start": 148,
                                                                "end": 149,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 4,
                                                                        "column": 23
                                                                    },
                                                                    "end": {
                                                                        "line": 4,
                                                                        "column": 24
                                                                    }
                                                                }
                                                            },
                                                            "start": 148,
                                                            "end": 149,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 4,
                                                                    "column": 23
                                                                },
                                                                "end": {
                                                                    "line": 4,
                                                                    "column": 24
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    "kind": "let",
                                                    "start": 144,
                                                    "end": 149,
                                                    "loc": {
                                                        "start": {
                                                            "line": 4,
                                                            "column": 19
                                                        },
                                                        "end": {
                                                            "line": 4,
                                                            "column": 24
                                                        }
                                                    }
                                                },
                                                "right": {
                                                    "type": "MemberExpression",
                                                    "object": {
                                                        "type": "ThisExpression",
                                                        "start": 153,
                                                        "end": 157,
                                                        "loc": {
                                                            "start": {
                                                                "line": 4,
                                                                "column": 28
                                                            },
                                                            "end": {
                                                                "line": 4,
                                                                "column": 32
                                                            }
                                                        }
                                                    },
                                                    "computed": false,
                                                    "property": {
                                                        "type": "Identifier",
                                                        "name": "_api",
                                                        "start": 158,
                                                        "end": 162,
                                                        "loc": {
                                                            "start": {
                                                                "line": 4,
                                                                "column": 33
                                                            },
                                                            "end": {
                                                                "line": 4,
                                                                "column": 37
                                                            }
                                                        }
                                                    },
                                                    "start": 153,
                                                    "end": 162,
                                                    "loc": {
                                                        "start": {
                                                            "line": 4,
                                                            "column": 28
                                                        },
                                                        "end": {
                                                            "line": 4,
                                                            "column": 37
                                                        }
                                                    }
                                                },
                                                "start": 139,
                                                "end": 167,
                                                "loc": {
                                                    "start": {
                                                        "line": 4,
                                                        "column": 14
                                                    },
                                                    "end": {
                                                        "line": 4,
                                                        "column": 42
                                                    }
                                                }
                                            }
                                        ],
                                        "start": 82,
                                        "end": 179,
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 24
                                            },
                                            "end": {
                                                "line": 5,
                                                "column": 11
                                            }
                                        }
                                    },
                                    "generator": true,
                                    "async": false,
                                    "expression": false,
                                    "start": 79,
                                    "end": 179,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 21
                                        },
                                        "end": {
                                            "line": 5,
                                            "column": 11
                                        }
                                    }
                                },
                                "start": 68,
                                "end": 179,
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 10
                                    },
                                    "end": {
                                        "line": 5,
                                        "column": 11
                                    }
                                }
                            }
                        ],
                        "start": 56,
                        "end": 187,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 56
                            },
                            "end": {
                                "line": 6,
                                "column": 7
                            }
                        }
                    },
                    "start": 1,
                    "end": 187,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 1
                        },
                        "end": {
                            "line": 6,
                            "column": 7
                        }
                    }
                },
                "start": 0,
                "end": 188,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 6,
                        "column": 8
                    }
                }
            }
        ],
        "sourceType": "script",
        "start": 0,
        "end": 188,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 6,
                "column": 8
            }
        }
    });
  
      pass('should parse complex with for and catch in function body"', `function a( head, tail )
        {
            const defs = [ head ].concat( extract( tail, 3 ) );
        
            return function() {
                let errs;
        
                for ( const def of defs )
                {
                    args.save();
                    try
                    {
                    }
                    catch ( err )
                    {
                        errs = err;
                    }
                }
        
                throw errs;
            };
        }`, {
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [
                        {
                            "type": "Identifier",
                            "name": "head",
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
                        },
                        {
                            "type": "Identifier",
                            "name": "tail",
                            "start": 18,
                            "end": 22,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 18
                                },
                                "end": {
                                    "line": 1,
                                    "column": 22
                                }
                            }
                        }
                    ],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "VariableDeclaration",
                                "declarations": [
                                    {
                                        "type": "VariableDeclarator",
                                        "init": {
                                            "type": "CallExpression",
                                            "callee": {
                                                "type": "MemberExpression",
                                                "object": {
                                                    "type": "ArrayExpression",
                                                    "elements": [
                                                        {
                                                            "type": "Identifier",
                                                            "name": "head",
                                                            "start": 62,
                                                            "end": 66,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 3,
                                                                    "column": 27
                                                                },
                                                                "end": {
                                                                    "line": 3,
                                                                    "column": 31
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    "start": 60,
                                                    "end": 68,
                                                    "loc": {
                                                        "start": {
                                                            "line": 3,
                                                            "column": 25
                                                        },
                                                        "end": {
                                                            "line": 3,
                                                            "column": 33
                                                        }
                                                    }
                                                },
                                                "computed": false,
                                                "property": {
                                                    "type": "Identifier",
                                                    "name": "concat",
                                                    "start": 69,
                                                    "end": 75,
                                                    "loc": {
                                                        "start": {
                                                            "line": 3,
                                                            "column": 34
                                                        },
                                                        "end": {
                                                            "line": 3,
                                                            "column": 40
                                                        }
                                                    }
                                                },
                                                "start": 60,
                                                "end": 75,
                                                "loc": {
                                                    "start": {
                                                        "line": 3,
                                                        "column": 25
                                                    },
                                                    "end": {
                                                        "line": 3,
                                                        "column": 40
                                                    }
                                                }
                                            },
                                            "arguments": [
                                                {
                                                    "type": "CallExpression",
                                                    "callee": {
                                                        "type": "Identifier",
                                                        "name": "extract",
                                                        "start": 77,
                                                        "end": 84,
                                                        "loc": {
                                                            "start": {
                                                                "line": 3,
                                                                "column": 42
                                                            },
                                                            "end": {
                                                                "line": 3,
                                                                "column": 49
                                                            }
                                                        }
                                                    },
                                                    "arguments": [
                                                        {
                                                            "type": "Identifier",
                                                            "name": "tail",
                                                            "start": 86,
                                                            "end": 90,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 3,
                                                                    "column": 51
                                                                },
                                                                "end": {
                                                                    "line": 3,
                                                                    "column": 55
                                                                }
                                                            }
                                                        },
                                                        {
                                                            "type": "Literal",
                                                            "value": 3,
                                                            "start": 92,
                                                            "end": 93,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 3,
                                                                    "column": 57
                                                                },
                                                                "end": {
                                                                    "line": 3,
                                                                    "column": 58
                                                                }
                                                            },
                                                            "raw": "3"
                                                        }
                                                    ],
                                                    "start": 77,
                                                    "end": 95,
                                                    "loc": {
                                                        "start": {
                                                            "line": 3,
                                                            "column": 42
                                                        },
                                                        "end": {
                                                            "line": 3,
                                                            "column": 60
                                                        }
                                                    }
                                                }
                                            ],
                                            "start": 60,
                                            "end": 97,
                                            "loc": {
                                                "start": {
                                                    "line": 3,
                                                    "column": 25
                                                },
                                                "end": {
                                                    "line": 3,
                                                    "column": 62
                                                }
                                            }
                                        },
                                        "id": {
                                            "type": "Identifier",
                                            "name": "defs",
                                            "start": 53,
                                            "end": 57,
                                            "loc": {
                                                "start": {
                                                    "line": 3,
                                                    "column": 18
                                                },
                                                "end": {
                                                    "line": 3,
                                                    "column": 22
                                                }
                                            }
                                        },
                                        "start": 53,
                                        "end": 97,
                                        "loc": {
                                            "start": {
                                                "line": 3,
                                                "column": 18
                                            },
                                            "end": {
                                                "line": 3,
                                                "column": 62
                                            }
                                        }
                                    }
                                ],
                                "kind": "const",
                                "start": 47,
                                "end": 98,
                                "loc": {
                                    "start": {
                                        "line": 3,
                                        "column": 12
                                    },
                                    "end": {
                                        "line": 3,
                                        "column": 63
                                    }
                                }
                            },
                            {
                                "type": "ReturnStatement",
                                "argument": {
                                    "type": "FunctionExpression",
                                    "params": [],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": [
                                            {
                                                "type": "VariableDeclaration",
                                                "declarations": [
                                                    {
                                                        "type": "VariableDeclarator",
                                                        "init": null,
                                                        "id": {
                                                            "type": "Identifier",
                                                            "name": "errs",
                                                            "start": 160,
                                                            "end": 164,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 6,
                                                                    "column": 20
                                                                },
                                                                "end": {
                                                                    "line": 6,
                                                                    "column": 24
                                                                }
                                                            }
                                                        },
                                                        "start": 160,
                                                        "end": 164,
                                                        "loc": {
                                                            "start": {
                                                                "line": 6,
                                                                "column": 20
                                                            },
                                                            "end": {
                                                                "line": 6,
                                                                "column": 24
                                                            }
                                                        }
                                                    }
                                                ],
                                                "kind": "let",
                                                "start": 156,
                                                "end": 165,
                                                "loc": {
                                                    "start": {
                                                        "line": 6,
                                                        "column": 16
                                                    },
                                                    "end": {
                                                        "line": 6,
                                                        "column": 25
                                                    }
                                                }
                                            },
                                            {
                                                "type": "ForOfStatement",
                                                "body": {
                                                    "type": "BlockStatement",
                                                    "body": [
                                                        {
                                                            "type": "ExpressionStatement",
                                                            "expression": {
                                                                "type": "CallExpression",
                                                                "callee": {
                                                                    "type": "MemberExpression",
                                                                    "object": {
                                                                        "type": "Identifier",
                                                                        "name": "args",
                                                                        "start": 255,
                                                                        "end": 259,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 10,
                                                                                "column": 20
                                                                            },
                                                                            "end": {
                                                                                "line": 10,
                                                                                "column": 24
                                                                            }
                                                                        }
                                                                    },
                                                                    "computed": false,
                                                                    "property": {
                                                                        "type": "Identifier",
                                                                        "name": "save",
                                                                        "start": 260,
                                                                        "end": 264,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 10,
                                                                                "column": 25
                                                                            },
                                                                            "end": {
                                                                                "line": 10,
                                                                                "column": 29
                                                                            }
                                                                        }
                                                                    },
                                                                    "start": 255,
                                                                    "end": 264,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 10,
                                                                            "column": 20
                                                                        },
                                                                        "end": {
                                                                            "line": 10,
                                                                            "column": 29
                                                                        }
                                                                    }
                                                                },
                                                                "arguments": [],
                                                                "start": 255,
                                                                "end": 266,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 10,
                                                                        "column": 20
                                                                    },
                                                                    "end": {
                                                                        "line": 10,
                                                                        "column": 31
                                                                    }
                                                                }
                                                            },
                                                            "start": 255,
                                                            "end": 267,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 10,
                                                                    "column": 20
                                                                },
                                                                "end": {
                                                                    "line": 10,
                                                                    "column": 32
                                                                }
                                                            }
                                                        },
                                                        {
                                                            "type": "TryStatement",
                                                            "block": {
                                                                "type": "BlockStatement",
                                                                "body": [],
                                                                "start": 312,
                                                                "end": 335,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 12,
                                                                        "column": 20
                                                                    },
                                                                    "end": {
                                                                        "line": 13,
                                                                        "column": 21
                                                                    }
                                                                }
                                                            },
                                                            "handler": {
                                                                "type": "CatchClause",
                                                                "param": {
                                                                    "type": "Identifier",
                                                                    "name": "err",
                                                                    "start": 364,
                                                                    "end": 367,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 14,
                                                                            "column": 28
                                                                        },
                                                                        "end": {
                                                                            "line": 14,
                                                                            "column": 31
                                                                        }
                                                                    }
                                                                },
                                                                "body": {
                                                                    "type": "BlockStatement",
                                                                    "body": [
                                                                        {
                                                                            "type": "ExpressionStatement",
                                                                            "expression": {
                                                                                "type": "AssignmentExpression",
                                                                                "left": {
                                                                                    "type": "Identifier",
                                                                                    "name": "errs",
                                                                                    "start": 416,
                                                                                    "end": 420,
                                                                                    "loc": {
                                                                                        "start": {
                                                                                            "line": 16,
                                                                                            "column": 24
                                                                                        },
                                                                                        "end": {
                                                                                            "line": 16,
                                                                                            "column": 28
                                                                                        }
                                                                                    }
                                                                                },
                                                                                "operator": "=",
                                                                                "right": {
                                                                                    "type": "Identifier",
                                                                                    "name": "err",
                                                                                    "start": 423,
                                                                                    "end": 426,
                                                                                    "loc": {
                                                                                        "start": {
                                                                                            "line": 16,
                                                                                            "column": 31
                                                                                        },
                                                                                        "end": {
                                                                                            "line": 16,
                                                                                            "column": 34
                                                                                        }
                                                                                    }
                                                                                },
                                                                                "start": 416,
                                                                                "end": 426,
                                                                                "loc": {
                                                                                    "start": {
                                                                                        "line": 16,
                                                                                        "column": 24
                                                                                    },
                                                                                    "end": {
                                                                                        "line": 16,
                                                                                        "column": 34
                                                                                    }
                                                                                }
                                                                            },
                                                                            "start": 416,
                                                                            "end": 427,
                                                                            "loc": {
                                                                                "start": {
                                                                                    "line": 16,
                                                                                    "column": 24
                                                                                },
                                                                                "end": {
                                                                                    "line": 16,
                                                                                    "column": 35
                                                                                }
                                                                            }
                                                                        }
                                                                    ],
                                                                    "start": 390,
                                                                    "end": 449,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 15,
                                                                            "column": 20
                                                                        },
                                                                        "end": {
                                                                            "line": 17,
                                                                            "column": 21
                                                                        }
                                                                    }
                                                                },
                                                                "start": 356,
                                                                "end": 449,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 14,
                                                                        "column": 20
                                                                    },
                                                                    "end": {
                                                                        "line": 17,
                                                                        "column": 21
                                                                    }
                                                                }
                                                            },
                                                            "finalizer": null,
                                                            "start": 288,
                                                            "end": 449,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 11,
                                                                    "column": 20
                                                                },
                                                                "end": {
                                                                    "line": 17,
                                                                    "column": 21
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    "start": 233,
                                                    "end": 467,
                                                    "loc": {
                                                        "start": {
                                                            "line": 9,
                                                            "column": 16
                                                        },
                                                        "end": {
                                                            "line": 18,
                                                            "column": 17
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
                                                                "type": "Identifier",
                                                                "name": "def",
                                                                "start": 203,
                                                                "end": 206,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 8,
                                                                        "column": 28
                                                                    },
                                                                    "end": {
                                                                        "line": 8,
                                                                        "column": 31
                                                                    }
                                                                }
                                                            },
                                                            "start": 203,
                                                            "end": 206,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 8,
                                                                    "column": 28
                                                                },
                                                                "end": {
                                                                    "line": 8,
                                                                    "column": 31
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    "kind": "const",
                                                    "start": 197,
                                                    "end": 206,
                                                    "loc": {
                                                        "start": {
                                                            "line": 8,
                                                            "column": 22
                                                        },
                                                        "end": {
                                                            "line": 8,
                                                            "column": 31
                                                        }
                                                    }
                                                },
                                                "right": {
                                                    "type": "Identifier",
                                                    "name": "defs",
                                                    "start": 210,
                                                    "end": 214,
                                                    "loc": {
                                                        "start": {
                                                            "line": 8,
                                                            "column": 35
                                                        },
                                                        "end": {
                                                            "line": 8,
                                                            "column": 39
                                                        }
                                                    }
                                                },
                                                "await": false,
                                                "start": 191,
                                                "end": 467,
                                                "loc": {
                                                    "start": {
                                                        "line": 8,
                                                        "column": 16
                                                    },
                                                    "end": {
                                                        "line": 18,
                                                        "column": 17
                                                    }
                                                }
                                            },
                                            {
                                                "type": "ThrowStatement",
                                                "argument": {
                                                    "type": "Identifier",
                                                    "name": "errs",
                                                    "start": 499,
                                                    "end": 503,
                                                    "loc": {
                                                        "start": {
                                                            "line": 20,
                                                            "column": 22
                                                        },
                                                        "end": {
                                                            "line": 20,
                                                            "column": 26
                                                        }
                                                    }
                                                },
                                                "start": 493,
                                                "end": 504,
                                                "loc": {
                                                    "start": {
                                                        "line": 20,
                                                        "column": 16
                                                    },
                                                    "end": {
                                                        "line": 20,
                                                        "column": 27
                                                    }
                                                }
                                            }
                                        ],
                                        "start": 138,
                                        "end": 518,
                                        "loc": {
                                            "start": {
                                                "line": 5,
                                                "column": 30
                                            },
                                            "end": {
                                                "line": 21,
                                                "column": 13
                                            }
                                        }
                                    },
                                    "async": false,
                                    "generator": false,
                                    "expression": false,
                                    "id": null,
                                    "start": 127,
                                    "end": 518,
                                    "loc": {
                                        "start": {
                                            "line": 5,
                                            "column": 19
                                        },
                                        "end": {
                                            "line": 21,
                                            "column": 13
                                        }
                                    }
                                },
                                "start": 120,
                                "end": 519,
                                "loc": {
                                    "start": {
                                        "line": 5,
                                        "column": 12
                                    },
                                    "end": {
                                        "line": 21,
                                        "column": 14
                                    }
                                }
                            }
                        ],
                        "start": 33,
                        "end": 529,
                        "loc": {
                            "start": {
                                "line": 2,
                                "column": 8
                            },
                            "end": {
                                "line": 22,
                                "column": 9
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
                    "end": 529,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 22,
                            "column": 9
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 529,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 22,
                    "column": 9
                }
            }
        });
  
      pass('should parse "for(var x = 0;;);"', `for(var x = 0;;);`, {
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
              "type": "ForStatement",
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
              "init": {
                  "type": "VariableDeclaration",
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
                  },
                  "declarations": [{
                      "type": "VariableDeclarator",
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
                      "id": {
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
                          "name": "x"
                      },
                      "init": {
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
                  }],
                  "kind": "var"
              },
              "test": null,
              "update": null,
              "body": {
                  "type": "EmptyStatement",
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
              }
          }],
          "sourceType": "script"
      });
  
      pass('should parse "for(var x = 0, y = 1;;);"', `for(var x = 0, y = 1;;);`, {
          "type": "Program",
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
          "body": [{
              "type": "ForStatement",
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
              "init": {
                  "type": "VariableDeclaration",
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
                  },
                  "declarations": [{
                          "type": "VariableDeclarator",
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
                          "id": {
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
                              "name": "x"
                          },
                          "init": {
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
                      },
                      {
                          "type": "VariableDeclarator",
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
                              "name": "y"
                          },
                          "init": {
                              "type": "Literal",
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
                              "value": 1,
                              "raw": "1"
                          }
                      }
                  ],
                  "kind": "var"
              },
              "test": null,
              "update": null,
              "body": {
                  "type": "EmptyStatement",
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
                  }
              }
          }],
          "sourceType": "script"
      });
  
      pass('should parse "for(x = 0; x < 42;);"', `for(x = 0; x < 42;);`, {
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
              "type": "ForStatement",
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
              "init": {
                  "type": "AssignmentExpression",
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
                  "operator": "=",
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
                      "name": "x"
                  },
                  "right": {
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
              },
              "test": {
                  "type": "BinaryExpression",
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
                  },
                  "left": {
                      "type": "Identifier",
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
                      "name": "x"
                  },
                  "operator": "<",
                  "right": {
                      "type": "Literal",
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
                      "value": 42,
                      "raw": "42"
                  }
              },
              "update": null,
              "body": {
                  "type": "EmptyStatement",
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
              }
          }],
          "sourceType": "script"
      });
  
      pass('should parse "for(x = 0; x < 42; x++);"', `for(x = 0; x < 42; x++);`, {
          "type": "Program",
          "body": [{
              "type": "ForStatement",
              "body": {
                  "type": "EmptyStatement",
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
                  }
              },
              "init": {
                  "type": "AssignmentExpression",
                  "left": {
                      "type": "Identifier",
                      "name": "x",
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
                  "operator": "=",
                  "right": {
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
                  }
              },
              "test": {
                  "type": "BinaryExpression",
                  "left": {
                      "type": "Identifier",
                      "name": "x",
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
                  "right": {
                      "type": "Literal",
                      "value": 42,
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
                      "raw": "42"
                  },
                  "operator": "<",
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
              "update": {
                  "type": "UpdateExpression",
                  "argument": {
                      "type": "Identifier",
                      "name": "x",
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
                  "operator": "++",
                  "prefix": false,
                  "start": 19,
                  "end": 22,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 19
                      },
                      "end": {
                          "line": 1,
                          "column": 22
                      }
                  }
              },
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
              }
          }],
          "sourceType": "script",
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
          }
      });
  
      pass('should parse "for(x = 0; x < 42; x++) process(x);"', `for(x = 0; x < 42; x++) process(x);`, {
          "type": "Program",
          "body": [{
              "type": "ForStatement",
              "body": {
                  "type": "ExpressionStatement",
                  "expression": {
                      "type": "CallExpression",
                      "callee": {
                          "type": "Identifier",
                          "name": "process",
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
                          }
                      },
                      "arguments": [{
                          "type": "Identifier",
                          "name": "x",
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
                          }
                      }],
                      "start": 24,
                      "end": 34,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 24
                          },
                          "end": {
                              "line": 1,
                              "column": 34
                          }
                      }
                  },
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
                  }
              },
              "init": {
                  "type": "AssignmentExpression",
                  "left": {
                      "type": "Identifier",
                      "name": "x",
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
                  "operator": "=",
                  "right": {
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
                  }
              },
              "test": {
                  "type": "BinaryExpression",
                  "left": {
                      "type": "Identifier",
                      "name": "x",
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
                  "right": {
                      "type": "Literal",
                      "value": 42,
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
                      "raw": "42"
                  },
                  "operator": "<",
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
              "update": {
                  "type": "UpdateExpression",
                  "argument": {
                      "type": "Identifier",
                      "name": "x",
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
                  "operator": "++",
                  "prefix": false,
                  "start": 19,
                  "end": 22,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 19
                      },
                      "end": {
                          "line": 1,
                          "column": 22
                      }
                  }
              },
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
              }
          }],
          "sourceType": "script",
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
          }
      });
  
      pass('should parse "start: for (;;) break start"', `start: for (;;) break start`, {
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
          "body": [{
              "type": "LabeledStatement",
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
              "body": {
                  "type": "ForStatement",
                  "start": 7,
                  "end": 27,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 7
                      },
                      "end": {
                          "line": 1,
                          "column": 27
                      }
                  },
                  "init": null,
                  "test": null,
                  "update": null,
                  "body": {
                      "type": "BreakStatement",
                      "start": 16,
                      "end": 27,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 16
                          },
                          "end": {
                              "line": 1,
                              "column": 27
                          }
                      },
                      "label": {
                          "type": "Identifier",
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
                          "name": "start"
                      }
                  }
              },
              "label": {
                  "type": "Identifier",
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
                  },
                  "name": "start"
              }
          }],
          "sourceType": "script"
      });
  
      pass('should parse "for(let x = 0;;);"', `for(let x = 0;;);`, {
          "type": "Program",
          "body": [{
              "type": "ForStatement",
              "body": {
                  "type": "EmptyStatement",
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
              "init": {
                  "type": "VariableDeclaration",
                  "declarations": [{
                      "type": "VariableDeclarator",
                      "init": {
                          "type": "Literal",
                          "value": 0,
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
                          "raw": "0"
                      },
                      "id": {
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
                      }
                  }],
                  "kind": "let",
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
              "test": null,
              "update": null,
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
          }],
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
  
      pass('should parse "for(let x = 0, y = 1;;);"', `for(let x = 0, y = 1;;);`, {
          "type": "Program",
          "body": [{
              "type": "ForStatement",
              "body": {
                  "type": "EmptyStatement",
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
                  }
              },
              "init": {
                  "type": "VariableDeclaration",
                  "declarations": [{
                          "type": "VariableDeclarator",
                          "init": {
                              "type": "Literal",
                              "value": 0,
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
                              "raw": "0"
                          },
                          "id": {
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
                          }
                      },
                      {
                          "type": "VariableDeclarator",
                          "init": {
                              "type": "Literal",
                              "value": 1,
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
                              "raw": "1"
                          },
                          "id": {
                              "type": "Identifier",
                              "name": "y",
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
                  "kind": "let",
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
              },
              "test": null,
              "update": null,
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
              }
          }],
          "sourceType": "script",
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
          }
      });
  
      pass('should parse "for(const x = 0;;);"', `for(const x = 0;;);`, {
          "type": "Program",
          "body": [{
              "type": "ForStatement",
              "body": {
                  "type": "EmptyStatement",
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
              "init": {
                  "type": "VariableDeclaration",
                  "declarations": [{
                      "type": "VariableDeclarator",
                      "init": {
                          "type": "Literal",
                          "value": 0,
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
                          "raw": "0"
                      },
                      "id": {
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
                  }],
                  "kind": "const",
                  "start": 4,
                  "end": 15,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 4
                      },
                      "end": {
                          "line": 1,
                          "column": 15
                      }
                  }
              },
              "test": null,
              "update": null,
              "start": 0,
              "end": 19,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 19
                  }
              }
          }],
          "sourceType": "script",
          "start": 0,
          "end": 19,
          "loc": {
              "start": {
                  "line": 1,
                  "column": 0
              },
              "end": {
                  "line": 1,
                  "column": 19
              }
          }
      });
  
      pass('should parse "for(x, y;;);"', `for(x, y;;);`, {
          "type": "Program",
          "body": [{
              "type": "ForStatement",
              "body": {
                  "type": "EmptyStatement",
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
              "init": {
                  "type": "SequenceExpression",
                  "expressions": [{
                          "type": "Identifier",
                          "name": "x",
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
                          "type": "Identifier",
                          "name": "y",
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
                      }
                  ],
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
                  }
              },
              "test": null,
              "update": null,
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
          }],
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
  
      pass('should parse object binding with null', `for (let {} = null; ; ) {}`, {
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
          "body": [{
              "type": "ForStatement",
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
              "init": {
                  "type": "VariableDeclaration",
                  "start": 5,
                  "end": 18,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 5
                      },
                      "end": {
                          "line": 1,
                          "column": 18
                      }
                  },
                  "declarations": [{
                      "type": "VariableDeclarator",
                      "start": 9,
                      "end": 18,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 9
                          },
                          "end": {
                              "line": 1,
                              "column": 18
                          }
                      },
                      "id": {
                          "type": "ObjectPattern",
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
                          },
                          "properties": []
                      },
                      "init": {
                          "type": "Literal",
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
                          },
                          "value": null,
                          "raw": "null"
                      }
                  }],
                  "kind": "let"
              },
              "test": null,
              "update": null,
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
          }],
          "sourceType": "script"
      });
  });
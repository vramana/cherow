import { pass, fail } from '../utils';

describe('Expressions - Async function', () => {

    fail(`async function wrap() { async function await() { } };`, {
        source: 'async function wrap() { async function await() { } };',
    });

    fail(`async function foo(await) { };`, {
        source: 'async function foo(await) { };',
    });

    fail(`(async function foo(await) { });`, {
        source: '(async function foo(await) { });',
    });

    fail(`async function* foo() { }`, {
        source: `async function* foo() { }`, module: true,
    });

    fail(`async function foo(await) { }`, {
        source: 'async function foo(await) { }',
    });

    fail(`"(async\nfunction foo() { })`, {
        source: '"(async\nfunction foo() { })',
    });

    fail(`(async function foo(await) { })`, {
        source: '(async function foo(await) { })',
    });

    fail(`(async function foo() { return {await} })`, {
        source: '(async function foo() { return {await} })',
    });

    fail(`(async function foo(a = await b) {})`, {
        source: '(async function foo(a = await b) {})',
    });
 
        pass(`async function foo(a = async () => await b) {}`, {
            source: 'async function foo(a = async () => await b) {}',
            ranges: true,
            raw: true,
            loc: true,
            expected: {
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
            }
        });

        pass(`async function foo(a = {async bar() { await b }}) {}`, {
            source: 'async function foo(a = {async bar() { await b }}) {}',
            ranges: true,
            loc: true,
            raw: true,
            expected: {
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
            }
        });
         
        pass(`async function foo(a = class {async bar() { await b }}) {}`, {
            source: 'async function foo(a = class {async bar() { await b }}) {}',
            loc: true,
            ranges: true,
            raw: true,
            expected:{
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
            }
        });
        
        pass(`async function foo(a, b) { await a }`, {
            source: 'async function foo(a, b) { await a }',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
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
            }
        });
        
        pass(`async function await() { }`, {
            source: 'async function await() { }',
            loc: true,
            ranges: true,
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
            }
        });
        
        pass(`a = async function f() {}`, {
            source: 'a = async function f() {}',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
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
          }
        });
         
        pass(`a = async function() {}`, {
            source: 'a = async function() {}',
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
          }
        });
});
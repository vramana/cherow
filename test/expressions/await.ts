import { pass, fail } from '../utils';

describe('Expressions - Await', () => {

    fail(`await a`, {
        source: 'await a',
    });

    fail(`async () => await`, {
        source: 'async () => await',
    });

    fail(`async function foo() { await }`, {
        source: 'async function foo() { await }',
    });

    fail(`({async foo() { await }})`, {
        source: `({async foo() { await }})`, module: true,
    });

    fail(`async await => 1;`, {
        source: 'async await => 1;',
    });

    fail(`async (await) => 1;`, {
        source: 'async (await) => 1;',
    });

    fail(`async function f() { await }`, {
        source: 'async function f() { await }',
    });

    fail(`async f() { x = { async await(){} } }`, {
        source: 'async f() { x = { async await(){} } }',
    });

    fail(`async(e=await)=>l`, {
        source: 'async(e=await)=>l',
    });
 
        pass(`function* foo(await) { yield await; };`, {
            source: 'function* foo(await) { yield await; };',
            ranges: true,
            raw: true,
            loc: true,
            expected: {
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
            }
        });

        pass(`function foo(await) { return await; }`, {
            source: 'function foo(await) { return await; }',
            ranges: true,
            loc: true,
            raw: true,
            expected: {
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
            }
        });
         
        pass(`async function foo(a = async () => await b) {};`, {
            source: 'async function foo(a = async () => await b) {};',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
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
          }
        });

        pass(`await = 0;`, {
            source: 'await = 0;',
            loc: true,
            ranges: true,
            module: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "AssignmentExpression",
                            "left": {
                                "type": "Identifier",
                                "name": "await",
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
                            }
                        },
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
                        }
                    }
                ],
                "sourceType": "module",
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
                }
            }
        });
        
        pass(`a = async(await);`, {
            source: 'a = async(await);',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
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
          }
        });
});
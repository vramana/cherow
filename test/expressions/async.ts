import { pass, fail } from '../utils';

describe('Expressions - Async', () => {

    fail(`({async *a(eval){}})`, {
        source: '({async *a(eval){}})',
    });

    fail(`var obj = { async *method([...x = []]) {} };`, {
        source: 'var obj = { async *method([...x = []]) {} };',
    });

    fail(`var obj = { async *method([...{ x } = []] = []) {} };`, {
        source: 'var obj = { async *method([...{ x } = []] = []) {} };',
    });

    fail(`({ async foo (x = await) {  } })`, {
        source: `({ async foo (x = await) {  } })`, module: true,
    });

    fail(`({async async});`, {
        source: '({async async});',
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
 
        pass(`class UserRepo{ async get(id) { return id; } }`, {
            source: 'class UserRepo{ async get(id) { return id; } }',
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
                    "type": "ClassDeclaration",
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
                      "start": 6,
                      "end": 14,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 6
                        },
                        "end": {
                          "line": 1,
                          "column": 14
                        }
                      },
                      "name": "UserRepo"
                    },
                    "superClass": null,
                    "body": {
                      "type": "ClassBody",
                      "start": 14,
                      "end": 46,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 14
                        },
                        "end": {
                          "line": 1,
                          "column": 46
                        }
                      },
                      "body": [
                        {
                          "type": "MethodDefinition",
                          "start": 16,
                          "end": 44,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 16
                            },
                            "end": {
                              "line": 1,
                              "column": 44
                            }
                          },
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 22,
                            "end": 25,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 22
                              },
                              "end": {
                                "line": 1,
                                "column": 25
                              }
                            },
                            "name": "get"
                          },
                          "static": false,
                          "kind": "method",
                          "value": {
                            "type": "FunctionExpression",
                            "start": 25,
                            "end": 44,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 25
                              },
                              "end": {
                                "line": 1,
                                "column": 44
                              }
                            },
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": true,
                            "params": [
                              {
                                "type": "Identifier",
                                "start": 26,
                                "end": 28,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 26
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 28
                                  }
                                },
                                "name": "id"
                              }
                            ],
                            "body": {
                              "type": "BlockStatement",
                              "start": 30,
                              "end": 44,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 30
                                },
                                "end": {
                                  "line": 1,
                                  "column": 44
                                }
                              },
                              "body": [
                                {
                                  "type": "ReturnStatement",
                                  "start": 32,
                                  "end": 42,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 32
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 42
                                    }
                                  },
                                  "argument": {
                                    "type": "Identifier",
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
                                    "name": "id"
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
                "sourceType": "script"
              }
        });

        pass(`class UserRepo{ async notget(id) { return id; } }`, {
            source: 'class UserRepo{ async notget(id) { return id; } }',
            ranges: true,
            loc: true,
            raw: true,
            expected: {
                "type": "Program",
                "start": 0,
                "end": 49,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 49
                  }
                },
                "body": [
                  {
                    "type": "ClassDeclaration",
                    "start": 0,
                    "end": 49,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 49
                      }
                    },
                    "id": {
                      "type": "Identifier",
                      "start": 6,
                      "end": 14,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 6
                        },
                        "end": {
                          "line": 1,
                          "column": 14
                        }
                      },
                      "name": "UserRepo"
                    },
                    "superClass": null,
                    "body": {
                      "type": "ClassBody",
                      "start": 14,
                      "end": 49,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 14
                        },
                        "end": {
                          "line": 1,
                          "column": 49
                        }
                      },
                      "body": [
                        {
                          "type": "MethodDefinition",
                          "start": 16,
                          "end": 47,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 16
                            },
                            "end": {
                              "line": 1,
                              "column": 47
                            }
                          },
                          "computed": false,
                          "key": {
                            "type": "Identifier",
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
                            },
                            "name": "notget"
                          },
                          "static": false,
                          "kind": "method",
                          "value": {
                            "type": "FunctionExpression",
                            "start": 28,
                            "end": 47,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 28
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
                            "params": [
                              {
                                "type": "Identifier",
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
                                "name": "id"
                              }
                            ],
                            "body": {
                              "type": "BlockStatement",
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
                              "body": [
                                {
                                  "type": "ReturnStatement",
                                  "start": 35,
                                  "end": 45,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 35
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 45
                                    }
                                  },
                                  "argument": {
                                    "type": "Identifier",
                                    "start": 42,
                                    "end": 44,
                                    "loc": {
                                      "start": {
                                        "line": 1,
                                        "column": 42
                                      },
                                      "end": {
                                        "line": 1,
                                        "column": 44
                                      }
                                    },
                                    "name": "id"
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
                "sourceType": "script"
              }
        });
         
        pass(`({async: async, foo: foo})`, {
            source: '({async: async, foo: foo})',
            loc: true,
            ranges: true,
            raw: true,
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
                      "type": "ObjectExpression",
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
                      "properties": [
                        {
                          "type": "Property",
                          "start": 2,
                          "end": 14,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 2
                            },
                            "end": {
                              "line": 1,
                              "column": 14
                            }
                          },
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 2,
                            "end": 7,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 2
                              },
                              "end": {
                                "line": 1,
                                "column": 7
                              }
                            },
                            "name": "async"
                          },
                          "value": {
                            "type": "Identifier",
                            "start": 9,
                            "end": 14,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 9
                              },
                              "end": {
                                "line": 1,
                                "column": 14
                              }
                            },
                            "name": "async"
                          },
                          "kind": "init"
                        },
                        {
                          "type": "Property",
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
                            "name": "foo"
                          },
                          "value": {
                            "type": "Identifier",
                            "start": 21,
                            "end": 24,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 21
                              },
                              "end": {
                                "line": 1,
                                "column": 24
                              }
                            },
                            "name": "foo"
                          },
                          "kind": "init"
                        }
                      ]
                    }
                  }
                ],
                "sourceType": "script"
              }
        });
        
        pass(`({async, foo})`, {
            source: '({async, foo})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
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
                                        "name": "async",
                                        "start": 2,
                                        "end": 7,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 2
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 7
                                            }
                                        }
                                    },
                                    "value": {
                                        "type": "Identifier",
                                        "name": "async",
                                        "start": 2,
                                        "end": 7,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 2
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 7
                                            }
                                        }
                                    },
                                    "kind": "init",
                                    "computed": false,
                                    "method": false,
                                    "shorthand": true,
                                    "start": 2,
                                    "end": 7,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 2
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 7
                                        }
                                    }
                                },
                                {
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "foo",
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
                                        }
                                    },
                                    "value": {
                                        "type": "Identifier",
                                        "name": "foo",
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
                                        }
                                    },
                                    "kind": "init",
                                    "computed": false,
                                    "method": false,
                                    "shorthand": true,
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
                                    }
                                }
                            ],
                            "start": 1,
                            "end": 13,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 1
                                },
                                "end": {
                                    "line": 1,
                                    "column": 13
                                }
                            }
                        },
                        "start": 0,
                        "end": 14,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 14
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 14,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 14
                    }
                }
            }
        });
});
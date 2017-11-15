import { n, pass, fail } from '../utils/test-utils';

describe('Destructuring - Object binding', () => {

        fail('({e: a.b}) => 0', '({e: a.b}) => 0');
        fail('function a({e: a.b}) {}', 'function a({e: a.b}) {}');
        fail('function* a({e: a.b}) {}', 'function* a({e: a.b}) {}');
        fail('(function ({e: a.b}) {})', '(function ({e: a.b}) {})');
        fail('(function* ({e: a.b}) {})', '(function* ({e: a.b}) {})');
        fail('({a({e: a.b}){}})', '({a({e: a.b}){}})');
        fail('({*a({e: a.b}){}})', '({*a({e: a.b}){}})');
        fail('({set a({e: a.b}){}})', '({set a({e: a.b}){}})');
        fail('(function*({yield}){}})', '(function*({yield}){}})');
        fail('try {} catch ({e: x.a}) {}', 'try {} catch ({e: x.a}) {}');
        fail('"use strict"; ({yield} = 0);', '"use strict"; ({yield} = 0);');
        fail('"use strict"; ({yield = 0} = 0);', '"use strict"; ({yield = 0} = 0);');
        fail('"use strict"; ({a: yield = 0} = 0);', '"use strict"; ({a: yield = 0} = 0);;');

        pass('({a:yield} = 0);', '({a:yield} = 0);', {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "left": {
                            "type": "ObjectPattern",
                            "properties": [
                                {
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "a",
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
                                        }
                                    },
                                    "value": {
                                        "type": "Identifier",
                                        "name": "yield",
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
                                    "kind": "init",
                                    "computed": false,
                                    "method": false,
                                    "shorthand": false,
                                    "start": 2,
                                    "end": 9,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 2
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 9
                                        }
                                    }
                                }
                            ],
                            "start": 1,
                            "end": 10,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 1
                                },
                                "end": {
                                    "line": 1,
                                    "column": 10
                                }
                            }
                        },
                        "operator": "=",
                        "right": {
                            "type": "Literal",
                            "value": 0,
                            "start": 13,
                            "end": 14,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 13
                                },
                                "end": {
                                    "line": 1,
                                    "column": 14
                                }
                            },
                            "raw": "0"
                        },
                        "start": 1,
                        "end": 14,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 1
                            },
                            "end": {
                                "line": 1,
                                "column": 14
                            }
                        }
                    },
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
                    }
                }
            ],
            "sourceType": "script",
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
            }
        });
        
        pass('({yield} = 0);', '({yield} = 0);', {
            "type": "Program",
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
            },
            "body": [
              {
                "type": "ExpressionStatement",
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
                },
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 1,
                  "end": 12,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 12
                    }
                  },
                  "operator": "=",
                  "left": {
                    "type": "ObjectPattern",
                    "start": 1,
                    "end": 8,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 1
                      },
                      "end": {
                        "line": 1,
                        "column": 8
                      }
                    },
                    "properties": [
                      {
                        "type": "Property",
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
                        "method": false,
                        "shorthand": true,
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
                          "name": "yield"
                        },
                        "kind": "init",
                        "value": {
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
                          "name": "yield"
                        }
                      }
                    ]
                  },
                  "right": {
                    "type": "Literal",
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
                    "value": 0,
                    "raw": "0"
                  }
                }
              }
            ],
            "sourceType": "script"
          });

        pass('var {a} = 0;', 'var {a} = 0;', {
            "type": "Program",
            "body": [
                {
                    "type": "VariableDeclaration",
                    "declarations": [
                        {
                            "type": "VariableDeclarator",
                            "init": {
                                "type": "Literal",
                                "value": 0,
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
                                "raw": "0"
                            },
                            "id": {
                                "type": "ObjectPattern",
                                "properties": [
                                    {
                                        "type": "Property",
                                        "kind": "init",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "a",
                                            "start": 5,
                                            "end": 6,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 5
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 6
                                                }
                                            }
                                        },
                                        "computed": false,
                                        "value": {
                                            "type": "Identifier",
                                            "name": "a",
                                            "start": 5,
                                            "end": 6,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 5
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 6
                                                }
                                            }
                                        },
                                        "method": false,
                                        "shorthand": true,
                                        "start": 5,
                                        "end": 6,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 5
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 6
                                            }
                                        }
                                    }
                                ],
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
                                }
                            },
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
                            }
                        }
                    ],
                    "kind": "var",
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
                }
            ],
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
        pass('var [{a = 0}] = 0;', 'var [{a = 0}] = 0;', {
            "type": "Program",
            "body": [
                {
                    "type": "VariableDeclaration",
                    "declarations": [
                        {
                            "type": "VariableDeclarator",
                            "init": {
                                "type": "Literal",
                                "value": 0,
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
                                "raw": "0"
                            },
                            "id": {
                                "type": "ArrayPattern",
                                "elements": [
                                    {
                                        "type": "ObjectPattern",
                                        "properties": [
                                            {
                                                "type": "Property",
                                                "kind": "init",
                                                "key": {
                                                    "type": "Identifier",
                                                    "name": "a",
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
                                                "computed": false,
                                                "value": {
                                                    "type": "AssignmentPattern",
                                                    "left": {
                                                        "type": "Identifier",
                                                        "name": "a",
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
                                                    "right": {
                                                        "type": "Literal",
                                                        "value": 0,
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
                                                        "raw": "0"
                                                    },
                                                    "start": 6,
                                                    "end": 11,
                                                    "loc": {
                                                        "start": {
                                                            "line": 1,
                                                            "column": 6
                                                        },
                                                        "end": {
                                                            "line": 1,
                                                            "column": 11
                                                        }
                                                    }
                                                },
                                                "method": false,
                                                "shorthand": true,
                                                "start": 6,
                                                "end": 11,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 6
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 11
                                                    }
                                                }
                                            }
                                        ],
                                        "start": 5,
                                        "end": 12,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 5
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 12
                                            }
                                        }
                                    }
                                ],
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
                            "start": 4,
                            "end": 17,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 4
                                },
                                "end": {
                                    "line": 1,
                                    "column": 17
                                }
                            }
                        }
                    ],
                    "kind": "var",
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
                    }
                }
            ],
            "sourceType": "script",
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
            }
        });
        
        pass('var [{__proto__:a, __proto__:b}] = 0;', 'var [{__proto__:a, __proto__:b}] = 0;', {
            "type": "Program",
            "body": [
                {
                    "type": "VariableDeclaration",
                    "declarations": [
                        {
                            "type": "VariableDeclarator",
                            "init": {
                                "type": "Literal",
                                "value": 0,
                                "start": 35,
                                "end": 36,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 35
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 36
                                    }
                                },
                                "raw": "0"
                            },
                            "id": {
                                "type": "ArrayPattern",
                                "elements": [
                                    {
                                        "type": "ObjectPattern",
                                        "properties": [
                                            {
                                                "type": "Property",
                                                "kind": "init",
                                                "key": {
                                                    "type": "Identifier",
                                                    "name": "__proto__",
                                                    "start": 6,
                                                    "end": 15,
                                                    "loc": {
                                                        "start": {
                                                            "line": 1,
                                                            "column": 6
                                                        },
                                                        "end": {
                                                            "line": 1,
                                                            "column": 15
                                                        }
                                                    }
                                                },
                                                "computed": false,
                                                "value": {
                                                    "type": "Identifier",
                                                    "name": "a",
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
                                                "method": false,
                                                "shorthand": false,
                                                "start": 6,
                                                "end": 17,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 6
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 17
                                                    }
                                                }
                                            },
                                            {
                                                "type": "Property",
                                                "kind": "init",
                                                "key": {
                                                    "type": "Identifier",
                                                    "name": "__proto__",
                                                    "start": 19,
                                                    "end": 28,
                                                    "loc": {
                                                        "start": {
                                                            "line": 1,
                                                            "column": 19
                                                        },
                                                        "end": {
                                                            "line": 1,
                                                            "column": 28
                                                        }
                                                    }
                                                },
                                                "computed": false,
                                                "value": {
                                                    "type": "Identifier",
                                                    "name": "b",
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
                                                "method": false,
                                                "shorthand": false,
                                                "start": 19,
                                                "end": 30,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 19
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 30
                                                    }
                                                }
                                            }
                                        ],
                                        "start": 5,
                                        "end": 31,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 5
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 31
                                            }
                                        }
                                    }
                                ],
                                "start": 4,
                                "end": 32,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 4
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 32
                                    }
                                }
                            },
                            "start": 4,
                            "end": 36,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 4
                                },
                                "end": {
                                    "line": 1,
                                    "column": 36
                                }
                            }
                        }
                    ],
                    "kind": "var",
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
                    }
                }
            ],
            "sourceType": "script",
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
            }
        });
        
        pass('var a, {x: {y: a}} = 0;', 'var a, {x: {y: a}} = 0;', {
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
            "body": [
              {
                "type": "VariableDeclaration",
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
                "declarations": [
                  {
                    "type": "VariableDeclarator",
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
                    "id": {
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
                    "init": null
                  },
                  {
                    "type": "VariableDeclarator",
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
                      "type": "ObjectPattern",
                      "start": 7,
                      "end": 18,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 7
                        },
                        "end": {
                          "line": 1,
                          "column": 18
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 8,
                          "end": 17,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 8
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
                          "value": {
                            "type": "ObjectPattern",
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
                            "properties": [
                              {
                                "type": "Property",
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
                                },
                                "method": false,
                                "shorthand": false,
                                "computed": false,
                                "key": {
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
                                  "name": "y"
                                },
                                "value": {
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
                                  "name": "a"
                                },
                                "kind": "init"
                              }
                            ]
                          },
                          "kind": "init"
                        }
                      ]
                    },
                    "init": {
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
                    }
                  }
                ],
                "kind": "var"
              }
            ],
            "sourceType": "script"
          });

        pass('(a, b, [c]) => 0', '(a, b, [c]) => 0', {
            "type": "Program",
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
            "body": [
              {
                "type": "ExpressionStatement",
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
                "expression": {
                  "type": "ArrowFunctionExpression",
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
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
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
                      "name": "a"
                    },
                    {
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
                      "name": "b"
                    },
                    {
                      "type": "ArrayPattern",
                      "start": 7,
                      "end": 10,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 7
                        },
                        "end": {
                          "line": 1,
                          "column": 10
                        }
                      },
                      "elements": [
                        {
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
                          "name": "c"
                        }
                      ]
                    }
                  ],
                  "body": {
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
                }
              }
            ],
            "sourceType": "script"
          });
        
        pass('try {} catch ({e}) {}', 'try {} catch ({e}) {}', {
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
                "type": "TryStatement",
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
                "block": {
                  "type": "BlockStatement",
                  "start": 4,
                  "end": 6,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 4
                    },
                    "end": {
                      "line": 1,
                      "column": 6
                    }
                  },
                  "body": []
                },
                "handler": {
                  "type": "CatchClause",
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
                  "param": {
                    "type": "ObjectPattern",
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
                    "properties": [
                      {
                        "type": "Property",
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
                        "method": false,
                        "shorthand": true,
                        "computed": false,
                        "key": {
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
                          "name": "e"
                        },
                        "kind": "init",
                        "value": {
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
                          "name": "e"
                        }
                      }
                    ]
                  },
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
                "finalizer": null
              }
            ],
            "sourceType": "script"
          });

        pass('try {} catch ({e = 0}) {}', 'try {} catch ({e = 0}) {}', {
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
            "body": [
              {
                "type": "TryStatement",
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
                "block": {
                  "type": "BlockStatement",
                  "start": 4,
                  "end": 6,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 4
                    },
                    "end": {
                      "line": 1,
                      "column": 6
                    }
                  },
                  "body": []
                },
                "handler": {
                  "type": "CatchClause",
                  "start": 7,
                  "end": 25,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 7
                    },
                    "end": {
                      "line": 1,
                      "column": 25
                    }
                  },
                  "param": {
                    "type": "ObjectPattern",
                    "start": 14,
                    "end": 21,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 14
                      },
                      "end": {
                        "line": 1,
                        "column": 21
                      }
                    },
                    "properties": [
                      {
                        "type": "Property",
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
                        "method": false,
                        "shorthand": true,
                        "computed": false,
                        "key": {
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
                          "name": "e"
                        },
                        "kind": "init",
                        "value": {
                          "type": "AssignmentPattern",
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
                          "left": {
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
                            "name": "e"
                          },
                          "right": {
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
                            "value": 0,
                            "raw": "0"
                          }
                        }
                      }
                    ]
                  },
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
                "finalizer": null
              }
            ],
            "sourceType": "script"
          });
});
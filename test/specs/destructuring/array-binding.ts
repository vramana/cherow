import { n, pass, fail } from '../utils/test-utils';

describe('Destructuring - Array binding', () => {

        fail('[...x, ...y] = 0', '[...x, ...y] = 0');
        fail('[...x, y] = 0', '[...x, y] = 0');
        fail('[...x,,] = 0', '[...x,,] = 0');
        fail('[0,{a=0}] = 0', '[0,{a=0}] = 0');
        fail('[{a=0},{b=0},0] = 0', '[{a=0},{b=0},0] = 0');
        // fail('[{a=0},...0]', '[{a=0},...0]');
        fail('[...0,a]=0', '[...0,a]=0');
        fail('[...0,{a=0}]=0', '[...0,{a=0}]=0');
        fail('[...0,...{a=0}]=0', '[...0,...{a=0}]=0');
        // fail('[...{a=0},]', '[...{a=0},]');
        fail('[...{a=0},]=0', '[...{a=0},]=0'); 
        fail('function a([a.b]) {}', 'function a([a.b]) {}'); 
        fail('function* a([a.b]) {}', 'function* a([a.b]) {}'); 
        fail('(function ([a.b]) {})', '(function ([a.b]) {})'); 
        fail('(function* ([a.b]) {})', '(function* ([a.b]) {})'); 
        fail('({a([a.b]){}})', '({a([a.b]){}})'); 
        fail('({*a([a.b]){}})', '({*a([a.b]){}})'); 
        fail('({set a([a.b]){}})', '({set a([a.b]){}})'); 
        fail('[x, ...y,] = 0', '[x, ...y,] = 0'); 

        pass('var [,a] = 0;', 'var [,a] = 0;', {
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
            "body": [
              {
                "type": "VariableDeclaration",
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
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 12,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 4
                      },
                      "end": {
                        "line": 1,
                        "column": 12
                      }
                    },
                    "id": {
                      "type": "ArrayPattern",
                      "start": 4,
                      "end": 8,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 4
                        },
                        "end": {
                          "line": 1,
                          "column": 8
                        }
                      },
                      "elements": [
                        null,
                        {
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
                        }
                      ]
                    },
                    "init": {
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
                ],
                "kind": "var"
              }
            ],
            "sourceType": "script"
          });

        pass('var a, [a] = 0;', 'var a, [a] = 0;', {
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
                "type": "VariableDeclaration",
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
                    "end": 14,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 7
                      },
                      "end": {
                        "line": 1,
                        "column": 14
                      }
                    },
                    "id": {
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
                          "name": "a"
                        }
                      ]
                    },
                    "init": {
                      "type": "Literal",
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

          pass('var [a, ...a] = 0;', 'var [a, ...a] = 0;', {
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
                "type": "VariableDeclaration",
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
                "declarations": [
                  {
                    "type": "VariableDeclarator",
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
                    },
                    "id": {
                      "type": "ArrayPattern",
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
                      "elements": [
                        {
                          "type": "Identifier",
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
                          },
                          "name": "a"
                        },
                        {
                          "type": "RestElement",
                          "start": 8,
                          "end": 12,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 8
                            },
                            "end": {
                              "line": 1,
                              "column": 12
                            }
                          },
                          "argument": {
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
                            "name": "a"
                          }
                        }
                      ]
                    },
                    "init": {
                      "type": "Literal",
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
          
        pass('[...[x]] = 0', '[...[x]] = 0', {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "left": {
                            "type": "ArrayPattern",
                            "elements": [
                                {
                                    "type": "RestElement",
                                    "argument": {
                                        "type": "ArrayPattern",
                                        "elements": [
                                            {
                                                "type": "Identifier",
                                                "name": "x",
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
                                    "start": 1,
                                    "end": 7,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 1
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 7
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
                        "operator": "=",
                        "right": {
                            "type": "Literal",
                            "value": 0,
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
                            "raw": "0"
                        },
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
                    },
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
        
        pass('[x.a=a] = b', '[x.a=a] = b', {
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
            "body": [
              {
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
                  "type": "AssignmentExpression",
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
                  "operator": "=",
                  "left": {
                    "type": "ArrayPattern",
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
                    "elements": [
                      {
                        "type": "AssignmentPattern",
                        "start": 1,
                        "end": 6,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 1
                          },
                          "end": {
                            "line": 1,
                            "column": 6
                          }
                        },
                        "left": {
                          "type": "MemberExpression",
                          "start": 1,
                          "end": 4,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 1
                            },
                            "end": {
                              "line": 1,
                              "column": 4
                            }
                          },
                          "object": {
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
                            "name": "x"
                          },
                          "property": {
                            "type": "Identifier",
                            "start": 3,
                            "end": 4,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 3
                              },
                              "end": {
                                "line": 1,
                                "column": 4
                              }
                            },
                            "name": "a"
                          },
                          "computed": false
                        },
                        "right": {
                          "type": "Identifier",
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
                          },
                          "name": "a"
                        }
                      }
                    ]
                  },
                  "right": {
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
                    "name": "b"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
        
        pass('[x[a]=a] = b', '[x[a]=a] = b', {
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
                  "type": "AssignmentExpression",
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
                  "operator": "=",
                  "left": {
                    "type": "ArrayPattern",
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
                    "elements": [
                      {
                        "type": "AssignmentPattern",
                        "start": 1,
                        "end": 7,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 1
                          },
                          "end": {
                            "line": 1,
                            "column": 7
                          }
                        },
                        "left": {
                          "type": "MemberExpression",
                          "start": 1,
                          "end": 5,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 1
                            },
                            "end": {
                              "line": 1,
                              "column": 5
                            }
                          },
                          "object": {
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
                            "name": "x"
                          },
                          "property": {
                            "type": "Identifier",
                            "start": 3,
                            "end": 4,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 3
                              },
                              "end": {
                                "line": 1,
                                "column": 4
                              }
                            },
                            "name": "a"
                          },
                          "computed": true
                        },
                        "right": {
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
                        }
                      }
                    ]
                  },
                  "right": {
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
                    "name": "b"
                  }
                }
              }
            ],
            "sourceType": "script"
          });

        pass('[{a=0},{a=0}] = 0', '[{a=0},{a=0}] = 0', {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "left": {
                            "type": "ArrayPattern",
                            "elements": [
                                {
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
                                                "type": "AssignmentPattern",
                                                "left": {
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
                                                "right": {
                                                    "type": "Literal",
                                                    "value": 0,
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
                                                    "raw": "0"
                                                },
                                                "start": 2,
                                                "end": 5,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 2
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 5
                                                    }
                                                }
                                            },
                                            "kind": "init",
                                            "computed": false,
                                            "method": false,
                                            "shorthand": true,
                                            "start": 2,
                                            "end": 5,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 2
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 5
                                                }
                                            }
                                        }
                                    ],
                                    "start": 1,
                                    "end": 6,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 1
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 6
                                        }
                                    }
                                },
                                {
                                    "type": "ObjectPattern",
                                    "properties": [
                                        {
                                            "type": "Property",
                                            "key": {
                                                "type": "Identifier",
                                                "name": "a",
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
                                            "value": {
                                                "type": "AssignmentPattern",
                                                "left": {
                                                    "type": "Identifier",
                                                    "name": "a",
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
                                                }
                                            },
                                            "kind": "init",
                                            "computed": false,
                                            "method": false,
                                            "shorthand": true,
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
                                            }
                                        }
                                    ],
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
                                    }
                                }
                            ],
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
                            }
                        },
                        "operator": "=",
                        "right": {
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
                    },
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
                }
            ],
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

        pass('[x, ...{0: y}] = 0', '[x, ...{0: y}] = 0', {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "left": {
                            "type": "ArrayPattern",
                            "elements": [
                                {
                                    "type": "Identifier",
                                    "name": "x",
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
                                    }
                                },
                                {
                                    "type": "RestElement",
                                    "argument": {
                                        "type": "ObjectPattern",
                                        "properties": [
                                            {
                                                "type": "Property",
                                                "key": {
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
                                                "value": {
                                                    "type": "Identifier",
                                                    "name": "y",
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
                                                "kind": "init",
                                                "computed": false,
                                                "method": false,
                                                "shorthand": false,
                                                "start": 8,
                                                "end": 12,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 8
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 12
                                                    }
                                                }
                                            }
                                        ],
                                        "start": 7,
                                        "end": 13,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 7
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 13
                                            }
                                        }
                                    },
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
                                }
                            ],
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
                        },
                        "operator": "=",
                        "right": {
                            "type": "Literal",
                            "value": 0,
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
                            "raw": "0"
                        },
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
                    },
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

    });
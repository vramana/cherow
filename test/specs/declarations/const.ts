import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Declarations - Const', () => {

    it('should fail if rest element (array binding pattern) are followed by any element', () => {
        expect(() => {
            parseScript('const [...[x], y] = [1, 2, 3];');
        }).to.throw();
    });

    it('should fail if rest element (nested object pattern) has initializer', () => {
        expect(() => {
            parseScript('const [...{ x } = []] = [];');
        }).to.throw();
    });

    it('should fail if rest element (identifier) has initializer', () => {
        expect(() => {
            parseScript('const [...x = []] = [];');
        }).to.throw();
    });

    it('should fail if rest element (nested array pattern) has initializer', () => {
        expect(() => {
            parseScript('const [...[ x ] = []] = [];');
        }).to.throw();
    });

    it('should fail if const declarations are mixed: with / without initialiser', () => {
        expect(() => {
            parseScript('const x = 1, y;');
        }).to.throw();
    });

    it('should fail if const declarations are mixed: with / without initialiser', () => {
        expect(() => {
            parseScript('const x, y = 1;');
        }).to.throw();
    });
    it('should fail on const declarations without initialiser', () => {
        expect(() => {
            parseScript('const x;');
        }).to.throw();
    });
    it('should fail on const declarations with initialisers in statement positions', () => {
        expect(() => {
            parseScript('do const x = 1; while (false)');
        }).to.throw();
    });
    it('should fail on const declarations with initialisers in statement positions', () => {
        expect(() => {
            parseScript('if (true) const x = 1;');
        }).to.throw();
    });
    it('should fail on reserved words with initializer', () => {
        expect(() => {
            parseScript('const default = 123;');
        }).to.throw();
    });

    it('should fail on const declarations with initialisers in statement positions', () => {
      expect(() => {
          parseScript('label: const x = 1;');
      }).to.throw();
    });

    it('should fail on redeclaration error within strict mode function inside non-strict code', () => {
        expect(() => {
            parseScript('(function() { "use strict"; { const f = 1; var f; } })');
        }).to.throw();
    });

    it('should parse complex', () => {
      expect(parseScript(`const
      sequential = ( ...fns ) => ( ...args ) => fns.map( fn => fn( ...args ) ), 
      pchain = ( ...fns ) => fns.map( f => isPromise( f ) ? f : pdefer( f ) ).reduce( ( prev, cur ) => prev.then( cur ) );`, {
          ranges: true,
          raw: true,
          v8: true,
          locations: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 209,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 122
          }
        },
        "body": [
          {
            "type": "VariableDeclaration",
            "start": 0,
            "end": 209,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 3,
                "column": 122
              }
            },
            "declarations": [
              {
                "type": "VariableDeclarator",
                "start": 12,
                "end": 84,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 6
                  },
                  "end": {
                    "line": 2,
                    "column": 78
                  }
                },
                "id": {
                  "type": "Identifier",
                  "start": 12,
                  "end": 22,
                  "loc": {
                    "start": {
                      "line": 2,
                      "column": 6
                    },
                    "end": {
                      "line": 2,
                      "column": 16
                    }
                  },
                  "name": "sequential"
                },
                "init": {
                  "type": "ArrowFunctionExpression",
                  "start": 25,
                  "end": 84,
                  "loc": {
                    "start": {
                      "line": 2,
                      "column": 19
                    },
                    "end": {
                      "line": 2,
                      "column": 78
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "RestElement",
                      "start": 27,
                      "end": 33,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 21
                        },
                        "end": {
                          "line": 2,
                          "column": 27
                        }
                      },
                      "argument": {
                        "type": "Identifier",
                        "start": 30,
                        "end": 33,
                        "loc": {
                          "start": {
                            "line": 2,
                            "column": 24
                          },
                          "end": {
                            "line": 2,
                            "column": 27
                          }
                        },
                        "name": "fns"
                      }
                    }
                  ],
                  "body": {
                    "type": "ArrowFunctionExpression",
                    "start": 39,
                    "end": 84,
                    "loc": {
                      "start": {
                        "line": 2,
                        "column": 33
                      },
                      "end": {
                        "line": 2,
                        "column": 78
                      }
                    },
                    "id": null,
                    "generator": false,
                    "expression": true,
                    "async": false,
                    "params": [
                      {
                        "type": "RestElement",
                        "start": 41,
                        "end": 48,
                        "loc": {
                          "start": {
                            "line": 2,
                            "column": 35
                          },
                          "end": {
                            "line": 2,
                            "column": 42
                          }
                        },
                        "argument": {
                          "type": "Identifier",
                          "start": 44,
                          "end": 48,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 38
                            },
                            "end": {
                              "line": 2,
                              "column": 42
                            }
                          },
                          "name": "args"
                        }
                      }
                    ],
                    "body": {
                      "type": "CallExpression",
                      "start": 54,
                      "end": 84,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 48
                        },
                        "end": {
                          "line": 2,
                          "column": 78
                        }
                      },
                      "callee": {
                        "type": "MemberExpression",
                        "start": 54,
                        "end": 61,
                        "loc": {
                          "start": {
                            "line": 2,
                            "column": 48
                          },
                          "end": {
                            "line": 2,
                            "column": 55
                          }
                        },
                        "object": {
                          "type": "Identifier",
                          "start": 54,
                          "end": 57,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 48
                            },
                            "end": {
                              "line": 2,
                              "column": 51
                            }
                          },
                          "name": "fns"
                        },
                        "property": {
                          "type": "Identifier",
                          "start": 58,
                          "end": 61,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 52
                            },
                            "end": {
                              "line": 2,
                              "column": 55
                            }
                          },
                          "name": "map"
                        },
                        "computed": false
                      },
                      "arguments": [
                        {
                          "type": "ArrowFunctionExpression",
                          "start": 63,
                          "end": 82,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 57
                            },
                            "end": {
                              "line": 2,
                              "column": 76
                            }
                          },
                          "id": null,
                          "generator": false,
                          "expression": true,
                          "async": false,
                          "params": [
                            {
                              "type": "Identifier",
                              "start": 63,
                              "end": 65,
                              "loc": {
                                "start": {
                                  "line": 2,
                                  "column": 57
                                },
                                "end": {
                                  "line": 2,
                                  "column": 59
                                }
                              },
                              "name": "fn"
                            }
                          ],
                          "body": {
                            "type": "CallExpression",
                            "start": 69,
                            "end": 82,
                            "loc": {
                              "start": {
                                "line": 2,
                                "column": 63
                              },
                              "end": {
                                "line": 2,
                                "column": 76
                              }
                            },
                            "callee": {
                              "type": "Identifier",
                              "start": 69,
                              "end": 71,
                              "loc": {
                                "start": {
                                  "line": 2,
                                  "column": 63
                                },
                                "end": {
                                  "line": 2,
                                  "column": 65
                                }
                              },
                              "name": "fn"
                            },
                            "arguments": [
                              {
                                "type": "SpreadElement",
                                "start": 73,
                                "end": 80,
                                "loc": {
                                  "start": {
                                    "line": 2,
                                    "column": 67
                                  },
                                  "end": {
                                    "line": 2,
                                    "column": 74
                                  }
                                },
                                "argument": {
                                  "type": "Identifier",
                                  "start": 76,
                                  "end": 80,
                                  "loc": {
                                    "start": {
                                      "line": 2,
                                      "column": 70
                                    },
                                    "end": {
                                      "line": 2,
                                      "column": 74
                                    }
                                  },
                                  "name": "args"
                                }
                              }
                            ]
                          }
                        }
                      ]
                    }
                  }
                }
              },
              {
                "type": "VariableDeclarator",
                "start": 93,
                "end": 208,
                "loc": {
                  "start": {
                    "line": 3,
                    "column": 6
                  },
                  "end": {
                    "line": 3,
                    "column": 121
                  }
                },
                "id": {
                  "type": "Identifier",
                  "start": 93,
                  "end": 99,
                  "loc": {
                    "start": {
                      "line": 3,
                      "column": 6
                    },
                    "end": {
                      "line": 3,
                      "column": 12
                    }
                  },
                  "name": "pchain"
                },
                "init": {
                  "type": "ArrowFunctionExpression",
                  "start": 102,
                  "end": 208,
                  "loc": {
                    "start": {
                      "line": 3,
                      "column": 15
                    },
                    "end": {
                      "line": 3,
                      "column": 121
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "RestElement",
                      "start": 104,
                      "end": 110,
                      "loc": {
                        "start": {
                          "line": 3,
                          "column": 17
                        },
                        "end": {
                          "line": 3,
                          "column": 23
                        }
                      },
                      "argument": {
                        "type": "Identifier",
                        "start": 107,
                        "end": 110,
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
                        "name": "fns"
                      }
                    }
                  ],
                  "body": {
                    "type": "CallExpression",
                    "start": 116,
                    "end": 208,
                    "loc": {
                      "start": {
                        "line": 3,
                        "column": 29
                      },
                      "end": {
                        "line": 3,
                        "column": 121
                      }
                    },
                    "callee": {
                      "type": "MemberExpression",
                      "start": 116,
                      "end": 171,
                      "loc": {
                        "start": {
                          "line": 3,
                          "column": 29
                        },
                        "end": {
                          "line": 3,
                          "column": 84
                        }
                      },
                      "object": {
                        "type": "CallExpression",
                        "start": 116,
                        "end": 164,
                        "loc": {
                          "start": {
                            "line": 3,
                            "column": 29
                          },
                          "end": {
                            "line": 3,
                            "column": 77
                          }
                        },
                        "callee": {
                          "type": "MemberExpression",
                          "start": 116,
                          "end": 123,
                          "loc": {
                            "start": {
                              "line": 3,
                              "column": 29
                            },
                            "end": {
                              "line": 3,
                              "column": 36
                            }
                          },
                          "object": {
                            "type": "Identifier",
                            "start": 116,
                            "end": 119,
                            "loc": {
                              "start": {
                                "line": 3,
                                "column": 29
                              },
                              "end": {
                                "line": 3,
                                "column": 32
                              }
                            },
                            "name": "fns"
                          },
                          "property": {
                            "type": "Identifier",
                            "start": 120,
                            "end": 123,
                            "loc": {
                              "start": {
                                "line": 3,
                                "column": 33
                              },
                              "end": {
                                "line": 3,
                                "column": 36
                              }
                            },
                            "name": "map"
                          },
                          "computed": false
                        },
                        "arguments": [
                          {
                            "type": "ArrowFunctionExpression",
                            "start": 125,
                            "end": 162,
                            "loc": {
                              "start": {
                                "line": 3,
                                "column": 38
                              },
                              "end": {
                                "line": 3,
                                "column": 75
                              }
                            },
                            "id": null,
                            "generator": false,
                            "expression": true,
                            "async": false,
                            "params": [
                              {
                                "type": "Identifier",
                                "start": 125,
                                "end": 126,
                                "loc": {
                                  "start": {
                                    "line": 3,
                                    "column": 38
                                  },
                                  "end": {
                                    "line": 3,
                                    "column": 39
                                  }
                                },
                                "name": "f"
                              }
                            ],
                            "body": {
                              "type": "ConditionalExpression",
                              "start": 130,
                              "end": 162,
                              "loc": {
                                "start": {
                                  "line": 3,
                                  "column": 43
                                },
                                "end": {
                                  "line": 3,
                                  "column": 75
                                }
                              },
                              "test": {
                                "type": "CallExpression",
                                "start": 130,
                                "end": 144,
                                "loc": {
                                  "start": {
                                    "line": 3,
                                    "column": 43
                                  },
                                  "end": {
                                    "line": 3,
                                    "column": 57
                                  }
                                },
                                "callee": {
                                  "type": "Identifier",
                                  "start": 130,
                                  "end": 139,
                                  "loc": {
                                    "start": {
                                      "line": 3,
                                      "column": 43
                                    },
                                    "end": {
                                      "line": 3,
                                      "column": 52
                                    }
                                  },
                                  "name": "isPromise"
                                },
                                "arguments": [
                                  {
                                    "type": "Identifier",
                                    "start": 141,
                                    "end": 142,
                                    "loc": {
                                      "start": {
                                        "line": 3,
                                        "column": 54
                                      },
                                      "end": {
                                        "line": 3,
                                        "column": 55
                                      }
                                    },
                                    "name": "f"
                                  }
                                ]
                              },
                              "consequent": {
                                "type": "Identifier",
                                "start": 147,
                                "end": 148,
                                "loc": {
                                  "start": {
                                    "line": 3,
                                    "column": 60
                                  },
                                  "end": {
                                    "line": 3,
                                    "column": 61
                                  }
                                },
                                "name": "f"
                              },
                              "alternate": {
                                "type": "CallExpression",
                                "start": 151,
                                "end": 162,
                                "loc": {
                                  "start": {
                                    "line": 3,
                                    "column": 64
                                  },
                                  "end": {
                                    "line": 3,
                                    "column": 75
                                  }
                                },
                                "callee": {
                                  "type": "Identifier",
                                  "start": 151,
                                  "end": 157,
                                  "loc": {
                                    "start": {
                                      "line": 3,
                                      "column": 64
                                    },
                                    "end": {
                                      "line": 3,
                                      "column": 70
                                    }
                                  },
                                  "name": "pdefer"
                                },
                                "arguments": [
                                  {
                                    "type": "Identifier",
                                    "start": 159,
                                    "end": 160,
                                    "loc": {
                                      "start": {
                                        "line": 3,
                                        "column": 72
                                      },
                                      "end": {
                                        "line": 3,
                                        "column": 73
                                      }
                                    },
                                    "name": "f"
                                  }
                                ]
                              }
                            }
                          }
                        ]
                      },
                      "property": {
                        "type": "Identifier",
                        "start": 165,
                        "end": 171,
                        "loc": {
                          "start": {
                            "line": 3,
                            "column": 78
                          },
                          "end": {
                            "line": 3,
                            "column": 84
                          }
                        },
                        "name": "reduce"
                      },
                      "computed": false
                    },
                    "arguments": [
                      {
                        "type": "ArrowFunctionExpression",
                        "start": 173,
                        "end": 206,
                        "loc": {
                          "start": {
                            "line": 3,
                            "column": 86
                          },
                          "end": {
                            "line": 3,
                            "column": 119
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": true,
                        "async": false,
                        "params": [
                          {
                            "type": "Identifier",
                            "start": 175,
                            "end": 179,
                            "loc": {
                              "start": {
                                "line": 3,
                                "column": 88
                              },
                              "end": {
                                "line": 3,
                                "column": 92
                              }
                            },
                            "name": "prev"
                          },
                          {
                            "type": "Identifier",
                            "start": 181,
                            "end": 184,
                            "loc": {
                              "start": {
                                "line": 3,
                                "column": 94
                              },
                              "end": {
                                "line": 3,
                                "column": 97
                              }
                            },
                            "name": "cur"
                          }
                        ],
                        "body": {
                          "type": "CallExpression",
                          "start": 190,
                          "end": 206,
                          "loc": {
                            "start": {
                              "line": 3,
                              "column": 103
                            },
                            "end": {
                              "line": 3,
                              "column": 119
                            }
                          },
                          "callee": {
                            "type": "MemberExpression",
                            "start": 190,
                            "end": 199,
                            "loc": {
                              "start": {
                                "line": 3,
                                "column": 103
                              },
                              "end": {
                                "line": 3,
                                "column": 112
                              }
                            },
                            "object": {
                              "type": "Identifier",
                              "start": 190,
                              "end": 194,
                              "loc": {
                                "start": {
                                  "line": 3,
                                  "column": 103
                                },
                                "end": {
                                  "line": 3,
                                  "column": 107
                                }
                              },
                              "name": "prev"
                            },
                            "property": {
                              "type": "Identifier",
                              "start": 195,
                              "end": 199,
                              "loc": {
                                "start": {
                                  "line": 3,
                                  "column": 108
                                },
                                "end": {
                                  "line": 3,
                                  "column": 112
                                }
                              },
                              "name": "then"
                            },
                            "computed": false
                          },
                          "arguments": [
                            {
                              "type": "Identifier",
                              "start": 201,
                              "end": 204,
                              "loc": {
                                "start": {
                                  "line": 3,
                                  "column": 114
                                },
                                "end": {
                                  "line": 3,
                                  "column": 117
                                }
                              },
                              "name": "cur"
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              }
            ],
            "kind": "const"
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse complex', () => {
      expect(parseScript(`const
      sequential = ( ...fns ) => ( ...args ) => fns.map( fn => fn( ...args ) ), 
      pchain = ( ...fns ) => fns.map( f => isPromise( f ) ? f : pdefer( f ) ).reduce( ( prev, cur ) => prev.then( cur ) );`, {
          ranges: true,
          raw: true,
          v8: true,
          locations: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 209,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 122
          }
        },
        "body": [
          {
            "type": "VariableDeclaration",
            "start": 0,
            "end": 209,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 3,
                "column": 122
              }
            },
            "declarations": [
              {
                "type": "VariableDeclarator",
                "start": 12,
                "end": 84,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 6
                  },
                  "end": {
                    "line": 2,
                    "column": 78
                  }
                },
                "id": {
                  "type": "Identifier",
                  "start": 12,
                  "end": 22,
                  "loc": {
                    "start": {
                      "line": 2,
                      "column": 6
                    },
                    "end": {
                      "line": 2,
                      "column": 16
                    }
                  },
                  "name": "sequential"
                },
                "init": {
                  "type": "ArrowFunctionExpression",
                  "start": 25,
                  "end": 84,
                  "loc": {
                    "start": {
                      "line": 2,
                      "column": 19
                    },
                    "end": {
                      "line": 2,
                      "column": 78
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "RestElement",
                      "start": 27,
                      "end": 33,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 21
                        },
                        "end": {
                          "line": 2,
                          "column": 27
                        }
                      },
                      "argument": {
                        "type": "Identifier",
                        "start": 30,
                        "end": 33,
                        "loc": {
                          "start": {
                            "line": 2,
                            "column": 24
                          },
                          "end": {
                            "line": 2,
                            "column": 27
                          }
                        },
                        "name": "fns"
                      }
                    }
                  ],
                  "body": {
                    "type": "ArrowFunctionExpression",
                    "start": 39,
                    "end": 84,
                    "loc": {
                      "start": {
                        "line": 2,
                        "column": 33
                      },
                      "end": {
                        "line": 2,
                        "column": 78
                      }
                    },
                    "id": null,
                    "generator": false,
                    "expression": true,
                    "async": false,
                    "params": [
                      {
                        "type": "RestElement",
                        "start": 41,
                        "end": 48,
                        "loc": {
                          "start": {
                            "line": 2,
                            "column": 35
                          },
                          "end": {
                            "line": 2,
                            "column": 42
                          }
                        },
                        "argument": {
                          "type": "Identifier",
                          "start": 44,
                          "end": 48,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 38
                            },
                            "end": {
                              "line": 2,
                              "column": 42
                            }
                          },
                          "name": "args"
                        }
                      }
                    ],
                    "body": {
                      "type": "CallExpression",
                      "start": 54,
                      "end": 84,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 48
                        },
                        "end": {
                          "line": 2,
                          "column": 78
                        }
                      },
                      "callee": {
                        "type": "MemberExpression",
                        "start": 54,
                        "end": 61,
                        "loc": {
                          "start": {
                            "line": 2,
                            "column": 48
                          },
                          "end": {
                            "line": 2,
                            "column": 55
                          }
                        },
                        "object": {
                          "type": "Identifier",
                          "start": 54,
                          "end": 57,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 48
                            },
                            "end": {
                              "line": 2,
                              "column": 51
                            }
                          },
                          "name": "fns"
                        },
                        "property": {
                          "type": "Identifier",
                          "start": 58,
                          "end": 61,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 52
                            },
                            "end": {
                              "line": 2,
                              "column": 55
                            }
                          },
                          "name": "map"
                        },
                        "computed": false
                      },
                      "arguments": [
                        {
                          "type": "ArrowFunctionExpression",
                          "start": 63,
                          "end": 82,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 57
                            },
                            "end": {
                              "line": 2,
                              "column": 76
                            }
                          },
                          "id": null,
                          "generator": false,
                          "expression": true,
                          "async": false,
                          "params": [
                            {
                              "type": "Identifier",
                              "start": 63,
                              "end": 65,
                              "loc": {
                                "start": {
                                  "line": 2,
                                  "column": 57
                                },
                                "end": {
                                  "line": 2,
                                  "column": 59
                                }
                              },
                              "name": "fn"
                            }
                          ],
                          "body": {
                            "type": "CallExpression",
                            "start": 69,
                            "end": 82,
                            "loc": {
                              "start": {
                                "line": 2,
                                "column": 63
                              },
                              "end": {
                                "line": 2,
                                "column": 76
                              }
                            },
                            "callee": {
                              "type": "Identifier",
                              "start": 69,
                              "end": 71,
                              "loc": {
                                "start": {
                                  "line": 2,
                                  "column": 63
                                },
                                "end": {
                                  "line": 2,
                                  "column": 65
                                }
                              },
                              "name": "fn"
                            },
                            "arguments": [
                              {
                                "type": "SpreadElement",
                                "start": 73,
                                "end": 80,
                                "loc": {
                                  "start": {
                                    "line": 2,
                                    "column": 67
                                  },
                                  "end": {
                                    "line": 2,
                                    "column": 74
                                  }
                                },
                                "argument": {
                                  "type": "Identifier",
                                  "start": 76,
                                  "end": 80,
                                  "loc": {
                                    "start": {
                                      "line": 2,
                                      "column": 70
                                    },
                                    "end": {
                                      "line": 2,
                                      "column": 74
                                    }
                                  },
                                  "name": "args"
                                }
                              }
                            ]
                          }
                        }
                      ]
                    }
                  }
                }
              },
              {
                "type": "VariableDeclarator",
                "start": 93,
                "end": 208,
                "loc": {
                  "start": {
                    "line": 3,
                    "column": 6
                  },
                  "end": {
                    "line": 3,
                    "column": 121
                  }
                },
                "id": {
                  "type": "Identifier",
                  "start": 93,
                  "end": 99,
                  "loc": {
                    "start": {
                      "line": 3,
                      "column": 6
                    },
                    "end": {
                      "line": 3,
                      "column": 12
                    }
                  },
                  "name": "pchain"
                },
                "init": {
                  "type": "ArrowFunctionExpression",
                  "start": 102,
                  "end": 208,
                  "loc": {
                    "start": {
                      "line": 3,
                      "column": 15
                    },
                    "end": {
                      "line": 3,
                      "column": 121
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "RestElement",
                      "start": 104,
                      "end": 110,
                      "loc": {
                        "start": {
                          "line": 3,
                          "column": 17
                        },
                        "end": {
                          "line": 3,
                          "column": 23
                        }
                      },
                      "argument": {
                        "type": "Identifier",
                        "start": 107,
                        "end": 110,
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
                        "name": "fns"
                      }
                    }
                  ],
                  "body": {
                    "type": "CallExpression",
                    "start": 116,
                    "end": 208,
                    "loc": {
                      "start": {
                        "line": 3,
                        "column": 29
                      },
                      "end": {
                        "line": 3,
                        "column": 121
                      }
                    },
                    "callee": {
                      "type": "MemberExpression",
                      "start": 116,
                      "end": 171,
                      "loc": {
                        "start": {
                          "line": 3,
                          "column": 29
                        },
                        "end": {
                          "line": 3,
                          "column": 84
                        }
                      },
                      "object": {
                        "type": "CallExpression",
                        "start": 116,
                        "end": 164,
                        "loc": {
                          "start": {
                            "line": 3,
                            "column": 29
                          },
                          "end": {
                            "line": 3,
                            "column": 77
                          }
                        },
                        "callee": {
                          "type": "MemberExpression",
                          "start": 116,
                          "end": 123,
                          "loc": {
                            "start": {
                              "line": 3,
                              "column": 29
                            },
                            "end": {
                              "line": 3,
                              "column": 36
                            }
                          },
                          "object": {
                            "type": "Identifier",
                            "start": 116,
                            "end": 119,
                            "loc": {
                              "start": {
                                "line": 3,
                                "column": 29
                              },
                              "end": {
                                "line": 3,
                                "column": 32
                              }
                            },
                            "name": "fns"
                          },
                          "property": {
                            "type": "Identifier",
                            "start": 120,
                            "end": 123,
                            "loc": {
                              "start": {
                                "line": 3,
                                "column": 33
                              },
                              "end": {
                                "line": 3,
                                "column": 36
                              }
                            },
                            "name": "map"
                          },
                          "computed": false
                        },
                        "arguments": [
                          {
                            "type": "ArrowFunctionExpression",
                            "start": 125,
                            "end": 162,
                            "loc": {
                              "start": {
                                "line": 3,
                                "column": 38
                              },
                              "end": {
                                "line": 3,
                                "column": 75
                              }
                            },
                            "id": null,
                            "generator": false,
                            "expression": true,
                            "async": false,
                            "params": [
                              {
                                "type": "Identifier",
                                "start": 125,
                                "end": 126,
                                "loc": {
                                  "start": {
                                    "line": 3,
                                    "column": 38
                                  },
                                  "end": {
                                    "line": 3,
                                    "column": 39
                                  }
                                },
                                "name": "f"
                              }
                            ],
                            "body": {
                              "type": "ConditionalExpression",
                              "start": 130,
                              "end": 162,
                              "loc": {
                                "start": {
                                  "line": 3,
                                  "column": 43
                                },
                                "end": {
                                  "line": 3,
                                  "column": 75
                                }
                              },
                              "test": {
                                "type": "CallExpression",
                                "start": 130,
                                "end": 144,
                                "loc": {
                                  "start": {
                                    "line": 3,
                                    "column": 43
                                  },
                                  "end": {
                                    "line": 3,
                                    "column": 57
                                  }
                                },
                                "callee": {
                                  "type": "Identifier",
                                  "start": 130,
                                  "end": 139,
                                  "loc": {
                                    "start": {
                                      "line": 3,
                                      "column": 43
                                    },
                                    "end": {
                                      "line": 3,
                                      "column": 52
                                    }
                                  },
                                  "name": "isPromise"
                                },
                                "arguments": [
                                  {
                                    "type": "Identifier",
                                    "start": 141,
                                    "end": 142,
                                    "loc": {
                                      "start": {
                                        "line": 3,
                                        "column": 54
                                      },
                                      "end": {
                                        "line": 3,
                                        "column": 55
                                      }
                                    },
                                    "name": "f"
                                  }
                                ]
                              },
                              "consequent": {
                                "type": "Identifier",
                                "start": 147,
                                "end": 148,
                                "loc": {
                                  "start": {
                                    "line": 3,
                                    "column": 60
                                  },
                                  "end": {
                                    "line": 3,
                                    "column": 61
                                  }
                                },
                                "name": "f"
                              },
                              "alternate": {
                                "type": "CallExpression",
                                "start": 151,
                                "end": 162,
                                "loc": {
                                  "start": {
                                    "line": 3,
                                    "column": 64
                                  },
                                  "end": {
                                    "line": 3,
                                    "column": 75
                                  }
                                },
                                "callee": {
                                  "type": "Identifier",
                                  "start": 151,
                                  "end": 157,
                                  "loc": {
                                    "start": {
                                      "line": 3,
                                      "column": 64
                                    },
                                    "end": {
                                      "line": 3,
                                      "column": 70
                                    }
                                  },
                                  "name": "pdefer"
                                },
                                "arguments": [
                                  {
                                    "type": "Identifier",
                                    "start": 159,
                                    "end": 160,
                                    "loc": {
                                      "start": {
                                        "line": 3,
                                        "column": 72
                                      },
                                      "end": {
                                        "line": 3,
                                        "column": 73
                                      }
                                    },
                                    "name": "f"
                                  }
                                ]
                              }
                            }
                          }
                        ]
                      },
                      "property": {
                        "type": "Identifier",
                        "start": 165,
                        "end": 171,
                        "loc": {
                          "start": {
                            "line": 3,
                            "column": 78
                          },
                          "end": {
                            "line": 3,
                            "column": 84
                          }
                        },
                        "name": "reduce"
                      },
                      "computed": false
                    },
                    "arguments": [
                      {
                        "type": "ArrowFunctionExpression",
                        "start": 173,
                        "end": 206,
                        "loc": {
                          "start": {
                            "line": 3,
                            "column": 86
                          },
                          "end": {
                            "line": 3,
                            "column": 119
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": true,
                        "async": false,
                        "params": [
                          {
                            "type": "Identifier",
                            "start": 175,
                            "end": 179,
                            "loc": {
                              "start": {
                                "line": 3,
                                "column": 88
                              },
                              "end": {
                                "line": 3,
                                "column": 92
                              }
                            },
                            "name": "prev"
                          },
                          {
                            "type": "Identifier",
                            "start": 181,
                            "end": 184,
                            "loc": {
                              "start": {
                                "line": 3,
                                "column": 94
                              },
                              "end": {
                                "line": 3,
                                "column": 97
                              }
                            },
                            "name": "cur"
                          }
                        ],
                        "body": {
                          "type": "CallExpression",
                          "start": 190,
                          "end": 206,
                          "loc": {
                            "start": {
                              "line": 3,
                              "column": 103
                            },
                            "end": {
                              "line": 3,
                              "column": 119
                            }
                          },
                          "callee": {
                            "type": "MemberExpression",
                            "start": 190,
                            "end": 199,
                            "loc": {
                              "start": {
                                "line": 3,
                                "column": 103
                              },
                              "end": {
                                "line": 3,
                                "column": 112
                              }
                            },
                            "object": {
                              "type": "Identifier",
                              "start": 190,
                              "end": 194,
                              "loc": {
                                "start": {
                                  "line": 3,
                                  "column": 103
                                },
                                "end": {
                                  "line": 3,
                                  "column": 107
                                }
                              },
                              "name": "prev"
                            },
                            "property": {
                              "type": "Identifier",
                              "start": 195,
                              "end": 199,
                              "loc": {
                                "start": {
                                  "line": 3,
                                  "column": 108
                                },
                                "end": {
                                  "line": 3,
                                  "column": 112
                                }
                              },
                              "name": "then"
                            },
                            "computed": false
                          },
                          "arguments": [
                            {
                              "type": "Identifier",
                              "start": 201,
                              "end": 204,
                              "loc": {
                                "start": {
                                  "line": 3,
                                  "column": 114
                                },
                                "end": {
                                  "line": 3,
                                  "column": 117
                                }
                              },
                              "name": "cur"
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              }
            ],
            "kind": "const"
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse complex', () => {
      expect(parseScript(`const    
      any = ( ...args ) => args.some( a => !!a ),
      all = ( ...args ) => args.every( a => !!a );`, {
          ranges: true,
          raw: true,
          v8: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 110,
        "body": [
          {
            "type": "VariableDeclaration",
            "start": 0,
            "end": 110,
            "declarations": [
              {
                "type": "VariableDeclarator",
                "start": 16,
                "end": 58,
                "id": {
                  "type": "Identifier",
                  "start": 16,
                  "end": 19,
                  "name": "any"
                },
                "init": {
                  "type": "ArrowFunctionExpression",
                  "start": 22,
                  "end": 58,
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "RestElement",
                      "start": 24,
                      "end": 31,
                      "argument": {
                        "type": "Identifier",
                        "start": 27,
                        "end": 31,
                        "name": "args"
                      }
                    }
                  ],
                  "body": {
                    "type": "CallExpression",
                    "start": 37,
                    "end": 58,
                    "callee": {
                      "type": "MemberExpression",
                      "start": 37,
                      "end": 46,
                      "object": {
                        "type": "Identifier",
                        "start": 37,
                        "end": 41,
                        "name": "args"
                      },
                      "property": {
                        "type": "Identifier",
                        "start": 42,
                        "end": 46,
                        "name": "some"
                      },
                      "computed": false
                    },
                    "arguments": [
                      {
                        "type": "ArrowFunctionExpression",
                        "start": 48,
                        "end": 56,
                        "id": null,
                        "generator": false,
                        "expression": true,
                        "async": false,
                        "params": [
                          {
                            "type": "Identifier",
                            "start": 48,
                            "end": 49,
                            "name": "a"
                          }
                        ],
                        "body": {
                          "type": "UnaryExpression",
                          "start": 53,
                          "end": 56,
                          "operator": "!",
                          "prefix": true,
                          "argument": {
                            "type": "UnaryExpression",
                            "start": 54,
                            "end": 56,
                            "operator": "!",
                            "prefix": true,
                            "argument": {
                              "type": "Identifier",
                              "start": 55,
                              "end": 56,
                              "name": "a"
                            }
                          }
                        }
                      }
                    ]
                  }
                }
              },
              {
                "type": "VariableDeclarator",
                "start": 66,
                "end": 109,
                "id": {
                  "type": "Identifier",
                  "start": 66,
                  "end": 69,
                  "name": "all"
                },
                "init": {
                  "type": "ArrowFunctionExpression",
                  "start": 72,
                  "end": 109,
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "RestElement",
                      "start": 74,
                      "end": 81,
                      "argument": {
                        "type": "Identifier",
                        "start": 77,
                        "end": 81,
                        "name": "args"
                      }
                    }
                  ],
                  "body": {
                    "type": "CallExpression",
                    "start": 87,
                    "end": 109,
                    "callee": {
                      "type": "MemberExpression",
                      "start": 87,
                      "end": 97,
                      "object": {
                        "type": "Identifier",
                        "start": 87,
                        "end": 91,
                        "name": "args"
                      },
                      "property": {
                        "type": "Identifier",
                        "start": 92,
                        "end": 97,
                        "name": "every"
                      },
                      "computed": false
                    },
                    "arguments": [
                      {
                        "type": "ArrowFunctionExpression",
                        "start": 99,
                        "end": 107,
                        "id": null,
                        "generator": false,
                        "expression": true,
                        "async": false,
                        "params": [
                          {
                            "type": "Identifier",
                            "start": 99,
                            "end": 100,
                            "name": "a"
                          }
                        ],
                        "body": {
                          "type": "UnaryExpression",
                          "start": 104,
                          "end": 107,
                          "operator": "!",
                          "prefix": true,
                          "argument": {
                            "type": "UnaryExpression",
                            "start": 105,
                            "end": 107,
                            "operator": "!",
                            "prefix": true,
                            "argument": {
                              "type": "Identifier",
                              "start": 106,
                              "end": 107,
                              "name": "a"
                            }
                          }
                        }
                      }
                    ]
                  }
                }
              }
            ],
            "kind": "const"
          }
        ],
        "sourceType": "script"
      });
  });

    it('should parse var without initializers in scope', () => {
      expect(parseScript(`const a = {
        b (dd ) { }
      };`, {
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
            "line": 3,
            "column": 8
          }
        },
        "body": [
          {
            "type": "VariableDeclaration",
            "start": 0,
            "end": 40,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 3,
                "column": 8
              }
            },
            "declarations": [
              {
                "type": "VariableDeclarator",
                "start": 6,
                "end": 39,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 6
                  },
                  "end": {
                    "line": 3,
                    "column": 7
                  }
                },
                "id": {
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
                "init": {
                  "type": "ObjectExpression",
                  "start": 10,
                  "end": 39,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 10
                    },
                    "end": {
                      "line": 3,
                      "column": 7
                    }
                  },
                  "properties": [
                    {
                      "type": "Property",
                      "start": 20,
                      "end": 31,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 8
                        },
                        "end": {
                          "line": 2,
                          "column": 19
                        }
                      },
                      "method": true,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 20,
                        "end": 21,
                        "loc": {
                          "start": {
                            "line": 2,
                            "column": 8
                          },
                          "end": {
                            "line": 2,
                            "column": 9
                          }
                        },
                        "name": "b"
                      },
                      "kind": "init",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 22,
                        "end": 31,
                        "loc": {
                          "start": {
                            "line": 2,
                            "column": 10
                          },
                          "end": {
                            "line": 2,
                            "column": 19
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [
                          {
                            "type": "Identifier",
                            "start": 23,
                            "end": 25,
                            "loc": {
                              "start": {
                                "line": 2,
                                "column": 11
                              },
                              "end": {
                                "line": 2,
                                "column": 13
                              }
                            },
                            "name": "dd"
                          }
                        ],
                        "body": {
                          "type": "BlockStatement",
                          "start": 28,
                          "end": 31,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 16
                            },
                            "end": {
                              "line": 2,
                              "column": 19
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
            "kind": "const"
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse var without initializers in scope', () => {
      expect(parseScript(`const fn = c => {
        var a;
      };`, {
          ranges: true,
          raw: true,
          locations: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 41,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 8
          }
        },
        "body": [
          {
            "type": "VariableDeclaration",
            "start": 0,
            "end": 41,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 3,
                "column": 8
              }
            },
            "declarations": [
              {
                "type": "VariableDeclarator",
                "start": 6,
                "end": 40,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 6
                  },
                  "end": {
                    "line": 3,
                    "column": 7
                  }
                },
                "id": {
                  "type": "Identifier",
                  "start": 6,
                  "end": 8,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 6
                    },
                    "end": {
                      "line": 1,
                      "column": 8
                    }
                  },
                  "name": "fn"
                },
                "init": {
                  "type": "ArrowFunctionExpression",
                  "start": 11,
                  "end": 40,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 11
                    },
                    "end": {
                      "line": 3,
                      "column": 7
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [
                    {
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
                      "name": "c"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 16,
                    "end": 40,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 16
                      },
                      "end": {
                        "line": 3,
                        "column": 7
                      }
                    },
                    "body": [
                      {
                        "type": "VariableDeclaration",
                        "start": 26,
                        "end": 32,
                        "loc": {
                          "start": {
                            "line": 2,
                            "column": 8
                          },
                          "end": {
                            "line": 2,
                            "column": 14
                          }
                        },
                        "declarations": [
                          {
                            "type": "VariableDeclarator",
                            "start": 30,
                            "end": 31,
                            "loc": {
                              "start": {
                                "line": 2,
                                "column": 12
                              },
                              "end": {
                                "line": 2,
                                "column": 13
                              }
                            },
                            "id": {
                              "type": "Identifier",
                              "start": 30,
                              "end": 31,
                              "loc": {
                                "start": {
                                  "line": 2,
                                  "column": 12
                                },
                                "end": {
                                  "line": 2,
                                  "column": 13
                                }
                              },
                              "name": "a"
                            },
                            "init": null
                          }
                        ],
                        "kind": "var"
                      }
                    ]
                  }
                }
              }
            ],
            "kind": "const"
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse two const with eval and arguments in sloppy mode', () => {
      expect(parseScript(`const eval = 42, arguments = 42`, {
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
        "body": [
          {
            "type": "VariableDeclaration",
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
            "declarations": [
              {
                "type": "VariableDeclarator",
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
                },
                "id": {
                  "type": "Identifier",
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
                  "name": "eval"
                },
                "init": {
                  "type": "Literal",
                  "start": 13,
                  "end": 15,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 13
                    },
                    "end": {
                      "line": 1,
                      "column": 15
                    }
                  },
                  "value": 42,
                  "raw": "42"
                }
              },
              {
                "type": "VariableDeclarator",
                "start": 17,
                "end": 31,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 17
                  },
                  "end": {
                    "line": 1,
                    "column": 31
                  }
                },
                "id": {
                  "type": "Identifier",
                  "start": 17,
                  "end": 26,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 17
                    },
                    "end": {
                      "line": 1,
                      "column": 26
                    }
                  },
                  "name": "arguments"
                },
                "init": {
                  "type": "Literal",
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
                  "value": 42,
                  "raw": "42"
                }
              }
            ],
            "kind": "const"
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse binding as specified via property name and identifier', () => {
        expect(parseScript(`const { x: y } = { x: 23 };`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
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
            "body": [
              {
                "type": "VariableDeclaration",
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
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 6,
                    "end": 26,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 26
                      }
                    },
                    "id": {
                      "type": "ObjectPattern",
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
                      "properties": [
                        {
                          "type": "Property",
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
                            "name": "y"
                          },
                          "kind": "init"
                        }
                      ]
                    },
                    "init": {
                      "type": "ObjectExpression",
                      "start": 17,
                      "end": 26,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 17
                        },
                        "end": {
                          "line": 1,
                          "column": 26
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 19,
                          "end": 24,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 19
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
                            "name": "x"
                          },
                          "value": {
                            "type": "Literal",
                            "start": 22,
                            "end": 24,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 22
                              },
                              "end": {
                                "line": 1,
                                "column": 24
                              }
                            },
                            "value": 23,
                            "raw": "23"
                          },
                          "kind": "init"
                        }
                      ]
                    }
                  }
                ],
                "kind": "const"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse trailing comma following binding property list', () => {
        expect(parseScript(`const { x: y, } = { x: 23 };`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 28,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 28
              }
            },
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 28,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 28
                  }
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 6,
                    "end": 27,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 27
                      }
                    },
                    "id": {
                      "type": "ObjectPattern",
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
                      },
                      "properties": [
                        {
                          "type": "Property",
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
                            "name": "y"
                          },
                          "kind": "init"
                        }
                      ]
                    },
                    "init": {
                      "type": "ObjectExpression",
                      "start": 18,
                      "end": 27,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 18
                        },
                        "end": {
                          "line": 1,
                          "column": 27
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 20,
                          "end": 25,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 20
                            },
                            "end": {
                              "line": 1,
                              "column": 25
                            }
                          },
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
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
                            "name": "x"
                          },
                          "value": {
                            "type": "Literal",
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
                            "value": 23,
                            "raw": "23"
                          },
                          "kind": "init"
                        }
                      ]
                    }
                  }
                ],
                "kind": "const"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse binding specified via property name, identifier, and initializer', () => {
        expect(parseScript(`const { x: y = 33 } = { };`, {
            ranges: true,
            raw: true,
            locations: true
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
                "type": "VariableDeclaration",
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
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 6,
                    "end": 25,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 25
                      }
                    },
                    "id": {
                      "type": "ObjectPattern",
                      "start": 6,
                      "end": 19,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 6
                        },
                        "end": {
                          "line": 1,
                          "column": 19
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
                            "type": "AssignmentPattern",
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
                              "name": "y"
                            },
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
                              "value": 33,
                              "raw": "33"
                            }
                          },
                          "kind": "init"
                        }
                      ]
                    },
                    "init": {
                      "type": "ObjectExpression",
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
                      "properties": []
                    }
                  }
                ],
                "kind": "const"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse object binding pattern with "nested" array binding pattern', () => {
        expect(parseScript(`const { w: [x, y, z] = [4, 5, 6] } = { w: [7, undefined, ] };`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 61,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 61
              }
            },
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 61,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 61
                  }
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 6,
                    "end": 60,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 60
                      }
                    },
                    "id": {
                      "type": "ObjectPattern",
                      "start": 6,
                      "end": 34,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 6
                        },
                        "end": {
                          "line": 1,
                          "column": 34
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 8,
                          "end": 32,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 8
                            },
                            "end": {
                              "line": 1,
                              "column": 32
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
                            "name": "w"
                          },
                          "value": {
                            "type": "AssignmentPattern",
                            "start": 11,
                            "end": 32,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 11
                              },
                              "end": {
                                "line": 1,
                                "column": 32
                              }
                            },
                            "left": {
                              "type": "ArrayPattern",
                              "start": 11,
                              "end": 20,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 11
                                },
                                "end": {
                                  "line": 1,
                                  "column": 20
                                }
                              },
                              "elements": [
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
                                  "name": "x"
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
                                  "name": "y"
                                },
                                {
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
                                  "name": "z"
                                }
                              ]
                            },
                            "right": {
                              "type": "ArrayExpression",
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
                              "elements": [
                                {
                                  "type": "Literal",
                                  "start": 24,
                                  "end": 25,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 24
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 25
                                    }
                                  },
                                  "value": 4,
                                  "raw": "4"
                                },
                                {
                                  "type": "Literal",
                                  "start": 27,
                                  "end": 28,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 27
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 28
                                    }
                                  },
                                  "value": 5,
                                  "raw": "5"
                                },
                                {
                                  "type": "Literal",
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
                                  "value": 6,
                                  "raw": "6"
                                }
                              ]
                            }
                          },
                          "kind": "init"
                        }
                      ]
                    },
                    "init": {
                      "type": "ObjectExpression",
                      "start": 37,
                      "end": 60,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 37
                        },
                        "end": {
                          "line": 1,
                          "column": 60
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 39,
                          "end": 58,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 39
                            },
                            "end": {
                              "line": 1,
                              "column": 58
                            }
                          },
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 39,
                            "end": 40,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 39
                              },
                              "end": {
                                "line": 1,
                                "column": 40
                              }
                            },
                            "name": "w"
                          },
                          "value": {
                            "type": "ArrayExpression",
                            "start": 42,
                            "end": 58,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 42
                              },
                              "end": {
                                "line": 1,
                                "column": 58
                              }
                            },
                            "elements": [
                              {
                                "type": "Literal",
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
                                "value": 7,
                                "raw": "7"
                              },
                              {
                                "type": "Identifier",
                                "start": 46,
                                "end": 55,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 46
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 55
                                  }
                                },
                                "name": "undefined"
                              }
                            ]
                          },
                          "kind": "init"
                        }
                      ]
                    }
                  }
                ],
                "kind": "const"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse object binding pattern with "nested" array binding pattern taking the `null` value ', () => {
        expect(parseScript(`const { w: [x, y, z] = [4, 5, 6] } = { w: null };`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
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
                "type": "VariableDeclaration",
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
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 6,
                    "end": 48,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 48
                      }
                    },
                    "id": {
                      "type": "ObjectPattern",
                      "start": 6,
                      "end": 34,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 6
                        },
                        "end": {
                          "line": 1,
                          "column": 34
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 8,
                          "end": 32,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 8
                            },
                            "end": {
                              "line": 1,
                              "column": 32
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
                            "name": "w"
                          },
                          "value": {
                            "type": "AssignmentPattern",
                            "start": 11,
                            "end": 32,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 11
                              },
                              "end": {
                                "line": 1,
                                "column": 32
                              }
                            },
                            "left": {
                              "type": "ArrayPattern",
                              "start": 11,
                              "end": 20,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 11
                                },
                                "end": {
                                  "line": 1,
                                  "column": 20
                                }
                              },
                              "elements": [
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
                                  "name": "x"
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
                                  "name": "y"
                                },
                                {
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
                                  "name": "z"
                                }
                              ]
                            },
                            "right": {
                              "type": "ArrayExpression",
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
                              "elements": [
                                {
                                  "type": "Literal",
                                  "start": 24,
                                  "end": 25,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 24
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 25
                                    }
                                  },
                                  "value": 4,
                                  "raw": "4"
                                },
                                {
                                  "type": "Literal",
                                  "start": 27,
                                  "end": 28,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 27
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 28
                                    }
                                  },
                                  "value": 5,
                                  "raw": "5"
                                },
                                {
                                  "type": "Literal",
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
                                  "value": 6,
                                  "raw": "6"
                                }
                              ]
                            }
                          },
                          "kind": "init"
                        }
                      ]
                    },
                    "init": {
                      "type": "ObjectExpression",
                      "start": 37,
                      "end": 48,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 37
                        },
                        "end": {
                          "line": 1,
                          "column": 48
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 39,
                          "end": 46,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 39
                            },
                            "end": {
                              "line": 1,
                              "column": 46
                            }
                          },
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 39,
                            "end": 40,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 39
                              },
                              "end": {
                                "line": 1,
                                "column": 40
                              }
                            },
                            "name": "w"
                          },
                          "value": {
                            "type": "Literal",
                            "start": 42,
                            "end": 46,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 42
                              },
                              "end": {
                                "line": 1,
                                "column": 46
                              }
                            },
                            "value": null,
                            "raw": "null"
                          },
                          "kind": "init"
                        }
                      ]
                    }
                  }
                ],
                "kind": "const"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse trailing comma following binding property list ', () => {
        expect(parseScript(`const { x: [y], } = { x: [45] };`, {
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
            "body": [
              {
                "type": "VariableDeclaration",
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
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 6,
                    "end": 31,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 31
                      }
                    },
                    "id": {
                      "type": "ObjectPattern",
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
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 8,
                          "end": 14,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 8
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
                            "type": "ArrayPattern",
                            "start": 11,
                            "end": 14,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 11
                              },
                              "end": {
                                "line": 1,
                                "column": 14
                              }
                            },
                            "elements": [
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
                                "name": "y"
                              }
                            ]
                          },
                          "kind": "init"
                        }
                      ]
                    },
                    "init": {
                      "type": "ObjectExpression",
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
                      "properties": [
                        {
                          "type": "Property",
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
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
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
                            "name": "x"
                          },
                          "value": {
                            "type": "ArrayExpression",
                            "start": 25,
                            "end": 29,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 25
                              },
                              "end": {
                                "line": 1,
                                "column": 29
                              }
                            },
                            "elements": [
                              {
                                "type": "Literal",
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
                                "value": 45,
                                "raw": "45"
                              }
                            ]
                          },
                          "kind": "init"
                        }
                      ]
                    }
                  }
                ],
                "kind": "const"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse singleNameBinding assigns name to "anonymous" generator functions', () => {
        expect(parseScript(`const { gen = function* () {}, xGen = function* x() {} } = {};`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 62,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 62
              }
            },
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 62,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 62
                  }
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 6,
                    "end": 61,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 61
                      }
                    },
                    "id": {
                      "type": "ObjectPattern",
                      "start": 6,
                      "end": 56,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 6
                        },
                        "end": {
                          "line": 1,
                          "column": 56
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 8,
                          "end": 29,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 8
                            },
                            "end": {
                              "line": 1,
                              "column": 29
                            }
                          },
                          "method": false,
                          "shorthand": true,
                          "computed": false,
                          "key": {
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
                            "name": "gen"
                          },
                          "kind": "init",
                          "value": {
                            "type": "AssignmentPattern",
                            "start": 8,
                            "end": 29,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 8
                              },
                              "end": {
                                "line": 1,
                                "column": 29
                              }
                            },
                            "left": {
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
                              "name": "gen"
                            },
                            "right": {
                              "type": "FunctionExpression",
                              "start": 14,
                              "end": 29,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 14
                                },
                                "end": {
                                  "line": 1,
                                  "column": 29
                                }
                              },
                              "id": null,
                              "generator": true,
                              "expression": false,
                              "async": false,
                              "params": [],
                              "body": {
                                "type": "BlockStatement",
                                "start": 27,
                                "end": 29,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 27
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 29
                                  }
                                },
                                "body": []
                              }
                            }
                          }
                        },
                        {
                          "type": "Property",
                          "start": 31,
                          "end": 54,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 31
                            },
                            "end": {
                              "line": 1,
                              "column": 54
                            }
                          },
                          "method": false,
                          "shorthand": true,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 31,
                            "end": 35,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 31
                              },
                              "end": {
                                "line": 1,
                                "column": 35
                              }
                            },
                            "name": "xGen"
                          },
                          "kind": "init",
                          "value": {
                            "type": "AssignmentPattern",
                            "start": 31,
                            "end": 54,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 31
                              },
                              "end": {
                                "line": 1,
                                "column": 54
                              }
                            },
                            "left": {
                              "type": "Identifier",
                              "start": 31,
                              "end": 35,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 31
                                },
                                "end": {
                                  "line": 1,
                                  "column": 35
                                }
                              },
                              "name": "xGen"
                            },
                            "right": {
                              "type": "FunctionExpression",
                              "start": 38,
                              "end": 54,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 38
                                },
                                "end": {
                                  "line": 1,
                                  "column": 54
                                }
                              },
                              "id": {
                                "type": "Identifier",
                                "start": 48,
                                "end": 49,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 48
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 49
                                  }
                                },
                                "name": "x"
                              },
                              "generator": true,
                              "expression": false,
                              "async": false,
                              "params": [],
                              "body": {
                                "type": "BlockStatement",
                                "start": 52,
                                "end": 54,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 52
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 54
                                  }
                                },
                                "body": []
                              }
                            }
                          }
                        }
                      ]
                    },
                    "init": {
                      "type": "ObjectExpression",
                      "start": 59,
                      "end": 61,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 59
                        },
                        "end": {
                          "line": 1,
                          "column": 61
                        }
                      },
                      "properties": []
                    }
                  }
                ],
                "kind": "const"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse singleNameBinding assigns name to "anonymous" functions', () => {
        expect(parseScript(`const { fn = function () {}, xFn = function x() {} } = {};`, {
            ranges: true,
            raw: true,
            locations: true
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
                "type": "VariableDeclaration",
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
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 6,
                    "end": 57,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 57
                      }
                    },
                    "id": {
                      "type": "ObjectPattern",
                      "start": 6,
                      "end": 52,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 6
                        },
                        "end": {
                          "line": 1,
                          "column": 52
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 8,
                          "end": 27,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 8
                            },
                            "end": {
                              "line": 1,
                              "column": 27
                            }
                          },
                          "method": false,
                          "shorthand": true,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 8,
                            "end": 10,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 8
                              },
                              "end": {
                                "line": 1,
                                "column": 10
                              }
                            },
                            "name": "fn"
                          },
                          "kind": "init",
                          "value": {
                            "type": "AssignmentPattern",
                            "start": 8,
                            "end": 27,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 8
                              },
                              "end": {
                                "line": 1,
                                "column": 27
                              }
                            },
                            "left": {
                              "type": "Identifier",
                              "start": 8,
                              "end": 10,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 8
                                },
                                "end": {
                                  "line": 1,
                                  "column": 10
                                }
                              },
                              "name": "fn"
                            },
                            "right": {
                              "type": "FunctionExpression",
                              "start": 13,
                              "end": 27,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 13
                                },
                                "end": {
                                  "line": 1,
                                  "column": 27
                                }
                              },
                              "id": null,
                              "generator": false,
                              "expression": false,
                              "async": false,
                              "params": [],
                              "body": {
                                "type": "BlockStatement",
                                "start": 25,
                                "end": 27,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 25
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 27
                                  }
                                },
                                "body": []
                              }
                            }
                          }
                        },
                        {
                          "type": "Property",
                          "start": 29,
                          "end": 50,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 29
                            },
                            "end": {
                              "line": 1,
                              "column": 50
                            }
                          },
                          "method": false,
                          "shorthand": true,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
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
                            "name": "xFn"
                          },
                          "kind": "init",
                          "value": {
                            "type": "AssignmentPattern",
                            "start": 29,
                            "end": 50,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 29
                              },
                              "end": {
                                "line": 1,
                                "column": 50
                              }
                            },
                            "left": {
                              "type": "Identifier",
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
                              "name": "xFn"
                            },
                            "right": {
                              "type": "FunctionExpression",
                              "start": 35,
                              "end": 50,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 35
                                },
                                "end": {
                                  "line": 1,
                                  "column": 50
                                }
                              },
                              "id": {
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
                                "name": "x"
                              },
                              "generator": false,
                              "expression": false,
                              "async": false,
                              "params": [],
                              "body": {
                                "type": "BlockStatement",
                                "start": 48,
                                "end": 50,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 48
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 50
                                  }
                                },
                                "body": []
                              }
                            }
                          }
                        }
                      ]
                    },
                    "init": {
                      "type": "ObjectExpression",
                      "start": 55,
                      "end": 57,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 55
                        },
                        "end": {
                          "line": 1,
                          "column": 57
                        }
                      },
                      "properties": []
                    }
                  }
                ],
                "kind": "const"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse singleNameBinding assigns `name` to "anonymous" functions "through" cover grammar', () => {
        expect(parseScript(`const { cover = (function () {}), xCover = (0, function() {})  } = {};`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 70,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 70
              }
            },
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 70,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 70
                  }
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 6,
                    "end": 69,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 69
                      }
                    },
                    "id": {
                      "type": "ObjectPattern",
                      "start": 6,
                      "end": 64,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 6
                        },
                        "end": {
                          "line": 1,
                          "column": 64
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 8,
                          "end": 32,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 8
                            },
                            "end": {
                              "line": 1,
                              "column": 32
                            }
                          },
                          "method": false,
                          "shorthand": true,
                          "computed": false,
                          "key": {
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
                            "name": "cover"
                          },
                          "kind": "init",
                          "value": {
                            "type": "AssignmentPattern",
                            "start": 8,
                            "end": 32,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 8
                              },
                              "end": {
                                "line": 1,
                                "column": 32
                              }
                            },
                            "left": {
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
                              "name": "cover"
                            },
                            "right": {
                              "type": "FunctionExpression",
                              "start": 17,
                              "end": 31,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 17
                                },
                                "end": {
                                  "line": 1,
                                  "column": 31
                                }
                              },
                              "id": null,
                              "generator": false,
                              "expression": false,
                              "async": false,
                              "params": [],
                              "body": {
                                "type": "BlockStatement",
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
                                "body": []
                              }
                            }
                          }
                        },
                        {
                          "type": "Property",
                          "start": 34,
                          "end": 61,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 34
                            },
                            "end": {
                              "line": 1,
                              "column": 61
                            }
                          },
                          "method": false,
                          "shorthand": true,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 34,
                            "end": 40,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 34
                              },
                              "end": {
                                "line": 1,
                                "column": 40
                              }
                            },
                            "name": "xCover"
                          },
                          "kind": "init",
                          "value": {
                            "type": "AssignmentPattern",
                            "start": 34,
                            "end": 61,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 34
                              },
                              "end": {
                                "line": 1,
                                "column": 61
                              }
                            },
                            "left": {
                              "type": "Identifier",
                              "start": 34,
                              "end": 40,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 34
                                },
                                "end": {
                                  "line": 1,
                                  "column": 40
                                }
                              },
                              "name": "xCover"
                            },
                            "right": {
                              "type": "SequenceExpression",
                              "start": 44,
                              "end": 60,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 44
                                },
                                "end": {
                                  "line": 1,
                                  "column": 60
                                }
                              },
                              "expressions": [
                                {
                                  "type": "Literal",
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
                                  "value": 0,
                                  "raw": "0"
                                },
                                {
                                  "type": "FunctionExpression",
                                  "start": 47,
                                  "end": 60,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 47
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 60
                                    }
                                  },
                                  "id": null,
                                  "generator": false,
                                  "expression": false,
                                  "async": false,
                                  "params": [],
                                  "body": {
                                    "type": "BlockStatement",
                                    "start": 58,
                                    "end": 60,
                                    "loc": {
                                      "start": {
                                        "line": 1,
                                        "column": 58
                                      },
                                      "end": {
                                        "line": 1,
                                        "column": 60
                                      }
                                    },
                                    "body": []
                                  }
                                }
                              ]
                            }
                          }
                        }
                      ]
                    },
                    "init": {
                      "type": "ObjectExpression",
                      "start": 67,
                      "end": 69,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 67
                        },
                        "end": {
                          "line": 1,
                          "column": 69
                        }
                      },
                      "properties": []
                    }
                  }
                ],
                "kind": "const"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse singleNameBinding assigns `name` to arrow functions', () => {
        expect(parseScript(`const { arrow = () => {} } = {};`, {
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
            "body": [
              {
                "type": "VariableDeclaration",
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
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 6,
                    "end": 31,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 31
                      }
                    },
                    "id": {
                      "type": "ObjectPattern",
                      "start": 6,
                      "end": 26,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 6
                        },
                        "end": {
                          "line": 1,
                          "column": 26
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 8,
                          "end": 24,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 8
                            },
                            "end": {
                              "line": 1,
                              "column": 24
                            }
                          },
                          "method": false,
                          "shorthand": true,
                          "computed": false,
                          "key": {
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
                            "name": "arrow"
                          },
                          "kind": "init",
                          "value": {
                            "type": "AssignmentPattern",
                            "start": 8,
                            "end": 24,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 8
                              },
                              "end": {
                                "line": 1,
                                "column": 24
                              }
                            },
                            "left": {
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
                              "name": "arrow"
                            },
                            "right": {
                              "type": "ArrowFunctionExpression",
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
                              "id": null,
                              "generator": false,
                              "expression": false,
                              "async": false,
                              "params": [],
                              "body": {
                                "type": "BlockStatement",
                                "start": 22,
                                "end": 24,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 22
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 24
                                  }
                                },
                                "body": []
                              }
                            }
                          }
                        }
                      ]
                    },
                    "init": {
                      "type": "ObjectExpression",
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
                      "properties": []
                    }
                  }
                ],
                "kind": "const"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse empty object binding pattern', () => {
        expect(parseScript(`const {} = obj;`, {
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
                    "id": {
                      "type": "ObjectPattern",
                      "start": 6,
                      "end": 8,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 6
                        },
                        "end": {
                          "line": 1,
                          "column": 8
                        }
                      },
                      "properties": []
                    },
                    "init": {
                      "type": "Identifier",
                      "start": 11,
                      "end": 14,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 11
                        },
                        "end": {
                          "line": 1,
                          "column": 14
                        }
                      },
                      "name": "obj"
                    }
                  }
                ],
                "kind": "const"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse lone rest element', () => {
        expect(parseScript(`const [...x] = [1, 2, 3];`, {
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
            "body": [
              {
                "type": "VariableDeclaration",
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
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 6,
                    "end": 24,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 24
                      }
                    },
                    "id": {
                      "type": "ArrayPattern",
                      "start": 6,
                      "end": 12,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 6
                        },
                        "end": {
                          "line": 1,
                          "column": 12
                        }
                      },
                      "elements": [
                        {
                          "type": "RestElement",
                          "start": 7,
                          "end": 11,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 7
                            },
                            "end": {
                              "line": 1,
                              "column": 11
                            }
                          },
                          "argument": {
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
                          }
                        }
                      ]
                    },
                    "init": {
                      "type": "ArrayExpression",
                      "start": 15,
                      "end": 24,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 15
                        },
                        "end": {
                          "line": 1,
                          "column": 24
                        }
                      },
                      "elements": [
                        {
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
                          "value": 1,
                          "raw": "1"
                        },
                        {
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
                          "value": 2,
                          "raw": "2"
                        },
                        {
                          "type": "Literal",
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
                          "value": 3,
                          "raw": "3"
                        }
                      ]
                    }
                  }
                ],
                "kind": "const"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse rest element following elision elements', () => {
        expect(parseScript(`const [ , , ...x] = [1, 2, 3, 4, 5]`, {
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
            "body": [
              {
                "type": "VariableDeclaration",
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
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 6,
                    "end": 35,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 35
                      }
                    },
                    "id": {
                      "type": "ArrayPattern",
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
                      },
                      "elements": [
                        null,
                        null,
                        {
                          "type": "RestElement",
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
                          "argument": {
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
                            "name": "x"
                          }
                        }
                      ]
                    },
                    "init": {
                      "type": "ArrayExpression",
                      "start": 20,
                      "end": 35,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 20
                        },
                        "end": {
                          "line": 1,
                          "column": 35
                        }
                      },
                      "elements": [
                        {
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
                          "value": 1,
                          "raw": "1"
                        },
                        {
                          "type": "Literal",
                          "start": 24,
                          "end": 25,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 24
                            },
                            "end": {
                              "line": 1,
                              "column": 25
                            }
                          },
                          "value": 2,
                          "raw": "2"
                        },
                        {
                          "type": "Literal",
                          "start": 27,
                          "end": 28,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 27
                            },
                            "end": {
                              "line": 1,
                              "column": 28
                            }
                          },
                          "value": 3,
                          "raw": "3"
                        },
                        {
                          "type": "Literal",
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
                          "value": 4,
                          "raw": "4"
                        },
                        {
                          "type": "Literal",
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
                          "value": 5,
                          "raw": "5"
                        }
                      ]
                    }
                  }
                ],
                "kind": "const"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse rest element containing a rest element', () => {
        expect(parseScript(`const [...[...x]] = [1, 2, 3];`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 30,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 30
              }
            },
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 30,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 30
                  }
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 6,
                    "end": 29,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 29
                      }
                    },
                    "id": {
                      "type": "ArrayPattern",
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
                      },
                      "elements": [
                        {
                          "type": "RestElement",
                          "start": 7,
                          "end": 16,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 7
                            },
                            "end": {
                              "line": 1,
                              "column": 16
                            }
                          },
                          "argument": {
                            "type": "ArrayPattern",
                            "start": 10,
                            "end": 16,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 10
                              },
                              "end": {
                                "line": 1,
                                "column": 16
                              }
                            },
                            "elements": [
                              {
                                "type": "RestElement",
                                "start": 11,
                                "end": 15,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 11
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 15
                                  }
                                },
                                "argument": {
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
                                  "name": "x"
                                }
                              }
                            ]
                          }
                        }
                      ]
                    },
                    "init": {
                      "type": "ArrayExpression",
                      "start": 20,
                      "end": 29,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 20
                        },
                        "end": {
                          "line": 1,
                          "column": 29
                        }
                      },
                      "elements": [
                        {
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
                          "value": 1,
                          "raw": "1"
                        },
                        {
                          "type": "Literal",
                          "start": 24,
                          "end": 25,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 24
                            },
                            "end": {
                              "line": 1,
                              "column": 25
                            }
                          },
                          "value": 2,
                          "raw": "2"
                        },
                        {
                          "type": "Literal",
                          "start": 27,
                          "end": 28,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 27
                            },
                            "end": {
                              "line": 1,
                              "column": 28
                            }
                          },
                          "value": 3,
                          "raw": "3"
                        }
                      ]
                    }
                  }
                ],
                "kind": "const"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse destructuring initializer with a "hole"', () => {
        expect(parseScript(`const [x = 23] = [,];`, {
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
            "body": [
              {
                "type": "VariableDeclaration",
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
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 6,
                    "end": 20,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 20
                      }
                    },
                    "id": {
                      "type": "ArrayPattern",
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
                      "elements": [
                        {
                          "type": "AssignmentPattern",
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
                          },
                          "left": {
                            "type": "Identifier",
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
                            },
                            "name": "x"
                          },
                          "right": {
                            "type": "Literal",
                            "start": 11,
                            "end": 13,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 11
                              },
                              "end": {
                                "line": 1,
                                "column": 13
                              }
                            },
                            "value": 23,
                            "raw": "23"
                          }
                        }
                      ]
                    },
                    "init": {
                      "type": "ArrayExpression",
                      "start": 17,
                      "end": 20,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 17
                        },
                        "end": {
                          "line": 1,
                          "column": 20
                        }
                      },
                      "elements": [
                        null
                      ]
                    }
                  }
                ],
                "kind": "const"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse singleNameBinding does assign name to "anonymous" functions "through" cover grammar', () => {
        expect(parseScript(`const [cover = (function () {}), xCover = (0, function() {})] = [];`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 67,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 67
              }
            },
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 67,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 67
                  }
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 6,
                    "end": 66,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 66
                      }
                    },
                    "id": {
                      "type": "ArrayPattern",
                      "start": 6,
                      "end": 61,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 6
                        },
                        "end": {
                          "line": 1,
                          "column": 61
                        }
                      },
                      "elements": [
                        {
                          "type": "AssignmentPattern",
                          "start": 7,
                          "end": 31,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 7
                            },
                            "end": {
                              "line": 1,
                              "column": 31
                            }
                          },
                          "left": {
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
                            "name": "cover"
                          },
                          "right": {
                            "type": "FunctionExpression",
                            "start": 16,
                            "end": 30,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 16
                              },
                              "end": {
                                "line": 1,
                                "column": 30
                              }
                            },
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                              "type": "BlockStatement",
                              "start": 28,
                              "end": 30,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 28
                                },
                                "end": {
                                  "line": 1,
                                  "column": 30
                                }
                              },
                              "body": []
                            }
                          }
                        },
                        {
                          "type": "AssignmentPattern",
                          "start": 33,
                          "end": 60,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 33
                            },
                            "end": {
                              "line": 1,
                              "column": 60
                            }
                          },
                          "left": {
                            "type": "Identifier",
                            "start": 33,
                            "end": 39,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 33
                              },
                              "end": {
                                "line": 1,
                                "column": 39
                              }
                            },
                            "name": "xCover"
                          },
                          "right": {
                            "type": "SequenceExpression",
                            "start": 43,
                            "end": 59,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 43
                              },
                              "end": {
                                "line": 1,
                                "column": 59
                              }
                            },
                            "expressions": [
                              {
                                "type": "Literal",
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
                                "value": 0,
                                "raw": "0"
                              },
                              {
                                "type": "FunctionExpression",
                                "start": 46,
                                "end": 59,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 46
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 59
                                  }
                                },
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [],
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
                            ]
                          }
                        }
                      ]
                    },
                    "init": {
                      "type": "ArrayExpression",
                      "start": 64,
                      "end": 66,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 64
                        },
                        "end": {
                          "line": 1,
                          "column": 66
                        }
                      },
                      "elements": []
                    }
                  }
                ],
                "kind": "const"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse nested array destructuring with a null value', () => {
        expect(parseScript(`const [[x]] = [null];`, {
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
            "body": [
              {
                "type": "VariableDeclaration",
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
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 6,
                    "end": 20,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 20
                      }
                    },
                    "id": {
                      "type": "ArrayPattern",
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
                      },
                      "elements": [
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
                              "name": "x"
                            }
                          ]
                        }
                      ]
                    },
                    "init": {
                      "type": "ArrayExpression",
                      "start": 14,
                      "end": 20,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 14
                        },
                        "end": {
                          "line": 1,
                          "column": 20
                        }
                      },
                      "elements": [
                        {
                          "type": "Literal",
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
                          "value": null,
                          "raw": "null"
                        }
                      ]
                    }
                  }
                ],
                "kind": "const"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse binding element with array binding pattern and initializer', () => {
        expect(parseScript(`const [[] = function() { return function*() { }();; }()] = [];`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 62,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 62
              }
            },
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 62,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 62
                  }
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 6,
                    "end": 61,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 61
                      }
                    },
                    "id": {
                      "type": "ArrayPattern",
                      "start": 6,
                      "end": 56,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 6
                        },
                        "end": {
                          "line": 1,
                          "column": 56
                        }
                      },
                      "elements": [
                        {
                          "type": "AssignmentPattern",
                          "start": 7,
                          "end": 55,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 7
                            },
                            "end": {
                              "line": 1,
                              "column": 55
                            }
                          },
                          "left": {
                            "type": "ArrayPattern",
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
                            "elements": []
                          },
                          "right": {
                            "type": "CallExpression",
                            "start": 12,
                            "end": 55,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 12
                              },
                              "end": {
                                "line": 1,
                                "column": 55
                              }
                            },
                            "callee": {
                              "type": "FunctionExpression",
                              "start": 12,
                              "end": 53,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 12
                                },
                                "end": {
                                  "line": 1,
                                  "column": 53
                                }
                              },
                              "id": null,
                              "generator": false,
                              "expression": false,
                              "async": false,
                              "params": [],
                              "body": {
                                "type": "BlockStatement",
                                "start": 23,
                                "end": 53,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 23
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 53
                                  }
                                },
                                "body": [
                                  {
                                    "type": "ReturnStatement",
                                    "start": 25,
                                    "end": 50,
                                    "loc": {
                                      "start": {
                                        "line": 1,
                                        "column": 25
                                      },
                                      "end": {
                                        "line": 1,
                                        "column": 50
                                      }
                                    },
                                    "argument": {
                                      "type": "CallExpression",
                                      "start": 32,
                                      "end": 49,
                                      "loc": {
                                        "start": {
                                          "line": 1,
                                          "column": 32
                                        },
                                        "end": {
                                          "line": 1,
                                          "column": 49
                                        }
                                      },
                                      "callee": {
                                        "type": "FunctionExpression",
                                        "start": 32,
                                        "end": 47,
                                        "loc": {
                                          "start": {
                                            "line": 1,
                                            "column": 32
                                          },
                                          "end": {
                                            "line": 1,
                                            "column": 47
                                          }
                                        },
                                        "id": null,
                                        "generator": true,
                                        "expression": false,
                                        "async": false,
                                        "params": [],
                                        "body": {
                                          "type": "BlockStatement",
                                          "start": 44,
                                          "end": 47,
                                          "loc": {
                                            "start": {
                                              "line": 1,
                                              "column": 44
                                            },
                                            "end": {
                                              "line": 1,
                                              "column": 47
                                            }
                                          },
                                          "body": []
                                        }
                                      },
                                      "arguments": []
                                    }
                                  },
                                  {
                                    "type": "EmptyStatement",
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
                                    }
                                  }
                                ]
                              }
                            },
                            "arguments": []
                          }
                        }
                      ]
                    },
                    "init": {
                      "type": "ArrayExpression",
                      "start": 59,
                      "end": 61,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 59
                        },
                        "end": {
                          "line": 1,
                          "column": 61
                        }
                      },
                      "elements": []
                    }
                  }
                ],
                "kind": "const"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse const in block statement', () => {
        expect(parseScript(`{ const x = 42 }`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
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
                "type": "BlockStatement",
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
                    "type": "VariableDeclaration",
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
                    "declarations": [
                      {
                        "type": "VariableDeclarator",
                        "start": 8,
                        "end": 14,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 8
                          },
                          "end": {
                            "line": 1,
                            "column": 14
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
                          "end": 14,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 12
                            },
                            "end": {
                              "line": 1,
                              "column": 14
                            }
                          },
                          "value": 42,
                          "raw": "42"
                        }
                      }
                    ],
                    "kind": "const"
                  }
                ]
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse object pattern shorthand', () => {
      expect(parseScript(`const {a:b} = {}`, {
          ranges: true,
          raw: true,
          locations: true
      })).to.eql({
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
            "type": "VariableDeclaration",
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
            "declarations": [
              {
                "type": "VariableDeclarator",
                "start": 6,
                "end": 16,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 6
                  },
                  "end": {
                    "line": 1,
                    "column": 16
                  }
                },
                "id": {
                  "type": "ObjectPattern",
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
                  },
                  "properties": [
                    {
                      "type": "Property",
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
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
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
                        },
                        "name": "a"
                      },
                      "value": {
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
                        "name": "b"
                      },
                      "kind": "init"
                    }
                  ]
                },
                "init": {
                  "type": "ObjectExpression",
                  "start": 14,
                  "end": 16,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 14
                    },
                    "end": {
                      "line": 1,
                      "column": 16
                    }
                  },
                  "properties": []
                }
              }
            ],
            "kind": "const"
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse array destructuring', () => {
      expect(parseScript(`const [a] = []`, {
          ranges: true,
          raw: true,
          locations: true
      })).to.eql({
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
            "type": "VariableDeclaration",
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
            "declarations": [
              {
                "type": "VariableDeclarator",
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
                "id": {
                  "type": "ArrayPattern",
                  "start": 6,
                  "end": 9,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 6
                    },
                    "end": {
                      "line": 1,
                      "column": 9
                    }
                  },
                  "elements": [
                    {
                      "type": "Identifier",
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
                      },
                      "name": "a"
                    }
                  ]
                },
                "init": {
                  "type": "ArrayExpression",
                  "start": 12,
                  "end": 14,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 12
                    },
                    "end": {
                      "line": 1,
                      "column": 14
                    }
                  },
                  "elements": []
                }
              }
            ],
            "kind": "const"
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse const with array pattern', () => {
      expect(parseScript(`const [a] = []`, {
          ranges: true,
          raw: true,
          locations: true
      })).to.eql({
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
            "type": "VariableDeclaration",
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
            "declarations": [
              {
                "type": "VariableDeclarator",
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
                "id": {
                  "type": "ArrayPattern",
                  "start": 6,
                  "end": 9,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 6
                    },
                    "end": {
                      "line": 1,
                      "column": 9
                    }
                  },
                  "elements": [
                    {
                      "type": "Identifier",
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
                      },
                      "name": "a"
                    }
                  ]
                },
                "init": {
                  "type": "ArrayExpression",
                  "start": 12,
                  "end": 14,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 12
                    },
                    "end": {
                      "line": 1,
                      "column": 14
                    }
                  },
                  "elements": []
                }
              }
            ],
            "kind": "const"
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse const with object pattern', () => {
      expect(parseScript(`const {a:b} = {}`, {
          ranges: true,
          raw: true,
          locations: true
      })).to.eql({
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
            "type": "VariableDeclaration",
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
            "declarations": [
              {
                "type": "VariableDeclarator",
                "start": 6,
                "end": 16,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 6
                  },
                  "end": {
                    "line": 1,
                    "column": 16
                  }
                },
                "id": {
                  "type": "ObjectPattern",
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
                  },
                  "properties": [
                    {
                      "type": "Property",
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
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
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
                        },
                        "name": "a"
                      },
                      "value": {
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
                        "name": "b"
                      },
                      "kind": "init"
                    }
                  ]
                },
                "init": {
                  "type": "ObjectExpression",
                  "start": 14,
                  "end": 16,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 14
                    },
                    "end": {
                      "line": 1,
                      "column": 16
                    }
                  },
                  "properties": []
                }
              }
            ],
            "kind": "const"
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse const with object pattern - shorthand', () => {
      expect(parseScript(`const {a} = {}`, {
          ranges: true,
          raw: true,
          locations: true
      })).to.eql({
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
            "type": "VariableDeclaration",
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
            "declarations": [
              {
                "type": "VariableDeclarator",
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
                "id": {
                  "type": "ObjectPattern",
                  "start": 6,
                  "end": 9,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 6
                    },
                    "end": {
                      "line": 1,
                      "column": 9
                    }
                  },
                  "properties": [
                    {
                      "type": "Property",
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
                      },
                      "method": false,
                      "shorthand": true,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
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
                        },
                        "name": "a"
                      },
                      "kind": "init",
                      "value": {
                        "type": "Identifier",
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
                        },
                        "name": "a"
                      }
                    }
                  ]
                },
                "init": {
                  "type": "ObjectExpression",
                  "start": 12,
                  "end": 14,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 12
                    },
                    "end": {
                      "line": 1,
                      "column": 14
                    }
                  },
                  "properties": []
                }
              }
            ],
            "kind": "const"
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse correctly with & without bindings in BlockStatement', () => {
      expect(parseScript(`{ const x = 14, y = 3, z = 1977; var a; let b; }`, {
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
            "line": 1,
            "column": 48
          }
        },
        "body": [
          {
            "type": "BlockStatement",
            "start": 0,
            "end": 48,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 48
              }
            },
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 2,
                "end": 32,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 2
                  },
                  "end": {
                    "line": 1,
                    "column": 32
                  }
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 8,
                    "end": 14,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 8
                      },
                      "end": {
                        "line": 1,
                        "column": 14
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
                      "end": 14,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 12
                        },
                        "end": {
                          "line": 1,
                          "column": 14
                        }
                      },
                      "value": 14,
                      "raw": "14"
                    }
                  },
                  {
                    "type": "VariableDeclarator",
                    "start": 16,
                    "end": 21,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 16
                      },
                      "end": {
                        "line": 1,
                        "column": 21
                      }
                    },
                    "id": {
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
                      "name": "y"
                    },
                    "init": {
                      "type": "Literal",
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
                      "value": 3,
                      "raw": "3"
                    }
                  },
                  {
                    "type": "VariableDeclarator",
                    "start": 23,
                    "end": 31,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 23
                      },
                      "end": {
                        "line": 1,
                        "column": 31
                      }
                    },
                    "id": {
                      "type": "Identifier",
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
                      },
                      "name": "z"
                    },
                    "init": {
                      "type": "Literal",
                      "start": 27,
                      "end": 31,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 27
                        },
                        "end": {
                          "line": 1,
                          "column": 31
                        }
                      },
                      "value": 1977,
                      "raw": "1977"
                    }
                  }
                ],
                "kind": "const"
              },
              {
                "type": "VariableDeclaration",
                "start": 33,
                "end": 39,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 33
                  },
                  "end": {
                    "line": 1,
                    "column": 39
                  }
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
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
                    },
                    "id": {
                      "type": "Identifier",
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
                      },
                      "name": "a"
                    },
                    "init": null
                  }
                ],
                "kind": "var"
              },
              {
                "type": "VariableDeclaration",
                "start": 40,
                "end": 46,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 40
                  },
                  "end": {
                    "line": 1,
                    "column": 46
                  }
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
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
                    "id": {
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
                    },
                    "init": null
                  }
                ],
                "kind": "let"
              }
            ]
          }
        ],
        "sourceType": "script"
      });
    });
  
    it('should parse binding as specified via property name and identifier', () => {
        expect(parseScript(`{ const x = 14, y = 3, z = 1977 }`, {
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
            "body": [
              {
                "type": "BlockStatement",
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
                "body": [
                  {
                    "type": "VariableDeclaration",
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
                    "declarations": [
                      {
                        "type": "VariableDeclarator",
                        "start": 8,
                        "end": 14,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 8
                          },
                          "end": {
                            "line": 1,
                            "column": 14
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
                          "end": 14,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 12
                            },
                            "end": {
                              "line": 1,
                              "column": 14
                            }
                          },
                          "value": 14,
                          "raw": "14"
                        }
                      },
                      {
                        "type": "VariableDeclarator",
                        "start": 16,
                        "end": 21,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 16
                          },
                          "end": {
                            "line": 1,
                            "column": 21
                          }
                        },
                        "id": {
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
                          "name": "y"
                        },
                        "init": {
                          "type": "Literal",
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
                          "value": 3,
                          "raw": "3"
                        }
                      },
                      {
                        "type": "VariableDeclarator",
                        "start": 23,
                        "end": 31,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 23
                          },
                          "end": {
                            "line": 1,
                            "column": 31
                          }
                        },
                        "id": {
                          "type": "Identifier",
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
                          },
                          "name": "z"
                        },
                        "init": {
                          "type": "Literal",
                          "start": 27,
                          "end": 31,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 27
                            },
                            "end": {
                              "line": 1,
                              "column": 31
                            }
                          },
                          "value": 1977,
                          "raw": "1977"
                        }
                      }
                    ],
                    "kind": "const"
                  }
                ]
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse issue https://github.com/cherow/cherow/issues/42 correctly #1', () => {
      expect(parseScript(`const fn = c => {
        let a;
        if (c) a = 1;
        else a = 0;
        return a;
      };`, {
          ranges: true,
          raw: true,
          locations: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 101,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 8
          }
        },
        "body": [
          {
            "type": "VariableDeclaration",
            "start": 0,
            "end": 101,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 6,
                "column": 8
              }
            },
            "declarations": [
              {
                "type": "VariableDeclarator",
                "start": 6,
                "end": 100,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 6
                  },
                  "end": {
                    "line": 6,
                    "column": 7
                  }
                },
                "id": {
                  "type": "Identifier",
                  "start": 6,
                  "end": 8,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 6
                    },
                    "end": {
                      "line": 1,
                      "column": 8
                    }
                  },
                  "name": "fn"
                },
                "init": {
                  "type": "ArrowFunctionExpression",
                  "start": 11,
                  "end": 100,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 11
                    },
                    "end": {
                      "line": 6,
                      "column": 7
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [
                    {
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
                      "name": "c"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 16,
                    "end": 100,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 16
                      },
                      "end": {
                        "line": 6,
                        "column": 7
                      }
                    },
                    "body": [
                      {
                        "type": "VariableDeclaration",
                        "start": 26,
                        "end": 32,
                        "loc": {
                          "start": {
                            "line": 2,
                            "column": 8
                          },
                          "end": {
                            "line": 2,
                            "column": 14
                          }
                        },
                        "declarations": [
                          {
                            "type": "VariableDeclarator",
                            "start": 30,
                            "end": 31,
                            "loc": {
                              "start": {
                                "line": 2,
                                "column": 12
                              },
                              "end": {
                                "line": 2,
                                "column": 13
                              }
                            },
                            "id": {
                              "type": "Identifier",
                              "start": 30,
                              "end": 31,
                              "loc": {
                                "start": {
                                  "line": 2,
                                  "column": 12
                                },
                                "end": {
                                  "line": 2,
                                  "column": 13
                                }
                              },
                              "name": "a"
                            },
                            "init": null
                          }
                        ],
                        "kind": "let"
                      },
                      {
                        "type": "IfStatement",
                        "start": 41,
                        "end": 74,
                        "loc": {
                          "start": {
                            "line": 3,
                            "column": 8
                          },
                          "end": {
                            "line": 4,
                            "column": 19
                          }
                        },
                        "test": {
                          "type": "Identifier",
                          "start": 45,
                          "end": 46,
                          "loc": {
                            "start": {
                              "line": 3,
                              "column": 12
                            },
                            "end": {
                              "line": 3,
                              "column": 13
                            }
                          },
                          "name": "c"
                        },
                        "consequent": {
                          "type": "ExpressionStatement",
                          "start": 48,
                          "end": 54,
                          "loc": {
                            "start": {
                              "line": 3,
                              "column": 15
                            },
                            "end": {
                              "line": 3,
                              "column": 21
                            }
                          },
                          "expression": {
                            "type": "AssignmentExpression",
                            "start": 48,
                            "end": 53,
                            "loc": {
                              "start": {
                                "line": 3,
                                "column": 15
                              },
                              "end": {
                                "line": 3,
                                "column": 20
                              }
                            },
                            "operator": "=",
                            "left": {
                              "type": "Identifier",
                              "start": 48,
                              "end": 49,
                              "loc": {
                                "start": {
                                  "line": 3,
                                  "column": 15
                                },
                                "end": {
                                  "line": 3,
                                  "column": 16
                                }
                              },
                              "name": "a"
                            },
                            "right": {
                              "type": "Literal",
                              "start": 52,
                              "end": 53,
                              "loc": {
                                "start": {
                                  "line": 3,
                                  "column": 19
                                },
                                "end": {
                                  "line": 3,
                                  "column": 20
                                }
                              },
                              "value": 1,
                              "raw": "1"
                            }
                          }
                        },
                        "alternate": {
                          "type": "ExpressionStatement",
                          "start": 68,
                          "end": 74,
                          "loc": {
                            "start": {
                              "line": 4,
                              "column": 13
                            },
                            "end": {
                              "line": 4,
                              "column": 19
                            }
                          },
                          "expression": {
                            "type": "AssignmentExpression",
                            "start": 68,
                            "end": 73,
                            "loc": {
                              "start": {
                                "line": 4,
                                "column": 13
                              },
                              "end": {
                                "line": 4,
                                "column": 18
                              }
                            },
                            "operator": "=",
                            "left": {
                              "type": "Identifier",
                              "start": 68,
                              "end": 69,
                              "loc": {
                                "start": {
                                  "line": 4,
                                  "column": 13
                                },
                                "end": {
                                  "line": 4,
                                  "column": 14
                                }
                              },
                              "name": "a"
                            },
                            "right": {
                              "type": "Literal",
                              "start": 72,
                              "end": 73,
                              "loc": {
                                "start": {
                                  "line": 4,
                                  "column": 17
                                },
                                "end": {
                                  "line": 4,
                                  "column": 18
                                }
                              },
                              "value": 0,
                              "raw": "0"
                            }
                          }
                        }
                      },
                      {
                        "type": "ReturnStatement",
                        "start": 83,
                        "end": 92,
                        "loc": {
                          "start": {
                            "line": 5,
                            "column": 8
                          },
                          "end": {
                            "line": 5,
                            "column": 17
                          }
                        },
                        "argument": {
                          "type": "Identifier",
                          "start": 90,
                          "end": 91,
                          "loc": {
                            "start": {
                              "line": 5,
                              "column": 15
                            },
                            "end": {
                              "line": 5,
                              "column": 16
                            }
                          },
                          "name": "a"
                        }
                      }
                    ]
                  }
                }
              }
            ],
            "kind": "const"
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse issue https://github.com/cherow/cherow/issues/42 correctly #2', () => {
      expect(parseScript(`const f = () => { let v; var z; };`, {
          ranges: true,
          raw: true,
          locations: true
      })).to.eql({
        "type": "Program",
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
        "body": [
          {
            "type": "VariableDeclaration",
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
            "declarations": [
              {
                "type": "VariableDeclarator",
                "start": 6,
                "end": 33,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 6
                  },
                  "end": {
                    "line": 1,
                    "column": 33
                  }
                },
                "id": {
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
                  "name": "f"
                },
                "init": {
                  "type": "ArrowFunctionExpression",
                  "start": 10,
                  "end": 33,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 10
                    },
                    "end": {
                      "line": 1,
                      "column": 33
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 16,
                    "end": 33,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 16
                      },
                      "end": {
                        "line": 1,
                        "column": 33
                      }
                    },
                    "body": [
                      {
                        "type": "VariableDeclaration",
                        "start": 18,
                        "end": 24,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 18
                          },
                          "end": {
                            "line": 1,
                            "column": 24
                          }
                        },
                        "declarations": [
                          {
                            "type": "VariableDeclarator",
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
                            "id": {
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
                              "name": "v"
                            },
                            "init": null
                          }
                        ],
                        "kind": "let"
                      },
                      {
                        "type": "VariableDeclaration",
                        "start": 25,
                        "end": 31,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 25
                          },
                          "end": {
                            "line": 1,
                            "column": 31
                          }
                        },
                        "declarations": [
                          {
                            "type": "VariableDeclarator",
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
                            },
                            "id": {
                              "type": "Identifier",
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
                              },
                              "name": "z"
                            },
                            "init": null
                          }
                        ],
                        "kind": "var"
                      }
                    ]
                  }
                }
              }
            ],
            "kind": "const"
          }
        ],
        "sourceType": "script"
      });
    });


});
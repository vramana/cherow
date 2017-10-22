import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Destructuring - Destructuring', () => {

    it('should fail on "[0] = 0"', () => {
        expect(() => {
            parseScript('[0] = 0');
        }).to.throw();
    });

    it('should fail on "[x] += 0"', () => {
        expect(() => {
            parseScript('[x] += 0');
        }).to.throw();
    });


    it('should fail "[...a, ] = c;"', () => {
        expect(() => {
            parseScript('[...a, ] = c;');
        }).to.not.throw();
    });

    it('should parse array pattern with trailing comma', () => {
        expect(parseScript('var [a, b, , ] = [0, 1, , ];', {
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
                    "start": 4,
                    "end": 27,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 4
                      },
                      "end": {
                        "line": 1,
                        "column": 27
                      }
                    },
                    "id": {
                      "type": "ArrayPattern",
                      "start": 4,
                      "end": 14,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 4
                        },
                        "end": {
                          "line": 1,
                          "column": 14
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
                          "name": "b"
                        },
                        null
                      ]
                    },
                    "init": {
                      "type": "ArrayExpression",
                      "start": 17,
                      "end": 27,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 17
                        },
                        "end": {
                          "line": 1,
                          "column": 27
                        }
                      },
                      "elements": [
                        {
                          "type": "Literal",
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
                          "value": 0,
                          "raw": "0"
                        },
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
                        null
                      ]
                    }
                  }
                ],
                "kind": "var"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse class', () => {
        expect(parseScript(`class C {
            constructor({message: [head, ...tail], name}) {}
            method({message: [head, ...tail], name}) {}
            set x({message: [head, ...tail], name}) {}
          }`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 193,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 5,
                "column": 11
              }
            },
            "body": [
              {
                "type": "ClassDeclaration",
                "start": 0,
                "end": 193,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 5,
                    "column": 11
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
                  "name": "C"
                },
                "superClass": null,
                "body": {
                  "type": "ClassBody",
                  "start": 8,
                  "end": 193,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 8
                    },
                    "end": {
                      "line": 5,
                      "column": 11
                    }
                  },
                  "body": [
                    {
                      "type": "MethodDefinition",
                      "start": 22,
                      "end": 70,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 12
                        },
                        "end": {
                          "line": 2,
                          "column": 60
                        }
                      },
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 22,
                        "end": 33,
                        "loc": {
                          "start": {
                            "line": 2,
                            "column": 12
                          },
                          "end": {
                            "line": 2,
                            "column": 23
                          }
                        },
                        "name": "constructor"
                      },
                      "static": false,
                      "kind": "constructor",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 33,
                        "end": 70,
                        "loc": {
                          "start": {
                            "line": 2,
                            "column": 23
                          },
                          "end": {
                            "line": 2,
                            "column": 60
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [
                          {
                            "type": "ObjectPattern",
                            "start": 34,
                            "end": 66,
                            "loc": {
                              "start": {
                                "line": 2,
                                "column": 24
                              },
                              "end": {
                                "line": 2,
                                "column": 56
                              }
                            },
                            "properties": [
                              {
                                "type": "Property",
                                "start": 35,
                                "end": 59,
                                "loc": {
                                  "start": {
                                    "line": 2,
                                    "column": 25
                                  },
                                  "end": {
                                    "line": 2,
                                    "column": 49
                                  }
                                },
                                "method": false,
                                "shorthand": false,
                                "computed": false,
                                "key": {
                                  "type": "Identifier",
                                  "start": 35,
                                  "end": 42,
                                  "loc": {
                                    "start": {
                                      "line": 2,
                                      "column": 25
                                    },
                                    "end": {
                                      "line": 2,
                                      "column": 32
                                    }
                                  },
                                  "name": "message"
                                },
                                "value": {
                                  "type": "ArrayPattern",
                                  "start": 44,
                                  "end": 59,
                                  "loc": {
                                    "start": {
                                      "line": 2,
                                      "column": 34
                                    },
                                    "end": {
                                      "line": 2,
                                      "column": 49
                                    }
                                  },
                                  "elements": [
                                    {
                                      "type": "Identifier",
                                      "start": 45,
                                      "end": 49,
                                      "loc": {
                                        "start": {
                                          "line": 2,
                                          "column": 35
                                        },
                                        "end": {
                                          "line": 2,
                                          "column": 39
                                        }
                                      },
                                      "name": "head"
                                    },
                                    {
                                      "type": "RestElement",
                                      "start": 51,
                                      "end": 58,
                                      "loc": {
                                        "start": {
                                          "line": 2,
                                          "column": 41
                                        },
                                        "end": {
                                          "line": 2,
                                          "column": 48
                                        }
                                      },
                                      "argument": {
                                        "type": "Identifier",
                                        "start": 54,
                                        "end": 58,
                                        "loc": {
                                          "start": {
                                            "line": 2,
                                            "column": 44
                                          },
                                          "end": {
                                            "line": 2,
                                            "column": 48
                                          }
                                        },
                                        "name": "tail"
                                      }
                                    }
                                  ]
                                },
                                "kind": "init"
                              },
                              {
                                "type": "Property",
                                "start": 61,
                                "end": 65,
                                "loc": {
                                  "start": {
                                    "line": 2,
                                    "column": 51
                                  },
                                  "end": {
                                    "line": 2,
                                    "column": 55
                                  }
                                },
                                "method": false,
                                "shorthand": true,
                                "computed": false,
                                "key": {
                                  "type": "Identifier",
                                  "start": 61,
                                  "end": 65,
                                  "loc": {
                                    "start": {
                                      "line": 2,
                                      "column": 51
                                    },
                                    "end": {
                                      "line": 2,
                                      "column": 55
                                    }
                                  },
                                  "name": "name"
                                },
                                "kind": "init",
                                "value": {
                                  "type": "Identifier",
                                  "start": 61,
                                  "end": 65,
                                  "loc": {
                                    "start": {
                                      "line": 2,
                                      "column": 51
                                    },
                                    "end": {
                                      "line": 2,
                                      "column": 55
                                    }
                                  },
                                  "name": "name"
                                }
                              }
                            ]
                          }
                        ],
                        "body": {
                          "type": "BlockStatement",
                          "start": 68,
                          "end": 70,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 58
                            },
                            "end": {
                              "line": 2,
                              "column": 60
                            }
                          },
                          "body": []
                        }
                      }
                    },
                    {
                      "type": "MethodDefinition",
                      "start": 83,
                      "end": 126,
                      "loc": {
                        "start": {
                          "line": 3,
                          "column": 12
                        },
                        "end": {
                          "line": 3,
                          "column": 55
                        }
                      },
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 83,
                        "end": 89,
                        "loc": {
                          "start": {
                            "line": 3,
                            "column": 12
                          },
                          "end": {
                            "line": 3,
                            "column": 18
                          }
                        },
                        "name": "method"
                      },
                      "static": false,
                      "kind": "method",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 89,
                        "end": 126,
                        "loc": {
                          "start": {
                            "line": 3,
                            "column": 18
                          },
                          "end": {
                            "line": 3,
                            "column": 55
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [
                          {
                            "type": "ObjectPattern",
                            "start": 90,
                            "end": 122,
                            "loc": {
                              "start": {
                                "line": 3,
                                "column": 19
                              },
                              "end": {
                                "line": 3,
                                "column": 51
                              }
                            },
                            "properties": [
                              {
                                "type": "Property",
                                "start": 91,
                                "end": 115,
                                "loc": {
                                  "start": {
                                    "line": 3,
                                    "column": 20
                                  },
                                  "end": {
                                    "line": 3,
                                    "column": 44
                                  }
                                },
                                "method": false,
                                "shorthand": false,
                                "computed": false,
                                "key": {
                                  "type": "Identifier",
                                  "start": 91,
                                  "end": 98,
                                  "loc": {
                                    "start": {
                                      "line": 3,
                                      "column": 20
                                    },
                                    "end": {
                                      "line": 3,
                                      "column": 27
                                    }
                                  },
                                  "name": "message"
                                },
                                "value": {
                                  "type": "ArrayPattern",
                                  "start": 100,
                                  "end": 115,
                                  "loc": {
                                    "start": {
                                      "line": 3,
                                      "column": 29
                                    },
                                    "end": {
                                      "line": 3,
                                      "column": 44
                                    }
                                  },
                                  "elements": [
                                    {
                                      "type": "Identifier",
                                      "start": 101,
                                      "end": 105,
                                      "loc": {
                                        "start": {
                                          "line": 3,
                                          "column": 30
                                        },
                                        "end": {
                                          "line": 3,
                                          "column": 34
                                        }
                                      },
                                      "name": "head"
                                    },
                                    {
                                      "type": "RestElement",
                                      "start": 107,
                                      "end": 114,
                                      "loc": {
                                        "start": {
                                          "line": 3,
                                          "column": 36
                                        },
                                        "end": {
                                          "line": 3,
                                          "column": 43
                                        }
                                      },
                                      "argument": {
                                        "type": "Identifier",
                                        "start": 110,
                                        "end": 114,
                                        "loc": {
                                          "start": {
                                            "line": 3,
                                            "column": 39
                                          },
                                          "end": {
                                            "line": 3,
                                            "column": 43
                                          }
                                        },
                                        "name": "tail"
                                      }
                                    }
                                  ]
                                },
                                "kind": "init"
                              },
                              {
                                "type": "Property",
                                "start": 117,
                                "end": 121,
                                "loc": {
                                  "start": {
                                    "line": 3,
                                    "column": 46
                                  },
                                  "end": {
                                    "line": 3,
                                    "column": 50
                                  }
                                },
                                "method": false,
                                "shorthand": true,
                                "computed": false,
                                "key": {
                                  "type": "Identifier",
                                  "start": 117,
                                  "end": 121,
                                  "loc": {
                                    "start": {
                                      "line": 3,
                                      "column": 46
                                    },
                                    "end": {
                                      "line": 3,
                                      "column": 50
                                    }
                                  },
                                  "name": "name"
                                },
                                "kind": "init",
                                "value": {
                                  "type": "Identifier",
                                  "start": 117,
                                  "end": 121,
                                  "loc": {
                                    "start": {
                                      "line": 3,
                                      "column": 46
                                    },
                                    "end": {
                                      "line": 3,
                                      "column": 50
                                    }
                                  },
                                  "name": "name"
                                }
                              }
                            ]
                          }
                        ],
                        "body": {
                          "type": "BlockStatement",
                          "start": 124,
                          "end": 126,
                          "loc": {
                            "start": {
                              "line": 3,
                              "column": 53
                            },
                            "end": {
                              "line": 3,
                              "column": 55
                            }
                          },
                          "body": []
                        }
                      }
                    },
                    {
                      "type": "MethodDefinition",
                      "start": 139,
                      "end": 181,
                      "loc": {
                        "start": {
                          "line": 4,
                          "column": 12
                        },
                        "end": {
                          "line": 4,
                          "column": 54
                        }
                      },
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 143,
                        "end": 144,
                        "loc": {
                          "start": {
                            "line": 4,
                            "column": 16
                          },
                          "end": {
                            "line": 4,
                            "column": 17
                          }
                        },
                        "name": "x"
                      },
                      "static": false,
                      "kind": "set",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 144,
                        "end": 181,
                        "loc": {
                          "start": {
                            "line": 4,
                            "column": 17
                          },
                          "end": {
                            "line": 4,
                            "column": 54
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [
                          {
                            "type": "ObjectPattern",
                            "start": 145,
                            "end": 177,
                            "loc": {
                              "start": {
                                "line": 4,
                                "column": 18
                              },
                              "end": {
                                "line": 4,
                                "column": 50
                              }
                            },
                            "properties": [
                              {
                                "type": "Property",
                                "start": 146,
                                "end": 170,
                                "loc": {
                                  "start": {
                                    "line": 4,
                                    "column": 19
                                  },
                                  "end": {
                                    "line": 4,
                                    "column": 43
                                  }
                                },
                                "method": false,
                                "shorthand": false,
                                "computed": false,
                                "key": {
                                  "type": "Identifier",
                                  "start": 146,
                                  "end": 153,
                                  "loc": {
                                    "start": {
                                      "line": 4,
                                      "column": 19
                                    },
                                    "end": {
                                      "line": 4,
                                      "column": 26
                                    }
                                  },
                                  "name": "message"
                                },
                                "value": {
                                  "type": "ArrayPattern",
                                  "start": 155,
                                  "end": 170,
                                  "loc": {
                                    "start": {
                                      "line": 4,
                                      "column": 28
                                    },
                                    "end": {
                                      "line": 4,
                                      "column": 43
                                    }
                                  },
                                  "elements": [
                                    {
                                      "type": "Identifier",
                                      "start": 156,
                                      "end": 160,
                                      "loc": {
                                        "start": {
                                          "line": 4,
                                          "column": 29
                                        },
                                        "end": {
                                          "line": 4,
                                          "column": 33
                                        }
                                      },
                                      "name": "head"
                                    },
                                    {
                                      "type": "RestElement",
                                      "start": 162,
                                      "end": 169,
                                      "loc": {
                                        "start": {
                                          "line": 4,
                                          "column": 35
                                        },
                                        "end": {
                                          "line": 4,
                                          "column": 42
                                        }
                                      },
                                      "argument": {
                                        "type": "Identifier",
                                        "start": 165,
                                        "end": 169,
                                        "loc": {
                                          "start": {
                                            "line": 4,
                                            "column": 38
                                          },
                                          "end": {
                                            "line": 4,
                                            "column": 42
                                          }
                                        },
                                        "name": "tail"
                                      }
                                    }
                                  ]
                                },
                                "kind": "init"
                              },
                              {
                                "type": "Property",
                                "start": 172,
                                "end": 176,
                                "loc": {
                                  "start": {
                                    "line": 4,
                                    "column": 45
                                  },
                                  "end": {
                                    "line": 4,
                                    "column": 49
                                  }
                                },
                                "method": false,
                                "shorthand": true,
                                "computed": false,
                                "key": {
                                  "type": "Identifier",
                                  "start": 172,
                                  "end": 176,
                                  "loc": {
                                    "start": {
                                      "line": 4,
                                      "column": 45
                                    },
                                    "end": {
                                      "line": 4,
                                      "column": 49
                                    }
                                  },
                                  "name": "name"
                                },
                                "kind": "init",
                                "value": {
                                  "type": "Identifier",
                                  "start": 172,
                                  "end": 176,
                                  "loc": {
                                    "start": {
                                      "line": 4,
                                      "column": 45
                                    },
                                    "end": {
                                      "line": 4,
                                      "column": 49
                                    }
                                  },
                                  "name": "name"
                                }
                              }
                            ]
                          }
                        ],
                        "body": {
                          "type": "BlockStatement",
                          "start": 179,
                          "end": 181,
                          "loc": {
                            "start": {
                              "line": 4,
                              "column": 52
                            },
                            "end": {
                              "line": 4,
                              "column": 54
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
            "sourceType": "script"
          });
    });

    it('should parse "({x: {y = 7}, z = 8} = {x: {}});"', () => {
        expect(parseScript('({x: {y = 7}, z = 8} = {x: {}});', {
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
                  "type": "AssignmentExpression",
                  "start": 1,
                  "end": 30,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 30
                    }
                  },
                  "operator": "=",
                  "left": {
                    "type": "ObjectPattern",
                    "start": 1,
                    "end": 20,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 1
                      },
                      "end": {
                        "line": 1,
                        "column": 20
                      }
                    },
                    "properties": [
                      {
                        "type": "Property",
                        "start": 2,
                        "end": 12,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 2
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
                          "name": "x"
                        },
                        "value": {
                          "type": "ObjectPattern",
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
                          },
                          "properties": [
                            {
                              "type": "Property",
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
                              "method": false,
                              "shorthand": true,
                              "computed": false,
                              "key": {
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
                                "name": "y"
                              },
                              "kind": "init",
                              "value": {
                                "type": "AssignmentPattern",
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
                                  "name": "y"
                                },
                                "right": {
                                  "type": "Literal",
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
                                  "value": 7,
                                  "raw": "7"
                                }
                              }
                            }
                          ]
                        },
                        "kind": "init"
                      },
                      {
                        "type": "Property",
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
                        "method": false,
                        "shorthand": true,
                        "computed": false,
                        "key": {
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
                          "name": "z"
                        },
                        "kind": "init",
                        "value": {
                          "type": "AssignmentPattern",
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
                          "left": {
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
                            "name": "z"
                          },
                          "right": {
                            "type": "Literal",
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
                            "value": 8,
                            "raw": "8"
                          }
                        }
                      }
                    ]
                  },
                  "right": {
                    "type": "ObjectExpression",
                    "start": 23,
                    "end": 30,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 23
                      },
                      "end": {
                        "line": 1,
                        "column": 30
                      }
                    },
                    "properties": [
                      {
                        "type": "Property",
                        "start": 24,
                        "end": 29,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 24
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
                          "name": "x"
                        },
                        "value": {
                          "type": "ObjectExpression",
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
                          "properties": []
                        },
                        "kind": "init"
                      }
                    ]
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse on TopLevel', () => {
        expect(parseScript('[a, [b, c], d] = ["hello", [",", "junk"], ["world"]];', {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 53,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 53
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 53,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 53
                  }
                },
                "expression": {
                  "type": "AssignmentExpression",
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
                  "operator": "=",
                  "left": {
                    "type": "ArrayPattern",
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
                    "elements": [
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
                        "type": "ArrayPattern",
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
                            "name": "b"
                          },
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
                        "name": "d"
                      }
                    ]
                  },
                  "right": {
                    "type": "ArrayExpression",
                    "start": 17,
                    "end": 52,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 17
                      },
                      "end": {
                        "line": 1,
                        "column": 52
                      }
                    },
                    "elements": [
                      {
                        "type": "Literal",
                        "start": 18,
                        "end": 25,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 18
                          },
                          "end": {
                            "line": 1,
                            "column": 25
                          }
                        },
                        "value": "hello",
                        "raw": "\"hello\""
                      },
                      {
                        "type": "ArrayExpression",
                        "start": 27,
                        "end": 40,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 27
                          },
                          "end": {
                            "line": 1,
                            "column": 40
                          }
                        },
                        "elements": [
                          {
                            "type": "Literal",
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
                            "value": ",",
                            "raw": "\",\""
                          },
                          {
                            "type": "Literal",
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
                            "value": "junk",
                            "raw": "\"junk\""
                          }
                        ]
                      },
                      {
                        "type": "ArrayExpression",
                        "start": 42,
                        "end": 51,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 42
                          },
                          "end": {
                            "line": 1,
                            "column": 51
                          }
                        },
                        "elements": [
                          {
                            "type": "Literal",
                            "start": 43,
                            "end": 50,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 43
                              },
                              "end": {
                                "line": 1,
                                "column": 50
                              }
                            },
                            "value": "world",
                            "raw": "\"world\""
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "({ responseText: text } = res)"', () => {
        expect(parseScript('({ responseText: text } = res)', {
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
                "type": "ExpressionStatement",
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
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 1,
                  "end": 29,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 29
                    }
                  },
                  "operator": "=",
                  "left": {
                    "type": "ObjectPattern",
                    "start": 1,
                    "end": 23,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 1
                      },
                      "end": {
                        "line": 1,
                        "column": 23
                      }
                    },
                    "properties": [
                      {
                        "type": "Property",
                        "start": 3,
                        "end": 21,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 3
                          },
                          "end": {
                            "line": 1,
                            "column": 21
                          }
                        },
                        "method": false,
                        "shorthand": false,
                        "computed": false,
                        "key": {
                          "type": "Identifier",
                          "start": 3,
                          "end": 15,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 3
                            },
                            "end": {
                              "line": 1,
                              "column": 15
                            }
                          },
                          "name": "responseText"
                        },
                        "value": {
                          "type": "Identifier",
                          "start": 17,
                          "end": 21,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 17
                            },
                            "end": {
                              "line": 1,
                              "column": 21
                            }
                          },
                          "name": "text"
                        },
                        "kind": "init"
                      }
                    ]
                  },
                  "right": {
                    "type": "Identifier",
                    "start": 26,
                    "end": 29,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 26
                      },
                      "end": {
                        "line": 1,
                        "column": 29
                      }
                    },
                    "name": "res"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "const {a} = {}"', () => {
        expect(parseScript('const {a} = {}', {
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

    it('should parse "[a, b] = [b, a]"', () => {
        expect(parseScript('[a, b] = [b, a]', {
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
                  "type": "AssignmentExpression",
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
                  "operator": "=",
                  "left": {
                    "type": "ArrayPattern",
                    "start": 0,
                    "end": 6,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 6
                      }
                    },
                    "elements": [
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
                      }
                    ]
                  },
                  "right": {
                    "type": "ArrayExpression",
                    "start": 9,
                    "end": 15,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 9
                      },
                      "end": {
                        "line": 1,
                        "column": 15
                      }
                    },
                    "elements": [
                      {
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
                      },
                      {
                        "type": "Identifier",
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
                        "name": "a"
                      }
                    ]
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "[[x]] = 0"', () => {
        expect(parseScript('[[x]] = 0', {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
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
                "type": "ExpressionStatement",
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
                "expression": {
                    "type": "AssignmentExpression",
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
                    "operator": "=",
                    "left": {
                        "type": "ArrayPattern",
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
                        "elements": [{
                            "type": "ArrayPattern",
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
                            "elements": [{
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
                                "name": "x"
                            }]
                        }]
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
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse function destructed', () => {
        expect(parseScript(`function a({a}) {}`, {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
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
            "body": [{
                "type": "FunctionDeclaration",
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
                "params": [{
                    "type": "ObjectPattern",
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
                    "properties": [{
                        "type": "Property",
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
                        "method": false,
                        "shorthand": true,
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
                            "name": "a"
                        },
                        "kind": "init",
                        "value": {
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
                        }
                    }]
                }],
                "body": {
                    "type": "BlockStatement",
                    "start": 16,
                    "end": 18,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 16
                        },
                        "end": {
                            "line": 1,
                            "column": 18
                        }
                    },
                    "body": []
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse function destructed', () => {
        expect(parseScript(`function a({a} = {a: 1}) {}`, {
            ranges: true,
            locations: true,
            raw: true
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
            "body": [{
                "type": "FunctionDeclaration",
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
                "params": [{
                    "type": "AssignmentPattern",
                    "start": 11,
                    "end": 23,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 11
                        },
                        "end": {
                            "line": 1,
                            "column": 23
                        }
                    },
                    "left": {
                        "type": "ObjectPattern",
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
                        "properties": [{
                            "type": "Property",
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
                            "method": false,
                            "shorthand": true,
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
                                "name": "a"
                            },
                            "kind": "init",
                            "value": {
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
                            }
                        }]
                    },
                    "right": {
                        "type": "ObjectExpression",
                        "start": 17,
                        "end": 23,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 17
                            },
                            "end": {
                                "line": 1,
                                "column": 23
                            }
                        },
                        "properties": [{
                            "type": "Property",
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
                            },
                            "method": false,
                            "shorthand": false,
                            "computed": false,
                            "key": {
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
                                "name": "a"
                            },
                            "value": {
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
                            "kind": "init"
                        }]
                    }
                }],
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
            }],
            "sourceType": "script"
        });
    });
});
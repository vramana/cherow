import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Destructuring - Spread', () => {

    it('should fail on invalid not final array empty', () => {
        expect(() => {
            parseScript(' [...a, ] = b;')
        }).to.not.throw()
    });

    it('should fail on not finale array', () => {
        expect(() => {
            parseScript('[...a, b] = c;')
        }).to.not.throw()
    });

    it('should fail on complex destructred spread first', () => {
        expect(() => {
            parseScript('[...c, { a, b }] = d;')
        }).to.not.throw()
    });

    it('should parse single destructed', () => {
        expect(parseScript('[...a] = b;', {
            ranges: true,
            locations: true,
            raw: true
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
                        "type": "RestElement",
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
                        "argument": {
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
                        }
                      }
                    ]
                  },
                  "right": {
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
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse var complex destructed', () => {
        expect(parseScript('var [{ a, b }, ...c] = d;', {
            ranges: true,
            locations: true,
            raw: true
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
                    "start": 4,
                    "end": 24,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 4
                      },
                      "end": {
                        "line": 1,
                        "column": 24
                      }
                    },
                    "id": {
                      "type": "ArrayPattern",
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
                      "elements": [
                        {
                          "type": "ObjectPattern",
                          "start": 5,
                          "end": 13,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 5
                            },
                            "end": {
                              "line": 1,
                              "column": 13
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
                            },
                            {
                              "type": "Property",
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
                              "method": false,
                              "shorthand": true,
                              "computed": false,
                              "key": {
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
                              "kind": "init",
                              "value": {
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
                          ]
                        },
                        {
                          "type": "RestElement",
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
                    },
                    "init": {
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
                      "name": "d"
                    }
                  }
                ],
                "kind": "var"
              }
            ],
            "sourceType": "script"
          });
    });

    
    it('should parse destructed array literal"', () => {
      expect(parseScript('var [a, ...[b, c]] = d', {
          ranges: true,
          raw: true,
          locations: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 22,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 22
          }
        },
        "body": [
          {
            "type": "VariableDeclaration",
            "start": 0,
            "end": 22,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 22
              }
            },
            "declarations": [
              {
                "type": "VariableDeclarator",
                "start": 4,
                "end": 22,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 4
                  },
                  "end": {
                    "line": 1,
                    "column": 22
                  }
                },
                "id": {
                  "type": "ArrayPattern",
                  "start": 4,
                  "end": 18,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 4
                    },
                    "end": {
                      "line": 1,
                      "column": 18
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
                      "argument": {
                        "type": "ArrayPattern",
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
                            "name": "b"
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
                    }
                  ]
                },
                "init": {
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
                  "name": "d"
                }
              }
            ],
            "kind": "var"
          }
        ],
        "sourceType": "script"
      });
    });
    
    it('should parse destructed array literal"', () => {
      expect(parseScript('[a, ...b] = c', {
          ranges: true,
          raw: true,
          locations: true
      })).to.eql({
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
            "type": "ExpressionStatement",
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
            "expression": {
              "type": "AssignmentExpression",
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
              "operator": "=",
              "left": {
                "type": "ArrayPattern",
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
                    "type": "RestElement",
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
                    "argument": {
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
                      "name": "b"
                    }
                  }
                ]
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
                "name": "c"
              }
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse destructed arrat literal"', () => {
        expect(parseScript('[a, ...[b, c]] = d;', {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
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
            },
            "body": [
              {
                "type": "ExpressionStatement",
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
                },
                "expression": {
                  "type": "AssignmentExpression",
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
                        "type": "RestElement",
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
                        "argument": {
                          "type": "ArrayPattern",
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
                              "name": "b"
                            },
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
                          ]
                        }
                      }
                    ]
                  },
                  "right": {
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
                    "name": "d"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    
});
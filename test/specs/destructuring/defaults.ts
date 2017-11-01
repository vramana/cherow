import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Destructuring - Defaults', () => {
    
    it('should fail on "function h({ a, { b } }, { c }, { { d } }) { return a + b + c + d; }"', () => {
        expect(() => {
            parseScript('function h({ a, { b } }, { c }, { { d } }) { return a + b + c + d; }')
        }).to.throw()
    });
     
    it('should parse "function a({x = 10}) {}"', () => {
        expect(parseScript('function a({x = 10}) {}', {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
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
                "type": "FunctionDeclaration",
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
                "params": [
                  {
                    "type": "ObjectPattern",
                    "start": 11,
                    "end": 19,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 11
                      },
                      "end": {
                        "line": 1,
                        "column": 19
                      }
                    },
                    "properties": [
                      {
                        "type": "Property",
                        "start": 12,
                        "end": 18,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 12
                          },
                          "end": {
                            "line": 1,
                            "column": 18
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
                          "name": "x"
                        },
                        "kind": "init",
                        "value": {
                          "type": "AssignmentPattern",
                          "start": 12,
                          "end": 18,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 12
                            },
                            "end": {
                              "line": 1,
                              "column": 18
                            }
                          },
                          "left": {
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
                          "right": {
                            "type": "Literal",
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
                            "value": 10,
                            "raw": "10"
                          }
                        }
                      }
                    ]
                  }
                ],
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
            ],
            "sourceType": "script"
          });
    });

    it('should parse "function a({x = 10, y: { z = 10 }}) {}"', () => {
        expect(parseScript('function a({x = 10, y: { z = 10 }}) {}', {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
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
                "params": [
                  {
                    "type": "ObjectPattern",
                    "start": 11,
                    "end": 34,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 11
                      },
                      "end": {
                        "line": 1,
                        "column": 34
                      }
                    },
                    "properties": [
                      {
                        "type": "Property",
                        "start": 12,
                        "end": 18,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 12
                          },
                          "end": {
                            "line": 1,
                            "column": 18
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
                          "name": "x"
                        },
                        "kind": "init",
                        "value": {
                          "type": "AssignmentPattern",
                          "start": 12,
                          "end": 18,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 12
                            },
                            "end": {
                              "line": 1,
                              "column": 18
                            }
                          },
                          "left": {
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
                          "right": {
                            "type": "Literal",
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
                            "value": 10,
                            "raw": "10"
                          }
                        }
                      },
                      {
                        "type": "Property",
                        "start": 20,
                        "end": 33,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 20
                          },
                          "end": {
                            "line": 1,
                            "column": 33
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
                          "name": "y"
                        },
                        "value": {
                          "type": "ObjectPattern",
                          "start": 23,
                          "end": 33,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 23
                            },
                            "end": {
                              "line": 1,
                              "column": 33
                            }
                          },
                          "properties": [
                            {
                              "type": "Property",
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
                              "method": false,
                              "shorthand": true,
                              "computed": false,
                              "key": {
                                "type": "Identifier",
                                "start": 25,
                                "end": 26,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 25
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 26
                                  }
                                },
                                "name": "z"
                              },
                              "kind": "init",
                              "value": {
                                "type": "AssignmentPattern",
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
                                "left": {
                                  "type": "Identifier",
                                  "start": 25,
                                  "end": 26,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 25
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 26
                                    }
                                  },
                                  "name": "z"
                                },
                                "right": {
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
                                  "value": 10,
                                  "raw": "10"
                                }
                              }
                            }
                          ]
                        },
                        "kind": "init"
                      }
                    ]
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "start": 36,
                  "end": 38,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 36
                    },
                    "end": {
                      "line": 1,
                      "column": 38
                    }
                  },
                  "body": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "({x = 10}) => x"', () => {
        expect(parseScript('({x = 10}) => x', {
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
                  "type": "ArrowFunctionExpression",
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
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "ObjectPattern",
                      "start": 1,
                      "end": 9,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 1
                        },
                        "end": {
                          "line": 1,
                          "column": 9
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 2,
                          "end": 8,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 2
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
                          "kind": "init",
                          "value": {
                            "type": "AssignmentPattern",
                            "start": 2,
                            "end": 8,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 2
                              },
                              "end": {
                                "line": 1,
                                "column": 8
                              }
                            },
                            "left": {
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
                            "right": {
                              "type": "Literal",
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
                              "value": 10,
                              "raw": "10"
                            }
                          }
                        }
                      ]
                    }
                  ],
                  "body": {
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
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "({x = 10, y: { z = 10 }}) => [x,y]"', () => {
        expect(parseScript('({x = 10, y: { z = 10 }}) => [x,y]', {
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
                "type": "ExpressionStatement",
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
                "expression": {
                  "type": "ArrowFunctionExpression",
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
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "ObjectPattern",
                      "start": 1,
                      "end": 24,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 1
                        },
                        "end": {
                          "line": 1,
                          "column": 24
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 2,
                          "end": 8,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 2
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
                          "kind": "init",
                          "value": {
                            "type": "AssignmentPattern",
                            "start": 2,
                            "end": 8,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 2
                              },
                              "end": {
                                "line": 1,
                                "column": 8
                              }
                            },
                            "left": {
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
                            "right": {
                              "type": "Literal",
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
                              "value": 10,
                              "raw": "10"
                            }
                          }
                        },
                        {
                          "type": "Property",
                          "start": 10,
                          "end": 23,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 10
                            },
                            "end": {
                              "line": 1,
                              "column": 23
                            }
                          },
                          "method": false,
                          "shorthand": false,
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
                            "name": "y"
                          },
                          "value": {
                            "type": "ObjectPattern",
                            "start": 13,
                            "end": 23,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 13
                              },
                              "end": {
                                "line": 1,
                                "column": 23
                              }
                            },
                            "properties": [
                              {
                                "type": "Property",
                                "start": 15,
                                "end": 21,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 15
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 21
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
                                  "name": "z"
                                },
                                "kind": "init",
                                "value": {
                                  "type": "AssignmentPattern",
                                  "start": 15,
                                  "end": 21,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 15
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 21
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
                                    "name": "z"
                                  },
                                  "right": {
                                    "type": "Literal",
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
                                    "value": 10,
                                    "raw": "10"
                                  }
                                }
                              }
                            ]
                          },
                          "kind": "init"
                        }
                      ]
                    }
                  ],
                  "body": {
                    "type": "ArrayExpression",
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
                    "elements": [
                      {
                        "type": "Identifier",
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
                        "name": "x"
                      },
                      {
                        "type": "Identifier",
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
                        },
                        "name": "y"
                      }
                    ]
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "[a=10] = 0"', () => {
        expect(parseScript('[a=10] = 0', {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
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
            "body": [
              {
                "type": "ExpressionStatement",
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
                        "type": "AssignmentPattern",
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
                        "left": {
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
                        "right": {
                          "type": "Literal",
                          "start": 3,
                          "end": 5,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 3
                            },
                            "end": {
                              "line": 1,
                              "column": 5
                            }
                          },
                          "value": 10,
                          "raw": "10"
                        }
                      }
                    ]
                  },
                  "right": {
                    "type": "Literal",
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
                    "value": 0,
                    "raw": "0"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "var {a = 10} = {}"', () => {
        expect(parseScript('var {a = 10} = {}', {
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
            "body": [
              {
                "type": "VariableDeclaration",
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
                      "type": "ObjectPattern",
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
                      "properties": [
                        {
                          "type": "Property",
                          "start": 5,
                          "end": 11,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 5
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
                          "kind": "init",
                          "value": {
                            "type": "AssignmentPattern",
                            "start": 5,
                            "end": 11,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 5
                              },
                              "end": {
                                "line": 1,
                                "column": 11
                              }
                            },
                            "left": {
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
                            "right": {
                              "type": "Literal",
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
                              "value": 10,
                              "raw": "10"
                            }
                          }
                        }
                      ]
                    },
                    "init": {
                      "type": "ObjectExpression",
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
                      "properties": []
                    }
                  }
                ],
                "kind": "var"
              }
            ],
            "sourceType": "script"
          });
    });
});
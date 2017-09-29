import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Espressions - Addition', () => {

    it('expect "3 = 4" to throw', () => {
        expect(() => {
            parseScript('3 = 4');
        }).to.throw();
    });

    it('expect "(1 + 1) = 10" to throw', () => {
        expect(() => {
            parseScript('(1 + 1) = 10');
        }).to.throw();
    });

    it('should parse "({} + function(){return 1})"', () => {
      expect(parseScript('({} + function(){return 1})', {
          raw: true,
          ranges: true,
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
            "type": "ExpressionStatement",
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
            "expression": {
              "type": "BinaryExpression",
              "start": 1,
              "end": 26,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 1
                },
                "end": {
                  "line": 1,
                  "column": 26
                }
              },
              "left": {
                "type": "ObjectExpression",
                "start": 1,
                "end": 3,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 1
                  },
                  "end": {
                    "line": 1,
                    "column": 3
                  }
                },
                "properties": []
              },
              "operator": "+",
              "right": {
                "type": "FunctionExpression",
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
                "id": null,
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 16,
                  "end": 26,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 16
                    },
                    "end": {
                      "line": 1,
                      "column": 26
                    }
                  },
                  "body": [
                    {
                      "type": "ReturnStatement",
                      "start": 17,
                      "end": 25,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 17
                        },
                        "end": {
                          "line": 1,
                          "column": 25
                        }
                      },
                      "argument": {
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
                        "value": 1,
                        "raw": "1"
                      }
                    }
                  ]
                }
              }
            }
          }
        ],
        "sourceType": "script"
      });
    });
    
    
    it('should parse "(function(){return 1} + function(){return 1})"', () => {
      expect(parseScript('(function(){return 1} + function(){return 1})', {
          raw: true,
          ranges: true,
          locations: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 45,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 45
          }
        },
        "body": [
          {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 45,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 45
              }
            },
            "expression": {
              "type": "BinaryExpression",
              "start": 1,
              "end": 44,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 1
                },
                "end": {
                  "line": 1,
                  "column": 44
                }
              },
              "left": {
                "type": "FunctionExpression",
                "start": 1,
                "end": 21,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 1
                  },
                  "end": {
                    "line": 1,
                    "column": 21
                  }
                },
                "id": null,
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 11,
                  "end": 21,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 11
                    },
                    "end": {
                      "line": 1,
                      "column": 21
                    }
                  },
                  "body": [
                    {
                      "type": "ReturnStatement",
                      "start": 12,
                      "end": 20,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 12
                        },
                        "end": {
                          "line": 1,
                          "column": 20
                        }
                      },
                      "argument": {
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
                  ]
                }
              },
              "operator": "+",
              "right": {
                "type": "FunctionExpression",
                "start": 24,
                "end": 44,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 24
                  },
                  "end": {
                    "line": 1,
                    "column": 44
                  }
                },
                "id": null,
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 34,
                  "end": 44,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 34
                    },
                    "end": {
                      "line": 1,
                      "column": 44
                    }
                  },
                  "body": [
                    {
                      "type": "ReturnStatement",
                      "start": 35,
                      "end": 43,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 35
                        },
                        "end": {
                          "line": 1,
                          "column": 43
                        }
                      },
                      "argument": {
                        "type": "Literal",
                        "start": 42,
                        "end": 43,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 42
                          },
                          "end": {
                            "line": 1,
                            "column": 43
                          }
                        },
                        "value": 1,
                        "raw": "1"
                      }
                    }
                  ]
                }
              }
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse "({} + {})"', () => {
      expect(parseScript('({} + {})', {
          raw: true,
          ranges: true,
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
        "body": [
          {
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
              "type": "BinaryExpression",
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
              "left": {
                "type": "ObjectExpression",
                "start": 1,
                "end": 3,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 1
                  },
                  "end": {
                    "line": 1,
                    "column": 3
                  }
                },
                "properties": []
              },
              "operator": "+",
              "right": {
                "type": "ObjectExpression",
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
              }
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse "true + "1""', () => {
      expect(parseScript('true + "1"', {
          raw: true,
          ranges: true,
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
              "type": "BinaryExpression",
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
              "left": {
                "type": "Literal",
                "start": 0,
                "end": 4,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 4
                  }
                },
                "value": true,
                "raw": "true"
              },
              "operator": "+",
              "right": {
                "type": "Literal",
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
                "value": "1",
                "raw": "\"1\""
              }
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse "1 + y;"', () => {
      expect(parseScript('1 + y;', {
          raw: true,
          ranges: true,
          locations: true
      })).to.eql({
        "type": "Program",
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
        "body": [
          {
            "type": "ExpressionStatement",
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
            "expression": {
              "type": "BinaryExpression",
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
              "left": {
                "type": "Literal",
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
                "value": 1,
                "raw": "1"
              },
              "operator": "+",
              "right": {
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
                "name": "y"
              }
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse "1 + 1 !== 2"', () => {
        expect(parseScript('1 + 1 !== 2', {
            raw: true,
            ranges: true,
            locations: true
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
            "body": [{
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
                    "type": "BinaryExpression",
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
                    "left": {
                        "type": "BinaryExpression",
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
                        "left": {
                            "type": "Literal",
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
                            "value": 1,
                            "raw": "1"
                        },
                        "operator": "+",
                        "right": {
                            "type": "Literal",
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
                            "value": 1,
                            "raw": "1"
                        }
                    },
                    "operator": "!==",
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
                        "value": 2,
                        "raw": "2"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "-0 + -0"', () => {
        expect(parseScript('-0 + -0', {
            raw: true,
            ranges: true,
            locations: true
        })).to.eql({
            "type": "Program",
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
            "body": [{
                "type": "ExpressionStatement",
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
                "expression": {
                    "type": "BinaryExpression",
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
                    "left": {
                        "type": "UnaryExpression",
                        "start": 0,
                        "end": 2,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 2
                            }
                        },
                        "operator": "-",
                        "prefix": true,
                        "argument": {
                            "type": "Literal",
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
                            "value": 0,
                            "raw": "0"
                        }
                    },
                    "operator": "+",
                    "right": {
                        "type": "UnaryExpression",
                        "start": 5,
                        "end": 7,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 5
                            },
                            "end": {
                                "line": 1,
                                "column": 7
                            }
                        },
                        "operator": "-",
                        "prefix": true,
                        "argument": {
                            "type": "Literal",
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
                            "value": 0,
                            "raw": "0"
                        }
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "0 + -0"', () => {
        expect(parseScript('0 + -0', {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "+",
                    "left": {
                        "type": "Literal",
                        "value": 0,
                        "raw": "0"
                    },
                    "right": {
                        "type": "UnaryExpression",
                        "operator": "-",
                        "argument": {
                            "type": "Literal",
                            "value": 0,
                            "raw": "0"
                        },
                        "prefix": true
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "0 + 0"', () => {
        expect(parseScript('0 + 0', {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "+",
                    "left": {
                        "type": "Literal",
                        "value": 0,
                        "raw": "0"
                    },
                    "right": {
                        "type": "Literal",
                        "value": 0,
                        "raw": "0"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "1" + "1"', () => {
        expect(parseScript('"1" + "1"', {
            raw: true
        })).to.eql({
            "body": [{
                "expression": {
                    "left": {
                        "raw": "\"1\"",
                        "type": "Literal",
                        "value": "1"
                    },
                    "operator": "+",
                    "right": {
                        "raw": "\"1\"",
                        "type": "Literal",
                        "value": "1"
                    },
                    "type": "BinaryExpression"
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse "1 + null"', () => {
        expect(parseScript('1 + null', {
            raw: true
        })).to.eql({
            "body": [{
                "expression": {
                    "left": {
                        "raw": "1",
                        "type": "Literal",
                        "value": 1
                    },
                    "operator": "+",
                    "right": {
                        "type": "Literal",
                        "value": null,
                        "raw": "null",
                    },
                    "type": "BinaryExpression"
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse "(x = 1) + x"', () => {
        expect(parseScript('(x = 1) + x', {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "+",
                    "left": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "right": {
                            "type": "Literal",
                            "value": 1,
                            "raw": "1"
                        }
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "x"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

});
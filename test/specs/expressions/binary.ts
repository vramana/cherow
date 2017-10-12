import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Espressions - binary', () => {

    it('should parse "x + y + z"', () => {
        expect(parseScript('x + y + z', {
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
                      "name": "x"
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
                  },
                  "operator": "+",
                  "right": {
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
                    "name": "z"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "x - y + z"', () => {
        expect(parseScript('x - y + z', {
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
                      "name": "x"
                    },
                    "operator": "-",
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
                  },
                  "operator": "+",
                  "right": {
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
                    "name": "z"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "a < !(--b)"', () => {
        expect(parseModule('a < !(--b)', {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 10,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 10,
                "expression": {
                  "type": "BinaryExpression",
                  "start": 0,
                  "end": 10,
                  "left": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 1,
                    "name": "a"
                  },
                  "operator": "<",
                  "right": {
                    "type": "UnaryExpression",
                    "start": 4,
                    "end": 10,
                    "operator": "!",
                    "prefix": true,
                    "argument": {
                      "type": "UpdateExpression",
                      "start": 6,
                      "end": 9,
                      "operator": "--",
                      "prefix": true,
                      "argument": {
                        "type": "Identifier",
                        "start": 8,
                        "end": 9,
                        "name": "b"
                      }
                    }
                  }
                }
              }
            ],
            "sourceType": "module"
          });
    });
    
    it('should parse "x - y + z"', () => {
        expect(parseModule('1 <!--b')).to.eql({
              "body": [
                {
                  "expression": {
                    "left": {
                     "type": "Literal",
                      "value": 1,
                    },
                   "operator": "<",
                    "right": {
                      "argument": {
                        "argument": {
                          "name": "b",
                          "type": "Identifier"
                        },
                        "operator": "--",
                        "prefix": true,
                        "type": "UpdateExpression"
                      },
                      "operator": "!",
                      "prefix": true,
                      "type": "UnaryExpression"
                    },
                    "type": "BinaryExpression"
                  },
                  "type": "ExpressionStatement"
                }
              ],
              "sourceType": "module",
              "type": "Program"
            });
    });

    it('should parse "x + y - z"', () => {
        expect(parseScript('x + y - z', {
            locations: true,
            raw: true,
            ranges: true
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
                      "name": "x"
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
                  },
                  "operator": "-",
                  "right": {
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
                    "name": "z"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "x - y - z"', () => {
        expect(parseScript('x - y - z', {
            locations: true,
            raw: true,
            ranges: true
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
                      "name": "x"
                    },
                    "operator": "-",
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
                  },
                  "operator": "-",
                  "right": {
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
                    "name": "z"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "x + y * z"', () => {
        expect(parseScript('x + y * z', {
            locations: true,
            raw: true,
            ranges: true
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
                    "name": "x"
                  },
                  "operator": "+",
                  "right": {
                    "type": "BinaryExpression",
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
                    "left": {
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
                    },
                    "operator": "*",
                    "right": {
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
                      "name": "z"
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "x + y / z"', () => {
        expect(parseScript('x + y / z', {
            locations: true,
            raw: true,
            ranges: true
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
                    "name": "x"
                  },
                  "operator": "+",
                  "right": {
                    "type": "BinaryExpression",
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
                    "left": {
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
                    },
                    "operator": "/",
                    "right": {
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
                      "name": "z"
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "x - y % z"', () => {
        expect(parseScript('x - y % z', {
            locations: true,
            raw: true,
            ranges: true
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
                    "name": "x"
                  },
                  "operator": "-",
                  "right": {
                    "type": "BinaryExpression",
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
                    "left": {
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
                    },
                    "operator": "%",
                    "right": {
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
                      "name": "z"
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "x * y * z"', () => {
        expect(parseScript('x * y * z', {
            locations: true,
            raw: true,
            ranges: true
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
                      "name": "x"
                    },
                    "operator": "*",
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
                  },
                  "operator": "*",
                  "right": {
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
                    "name": "z"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "x * y / z"', () => {
        expect(parseScript('x * y / z', {
            locations: true,
            raw: true,
            ranges: true
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
                      "name": "x"
                    },
                    "operator": "*",
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
                  },
                  "operator": "/",
                  "right": {
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
                    "name": "z"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "x * y % z"', () => {
        expect(parseScript('x * y % z', {
            locations: true,
            raw: true,
            ranges: true
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
                      "name": "x"
                    },
                    "operator": "*",
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
                  },
                  "operator": "%",
                  "right": {
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
                    "name": "z"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "x % y * z"', () => {
        expect(parseScript('x % y * z', {
            locations: true,
            raw: true,
            ranges: true
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
                      "name": "x"
                    },
                    "operator": "%",
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
                  },
                  "operator": "*",
                  "right": {
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
                    "name": "z"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "x << y << z"', () => {
        expect(parseScript('x << y << z', {
            locations: true,
            raw: true,
            ranges: true
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
                      "name": "x"
                    },
                    "operator": "<<",
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
                      "name": "y"
                    }
                  },
                  "operator": "<<",
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
                    "name": "z"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "x | y | z"', () => {
        expect(parseScript('x | y | z', {
            locations: true,
            raw: true,
            ranges: true
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
                      "name": "x"
                    },
                    "operator": "|",
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
                  },
                  "operator": "|",
                  "right": {
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
                    "name": "z"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "x & y & z"', () => {
        expect(parseScript('x & y & z', {
            locations: true,
            raw: true,
            ranges: true
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
                      "name": "x"
                    },
                    "operator": "&",
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
                  },
                  "operator": "&",
                  "right": {
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
                    "name": "z"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "x ^ y ^ z"', () => {
        expect(parseScript('x ^ y ^ z', {
            locations: true,
            raw: true,
            ranges: true
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
                      "name": "x"
                    },
                    "operator": "^",
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
                  },
                  "operator": "^",
                  "right": {
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
                    "name": "z"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "x & y | z"', () => {
        expect(parseScript('x & y | z')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "|",
                    "left": {
                        "type": "BinaryExpression",
                        "operator": "&",
                        "left": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "y"
                        }
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "z"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "x | y ^ z"', () => {
        expect(parseScript('x | y ^ z', {
            locations: true,
            raw: true,
            ranges: true
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
                    "name": "x"
                  },
                  "operator": "|",
                  "right": {
                    "type": "BinaryExpression",
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
                    "left": {
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
                    },
                    "operator": "^",
                    "right": {
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
                      "name": "z"
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "x | y & z"', () => {
        expect(parseScript('x | y & z', {
            locations: true,
            raw: true,
            ranges: true
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
                    "name": "x"
                  },
                  "operator": "|",
                  "right": {
                    "type": "BinaryExpression",
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
                    "left": {
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
                    },
                    "operator": "&",
                    "right": {
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
                      "name": "z"
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    
    it('should parse "a || b && c | d ^ e & f == g < h >>> i + j * k"', () => {
      expect(parseScript('a || b && c | d ^ e & f == g < h >>> i + j * k', {
          ranges: true,
          raw: true,
          locations: true
      })).to.eql({
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
            "type": "ExpressionStatement",
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
            "expression": {
              "type": "LogicalExpression",
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
              "operator": "||",
              "right": {
                "type": "LogicalExpression",
                "start": 5,
                "end": 46,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 5
                  },
                  "end": {
                    "line": 1,
                    "column": 46
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
                  "name": "b"
                },
                "operator": "&&",
                "right": {
                  "type": "BinaryExpression",
                  "start": 10,
                  "end": 46,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 10
                    },
                    "end": {
                      "line": 1,
                      "column": 46
                    }
                  },
                  "left": {
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
                    "name": "c"
                  },
                  "operator": "|",
                  "right": {
                    "type": "BinaryExpression",
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
                      "name": "d"
                    },
                    "operator": "^",
                    "right": {
                      "type": "BinaryExpression",
                      "start": 18,
                      "end": 46,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 18
                        },
                        "end": {
                          "line": 1,
                          "column": 46
                        }
                      },
                      "left": {
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
                        "name": "e"
                      },
                      "operator": "&",
                      "right": {
                        "type": "BinaryExpression",
                        "start": 22,
                        "end": 46,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 22
                          },
                          "end": {
                            "line": 1,
                            "column": 46
                          }
                        },
                        "left": {
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
                          "name": "f"
                        },
                        "operator": "==",
                        "right": {
                          "type": "BinaryExpression",
                          "start": 27,
                          "end": 46,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 27
                            },
                            "end": {
                              "line": 1,
                              "column": 46
                            }
                          },
                          "left": {
                            "type": "Identifier",
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
                            "name": "g"
                          },
                          "operator": "<",
                          "right": {
                            "type": "BinaryExpression",
                            "start": 31,
                            "end": 46,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 31
                              },
                              "end": {
                                "line": 1,
                                "column": 46
                              }
                            },
                            "left": {
                              "type": "Identifier",
                              "start": 31,
                              "end": 32,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 31
                                },
                                "end": {
                                  "line": 1,
                                  "column": 32
                                }
                              },
                              "name": "h"
                            },
                            "operator": ">>>",
                            "right": {
                              "type": "BinaryExpression",
                              "start": 37,
                              "end": 46,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 37
                                },
                                "end": {
                                  "line": 1,
                                  "column": 46
                                }
                              },
                              "left": {
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
                                "name": "i"
                              },
                              "operator": "+",
                              "right": {
                                "type": "BinaryExpression",
                                "start": 41,
                                "end": 46,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 41
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 46
                                  }
                                },
                                "left": {
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
                                  "name": "j"
                                },
                                "operator": "*",
                                "right": {
                                  "type": "Identifier",
                                  "start": 45,
                                  "end": 46,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 45
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 46
                                    }
                                  },
                                  "name": "k"
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        ],
        "sourceType": "script"
      });
  });
});
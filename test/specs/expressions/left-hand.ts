import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Espressions - Left-hand side', () => {

    it('should fail on "({a: b += 0} = {})', () => {
      expect(() => {
          expect(parseScript('({a: b += 0} = {})'))
      }).to.throw('');
    });

    it('should fail on "[a += b] = []', () => {
      expect(() => {
          expect(parseScript('[a += b] = []'))
        }).to.throw('');
    });

    it('should fail on "a[0]-- = 12', () => {
      expect(() => {
          expect(parseScript('a[0]-- = 12'))
        }).to.throw('');
    });
    
    it('should parse "a.b(b, c)"', () => {
        expect(parseScript('a.b(b, c)', {
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
                  "type": "CallExpression",
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
                  "callee": {
                    "type": "MemberExpression",
                    "start": 0,
                    "end": 3,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 3
                      }
                    },
                    "object": {
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
                    "property": {
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
                      "name": "b"
                    },
                    "computed": false
                  },
                  "arguments": [
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
                      "name": "c"
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "a[b](b,c)"', () => {
        expect(parseScript('a[b](b,c)', {
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
                  "type": "CallExpression",
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
                  "callee": {
                    "type": "MemberExpression",
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
                    "object": {
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
                    "property": {
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
                      "name": "b"
                    },
                    "computed": true
                  },
                  "arguments": [
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
                      "name": "c"
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "a[0].b"', () => {
        expect(parseScript('a[0].b', {
            ranges: true,
            raw: true,
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
                  "type": "MemberExpression",
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
                  "object": {
                    "type": "MemberExpression",
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
                    "object": {
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
                    "property": {
                      "type": "Literal",
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
                      "value": 0,
                      "raw": "0"
                    },
                    "computed": true
                  },
                  "property": {
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
                  "computed": false
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "a(0).b"', () => {
        expect(parseScript('a(0).b', {
            ranges: true,
            raw: true,
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
                  "type": "MemberExpression",
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
                  "object": {
                    "type": "CallExpression",
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
                    "callee": {
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
                    "arguments": [
                      {
                        "type": "Literal",
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
                        "value": 0,
                        "raw": "0"
                      }
                    ]
                  },
                  "property": {
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
                  "computed": false
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "a(0).b(14, 3, 77).c"', () => {
        expect(parseScript('a(0).b(14, 3, 77).c', {
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
                  "type": "MemberExpression",
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
                  "object": {
                    "type": "CallExpression",
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
                    "callee": {
                      "type": "MemberExpression",
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
                      "object": {
                        "type": "CallExpression",
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
                        "callee": {
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
                        "arguments": [
                          {
                            "type": "Literal",
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
                            "value": 0,
                            "raw": "0"
                          }
                        ]
                      },
                      "property": {
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
                      "computed": false
                    },
                    "arguments": [
                      {
                        "type": "Literal",
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
                        "value": 14,
                        "raw": "14"
                      },
                      {
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
                        "value": 3,
                        "raw": "3"
                      },
                      {
                        "type": "Literal",
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
                        "value": 77,
                        "raw": "77"
                      }
                    ]
                  },
                  "property": {
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
                  },
                  "computed": false
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "a.b.c(2017)"', () => {
        expect(parseScript('a.b.c(2017)', {
            ranges: true,
            raw: true,
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
                  "type": "CallExpression",
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
                  "callee": {
                    "type": "MemberExpression",
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
                    "object": {
                      "type": "MemberExpression",
                      "start": 0,
                      "end": 3,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 0
                        },
                        "end": {
                          "line": 1,
                          "column": 3
                        }
                      },
                      "object": {
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
                      "property": {
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
                        "name": "b"
                      },
                      "computed": false
                    },
                    "property": {
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
                      "name": "c"
                    },
                    "computed": false
                  },
                  "arguments": [
                    {
                      "type": "Literal",
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
                      "value": 2017,
                      "raw": "2017"
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "(    foo  )()"', () => {
      expect(parseScript(`(    foo  )()`, {
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
              "type": "CallExpression",
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
              "callee": {
                "type": "Identifier",
                "start": 5,
                "end": 8,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 5
                  },
                  "end": {
                    "line": 1,
                    "column": 8
                  }
                },
                "name": "foo"
              },
              "arguments": []
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse "esprima.acorn.shift.sucks"', () => {
      expect(parseScript(`esprima.acorn.shift.sucks`, {
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
            "type": "ExpressionStatement",
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
            "expression": {
              "type": "MemberExpression",
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
              "object": {
                "type": "MemberExpression",
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
                "object": {
                  "type": "MemberExpression",
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
                  "object": {
                    "type": "Identifier",
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
                    "name": "esprima"
                  },
                  "property": {
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
                    "name": "acorn"
                  },
                  "computed": false
                },
                "property": {
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
                  "name": "shift"
                },
                "computed": false
              },
              "property": {
                "type": "Identifier",
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
                "name": "sucks"
              },
              "computed": false
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse "acorn.esprima.shift.and.babylon.sucks.too"', () => {
      expect(parseScript(`acorn.esprima.shift.and.babylon.sucks.too`, {
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
            "line": 1,
            "column": 41
          }
        },
        "body": [
          {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 41,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 41
              }
            },
            "expression": {
              "type": "MemberExpression",
              "start": 0,
              "end": 41,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 41
                }
              },
              "object": {
                "type": "MemberExpression",
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
                "object": {
                  "type": "MemberExpression",
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
                  "object": {
                    "type": "MemberExpression",
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
                    "object": {
                      "type": "MemberExpression",
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
                      "object": {
                        "type": "MemberExpression",
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
                        "object": {
                          "type": "Identifier",
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
                          "name": "acorn"
                        },
                        "property": {
                          "type": "Identifier",
                          "start": 6,
                          "end": 13,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 6
                            },
                            "end": {
                              "line": 1,
                              "column": 13
                            }
                          },
                          "name": "esprima"
                        },
                        "computed": false
                      },
                      "property": {
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
                        "name": "shift"
                      },
                      "computed": false
                    },
                    "property": {
                      "type": "Identifier",
                      "start": 20,
                      "end": 23,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 20
                        },
                        "end": {
                          "line": 1,
                          "column": 23
                        }
                      },
                      "name": "and"
                    },
                    "computed": false
                  },
                  "property": {
                    "type": "Identifier",
                    "start": 24,
                    "end": 31,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 24
                      },
                      "end": {
                        "line": 1,
                        "column": 31
                      }
                    },
                    "name": "babylon"
                  },
                  "computed": false
                },
                "property": {
                  "type": "Identifier",
                  "start": 32,
                  "end": 37,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 32
                    },
                    "end": {
                      "line": 1,
                      "column": 37
                    }
                  },
                  "name": "sucks"
                },
                "computed": false
              },
              "property": {
                "type": "Identifier",
                "start": 38,
                "end": 41,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 38
                  },
                  "end": {
                    "line": 1,
                    "column": 41
                  }
                },
                "name": "too"
              },
              "computed": false
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse "universe[galaxyName, otherUselessName]"', () => {
      expect(parseScript(`universe[galaxyName, otherUselessName]`, {
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
            "type": "ExpressionStatement",
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
            "expression": {
              "type": "MemberExpression",
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
              "object": {
                "type": "Identifier",
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
                "name": "universe"
              },
              "property": {
                "type": "SequenceExpression",
                "start": 9,
                "end": 37,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 9
                  },
                  "end": {
                    "line": 1,
                    "column": 37
                  }
                },
                "expressions": [
                  {
                    "type": "Identifier",
                    "start": 9,
                    "end": 19,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 9
                      },
                      "end": {
                        "line": 1,
                        "column": 19
                      }
                    },
                    "name": "galaxyName"
                  },
                  {
                    "type": "Identifier",
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
                    "name": "otherUselessName"
                  }
                ]
              },
              "computed": true
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse "universe[42].galaxies"', () => {
      expect(parseScript(`universe[42].galaxies`, {
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
            "type": "ExpressionStatement",
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
            "expression": {
              "type": "MemberExpression",
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
              "object": {
                "type": "MemberExpression",
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
                "object": {
                  "type": "Identifier",
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
                  "name": "universe"
                },
                "property": {
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
                  "value": 42,
                  "raw": "42"
                },
                "computed": true
              },
              "property": {
                "type": "Identifier",
                "start": 13,
                "end": 21,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 13
                  },
                  "end": {
                    "line": 1,
                    "column": 21
                  }
                },
                "name": "galaxies"
              },
              "computed": false
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse "universe.if"', () => {
      expect(parseScript(`universe.if`, {
          ranges: true,
          raw: true,
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
              "type": "MemberExpression",
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
              "object": {
                "type": "Identifier",
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
                "name": "universe"
              },
              "property": {
                "type": "Identifier",
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
                "name": "if"
              },
              "computed": false
            }
          }
        ],
        "sourceType": "script"
      });
    });

  

});
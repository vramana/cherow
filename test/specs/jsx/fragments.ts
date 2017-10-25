import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Miscellaneous - JSX fragments', () => {

    it('should parse simple JSX Fragment', () => {
        expect(parseScript(`<></>`, {
            jsx: true,
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "body": [
              {
                "end": 5,
                "expression": {
                  "children": [],
                  "closingElement": {
                    "end": 5,
                    "loc": {
                      "end": {
                        "column": 5,
                        "line": 1,
                      },
                      "start": {
                        "column": 1,
                        "line": 1,
                      }
                    },
                   "start": 2,
                    "type": "JSXClosingFragment"
                  },
                  "end": 5,
                  "loc": {
                    "end": {
                      "column": 5,
                      "line": 1,
                    },
                    "start": {
                      "column": 0,
                      "line": 1
                    }
                  },
                  "openingElement": {
                    "end": 2,
                    "loc": {
                      "end": {
                       "column": 1,
                        "line": 1,
                      },
                      "start": {
                        "column": 1,
                        "line": 1,
                      },
                    },
                    "start": 1,
                    "type": "JSXOpeningFragment"
                  },
                  "start": 0,
                  "type": "JSXFragment"
                },
                "loc": {
                 "end": {
                    "column": 5,
                   "line": 1,
                  },
                  "start": {
                    "column": 0,
                    "line": 1,
                  }
                },
                "start": 0,
                "type": "ExpressionStatement",
              }
            ],
            "end": 5,
            "loc": {
             "end": {
                "column": 5,
                "line": 1,
             },
              "start": {
                "column": 0,
                "line": 1,
              }
            },
           "sourceType": "script",
            "start": 0,
            "type": "Program",
          });
    });

    it('should parse JSX node with text child', () => {
        expect(parseScript(`<a>Hi, I'm a string!</a>`, {
            jsx: true,
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "body": [
             {
                "end": 24,
                "expression": {
                 "children": [
                    {
                      "end": 20,
                      "loc": {
                        "end": {
                          "column": 2,
                          "line": 1,
                        },
                        "start": {
                          "column": 2,
                          "line": 1,
                        }
                      },
                      "raw": "Hi, I'm a string!",
                      "start": 3,
                      "type": "JSXText",
                      "value": "Hi, I'm a string!",
                    },
                  ],
                  "closingElement": {
                    "end": 24,
                    "loc": {
                      "end": {
                        "column": 24,
                        "line": 1,
                      },
                      "start": {
                        "column": 2,
                        "line": 1,
                      }
                   },
                    "name": {
                      "end": 23,
                      "loc": {
                        "end": {
                          "column": 23,
                          "line": 1
                        },
                        "start": {
                          "column": 22,
                          "line": 1,
                        },
                      },
                      "name": "a",
                      "start": 22,
                      "type": "JSXIdentifier",
                    },
                    "start": 20,
                   "type": "JSXClosingElement",
                  },
                  "end": 24,
                  "loc": {
                    "end": {
                      "column": 24,
                      "line": 1,
                    },
                    "start": {
                      "column": 0,
                      "line": 1,
                    }
                  },
                  "openingElement": {
                    "attributes": [],
                    "end": 3,
                    "loc": {
                      "end": {
                        "column": 2,
                        "line": 1,
                      },
                      "start": {
                        "column": 0,
                        "line": 1,
                      }
                    },
                    "name": {
                      "end": 2,
                      "loc": {
                        "end": {
                          "column": 2,
                          "line": 1,
                        },
                        "start": {
                         "column": 1,
                          "line": 1,
                        }
                      },
                      "name": "a",
                      "start": 1,
                      "type": "JSXIdentifier",
                    },
                    "selfClosing": false,
                    "start": 0,
                    "type": "JSXOpeningElement",
                  },
                  "start": 0,
                  "type": "JSXElement",
                },
                "loc": {
                  "end": {
                    "column": 24,
                    "line": 1,
                  },
                  "start": {
                    "column": 0,
                    "line": 1,
                  },
                },
                "start": 0,
               "type": "ExpressionStatement",
              },
            ],
            "end": 24,
            "loc": {
              "end": {
                "column": 24,
                "line": 1,
              },
              "start": {
                "column": 0,
                "line": 1,
              }
            },
            "sourceType": "script",
            "start": 0,
            "type": "Program"
          });
    });

    it('should parse JSX node with keyword as name', () => {
        expect(parseScript(`<><span> hi </span> <div>bye</div> </>`, {
            jsx: true,
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
          "type": "Program",
          "body": [
              {
                  "type": "ExpressionStatement",
                  "expression": {
                      "type": "JSXFragment",
                      "children": [
                          {
                              "type": "JSXElement",
                              "children": [
                                  {
                                      "type": "JSXText",
                                      "value": " hi ",
                                      "start": 8,
                                      "end": 12,
                                      "loc": {
                                          "start": {
                                              "line": 1,
                                              "column": 7
                                          },
                                          "end": {
                                              "line": 1,
                                              "column": 7
                                          }
                                      },
                                      "raw": " hi "
                                  }
                              ],
                              "openingElement": {
                                "attributes": [],
                                  "type": "JSXOpeningElement",
                                  "name": {
                                      "type": "JSXIdentifier",
                                      "name": "span",
                                      "start": 3,
                                      "end": 7,
                                      "loc": {
                                          "start": {
                                              "line": 1,
                                              "column": 3
                                          },
                                          "end": {
                                              "line": 1,
                                              "column": 7
                                          }
                                      }
                                  },
                                  "selfClosing": false,
                                  "start": 2,
                                  "end": 8,
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
                              },
                              "closingElement": {
                                  "type": "JSXClosingElement",
                                  "name": {
                                      "type": "JSXIdentifier",
                                      "name": "span",
                                      "start": 14,
                                      "end": 18,
                                      "loc": {
                                          "start": {
                                              "line": 1,
                                              "column": 14
                                          },
                                          "end": {
                                              "line": 1,
                                              "column": 18
                                          }
                                      }
                                  },
                                  "start": 12,
                                  "end": 19,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 7
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 18
                                      }
                                  }
                              },
                              "start": 2,
                              "end": 19,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 1
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 18
                                  }
                              }
                          },
                          {
                              "type": "JSXText",
                              "value": " ",
                              "start": 19,
                              "end": 20,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 18
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 18
                                  }
                              },
                              "raw": " "
                          },
                          {
                              "type": "JSXElement",
                              "children": [
                                  {
                                      "type": "JSXText",
                                      "value": "bye",
                                      "start": 25,
                                      "end": 28,
                                      "loc": {
                                          "start": {
                                              "line": 1,
                                              "column": 24
                                          },
                                          "end": {
                                              "line": 1,
                                              "column": 24
                                          }
                                      },
                                      "raw": "bye"
                                  }
                              ],
                              "openingElement": {
                                "attributes": [],
                                  "type": "JSXOpeningElement",
                                  "name": {
                                      "type": "JSXIdentifier",
                                      "name": "div",
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
                                      }
                                  },
                                  "selfClosing": false,
                                  "start": 20,
                                  "end": 25,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 18
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 24
                                      }
                                  }
                              },
                              "closingElement": {
                                  "type": "JSXClosingElement",
                                  "name": {
                                      "type": "JSXIdentifier",
                                      "name": "div",
                                      "start": 30,
                                      "end": 33,
                                      "loc": {
                                          "start": {
                                              "line": 1,
                                              "column": 30
                                          },
                                          "end": {
                                              "line": 1,
                                              "column": 33
                                          }
                                      }
                                  },
                                  "start": 28,
                                  "end": 34,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 24
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 33
                                      }
                                  }
                              },
                              "start": 20,
                              "end": 34,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 18
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 33
                                  }
                              }
                          },
                          {
                              "type": "JSXText",
                              "value": " ",
                              "start": 34,
                              "end": 35,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 33
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 33
                                  }
                              },
                              "raw": " "
                          }
                      ],
                      "openingElement": {
                          "type": "JSXOpeningFragment",
                          "start": 1,
                          "end": 2,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 1
                              },
                              "end": {
                                  "line": 1,
                                  "column": 1
                              }
                          }
                      },
                      "closingElement": {
                          "type": "JSXClosingFragment",
                          "start": 35,
                          "end": 38,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 33
                              },
                              "end": {
                                  "line": 1,
                                  "column": 38
                              }
                          }
                      },
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
                      }
                  },
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
                  }
              }
          ],
          "sourceType": "script",
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
          }
      });
    });

   






















    

    it('should parse JSX node with keyword as name', () => {
        expect(parseScript(`<
        // comment1
        /* comment2 */
        >
         <div></div>
          <div></div>
        </>`, {
            jsx: true,
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
          "type": "Program",
          "body": [
              {
                  "type": "ExpressionStatement",
                  "expression": {
                      "type": "JSXFragment",
                      "children": [
                          {
                              "type": "JSXText",
                              "value": "\n         ",
                              "start": 54,
                              "end": 64,
                              "loc": {
                                  "start": {
                                      "line": 4,
                                      "column": 8
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 1
                                  }
                              },
                              "raw": "\n         "
                          },
                          {
                              "type": "JSXElement",
                              "children": [],
                              "openingElement": {
                                "attributes": [],
                                  "type": "JSXOpeningElement",
                                  "name": {
                                      "type": "JSXIdentifier",
                                      "name": "div",
                                      "start": 65,
                                      "end": 68,
                                      "loc": {
                                          "start": {
                                              "line": 4,
                                              "column": 20
                                          },
                                          "end": {
                                              "line": 4,
                                              "column": 23
                                          }
                                      }
                                  },
                                  "selfClosing": false,
                                  "start": 64,
                                  "end": 69,
                                  "loc": {
                                      "start": {
                                          "line": 4,
                                          "column": 8
                                      },
                                      "end": {
                                          "line": 4,
                                          "column": 23
                                      }
                                  }
                              },
                              "closingElement": {
                                  "type": "JSXClosingElement",
                                  "name": {
                                      "type": "JSXIdentifier",
                                      "name": "div",
                                      "start": 71,
                                      "end": 74,
                                      "loc": {
                                          "start": {
                                              "line": 4,
                                              "column": 26
                                          },
                                          "end": {
                                              "line": 4,
                                              "column": 29
                                          }
                                      }
                                  },
                                  "start": 69,
                                  "end": 75,
                                  "loc": {
                                      "start": {
                                          "line": 4,
                                          "column": 23
                                      },
                                      "end": {
                                          "line": 4,
                                          "column": 29
                                      }
                                  }
                              },
                              "start": 64,
                              "end": 75,
                              "loc": {
                                  "start": {
                                      "line": 4,
                                      "column": 8
                                  },
                                  "end": {
                                      "line": 4,
                                      "column": 29
                                  }
                              }
                          },
                          {
                              "type": "JSXText",
                              "value": "\n          ",
                              "start": 75,
                              "end": 86,
                              "loc": {
                                  "start": {
                                      "line": 4,
                                      "column": 29
                                  },
                                  "end": {
                                      "line": 4,
                                      "column": 29
                                  }
                              },
                              "raw": "\n          "
                          },
                          {
                              "type": "JSXElement",
                              "children": [],
                              "openingElement": {
                                "attributes": [],
                                  "type": "JSXOpeningElement",
                                  "name": {
                                      "type": "JSXIdentifier",
                                      "name": "div",
                                      "start": 87,
                                      "end": 90,
                                      "loc": {
                                          "start": {
                                              "line": 4,
                                              "column": 42
                                          },
                                          "end": {
                                              "line": 4,
                                              "column": 45
                                          }
                                      }
                                  },
                                  "selfClosing": false,
                                  "start": 86,
                                  "end": 91,
                                  "loc": {
                                      "start": {
                                          "line": 4,
                                          "column": 29
                                      },
                                      "end": {
                                          "line": 4,
                                          "column": 45
                                      }
                                  }
                              },
                              "closingElement": {
                                  "type": "JSXClosingElement",
                                  "name": {
                                      "type": "JSXIdentifier",
                                      "name": "div",
                                      "start": 93,
                                      "end": 96,
                                      "loc": {
                                          "start": {
                                              "line": 4,
                                              "column": 48
                                          },
                                          "end": {
                                              "line": 4,
                                              "column": 51
                                          }
                                      }
                                  },
                                  "start": 91,
                                  "end": 97,
                                  "loc": {
                                      "start": {
                                          "line": 4,
                                          "column": 45
                                      },
                                      "end": {
                                          "line": 4,
                                          "column": 51
                                      }
                                  }
                              },
                              "start": 86,
                              "end": 97,
                              "loc": {
                                  "start": {
                                      "line": 4,
                                      "column": 29
                                  },
                                  "end": {
                                      "line": 4,
                                      "column": 51
                                  }
                              }
                          },
                          {
                              "type": "JSXText",
                              "value": "\n        ",
                              "start": 97,
                              "end": 106,
                              "loc": {
                                  "start": {
                                      "line": 4,
                                      "column": 51
                                  },
                                  "end": {
                                      "line": 4,
                                      "column": 51
                                  }
                              },
                              "raw": "\n        "
                          }
                      ],
                      "openingElement": {
                          "type": "JSXOpeningFragment",
                          "start": 53,
                          "end": 54,
                          "loc": {
                              "start": {
                                  "line": 4,
                                  "column": 8
                              },
                              "end": {
                                  "line": 1,
                                  "column": 1
                              }
                          }
                      },
                      "closingElement": {
                          "type": "JSXClosingFragment",
                          "start": 106,
                          "end": 109,
                          "loc": {
                              "start": {
                                  "line": 4,
                                  "column": 51
                              },
                              "end": {
                                  "line": 4,
                                  "column": 64
                              }
                          }
                      },
                      "start": 0,
                      "end": 109,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 0
                          },
                          "end": {
                              "line": 4,
                              "column": 64
                          }
                      }
                  },
                  "start": 0,
                  "end": 109,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 0
                      },
                      "end": {
                          "line": 4,
                          "column": 64
                      }
                  }
              }
          ],
          "sourceType": "script",
          "start": 0,
          "end": 109,
          "loc": {
              "start": {
                  "line": 1,
                  "column": 0
              },
              "end": {
                  "line": 4,
                  "column": 64
              }
          }
      });
    });
    
    it('should parse JSX node with keyword as name', () => {
      expect(parseScript(`<>
        <>
          <>
           super deep
          </>
        </>
      </>`, {
          jsx: true,
          ranges: true,
          raw: true,
          locations: true
      })).to.eql({
        "type": "Program",
        "body": [
            {
                "type": "ExpressionStatement",
                "expression": {
                    "type": "JSXFragment",
                    "children": [
                        {
                            "type": "JSXText",
                            "value": "\n        ",
                            "start": 2,
                            "end": 11,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 1
                                },
                                "end": {
                                    "line": 1,
                                    "column": 1
                                }
                            },
                            "raw": "\n        "
                        },
                        {
                            "type": "JSXFragment",
                            "children": [
                                {
                                    "type": "JSXText",
                                    "value": "\n          ",
                                    "start": 13,
                                    "end": 24,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 12
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 12
                                        }
                                    },
                                    "raw": "\n          "
                                },
                                {
                                    "type": "JSXFragment",
                                    "children": [
                                        {
                                            "type": "JSXText",
                                            "value": "\n           super deep\n          ",
                                            "start": 26,
                                            "end": 59,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 25
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 25
                                                }
                                            },
                                            "raw": "\n           super deep\n          "
                                        }
                                    ],
                                    "openingElement": {
                                        "type": "JSXOpeningFragment",
                                        "start": 25,
                                        "end": 26,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 25
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 25
                                            }
                                        }
                                    },
                                    "closingElement": {
                                        "type": "JSXClosingFragment",
                                        "start": 59,
                                        "end": 62,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 25
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 62
                                            }
                                        }
                                    },
                                    "start": 24,
                                    "end": 62,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 12
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 62
                                        }
                                    }
                                }
                            ],
                            "openingElement": {
                                "type": "JSXOpeningFragment",
                                "start": 12,
                                "end": 13,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 12
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 12
                                    }
                                }
                            },
                            "closingElement": {
                                "type": "JSXClosingFragment",
                                "start": 71,
                                "end": 74,
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 8
                                    },
                                    "end": {
                                        "line": 2,
                                        "column": 11
                                    }
                                }
                            },
                            "start": 11,
                            "end": 74,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 1
                                },
                                "end": {
                                    "line": 2,
                                    "column": 11
                                }
                            }
                        }
                    ],
                    "openingElement": {
                        "type": "JSXOpeningFragment",
                        "start": 1,
                        "end": 2,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 1
                            },
                            "end": {
                                "line": 1,
                                "column": 1
                            }
                        }
                    },
                    "closingElement": {
                        "type": "JSXClosingFragment",
                        "start": 81,
                        "end": 84,
                        "loc": {
                            "start": {
                                "line": 3,
                                "column": 6
                            },
                            "end": {
                                "line": 3,
                                "column": 9
                            }
                        }
                    },
                    "start": 0,
                    "end": 84,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 3,
                            "column": 9
                        }
                    }
                },
                "start": 0,
                "end": 84,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 3,
                        "column": 9
                    }
                }
            }
        ],
        "sourceType": "script",
        "start": 0,
        "end": 84,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 3,
                "column": 9
            }
        }
    });
    });


    it.skip('should parse JSX node with keyword as name', () => {
      expect(parseScript(`<><div>JSXElement</div>JSXText{'JSXExpressionContainer'}</>`, {
          jsx: true,
          ranges: true,
          raw: true,
          locations: true
      })).to.eql({
        "type": "Program",
        "body": [
            {
                "type": "ExpressionStatement",
                "expression": {
                    "type": "JSXFragment",
                    "children": [
                        {
                            "type": "JSXElement",
                            "children": [
                                {
                                    "type": "JSXText",
                                    "value": "JSXElement",
                                    "start": 7,
                                    "end": 17,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 6
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 6
                                        }
                                    },
                                    "raw": "JSXElement"
                                }
                            ],
                            "openingElement": {
                                "type": "JSXOpeningElement",
                                "name": {
                                    "type": "JSXIdentifier",
                                    "name": "div",
                                    "start": 3,
                                    "end": 6,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 3
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 6
                                        }
                                    }
                                },
                                "selfClosing": false,
                                "start": 2,
                                "end": 7,
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
                            "closingElement": {
                                "type": "JSXClosingElement",
                                "name": {
                                    "type": "JSXIdentifier",
                                    "name": "div",
                                    "start": 19,
                                    "end": 22,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 19
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 22
                                        }
                                    }
                                },
                                "start": 17,
                                "end": 23,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 6
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 22
                                    }
                                }
                            },
                            "start": 2,
                            "end": 23,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 1
                                },
                                "end": {
                                    "line": 1,
                                    "column": 22
                                }
                            }
                        },
                        {
                            "type": "JSXText",
                            "value": "JSXText",
                            "start": 23,
                            "end": 30,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 22
                                },
                                "end": {
                                    "line": 1,
                                    "column": 22
                                }
                            },
                            "raw": "JSXText"
                        },
                        {
                            "type": "JSXExpressionContainer",
                            "expression": {
                                "type": "Literal",
                                "value": "JSXExpressionContainer",
                                "start": 31,
                                "end": 55,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 31
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 55
                                    }
                                },
                                "raw": "'JSXExpressionContainer'"
                            },
                            "start": 30,
                            "end": 56,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 22
                                },
                                "end": {
                                    "line": 1,
                                    "column": 55
                                }
                            }
                        }
                    ],
                    "openingElement": {
                        "attributes": [],
                        "type": "JSXOpeningFragment",
                        "start": 1,
                        "end": 2,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 1
                            },
                            "end": {
                                "line": 1,
                                "column": 1
                            }
                        }
                    },
                    "closingElement": {
                        "type": "JSXClosingFragment",
                        "start": 56,
                        "end": 59,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 55
                            },
                            "end": {
                                "line": 1,
                                "column": 59
                            }
                        }
                    },
                    "start": 0,
                    "end": 59,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 59
                        }
                    }
                },
                "start": 0,
                "end": 59,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 59
                    }
                }
            }
        ],
        "sourceType": "script",
        "start": 0,
        "end": 59,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 1,
                "column": 59
            }
        }
    });
    });
});
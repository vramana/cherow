import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Miscellaneous - JSX fragments', () => {

  it('should fail on attributes in fragments', () => {
    expect(() => {
        parseScript(`< key="nope"></>`)
    }).to.throw();
});

it('should fail on unclosed fragment', () => {
  expect(() => {
      parseScript(`<><></>`)
  }).to.throw();
});

it('should fail on wrong closing tag fragment', () => {
  expect(() => {
      parseScript(`<></something>`)
  }).to.throw();
});

it('should fail on wrong opening tag fragment', () => {
  expect(() => {
      parseScript(`<something></>`)
  }).to.throw();
});

  it('should parse simple JSX Fragment', () => {
        expect(parseScript(`<></>`, {
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
                      "children": [],
                      "openingElement": {
                          "type": "JSXOpeningFragment",
                          "start": 0,
                          "end": 2,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 0
                              },
                              "end": {
                                  "line": 1,
                                  "column": 1
                              }
                          }
                      },
                      "closingElement": {
                          "type": "JSXClosingFragment",
                          "start": 2,
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
                          }
                      },
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
                      }
                  },
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
                  }
              }
          ],
          "sourceType": "script",
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
          }
      });
    });

    
  it('should parse fragment with lots of whitespace', () => {
    expect(parseScript(`<    ></   >`, {
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
                  "children": [],
                  "openingElement": {
                      "type": "JSXOpeningFragment",
                      "start": 0,
                      "end": 6,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 0
                          },
                          "end": {
                              "line": 1,
                              "column": 1
                          }
                      }
                  },
                  "closingElement": {
                      "type": "JSXClosingFragment",
                      "start": 6,
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
  });

  it('should parse with comments in the tags', () => {
    expect(parseScript(`< /*starting wrap*/ ></ /*ending wrap*/>;`, {
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
                "children": [],
                "openingElement": {
                    "type": "JSXOpeningFragment",
                    "start": 0,
                    "end": 21,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 1
                        }
                    }
                },
                "closingElement": {
                    "type": "JSXClosingFragment",
                    "start": 21,
                    "end": 40,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 20
                        },
                        "end": {
                            "line": 1,
                            "column": 40
                        }
                    }
                },
                "start": 0,
                "end": 40,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 40
                    }
                }
            },
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
            }
        }
    ],
    "sourceType": "script",
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
    }
});
  });

  it('should parse fragment with text inside', () => {
    expect(parseScript(`<>hi</>;`, {
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
                          "value": "hi",
                          "start": 2,
                          "end": 4,
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
                          "raw": "hi"
                      }
                  ],
                  "openingElement": {
                      "type": "JSXOpeningFragment",
                      "start": 0,
                      "end": 2,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 0
                          },
                          "end": {
                              "line": 1,
                              "column": 1
                          }
                      }
                  },
                  "closingElement": {
                      "type": "JSXClosingFragment",
                      "start": 4,
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
                  },
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
                  }
              },
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
          }
      ],
      "sourceType": "script",
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
  });
  });


  it('should parse fragment with children', () => {
    expect(parseScript(`<><span>hi</span><div>bye</div></>;`, {
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
                                  "value": "hi",
                                  "start": 8,
                                  "end": 10,
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
                                  "raw": "hi"
                              }
                          ],
                          "openingElement": {
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
                              "attributes": [],
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
                                  }
                              },
                              "start": 10,
                              "end": 17,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 7
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 16
                                  }
                              }
                          },
                          "start": 2,
                          "end": 17,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 1
                              },
                              "end": {
                                  "line": 1,
                                  "column": 16
                              }
                          }
                      },
                      {
                          "type": "JSXElement",
                          "children": [
                              {
                                  "type": "JSXText",
                                  "value": "bye",
                                  "start": 22,
                                  "end": 25,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 21
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 21
                                      }
                                  },
                                  "raw": "bye"
                              }
                          ],
                          "openingElement": {
                              "type": "JSXOpeningElement",
                              "name": {
                                  "type": "JSXIdentifier",
                                  "name": "div",
                                  "start": 18,
                                  "end": 21,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 18
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 21
                                      }
                                  }
                              },
                              "attributes": [],
                              "selfClosing": false,
                              "start": 17,
                              "end": 22,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 16
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 21
                                  }
                              }
                          },
                          "closingElement": {
                              "type": "JSXClosingElement",
                              "name": {
                                  "type": "JSXIdentifier",
                                  "name": "div",
                                  "start": 27,
                                  "end": 30,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 27
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 30
                                      }
                                  }
                              },
                              "start": 25,
                              "end": 31,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 21
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 30
                                  }
                              }
                          },
                          "start": 17,
                          "end": 31,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 16
                              },
                              "end": {
                                  "line": 1,
                                  "column": 30
                              }
                          }
                      }
                  ],
                  "openingElement": {
                      "type": "JSXOpeningFragment",
                      "start": 0,
                      "end": 2,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 0
                          },
                          "end": {
                              "line": 1,
                              "column": 1
                          }
                      }
                  },
                  "closingElement": {
                      "type": "JSXClosingFragment",
                      "start": 31,
                      "end": 34,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 30
                          },
                          "end": {
                              "line": 1,
                              "column": 34
                          }
                      }
                  },
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
                  }
              },
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
              }
          }
      ],
      "sourceType": "script",
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
      }
  });
  });

  it('should parse nested fragments', () => {
    expect(parseScript(`<><span>1</span><><span>2.1</span><span>2.2</span></><span>3</span></>;`, {
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
                                  "value": "1",
                                  "start": 8,
                                  "end": 9,
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
                                  "raw": "1"
                              }
                          ],
                          "openingElement": {
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
                              "attributes": [],
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
                                  }
                              },
                              "start": 9,
                              "end": 16,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 7
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 15
                                  }
                              }
                          },
                          "start": 2,
                          "end": 16,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 1
                              },
                              "end": {
                                  "line": 1,
                                  "column": 15
                              }
                          }
                      },
                      {
                          "type": "JSXFragment",
                          "children": [
                              {
                                  "type": "JSXElement",
                                  "children": [
                                      {
                                          "type": "JSXText",
                                          "value": "2.1",
                                          "start": 24,
                                          "end": 27,
                                          "loc": {
                                              "start": {
                                                  "line": 1,
                                                  "column": 23
                                              },
                                              "end": {
                                                  "line": 1,
                                                  "column": 23
                                              }
                                          },
                                          "raw": "2.1"
                                      }
                                  ],
                                  "openingElement": {
                                      "type": "JSXOpeningElement",
                                      "name": {
                                          "type": "JSXIdentifier",
                                          "name": "span",
                                          "start": 19,
                                          "end": 23,
                                          "loc": {
                                              "start": {
                                                  "line": 1,
                                                  "column": 19
                                              },
                                              "end": {
                                                  "line": 1,
                                                  "column": 23
                                              }
                                          }
                                      },
                                      "attributes": [],
                                      "selfClosing": false,
                                      "start": 18,
                                      "end": 24,
                                      "loc": {
                                          "start": {
                                              "line": 1,
                                              "column": 17
                                          },
                                          "end": {
                                              "line": 1,
                                              "column": 23
                                          }
                                      }
                                  },
                                  "closingElement": {
                                      "type": "JSXClosingElement",
                                      "name": {
                                          "type": "JSXIdentifier",
                                          "name": "span",
                                          "start": 29,
                                          "end": 33,
                                          "loc": {
                                              "start": {
                                                  "line": 1,
                                                  "column": 29
                                              },
                                              "end": {
                                                  "line": 1,
                                                  "column": 33
                                              }
                                          }
                                      },
                                      "start": 27,
                                      "end": 34,
                                      "loc": {
                                          "start": {
                                              "line": 1,
                                              "column": 23
                                          },
                                          "end": {
                                              "line": 1,
                                              "column": 33
                                          }
                                      }
                                  },
                                  "start": 18,
                                  "end": 34,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 17
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 33
                                      }
                                  }
                              },
                              {
                                  "type": "JSXElement",
                                  "children": [
                                      {
                                          "type": "JSXText",
                                          "value": "2.2",
                                          "start": 40,
                                          "end": 43,
                                          "loc": {
                                              "start": {
                                                  "line": 1,
                                                  "column": 39
                                              },
                                              "end": {
                                                  "line": 1,
                                                  "column": 39
                                              }
                                          },
                                          "raw": "2.2"
                                      }
                                  ],
                                  "openingElement": {
                                      "type": "JSXOpeningElement",
                                      "name": {
                                          "type": "JSXIdentifier",
                                          "name": "span",
                                          "start": 35,
                                          "end": 39,
                                          "loc": {
                                              "start": {
                                                  "line": 1,
                                                  "column": 35
                                              },
                                              "end": {
                                                  "line": 1,
                                                  "column": 39
                                              }
                                          }
                                      },
                                      "attributes": [],
                                      "selfClosing": false,
                                      "start": 34,
                                      "end": 40,
                                      "loc": {
                                          "start": {
                                              "line": 1,
                                              "column": 33
                                          },
                                          "end": {
                                              "line": 1,
                                              "column": 39
                                          }
                                      }
                                  },
                                  "closingElement": {
                                      "type": "JSXClosingElement",
                                      "name": {
                                          "type": "JSXIdentifier",
                                          "name": "span",
                                          "start": 45,
                                          "end": 49,
                                          "loc": {
                                              "start": {
                                                  "line": 1,
                                                  "column": 45
                                              },
                                              "end": {
                                                  "line": 1,
                                                  "column": 49
                                              }
                                          }
                                      },
                                      "start": 43,
                                      "end": 50,
                                      "loc": {
                                          "start": {
                                              "line": 1,
                                              "column": 39
                                          },
                                          "end": {
                                              "line": 1,
                                              "column": 49
                                          }
                                      }
                                  },
                                  "start": 34,
                                  "end": 50,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 33
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 49
                                      }
                                  }
                              }
                          ],
                          "openingElement": {
                              "type": "JSXOpeningFragment",
                              "start": 16,
                              "end": 18,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 15
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 17
                                  }
                              }
                          },
                          "closingElement": {
                              "type": "JSXClosingFragment",
                              "start": 50,
                              "end": 53,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 49
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 53
                                  }
                              }
                          },
                          "start": 16,
                          "end": 53,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 15
                              },
                              "end": {
                                  "line": 1,
                                  "column": 53
                              }
                          }
                      },
                      {
                          "type": "JSXElement",
                          "children": [
                              {
                                  "type": "JSXText",
                                  "value": "3",
                                  "start": 59,
                                  "end": 60,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 58
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 58
                                      }
                                  },
                                  "raw": "3"
                              }
                          ],
                          "openingElement": {
                              "type": "JSXOpeningElement",
                              "name": {
                                  "type": "JSXIdentifier",
                                  "name": "span",
                                  "start": 54,
                                  "end": 58,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 54
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 58
                                      }
                                  }
                              },
                              "attributes": [],
                              "selfClosing": false,
                              "start": 53,
                              "end": 59,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 53
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 58
                                  }
                              }
                          },
                          "closingElement": {
                              "type": "JSXClosingElement",
                              "name": {
                                  "type": "JSXIdentifier",
                                  "name": "span",
                                  "start": 62,
                                  "end": 66,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 62
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 66
                                      }
                                  }
                              },
                              "start": 60,
                              "end": 67,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 58
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 66
                                  }
                              }
                          },
                          "start": 53,
                          "end": 67,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 53
                              },
                              "end": {
                                  "line": 1,
                                  "column": 66
                              }
                          }
                      }
                  ],
                  "openingElement": {
                      "type": "JSXOpeningFragment",
                      "start": 0,
                      "end": 2,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 0
                          },
                          "end": {
                              "line": 1,
                              "column": 1
                          }
                      }
                  },
                  "closingElement": {
                      "type": "JSXClosingFragment",
                      "start": 67,
                      "end": 70,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 66
                          },
                          "end": {
                              "line": 1,
                              "column": 70
                          }
                      }
                  },
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
                  }
              },
              "start": 0,
              "end": 71,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 71
                  }
              }
          }
      ],
      "sourceType": "script",
      "start": 0,
      "end": 71,
      "loc": {
          "start": {
              "line": 1,
              "column": 0
          },
          "end": {
              "line": 1,
              "column": 71
          }
      }
  });
  });

    it('should parse fragment with  both span and div elements', () => {
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
                                  "attributes": [],
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
                                  "attributes": [],
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
                          "start": 0,
                          "end": 2,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 0
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

    it('should parse fragment with comments and two div elements', () => {
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
                                  "attributes": [],
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
                                  "attributes": [],
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
                          "start": 0,
                          "end": 54,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 0
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
    
    it('should parse deep nested fragment with text', () => {
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
                                        "start": 24,
                                        "end": 26,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 12
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
                                "start": 11,
                                "end": 13,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 1
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
                        "start": 0,
                        "end": 2,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
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


    it('should parse JSX node with keyword as name', () => {
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
                                "attributes": [],
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
                        "type": "JSXOpeningFragment",
                        "start": 0,
                        "end": 2,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
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
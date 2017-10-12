import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('JSX', () => {

    it('should fail if tagName contain number', () => {
        expect(() => {
            parseScript(`<1/>`)
        }).to.throw();
      });

      it('should fail on adjacent JSX elements not wrapped in an enclosing tag', () => {
          expect(() => {
              parseScript(`<div>one</div><div>two</div>`)
          }).to.throw();
      });
  
      it('should fail on invalid empty selfclosing', () => {
          expect(() => {
              parseScript(`</>`)
          }).to.throw();
      });
  
      it('should fail if assigning to a non-empty expression', () => {
          expect(() => {
              parseScript(`<div foo="foo" bar={} baz="baz"/>`)
          }).to.throw();
      });

      it('should fail on invalid element', () => {
        expect(() => {
            parseScript(`</>`)
        }).to.throw();
    });

    it('should fail on invalid match member', () => {
        expect(() => {
            parseScript(`<foo.bar></foo.baz>`)
        }).to.throw();
    });

    it('should fail on invalid closing trail', () => {
        expect(() => {
            parseScript(`<a/!`)
        }).to.throw();
    });

    it('should fail on invalid attribute value trail', () => {
        expect(() => {
            parseScript(`<a b=: />`)
        }).to.throw();
    });

    it('should fail on invalid match', () => {
        expect(() => {
            parseScript(`node = <strong></em>`)
        }).to.throw();
    });

    it('should fail on invalid match namespace', () => {
        expect(() => {
            parseScript(`<svg:path></svg:circle>`)
        }).to.throw();
    });

    it('should fail on invalid incomplete member', () => {
        expect(() => {
            parseScript(`<xyz. />`)
        }).to.throw();
    });

    it('should fail on invalid start member', () => {
        expect(() => {
            parseScript(`<.abc />`)
        }).to.throw();
    });

    it('should fail on invalid start namespace', () => {
        expect(() => {
            parseScript(`<:path />`)
        }).to.throw();
    });

    it('should fail on invalid unicode escape in identifier', () => {

        expect(() => {
            parseScript('<\u{2F804}></\u{2F804}>');
        }).to.throw();
    });

    it('should fail on unterminated string', () => {

        expect(() => {
            parseScript('<foo bar="');
        }).to.throw();
    });

    it('should throw invalid attribute empty expression', () => {

        expect(() => {
            parseScript('<foo bar={} />');
        }).to.throw();
    });

    it('should fail on wrong closing tag', () => {

        expect(() => {
            parseScript('<Foo></Bar>');
        }).to.throw();
    });

    it('should fail on invalid attribute arbitrary expression', () => {

        expect(() => {
            parseScript('<Foo bar=bar() />');
        }).to.throw();
    });

    it('should fail on "<a foo="bar', () => {
        expect(() => {
            parseScript('<a foo="bar');
        }).to.throw();
    });

    it('should fail on "<dd><e></e></dddd>;', () => {
        expect(() => {
            parseScript('<dd><e></e></dddd>;');
        }).to.throw();
    });

    it('should fail on "<f><g/></ff>;', () => {
        expect(() => {
            parseScript('<f><g/></ff>;');
        }).to.throw();
    });

    it('should fail on "<b.b></b>;', () => {
        expect(() => {
            parseScript('<b.b></b>;');
        }).to.throw();
    });

    it('should fail on "<a[foo]></a[foo]>"', () => {
        expect(() => {
            parseScript('<a[foo]></a[foo]>');
        }).to.throw();
    });

    it('should fail on <a>{"str";}</a>', () => {
        expect(() => {
            parseScript('<a>{"str";}</a>');
        }).to.throw();
    });

    it('should fail on "<div className"app">"', () => {
        expect(() => {
            parseScript('<div className"app">');
        }).to.throw();
    });

    it('should fail on "<a b=}>"', () => {
        expect(() => {
            parseScript('<a b=}>');
        }).to.throw();
    });

    it('should fail on "<div {...props}>stuff</div {...props}>"', () => {
        expect(() => {
            parseScript('<div {...props}>stuff</div {...props}>');
        }).to.throw();
    });

    
    it('should fail if closing tag does not match opening tag', () => {
        expect(() => {
            parseScript('<div></span>');
        }).to.throw();
    });

    it('should fail if closing tag namespace does not match opening tag namespace', () => {
        expect(() => {
            parseScript('<div:a></div:b>');
        }).to.throw();
    });

    it('should fail if closing tag namespace does not match opening tag namespace', () => {
      expect(() => {
          parseScript('<div> prefix [...children] suffix </div>');
      }).to.throw();
  });

  it('should fail on empty expression container', () => {
      expect(() => {
          parseScript('<div> prefix {} suffix </div>');
      }).to.throw();
  });

  it('should parse JSX node with keyword as name', () => {
      expect(parseScript(`"use strict"; <async />`, {
          jsx: true,
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
                "type": "Literal",
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
                "value": "use strict",
                "raw": "\"use strict\""
              }
            },
            {
              "type": "ExpressionStatement",
              "start": 14,
              "end": 23,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 14
                },
                "end": {
                  "line": 1,
                  "column": 23
                }
              },
              "expression": {
                "type": "JSXElement",
                "start": 14,
                "end": 23,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 14
                  },
                  "end": {
                    "line": 1,
                    "column": 23
                  }
                },
                "openingElement": {
                  "type": "JSXOpeningElement",
                  "start": 14,
                  "end": 23,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 14
                    },
                    "end": {
                      "line": 1,
                      "column": 23
                    }
                  },
                  "attributes": [],
                  "name": {
                    "type": "JSXIdentifier",
                    "start": 15,
                    "end": 20,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 15
                      },
                      "end": {
                        "line": 1,
                        "column": 20
                      }
                    },
                    "name": "async"
                  },
                  "selfClosing": true
                },
                "closingElement": null,
                "children": []
              }
            }
          ],
          "sourceType": "script"
        });
  });

  it('should parse JSX node with keyword as name', () => {
    expect(parseScript(`<this />`, {
        jsx: true,
        ranges: true,
    })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 8,
        "body": [
          {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 8,
            "expression": {
              "type": "JSXElement",
              "start": 0,
              "end": 8,
              "openingElement": {
                "type": "JSXOpeningElement",
                "start": 0,
                "end": 8,
                "attributes": [],
                "name": {
                  "type": "JSXIdentifier",
                  "start": 1,
                  "end": 5,
                  "name": "this"
                },
                "selfClosing": true
              },
              "closingElement": null,
              "children": []
            }
          }
        ],
        "sourceType": "script"
      });
});

it('should parse jsx spread children', () => {
    expect(parseScript(`<div> prefix {...children} suffix </div>`, {
        jsx: true,
        ranges: true,
    })).to.eql({
        "type": "Program",
        "body": [
            {
                "type": "ExpressionStatement",
                "expression": {
                    "type": "JSXElement",
                    "children": [
                        {
                            "type": "JSXText",
                            "value": " prefix ",
                            "start": 5,
                            "end": 13
                        },
                        {
                            "type": "JSXSpreadChild",
                            "expression": {
                                "type": "Identifier",
                                "name": "children",
                                "start": 17,
                                "end": 25
                            },
                            "start": 14,
                            "end": 26
                        },
                        {
                            "type": "JSXText",
                            "value": "suffix",
                            "start": 27,
                            "end": 33
                        },
                        {
                            "type": "JSXText",
                            "value": " ",
                            "start": 33,
                            "end": 34
                        }
                    ],
                    "openingElement": {
                        "type": "JSXOpeningElement",
                        "name": {
                            "type": "JSXIdentifier",
                            "name": "div",
                            "start": 1,
                            "end": 4
                        },
                        "attributes": [],
                        "selfClosing": false,
                        "start": 0,
                        "end": 5
                    },
                    "closingElement": {
                        "type": "JSXClosingElement",
                        "name": {
                            "type": "JSXIdentifier",
                            "name": "div",
                            "start": 36,
                            "end": 39
                        },
                        "start": 34,
                        "end": 40
                    },
                    "start": 0,
                    "end": 40
                },
                "start": 0,
                "end": 40
            }
        ],
        "sourceType": "script",
        "start": 0,
        "end": 40
    });
});
  
  it('should parse jsx spread attribute', () => {
    expect(parseScript(`var component = <Component {...props} />;`, {
        jsx: true,
        ranges: true,
    })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 41,
        "body": [
          {
            "type": "VariableDeclaration",
            "start": 0,
            "end": 41,
            "declarations": [
              {
                "type": "VariableDeclarator",
                "start": 4,
                "end": 40,
                "id": {
                  "type": "Identifier",
                  "start": 4,
                  "end": 13,
                  "name": "component"
                },
                "init": {
                  "type": "JSXElement",
                  "start": 16,
                  "end": 40,
                  "openingElement": {
                    "type": "JSXOpeningElement",
                    "start": 16,
                    "end": 40,
                    "attributes": [
                      {
                        "type": "JSXSpreadAttribute",
                        "start": 27,
                        "end": 37,
                        "argument": {
                          "type": "Identifier",
                          "start": 31,
                          "end": 36,
                          "name": "props"
                        }
                      }
                    ],
                    "name": {
                      "type": "JSXIdentifier",
                      "start": 17,
                      "end": 26,
                      "name": "Component"
                    },
                    "selfClosing": true
                  },
                  "closingElement": null,
                  "children": []
                }
              }
            ],
            "kind": "var"
          }
        ],
        "sourceType": "script"
      });
});
  
  it('should parse nested namespace', () => {
    expect(parseScript(`<a:b><a:b></a:b></a:b>;`, {
        jsx: true,
        ranges: true,
    })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 23,
        "body": [
          {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 23,
            "expression": {
              "type": "JSXElement",
              "start": 0,
              "end": 22,
              "openingElement": {
                "type": "JSXOpeningElement",
                "start": 0,
                "end": 5,
                "attributes": [],
                "name": {
                  "type": "JSXNamespacedName",
                  "start": 1,
                  "end": 4,
                  "namespace": {
                    "type": "JSXIdentifier",
                    "start": 1,
                    "end": 2,
                    "name": "a"
                  },
                  "name": {
                    "type": "JSXIdentifier",
                    "start": 3,
                    "end": 4,
                    "name": "b"
                  }
                },
                "selfClosing": false
              },
              "closingElement": {
                "type": "JSXClosingElement",
                "start": 16,
                "end": 22,
                "name": {
                  "type": "JSXNamespacedName",
                  "start": 18,
                  "end": 21,
                  "namespace": {
                    "type": "JSXIdentifier",
                    "start": 18,
                    "end": 19,
                    "name": "a"
                  },
                  "name": {
                    "type": "JSXIdentifier",
                    "start": 20,
                    "end": 21,
                    "name": "b"
                  }
                }
              },
              "children": [
                {
                  "type": "JSXElement",
                  "start": 5,
                  "end": 16,
                  "openingElement": {
                    "type": "JSXOpeningElement",
                    "start": 5,
                    "end": 10,
                    "attributes": [],
                    "name": {
                      "type": "JSXNamespacedName",
                      "start": 6,
                      "end": 9,
                      "namespace": {
                        "type": "JSXIdentifier",
                        "start": 6,
                        "end": 7,
                        "name": "a"
                      },
                      "name": {
                        "type": "JSXIdentifier",
                        "start": 8,
                        "end": 9,
                        "name": "b"
                      }
                    },
                    "selfClosing": false
                  },
                  "closingElement": {
                    "type": "JSXClosingElement",
                    "start": 10,
                    "end": 16,
                    "name": {
                      "type": "JSXNamespacedName",
                      "start": 12,
                      "end": 15,
                      "namespace": {
                        "type": "JSXIdentifier",
                        "start": 12,
                        "end": 13,
                        "name": "a"
                      },
                      "name": {
                        "type": "JSXIdentifier",
                        "start": 14,
                        "end": 15,
                        "name": "b"
                      }
                    }
                  },
                  "children": []
                }
              ]
            }
          }
        ],
        "sourceType": "script"
      });
});

  it('should parse namespace', () => {
    expect(parseScript(`<a:b></a:b>;`, {
        jsx: true,
        ranges: true,
    })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 12,
        "body": [
          {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 12,
            "expression": {
              "type": "JSXElement",
              "start": 0,
              "end": 11,
              "openingElement": {
                "type": "JSXOpeningElement",
                "start": 0,
                "end": 5,
                "attributes": [],
                "name": {
                  "type": "JSXNamespacedName",
                  "start": 1,
                  "end": 4,
                  "namespace": {
                    "type": "JSXIdentifier",
                    "start": 1,
                    "end": 2,
                    "name": "a"
                  },
                  "name": {
                    "type": "JSXIdentifier",
                    "start": 3,
                    "end": 4,
                    "name": "b"
                  }
                },
                "selfClosing": false
              },
              "closingElement": {
                "type": "JSXClosingElement",
                "start": 5,
                "end": 11,
                "name": {
                  "type": "JSXNamespacedName",
                  "start": 7,
                  "end": 10,
                  "namespace": {
                    "type": "JSXIdentifier",
                    "start": 7,
                    "end": 8,
                    "name": "a"
                  },
                  "name": {
                    "type": "JSXIdentifier",
                    "start": 9,
                    "end": 10,
                    "name": "b"
                  }
                }
              },
              "children": []
            }
          }
        ],
        "sourceType": "script"
      });
});

  it('should parse yield tag', () => {
      expect(parseScript(`function*it(){
          yield <a></a>;
      }`, {
          jsx: true,
          ranges: true,
          locations: true
      })).to.eql({
        "type": "Program",
        "body": [
            {
                "type": "FunctionDeclaration",
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "body": [
                        {
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "YieldExpression",
                                "argument": {
                                    "type": "JSXElement",
                                    "children": [],
                                    "openingElement": {
                                        "type": "JSXOpeningElement",
                                        "name": {
                                            "type": "JSXIdentifier",
                                            "name": "a",
                                            "start": 32,
                                            "end": 33,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 17
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 18
                                                }
                                            }
                                        },
                                        "attributes": [],
                                        "selfClosing": false,
                                        "start": 31,
                                        "end": 34,
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 16
                                            },
                                            "end": {
                                                "line": 2,
                                                "column": 18
                                            }
                                        }
                                    },
                                    "closingElement": {
                                        "type": "JSXClosingElement",
                                        "name": {
                                            "type": "JSXIdentifier",
                                            "name": "a",
                                            "start": 36,
                                            "end": 37,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 21
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 22
                                                }
                                            }
                                        },
                                        "start": 34,
                                        "end": 38,
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 18
                                            },
                                            "end": {
                                                "line": 2,
                                                "column": 23
                                            }
                                        }
                                    },
                                    "start": 31,
                                    "end": 38,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 16
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 23
                                        }
                                    }
                                },
                                "delegate": false,
                                "start": 25,
                                "end": 38,
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 10
                                    },
                                    "end": {
                                        "line": 2,
                                        "column": 23
                                    }
                                }
                            },
                            "start": 25,
                            "end": 39,
                            "loc": {
                                "start": {
                                    "line": 2,
                                    "column": 10
                                },
                                "end": {
                                    "line": 2,
                                    "column": 24
                                }
                            }
                        }
                    ],
                    "start": 13,
                    "end": 47,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 13
                        },
                        "end": {
                            "line": 3,
                            "column": 7
                        }
                    }
                },
                "async": false,
                "generator": true,
                "expression": false,
                "id": {
                    "type": "Identifier",
                    "name": "it",
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
                    }
                },
                "start": 0,
                "end": 47,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 3,
                        "column": 7
                    }
                }
            }
        ],
        "sourceType": "script",
        "start": 0,
        "end": 47,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 3,
                "column": 7
            }
        }
    });
  });

  it('should parse JSX node with keyword as name', () => {
    expect(parseScript(`<this />`, {
        jsx: true,
        ranges: true,
    })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 8,
        "body": [
          {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 8,
            "expression": {
              "type": "JSXElement",
              "start": 0,
              "end": 8,
              "openingElement": {
                "type": "JSXOpeningElement",
                "start": 0,
                "end": 8,
                "attributes": [],
                "name": {
                  "type": "JSXIdentifier",
                  "start": 1,
                  "end": 5,
                  "name": "this"
                },
                "selfClosing": true
              },
              "closingElement": null,
              "children": []
            }
          }
        ],
        "sourceType": "script"
      });
});

it('should parse jsx spread children', () => {
    expect(parseScript(`<div> prefix {...children} suffix </div>`, {
        jsx: true,
        ranges: true,
        locations: true
    })).to.eql({
      "type": "Program",
      "body": [
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "JSXElement",
                  "children": [
                      {
                          "type": "JSXText",
                          "value": " prefix ",
                          "start": 5,
                          "end": 13,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 4
                              },
                              "end": {
                                  "line": 1,
                                  "column": 4
                              }
                          }
                      },
                      {
                          "type": "JSXSpreadChild",
                          "expression": {
                              "type": "Identifier",
                              "name": "children",
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
                              }
                          },
                          "start": 14,
                          "end": 26,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 14
                              },
                              "end": {
                                  "line": 1,
                                  "column": 26
                              }
                          }
                      },
                      {
                          "type": "JSXText",
                          "value": "suffix",
                          "start": 27,
                          "end": 33,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 27
                              },
                              "end": {
                                  "line": 1,
                                  "column": 26
                              }
                          }
                      },
                      {
                          "type": "JSXText",
                          "value": " ",
                          "start": 33,
                          "end": 34,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 27
                              },
                              "end": {
                                  "line": 1,
                                  "column": 26
                              }
                          }
                      }
                  ],
                  "openingElement": {
                      "type": "JSXOpeningElement",
                      "name": {
                          "type": "JSXIdentifier",
                          "name": "div",
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
                          }
                      },
                      "attributes": [],
                      "selfClosing": false,
                      "start": 0,
                      "end": 5,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 0
                          },
                          "end": {
                              "line": 1,
                              "column": 4
                          }
                      }
                  },
                  "closingElement": {
                      "type": "JSXClosingElement",
                      "name": {
                          "type": "JSXIdentifier",
                          "name": "div",
                          "start": 36,
                          "end": 39,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 36
                              },
                              "end": {
                                  "line": 1,
                                  "column": 39
                              }
                          }
                      },
                      "start": 34,
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
          }
      ],
      "sourceType": "script",
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
  });
});
  
  it('should parse jsx spread attribute', () => {
    expect(parseScript(`var component = <Component {...props} />;`, {
        jsx: true,
        ranges: true,
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
          "type": "VariableDeclaration",
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
          "declarations": [
            {
              "type": "VariableDeclarator",
              "start": 4,
              "end": 40,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 4
                },
                "end": {
                  "line": 1,
                  "column": 40
                }
              },
              "id": {
                "type": "Identifier",
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
                "name": "component"
              },
              "init": {
                "type": "JSXElement",
                "start": 16,
                "end": 40,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 16
                  },
                  "end": {
                    "line": 1,
                    "column": 40
                  }
                },
                "openingElement": {
                  "type": "JSXOpeningElement",
                  "start": 16,
                  "end": 40,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 16
                    },
                    "end": {
                      "line": 1,
                      "column": 40
                    }
                  },
                  "attributes": [
                    {
                      "type": "JSXSpreadAttribute",
                      "start": 27,
                      "end": 37,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 27
                        },
                        "end": {
                          "line": 1,
                          "column": 37
                        }
                      },
                      "argument": {
                        "type": "Identifier",
                        "start": 31,
                        "end": 36,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 31
                          },
                          "end": {
                            "line": 1,
                            "column": 36
                          }
                        },
                        "name": "props"
                      }
                    }
                  ],
                  "name": {
                    "type": "JSXIdentifier",
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
                    "name": "Component"
                  },
                  "selfClosing": true
                },
                "closingElement": null,
                "children": []
              }
            }
          ],
          "kind": "var"
        }
      ],
      "sourceType": "script"
    });
});
  
  it('should parse nested namespace', () => {
    expect(parseScript(`<a:b><a:b></a:b></a:b>;`, {
        jsx: true,
        ranges: true,
    })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 23,
        "body": [
          {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 23,
            "expression": {
              "type": "JSXElement",
              "start": 0,
              "end": 22,
              "openingElement": {
                "type": "JSXOpeningElement",
                "start": 0,
                "end": 5,
                "attributes": [],
                "name": {
                  "type": "JSXNamespacedName",
                  "start": 1,
                  "end": 4,
                  "namespace": {
                    "type": "JSXIdentifier",
                    "start": 1,
                    "end": 2,
                    "name": "a"
                  },
                  "name": {
                    "type": "JSXIdentifier",
                    "start": 3,
                    "end": 4,
                    "name": "b"
                  }
                },
                "selfClosing": false
              },
              "closingElement": {
                "type": "JSXClosingElement",
                "start": 16,
                "end": 22,
                "name": {
                  "type": "JSXNamespacedName",
                  "start": 18,
                  "end": 21,
                  "namespace": {
                    "type": "JSXIdentifier",
                    "start": 18,
                    "end": 19,
                    "name": "a"
                  },
                  "name": {
                    "type": "JSXIdentifier",
                    "start": 20,
                    "end": 21,
                    "name": "b"
                  }
                }
              },
              "children": [
                {
                  "type": "JSXElement",
                  "start": 5,
                  "end": 16,
                  "openingElement": {
                    "type": "JSXOpeningElement",
                    "start": 5,
                    "end": 10,
                    "attributes": [],
                    "name": {
                      "type": "JSXNamespacedName",
                      "start": 6,
                      "end": 9,
                      "namespace": {
                        "type": "JSXIdentifier",
                        "start": 6,
                        "end": 7,
                        "name": "a"
                      },
                      "name": {
                        "type": "JSXIdentifier",
                        "start": 8,
                        "end": 9,
                        "name": "b"
                      }
                    },
                    "selfClosing": false
                  },
                  "closingElement": {
                    "type": "JSXClosingElement",
                    "start": 10,
                    "end": 16,
                    "name": {
                      "type": "JSXNamespacedName",
                      "start": 12,
                      "end": 15,
                      "namespace": {
                        "type": "JSXIdentifier",
                        "start": 12,
                        "end": 13,
                        "name": "a"
                      },
                      "name": {
                        "type": "JSXIdentifier",
                        "start": 14,
                        "end": 15,
                        "name": "b"
                      }
                    }
                  },
                  "children": []
                }
              ]
            }
          }
        ],
        "sourceType": "script"
      });
});

  it('should parse namespace', () => {
    expect(parseScript(`<a:b></a:b>;`, {
        jsx: true,
        ranges: true,
    })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 12,
        "body": [
          {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 12,
            "expression": {
              "type": "JSXElement",
              "start": 0,
              "end": 11,
              "openingElement": {
                "type": "JSXOpeningElement",
                "start": 0,
                "end": 5,
                "attributes": [],
                "name": {
                  "type": "JSXNamespacedName",
                  "start": 1,
                  "end": 4,
                  "namespace": {
                    "type": "JSXIdentifier",
                    "start": 1,
                    "end": 2,
                    "name": "a"
                  },
                  "name": {
                    "type": "JSXIdentifier",
                    "start": 3,
                    "end": 4,
                    "name": "b"
                  }
                },
                "selfClosing": false
              },
              "closingElement": {
                "type": "JSXClosingElement",
                "start": 5,
                "end": 11,
                "name": {
                  "type": "JSXNamespacedName",
                  "start": 7,
                  "end": 10,
                  "namespace": {
                    "type": "JSXIdentifier",
                    "start": 7,
                    "end": 8,
                    "name": "a"
                  },
                  "name": {
                    "type": "JSXIdentifier",
                    "start": 9,
                    "end": 10,
                    "name": "b"
                  }
                }
              },
              "children": []
            }
          }
        ],
        "sourceType": "script"
      });
});

  it('should parse yield tag', () => {
      expect(parseScript(`function*it(){
          yield <a></a>;
      }`, {
          jsx: true,
          ranges: true,
          locations: true
      })).to.eql({
        "type": "Program",
        "body": [
            {
                "type": "FunctionDeclaration",
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "body": [
                        {
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "YieldExpression",
                                "argument": {
                                    "type": "JSXElement",
                                    "children": [],
                                    "openingElement": {
                                        "type": "JSXOpeningElement",
                                        "name": {
                                            "type": "JSXIdentifier",
                                            "name": "a",
                                            "start": 32,
                                            "end": 33,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 17
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 18
                                                }
                                            }
                                        },
                                        "attributes": [],
                                        "selfClosing": false,
                                        "start": 31,
                                        "end": 34,
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 16
                                            },
                                            "end": {
                                                "line": 2,
                                                "column": 18
                                            }
                                        }
                                    },
                                    "closingElement": {
                                        "type": "JSXClosingElement",
                                        "name": {
                                            "type": "JSXIdentifier",
                                            "name": "a",
                                            "start": 36,
                                            "end": 37,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 21
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 22
                                                }
                                            }
                                        },
                                        "start": 34,
                                        "end": 38,
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 18
                                            },
                                            "end": {
                                                "line": 2,
                                                "column": 23
                                            }
                                        }
                                    },
                                    "start": 31,
                                    "end": 38,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 16
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 23
                                        }
                                    }
                                },
                                "delegate": false,
                                "start": 25,
                                "end": 38,
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 10
                                    },
                                    "end": {
                                        "line": 2,
                                        "column": 23
                                    }
                                }
                            },
                            "start": 25,
                            "end": 39,
                            "loc": {
                                "start": {
                                    "line": 2,
                                    "column": 10
                                },
                                "end": {
                                    "line": 2,
                                    "column": 24
                                }
                            }
                        }
                    ],
                    "start": 13,
                    "end": 47,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 13
                        },
                        "end": {
                            "line": 3,
                            "column": 7
                        }
                    }
                },
                "async": false,
                "generator": true,
                "expression": false,
                "id": {
                    "type": "Identifier",
                    "name": "it",
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
                    }
                },
                "start": 0,
                "end": 47,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 3,
                        "column": 7
                    }
                }
            }
        ],
        "sourceType": "script",
        "start": 0,
        "end": 47,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 3,
                "column": 7
            }
        }
    });
  });


});
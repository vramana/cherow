import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Espressions - Template', () => {

    it('should fail on invalid octals in untagged template expression - #1', () => {
        expect(() => {
            parseScript('`\\000`');
        }).to.throw();
    });

    it('should fail on invalid octals in untagged template expression - #2', () => {
        expect(() => {
            parseScript('`\\123`');
        }).to.throw();
    });

    it('should fail on invalid octals in untagged template expression - #3', () => {
        expect(() => {
            parseScript('`\\001`');
        }).to.throw();
    });

    it('should fail on invalid octals in untagged template expression - #4', () => {
        expect(() => {
            parseScript('`\\41`');
        }).to.throw();
    });

    it('should fail on invalid octals in untagged template expression - #5', () => {
        expect(() => {
            parseScript('`\\11`');
        }).to.throw();
    });

    it('should fail on invalid octals in untagged template expression - #6', () => {
        expect(() => {
            parseScript('`\\4`');
        }).to.throw();
    });

    it('should fail on invalid octals in untagged template expression - #7', () => {
        expect(() => {
            parseScript('`\\1`');
        }).to.throw();
    });

    it('should fail on invalid octals in untagged template expression - #8', () => {
        expect(() => {
            parseScript('`\\37`');
        }).to.throw();
    });

    it('should fail on invalid template end', () => {
        expect(() => {
            parseScript('a++``');
        }).to.throw();
    });

    it('should fail on unexpeced end of input in untagged template expression', () => {
        expect(() => {
            parseScript('`${a}a${b}');
        }).to.throw();
    });

    it('should fail on invalid template end', () => {
        expect(() => {
            parseScript('a++``');
        }).to.throw();
    });

    it('should fail on "`\\u`', () => {
        expect(() => {
            parseScript('`\\u`');
        }).to.throw();
    });

    it('should fail on unterminated template', () => {
        expect(() => {
            parseScript('`');
        }).to.throw();
    });

    it(`should fail on invalid unicode escape sequence - #1`, () => {
        expect(() => {
            parseScript('`\\x0`;');
        }).to.throw();
    });

    it(`should fail on invalid octal escape sequence`, () => {
        expect(() => {
            parseScript('`\\00`;');
        }).to.throw();
    });

    it(`should fail on unexpected unfinished untagged template expression`, () => {
        expect(() => {
            parseScript('`${a');
        }).to.throw();
    });

    it(`should fail on invalid unicode escape sequence - #1`, () => {
        expect(() => {
            parseScript('`\\u0`;');
        }).to.throw();
    });

    it(`should fail on invalid unicode escape sequence - #2`, () => {
        expect(() => {
            parseScript('`\\u0`;');
        }).to.throw();
    });

    it(`should fail on invalid unicode escape sequence - #3`, () => {
        expect(() => {
            parseScript('`\\u00g`;');
        }).to.throw();
    });

    it(`should fail on invalid unicode escape sequence - #4`, () => {
        expect(() => {
            parseScript('`\\u000g`;');
        }).to.throw();
    });

    it(`should fail on invalid unicode escape sequence - #5`, () => {
        expect(() => {
            parseScript('`\\u{g`;');
        }).to.throw();
    });

    it(`should fail on invalid unicode escape sequence - #6`, () => {
        expect(() => {
            parseScript('`\\u{10FFFFF}${"inner"}right`');
        }).to.throw();
    });

    it(`should fail on invalid unicode escape sequence - #7`, () => {
        expect(() => {
            parseScript('`\\u0g`;');
        }).to.throw();
    });

    it(`should fail on bad escape sequence in untagged template literal - #1`, () => {
        expect(() => {
            parseScript('\\u');
        }).to.throw();
    });

    it(`should fail on bad escape sequence in untagged template literal - #2`, () => {
        expect(() => {
            parseScript('`\\u{abcdx`');
        }).to.throw();
    });

    it(`should fail on bad escape sequence in untagged template literal - #3`, () => {
        expect(() => {
            parseScript('`left${0}\\u0`');
        }).to.throw();
    });

    it(`should fail on bad escape sequence in untagged template literal - #4`, () => {
        expect(() => {
            parseScript('`\\u0${0}right`');
        }).to.throw();
    });
    it(`should fail on bad escape sequence in untagged template literal - #5`, () => {
        expect(() => {
            parseScript('`\\u00g${0}right`');
        }).to.throw();
    });
    it(`should fail on bad escape sequence in untagged template literal - #6`, () => {
        expect(() => {
            parseScript('`\\u000g`');
        }).to.throw();
    });
    it(`should fail on bad escape sequence in untagged template literal - #7`, () => {
        expect(() => {
            parseScript('`\\u{\\u{0}${0}right`');
        }).to.throw();
    });
    it(`should fail on bad escape sequence in untagged template literal - #8`, () => {
        expect(() => {
            parseScript('`\\u{\\${0}right`');
        }).to.throw();
    });
    it(`should fail on bad escape sequence in untagged template literal - #9`, () => {
        expect(() => {
            parseScript('`left${0}\\u{\\${1}right`');
        }).to.throw();
    });
    it(`should fail on bad escape sequence in untagged template literal - #10`, () => {
        expect(() => {
            parseScript('`\\u{0${0}right`');
        }).to.throw();
    });
    it(`should fail on bad escape sequence in untagged template literal - #11`, () => {
        expect(() => {
            parseScript('`\\u{\`${0}right`');
        }).to.throw();
    });
    it(`should fail on bad escape sequence in untagged template literal - #12`, () => {
        expect(() => {
            parseScript('`left${0}\\u{110000}${1}right`');
        }).to.throw();
    });

    it(`should fail on bad escape sequence in untagged template literal - #13`, () => {
        expect(() => {
            parseScript('`\\u{110000}`');
        }).to.throw();
    });

    it(`should fail on bad escape sequence in untagged template literal - #14`, () => {
        expect(() => {
            parseScript('`left${0}\\u{${1}right`');
        }).to.throw();
    });

    it(`should fail on bad escape sequence in untagged template literal - #15`, () => {
        expect(() => {
            parseScript('`left${0}\\u{-0}${1}right`');
        }).to.throw();
    });

    it(`should fail on bad escape sequence in untagged template literal - #16`, () => {
        expect(() => {
            parseScript('`\\u{-0}`');
        }).to.throw();
    });

    it(`should fail on bad escape sequence in untagged template literal - #17`, () => {
        expect(() => {
            parseScript('`\\u{}${0}right`');
        }).to.throw();
    });

    it(`should fail on bad escape sequence in untagged template literal - #18`, () => {
        expect(() => {
            parseScript('`left${0}\\u0``');
        }).to.throw();
    });

    it(`should fail on bad escape sequence in untagged template literal - #19`, () => {
        expect(() => {
            parseScript('`\\u{`');
        }).to.throw();
    });

    it(`should fail on bad escape sequence in untagged template literal - #20`, () => {
        expect(() => {
            parseScript('`\\u{abcdx}`');
        }).to.throw();
    });

    it(`should fail on bad character escape sequence`, () => {
        expect(() => {
            parseScript('foo`\\unicode`');
        }).to.not.throw();
    });

    it(`should fail on invalid escape untagged`, () => {
        expect(() => {
            parseScript('`left${0}\\u0`');
        }).to.throw();
    });
    it('should parse "foo`\\unicode`"', () => {
        expect(parseScript('foo`\\unicode`', {
            locations: true,
            raw: true
        })).to.eql({
              "body": [
                {
                  "expression": {
                    "loc": {
                      "end": {
                        "column": 13,
                        "line": 1,
                      },
                      "start": {
                        "column": 0,
                        "line": 1,
                      }
                    },
                    "quasi": {
                      "expressions": [],
                      "loc": {
                        "end": {
                          "column": 13,
                          "line": 1,
                        },
                        "start": {
                          "column": 3,
                          "line": 1,
                        }
                      },
                      "quasis": [
                        {
                          "loc": {
                            "end": {
                              "column": 13,
                              "line": 1,
                            },
                            "start": {
                              "column": 3,
                              "line": 1,
                            }
                          },
                          "tail": true,
                          "type": "TemplateElement",
                          "value": {
                            "cooked": null,
                            "raw": "\\unicode"
                          },
                        }
                      ],
                      "type": "TemplateLiteral"
                   },
                    "tag": {
                      "loc": {
                        "end": {
                          "column": 3,
                         "line": 1,
                        },
                        "start": {
                         "column": 0,
                          "line": 1,
                        }
                      },
                      "name": "foo",
                      "type": "Identifier",
                    },
                    "type": "TaggedTemplateExpression"
                  },
                  "loc": {
                    "end": {
                      "column": 13,
                      "line": 1,
                    },
                    "start": {
                      "column": 0,
                      "line": 1,
                    }
                  },
                  "type": "ExpressionStatement"
                },
              ],
              "loc": {
                "end": {
                  "column": 13,
                  "line": 1,
                },
                "start": {
                  "column": 0,
                  "line": 1,
                },
              },
              "sourceType": "script",
            "type": "Program"
            });
    });

    it('should parse "foo`\\u`"', () => {
        expect(parseScript('foo`\\u`', {
            locations: true,
            raw: true
        })).to.eql({
              "body": [
                {
                  "expression": {
                    "loc": {
                      "end": {
                       "column": 7,
                        "line": 1,
                      },
                      "start": {
                        "column": 0,
                        "line": 1,
                      }
                   },
                    "quasi": {
                      "expressions": [],
                      "loc": {
                        "end": {
                         "column": 7,
                          "line": 1,
                        },
                        "start": {
                          "column": 3,
                          "line": 1,
                        }
                     },
                      "quasis": [
                        {
                          "loc": {
                            "end": {
                              "column": 7,
                              "line": 1,
                            },
                            "start": {
                             "column": 3,
                              "line": 1,
                            }
                          },
                          "tail": true,
                          "type": "TemplateElement",
                          "value": {
                            "cooked": null,
                            "raw": "\\u"
                          },
                        },
                      ],
                      "type": "TemplateLiteral"
                    },
                    "tag": {
                      "loc": {
                        "end": {
                          "column": 3,
                          "line": 1,
                        },
                        "start": {
                          "column": 0,
                          "line": 1,
                        }
                      },
                      "name": "foo",
                      "type": "Identifier",
                    },
                    "type": "TaggedTemplateExpression",
                 },
                  "loc": {
                    "end": {
                      "column": 7,
                      "line": 1,
                    },
                    "start": {
                      "column": 0,
                      "line": 1,
                    },
                  },
                  "type": "ExpressionStatement",
                },
              ],
              "loc": {
                "end": {
                  "column": 7,
                  "line": 1,
                },
                "start": {
                  "column": 0,
                  "line": 1,
                }
              },
              "sourceType": "script",
              "type": "Program",
            });
    });

    it('should parse "foo`\\u{`"', () => {
        expect(parseScript('foo`\\u{`', {
            locations: true,
            raw: true
        })).to.eql({
              "body": [
                {
                  "expression": {
                    "loc": {
                      "end": {
                        "column": 8,
                        "line": 1,
                      },
                      "start": {
                        "column": 0,
                        "line": 1,
                      }
                    },
                    "quasi": {
                      "expressions": [],
                      "loc": {
                        "end": {
                          "column": 8,
                         "line": 1,
                        },
                        "start": {
                          "column": 3,
                          "line": 1,
                        }
                      },
                      "quasis": [
                        {
                          "loc": {
                            "end": {
                              "column": 8,
                              "line": 1,
                            },
                            "start": {
                              "column": 3,
                              "line": 1,
                            }
                          },
                          "tail": true,
                          "type": "TemplateElement",
                          "value": {
                            "cooked": null,
                            "raw": "\\u{"
                          }
                        }
                      ],
                      "type": "TemplateLiteral",
                    },
                    "tag": {
                      "loc": {
                        "end": {
                          "column": 3,
                          "line": 1,
                        },
                        "start": {
                          "column": 0,
                          "line": 1,
                        }
                      },
                      "name": "foo",
                      "type": "Identifier",
                    },
                    "type": "TaggedTemplateExpression"
                  },
                  "loc": {
                    "end": {
                      "column": 8,
                      "line": 1,
                   },
                    "start": {
                      "column": 0,
                      "line": 1,
                    }
                  },
                  "type": "ExpressionStatement"
                }
              ],
              "loc": {
                "end": {
                  "column": 8,
                  "line": 1,
                },
                "start": {
                  "column": 0,
                 "line": 1,
                }
              },
              "sourceType": "script",
              "type": "Program",
            });
    });

    it('should parse "foo`\\u{abcdx`"', () => {
        expect(parseScript('foo`\\u{abcdx`', {
            locations: true,
            raw: true
        })).to.eql({
              "body": [
                {
                  "expression": {
                    "loc": {
                      "end": {
                        "column": 13,
                        "line": 1,
                      },
                      "start": {
                        "column": 0,
                        "line": 1,
                      }
                    },
                    "quasi": {
                      "expressions": [],
                      "loc": {
                        "end": {
                          "column": 13,
                          "line": 1,
                        },
                        "start": {
                          "column": 3,
                          "line": 1,
                        }
                      },
                      "quasis": [
                        {
                          "loc": {
                            "end": {
                              "column": 13,
                              "line": 1,
                            },
                            "start": {
                              "column": 3,
                              "line": 1,
                            }
                          },
                          "tail": true,
                          "type": "TemplateElement",
                          "value": {
                            "cooked": null,
                            "raw": "\\u{abcdx"
                          }
                        }
                      ],
                      "type": "TemplateLiteral"
                    },
                    "tag": {
                     "loc": {
                        "end": {
                          "column": 3,
                          "line": 1,
                        },
                        "start": {
                          "column": 0,
                          "line": 1,
                        }
                      },
                      "name": "foo",
                      "type": "Identifier",
                    },
                    "type": "TaggedTemplateExpression"
                  },
                  "loc": {
                    "end": {
                      "column": 13,
                      "line": 1,
                    },
                    "start": {
                      "column": 0,
                      "line": 1,
                    }
                  },
                  "type": "ExpressionStatement"
                }
              ],
              "loc": {
                "end": {
                  "column": 13,
                  "line": 1
                },
                "start": {
                  "column": 0,
                  "line": 1,
                }
              },
              "sourceType": "script",
              "type": "Program"
            });
    });


    it('should parse "foo`\\unicode\\\\`"', () => {
        expect(parseScript('foo`\\unicode\\\\`', {
            locations: true,
            raw: true
        })).to.eql({
              "body": [
                {
                  "expression": {
                    "loc": {
                      "end": {
                        "column": 15,
                        "line": 1,
                      },
                      "start": {
                        "column": 0,
                        "line": 1,
                      }
                    },
                    "quasi": {
                      "expressions": [],
                      "loc": {
                        "end": {
                          "column": 15,
                          "line": 1,
                        },
                        "start": {
                          "column": 3,
                          "line": 1,
                       }
                      },
                      "quasis": [
                        {
                          "loc": {
                            "end": {
                              "column": 15,
                              "line": 1,
                            },
                            "start": {
                              "column": 3,
                              "line": 1,
                            }
                          },
                          "tail": true,
                          "type": "TemplateElement",
                          "value": {
                            "cooked": null,
                            "raw": "\\unicode\\\\",
                          }
                        }
                      ],
                      "type": "TemplateLiteral"
                    },
                    "tag": {
                      "loc": {
                        "end": {
                          "column": 3,
                          "line": 1,
                        },
                        "start": {
                          "column": 0,
                          "line": 1,
                        }
                      },
                      "name": "foo",
                      "type": "Identifier",
                    },
                    "type": "TaggedTemplateExpression"
                  },
                  "loc": {
                   "end": {
                      "column": 15,
                     "line": 1,
                    },
                    "start": {
                      "column": 0,
                      "line": 1,
                    }
                  },
                  "type": "ExpressionStatement",
                }
              ],
              "loc": {
                "end": {
                  "column": 15,
                  "line": 1,
               },
                "start": {
                  "column": 0,
                  "line": 1,
                }
              },
              "sourceType": "script",
              "type": "Program"
            });
    });

    it('should parse "`\\f`"', () => {
        expect(parseScript('`\\f`', {
            locations: true,
            raw: true
        })).to.eql({
              "body": [
                {
                  "expression": {
                    "expressions": [],
                    "loc": {
                      "end": {
                        "column": 4,
                        "line": 1,
                      },
                      "start": {
                        "column": 0,
                        "line": 1,
                      }
                    },
                    "quasis": [
                     {
                        "loc": {
                          "end": {
                            "column": 4,
                            "line": 1,
                          },
                          "start": {
                           "column": 0,
                            "line": 1,
                          }
                        },
                        "tail": true,
                        "type": "TemplateElement",
                        "value": {
                          "cooked": "\f",
                          "raw": "\\f",
                        },
                      },
                    ],
                   "type": "TemplateLiteral",
                  },
                  "loc": {
                   "end": {
                      "column": 4,
                      "line": 1,
                    },
                    "start": {
                      "column": 0,
                      "line": 1,
                    },
                  },
                  "type": "ExpressionStatement",
                },
              ],
              "loc": {
                "end": {
                  "column": 4,
                  "line": 1,
                },
                "start": {
                  "column": 0,
                 "line": 1,
                },
              },
              "sourceType": "script",
              "type": "Program",
            });
    });

    it('should parse "`\\r`"', () => {
        expect(parseScript('`\\r`', {
            locations: true,
            raw: true
        })).to.eql({
              "body": [
                {
                  "expression": {
                    "expressions": [],
                    "loc": {
                      "end": {
                        "column": 4,
                        "line": 1,
                      },
                      "start": {
                       "column": 0,
                        "line": 1,
                      }
                    },
                    "quasis": [
                      {
                        "loc": {
                          "end": {
                            "column": 4,
                            "line": 1,
                          },
                          "start": {
                            "column": 0,
                            "line": 1,
                          },
                        },
                        "tail": true,
                        "type": "TemplateElement",
                        "value": {
                          "cooked": "\r",
                          "raw": "\\r",
                        }
                      }
                    ],
                    "type": "TemplateLiteral"
                  },
                  "loc": {
                    "end": {
                      "column": 4,
                      "line": 1,
                    },
                    "start": {
                      "column": 0,
                      "line": 1,
                    }
                  },
                  "type": "ExpressionStatement",
                },
              ],
              "loc": {
                "end": {
                  "column": 4,
                  "line": 1,
               },
                "start": {
                  "column": 0,
                  "line": 1,
                }
              },
              "sourceType": "script",
              "type": "Program"
            });
    });

    it('should parse "`abc`"', () => {
        expect(parseScript('`abc`', {
            locations: true,
            raw: true
        })).to.eql({
              "body": [
                {
                  "expression": {
                    "expressions": [],
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
                    "quasis": [
                      {
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
                        "tail": true,
                        "type": "TemplateElement",
                       "value": {
                          "cooked": "abc",
                          "raw": "abc",
                        }
                      }
                    ],
                    "type": "TemplateLiteral"
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
                  "type": "ExpressionStatement"
                }
              ],
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
              "sourceType": "script",
              "type": "Program"
            });
    });

    it('should parse "`123`"', () => {
        expect(parseScript('`123`', {
            locations: true,
            raw: true
        })).to.eql({
              "body": [
                {
                  "expression": {
                    "expressions": [],
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
                    "quasis": [
                      {
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
                        "tail": true,
                        "type": "TemplateElement",
                        "value": {
                          "cooked": "123",
                          "raw": "123",
                        }
                      }
                    ],
                   "type": "TemplateLiteral",
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
                  "type": "ExpressionStatement"
                }
              ],
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
              "type": "Program"
            });
    });

    it('should parse "`"${0x401}"`"', () => {
        expect(parseScript('`"${0x401}"`', {
            locations: true,
            raw: true
        })).to.eql({
              "body": [
                {
                  "expression": {
                    "expressions": [
                      {
                        "loc": {
                          "end": {
                            "column": 9,
                            "line": 1
                          },
                          "start": {
                            "column": 4,
                           "line": 1,
                          }
                       },
                        "raw": "0x401",
                        "type": "Literal",
                        "value": 1025,
                      }
                    ],
                    "loc": {
                      "end": {
                        "column": 12,
                        "line": 1,
                      },
                      "start": {
                       "column": 0,
                        "line": 1,
                      }
                    },
                    "quasis": [
                     {
                        "loc": {
                          "end": {
                            "column": 9,
                            "line": 1,
                          },
                          "start": {
                            "column": 9,
                            "line": 1,
                          }
                        },
                        "tail": false,
                        "type": "TemplateElement",
                        "value": {
                          "cooked": "\"",
                          "raw": "\"",
                        }
                      },
                      {
                        "loc": {
                          "end": {
                            "column": 12,
                            "line": 1,
                          },
                          "start": {
                            "column": 9,
                            "line": 1,
                          }
                        },
                        "tail": true,
                        "type": "TemplateElement",
                        "value": {
                          "cooked": "\"",
                          "raw": "\"",
                        }
                      }
                    ],
                    "type": "TemplateLiteral"
                  },
                  "loc": {
                    "end": {
                      "column": 12,
                      "line": 1,
                    },
                    "start": {
                      "column": 0,
                      "line": 1,
                    }
                  },
                  "type": "ExpressionStatement"
                }
              ],
              "loc": {
                "end": {
                  "column": 12,
                  "line": 1,
                },
                "start": {
                  "column": 0,
                  "line": 1,
                }
             },
              "sourceType": "script",
              "type": "Program"
            });
    });

    it('should parse "`"\\${0x410}"`"', () => {
        expect(parseScript('`"\\${0x410}"`', {
            locations: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
              {
                "type": "ExpressionStatement",
                "expression": {
                  "type": "TemplateLiteral",
                  "expressions": [],
                  "quasis": [
                    {
                      "type": "TemplateElement",
                      "value": {
                        "raw": "\"\\${0x410}\"",
                        "cooked": "\"${0x410}\""
                      },
                      "tail": true
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "`\\u180E`"', () => {
        expect(parseScript('`\\u180E`', {
            locations: true,
            raw: true
        })).to.eql({
              "body": [
                {
                  "expression": {
                    "expressions": [],
                    "loc": {
                      "end": {
                        "column": 8,
                        "line": 1,
                      },
                      "start": {
                        "column": 0,
                        "line": 1,
                      }
                   },
                    "quasis": [
                      {
                       "loc": {
                          "end": {
                            "column": 8,
                            "line": 1,
                          },
                          "start": {
                            "column": 0,
                            "line": 1,
                          }
                        },
                        "tail": true,
                        "type": "TemplateElement",
                        "value": {
                          "cooked": "᠎",
                          "raw": "\\u180E",
                        }
                      }
                   ],
                    "type": "TemplateLiteral"
                  },
                  "loc": {
                    "end": {
                      "column": 8,
                      "line": 1,
                    },
                    "start": {
                      "column": 0,
                      "line": 1,
                    }
                  },
                  "type": "ExpressionStatement",
                }
              ],
              "loc": {
                "end": {
                 "column": 8,
                  "line": 1,
                },
                "start": {
                  "column": 0,
                  "line": 1,
                }
              },
              "sourceType": "script",
              "type": "Program",
            });
    });

    it('should parse "foo`\\u{abcdx}`"', () => {
        expect(parseScript('foo`\\u{abcdx}`', {
            locations: true,
            raw: true
        })).to.eql({
              "body": [
                {
                  "expression": {
                    "loc": {
                      "end": {
                        "column": 14,
                        "line": 1,
                      },
                      "start": {
                        "column": 0,
                        "line": 1,
                      }
                    },
                    "quasi": {
                      "expressions": [],
                      "loc": {
                        "end": {
                          "column": 14,
                          "line": 1,
                        },
                        "start": {
                          "column": 3,
                          "line": 1,
                        }
                      },
                      "quasis": [
                        {
                          "loc": {
                            "end": {
                              "column": 14,
                              "line": 1,
                            },
                            "start": {
                              "column": 3,
                              "line": 1,
                            }
                          },
                          "tail": true,
                          "type": "TemplateElement",
                          "value": {
                            "cooked": null,
                            "raw": "\\u{abcdx}",
                          }
                        }
                      ],
                      "type": "TemplateLiteral",
                    },
                    "tag": {
                      "loc": {
                        "end": {
                          "column": 3,
                          "line": 1,
                        },
                        "start": {
                          "column": 0,
                          "line": 1,
                        }
                      },
                      "name": "foo",
                      "type": "Identifier",
                    },
                    "type": "TaggedTemplateExpression"
                  },
                  "loc": {
                    "end": {
                      "column": 14,
                      "line": 1,
                    },
                    "start": {
                      "column": 0,
                      "line": 1,
                    }
                  },
                  "type": "ExpressionStatement"
                }
              ],
              "loc": {
                "end": {
                  "column": 14,
                  "line": 1,
                },
                "start": {
                  "column": 0,
                  "line": 1,
                }
              },
              "sourceType": "script",
              "type": "Program"
            });
    });

    it('should parse method invocation in expression position of TemplateLiteral', () => {
        expect(parseScript('var object = { fn: function() { return `result`; } };', {
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "VariableDeclaration",
                    "declarations": [
                        {
                            "type": "VariableDeclarator",
                            "id": {
                                "type": "Identifier",
                                "name": "object",
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 4
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 10
                                    }
                                }
                            },
                            "init": {
                                "type": "ObjectExpression",
                                "properties": [
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "fn",
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
                                        "computed": false,
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": null,
                                            "params": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [
                                                    {
                                                        "type": "ReturnStatement",
                                                        "argument": {
                                                            "type": "TemplateLiteral",
                                                            "quasis": [
                                                                {
                                                                    "type": "TemplateElement",
                                                                    "value": {
                                                                        "raw": "result",
                                                                        "cooked": "result"
                                                                    },
                                                                    "tail": true,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 1,
                                                                            "column": 39
                                                                        },
                                                                        "end": {
                                                                            "line": 1,
                                                                            "column": 47
                                                                        }
                                                                    }
                                                                }
                                                            ],
                                                            "expressions": [],
                                                            "loc": {
                                                                "start": {
                                                                    "line": 1,
                                                                    "column": 39
                                                                },
                                                                "end": {
                                                                    "line": 1,
                                                                    "column": 47
                                                                }
                                                            }
                                                        },
                                                        "loc": {
                                                            "start": {
                                                                "line": 1,
                                                                "column": 32
                                                            },
                                                            "end": {
                                                                "line": 1,
                                                                "column": 48
                                                            }
                                                        }
                                                    }
                                                ],
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 30
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 50
                                                    }
                                                }
                                            },
                                            "generator": false,
                                            "expression": false,
                                            "async": false,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 19
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 50
                                                }
                                            }
                                        },
                                        "kind": "init",
                                        "method": false,
                                        "shorthand": false,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 15
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 50
                                            }
                                        }
                                    }
                                ],
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 13
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 52
                                    }
                                }
                            },
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 4
                                },
                                "end": {
                                    "line": 1,
                                    "column": 52
                                }
                            }
                        }
                    ],
                    "kind": "var",
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 53
                        }
                    }
                }
            ],
            "sourceType": "script",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 53
                }
            }
        });
    });

    it('should parse function invocation in expression position of TemplateLiteral', () => {
        expect(parseScript('function fn() { return `result`; }', {
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
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
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ReturnStatement",
                                "argument": {
                                    "type": "TemplateLiteral",
                                    "quasis": [
                                        {
                                            "type": "TemplateElement",
                                            "value": {
                                                "raw": "result",
                                                "cooked": "result"
                                            },
                                            "tail": true,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 23
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 31
                                                }
                                            }
                                        }
                                    ],
                                    "expressions": [],
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 23
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 31
                                        }
                                    }
                                },
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 16
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 32
                                    }
                                }
                            }
                        ],
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 14
                            },
                            "end": {
                                "line": 1,
                                "column": 34
                            }
                        }
                    },
                    "generator": false,
                    "expression": false,
                    "async": false,
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
                }
            ],
            "sourceType": "script",
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
        });
    });

    
    it('should parse dollar sign', () => {
        expect(parseScript('`$`', {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "TemplateLiteral",
                        "expressions": [],
                        "quasis": [
                            {
                                "type": "TemplateElement",
                                "value": {
                                    "cooked": "$",
                                    "raw": "$"
                                },
                                "tail": true,
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
                                }
                            }
                        ],
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
                        }
                    },
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
                    }
                }
            ],
            "sourceType": "script",
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
            }
        });
    });

    it('should parse "` foo ${ b + `baz ${ c }` }`;"', () => {
        expect(parseScript('` foo ${ b + `baz ${ c }` }`;', {
            ranges: false,
            raw: true,
            v8: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "TemplateLiteral",
                        "quasis": [
                            {
                                "type": "TemplateElement",
                                "value": {
                                    "raw": " foo ",
                                    "cooked": " foo "
                                },
                                "tail": false
                            },
                            {
                                "type": "TemplateElement",
                                "value": {
                                    "raw": "",
                                    "cooked": ""
                                },
                                "tail": true
                            }
                        ],
                        "expressions": [
                            {
                                "type": "BinaryExpression",
                                "operator": "+",
                                "left": {
                                    "type": "Identifier",
                                    "name": "b"
                                },
                                "right": {
                                    "type": "TemplateLiteral",
                                    "quasis": [
                                        {
                                            "type": "TemplateElement",
                                            "value": {
                                                "raw": "baz ",
                                                "cooked": "baz "
                                            },
                                            "tail": false
                                        },
                                        {
                                            "type": "TemplateElement",
                                            "value": {
                                                "raw": "",
                                                "cooked": ""
                                            },
                                            "tail": true
                                        }
                                    ],
                                    "expressions": [
                                        {
                                            "type": "Identifier",
                                            "name": "c"
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse URL sourcemap template string (module code)', () => {
        expect(parseModule('`//# ${SOURCEMAPPING_URL}=${url}\n`', {
            ranges: false,
            raw: true,
            v8: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "TemplateLiteral",
                        "quasis": [
                            {
                                "type": "TemplateElement",
                                "value": {
                                    "raw": "//# ",
                                    "cooked": "//# "
                                },
                                "tail": false
                            },
                            {
                                "type": "TemplateElement",
                                "value": {
                                    "raw": "=",
                                    "cooked": "="
                                },
                                "tail": false
                            },
                            {
                                "type": "TemplateElement",
                                "value": {
                                    "raw": "\n",
                                    "cooked": "\n"
                                },
                                "tail": true
                            }
                        ],
                        "expressions": [
                            {
                                "type": "Identifier",
                                "name": "SOURCEMAPPING_URL"
                            },
                            {
                                "type": "Identifier",
                                "name": "url"
                            }
                        ]
                    }
                }
            ],
            "sourceType": "module"
        });
    });

    it('should parse line terminator', () => {
        expect(parseScript('var source = `\u{1F4AA}`;', {
            ranges: false,
            raw: true
        })).to.eql({
              "body": [
                {
                  "declarations": [
                    {
                      "id": {
                        "name": "source",
                        "type": "Identifier"
                      },
                      "init": {
                        "expressions": [],
                        "quasis": [
                          {
                            "tail": true,
                            "type": "TemplateElement",
                            "value": {
                              "cooked": "💪",
                              "raw": "💪"
                            },
                          },
                        ],
                        "type": "TemplateLiteral"
                      },
                      "type": "VariableDeclarator"
                    }
                  ],
                  "kind": "var",
                  "type": "VariableDeclaration"
                }
              ],
              "sourceType": "script",
              "type": "Program"
            });
    });

    it('should parse line terminator', () => {
        expect(parseScript('var source = `\b`;', {
            ranges: false,
            raw: true
        })).to.eql({
              "body": [
                {
                  "declarations": [
                    {
                      "id": {
                        "name": "source",
                        "type": "Identifier"
                      },
                      "init": {
                        "expressions": [],
                        "quasis": [
                          {
                            "tail": true,
                            "type": "TemplateElement",
                            "value": {
                              "cooked": "\b",
                              "raw": "\b"
                            }
                          }
                        ],
                        "type": "TemplateLiteral"
                      },
                      "type": "VariableDeclarator"
                    }
                  ],
                  "kind": "var",
                  "type": "VariableDeclaration"
                }
              ],
              "sourceType": "script",
              "type": "Program"
            });
    });

    it('should parse line terminator', () => {
        expect(parseScript('var source = `\n\r\n`;', {
            ranges: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "VariableDeclaration",
                "declarations": [{
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "Identifier",
                        "name": "source"
                    },
                    "init": {
                        "type": "TemplateLiteral",
                        "quasis": [{
                            "type": "TemplateElement",
                            "value": {
                                "raw": "\n\r\n",
                                "cooked": "\n\r\n"
                            },
                            "tail": true
                        }],
                        "expressions": []
                    }
                }],
                "kind": "var"
            }],
            "sourceType": "script"
        });
    });

    it('should parse new expression', () => {
        expect(parseScript('new raw`42`', {
            locations: false,
            raw: true,
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "NewExpression",
                        "callee": {
                            "type": "TaggedTemplateExpression",
                            "tag": {
                                "type": "Identifier",
                                "name": "raw"
                            },
                            "quasi": {
                                "type": "TemplateLiteral",
                                "quasis": [
                                    {
                                        "type": "TemplateElement",
                                        "value": {
                                            "raw": "42",
                                            "cooked": "42"
                                        },
                                        "tail": true
                                    }
                                ],
                                "expressions": []
                            }
                        },
                        "arguments": []
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse tagged interpolation', () => {
        expect(parseScript('raw`hello ${name}`', {
            locations: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "TaggedTemplateExpression",
                    "tag": {
                        "type": "Identifier",
                        "name": "raw"
                    },
                    "quasi": {
                        "type": "TemplateLiteral",
                        "quasis": [{
                                "type": "TemplateElement",
                                "value": {
                                    "raw": "hello ",
                                    "cooked": "hello "
                                },
                                "tail": false
                            },
                            {
                                "type": "TemplateElement",
                                "value": {
                                    "raw": "",
                                    "cooked": ""
                                },
                                "tail": true
                            }
                        ],
                        "expressions": [{
                            "type": "Identifier",
                            "name": "name"
                        }]
                    }
                }
            }],
            "sourceType": "script"
        });
    });
    
    it('should parse tagged', () => {
        expect(parseScript('raw`42`', {
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "TaggedTemplateExpression",
                        "tag": {
                            "type": "Identifier",
                            "name": "raw",
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 3
                                }
                            }
                        },
                        "quasi": {
                            "type": "TemplateLiteral",
                            "quasis": [
                                {
                                    "type": "TemplateElement",
                                    "value": {
                                        "raw": "42",
                                        "cooked": "42"
                                    },
                                    "tail": true,
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
                                }
                            ],
                            "expressions": [],
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
                }
            ],
            "sourceType": "script",
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
        });
    });
    it('should parse line terminator', () => {
        expect(parseScript('`\r\n\t\n`', {
            ranges: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "TemplateLiteral",
                        "quasis": [
                            {
                                "type": "TemplateElement",
                                "value": {
                                    "raw": "\r\n\t\n",
                                    "cooked": "\r\n\t\n"
                                },
                                "tail": true
                            }
                        ],
                        "expressions": []
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse line terminator', () => {
        expect(parseScript('`\r\n\t\n`', {
            ranges: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "TemplateLiteral",
                        "quasis": [
                            {
                                "type": "TemplateElement",
                                "value": {
                                    "raw": "\r\n\t\n",
                                    "cooked": "\r\n\t\n"
                                },
                                "tail": true
                            }
                        ],
                        "expressions": []
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse line terminator', () => {
        expect(parseScript("var source = '`\\n\\r\\n`';", {
            ranges: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "VariableDeclaration",
                    "declarations": [
                        {
                            "type": "VariableDeclarator",
                            "id": {
                                "type": "Identifier",
                                "name": "source"
                            },
                            "init": {
                                "type": "Literal",
                                "value": "`\n\r\n`",
                                "raw": "'`\\n\\r\\n`'"
                            }
                        }
                    ],
                    "kind": "var"
                }
            ],
            "sourceType": "script"
        });
    });

        it('should parse advanced', () => {
            expect(parseScript('doSmth(`${x} + ${y} = ${x + y}`)', {
                ranges: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "CallExpression",
                            "callee": {
                                "type": "Identifier",
                                "name": "doSmth"
                            },
                            "arguments": [
                                {
                                    "type": "TemplateLiteral",
                                    "quasis": [
                                        {
                                            "type": "TemplateElement",
                                            "value": {
                                                "raw": "",
                                                "cooked": ""
                                            },
                                            "tail": false
                                        },
                                        {
                                            "type": "TemplateElement",
                                            "value": {
                                                "raw": " + ",
                                                "cooked": " + "
                                            },
                                            "tail": false
                                        },
                                        {
                                            "type": "TemplateElement",
                                            "value": {
                                                "raw": " = ",
                                                "cooked": " = "
                                            },
                                            "tail": false
                                        },
                                        {
                                            "type": "TemplateElement",
                                            "value": {
                                                "raw": "",
                                                "cooked": ""
                                            },
                                            "tail": true
                                        }
                                    ],
                                    "expressions": [
                                        {
                                            "type": "Identifier",
                                            "name": "x"
                                        },
                                        {
                                            "type": "Identifier",
                                            "name": "y"
                                        },
                                        {
                                            "type": "BinaryExpression",
                                            "operator": "+",
                                            "left": {
                                                "type": "Identifier",
                                                "name": "x"
                                            },
                                            "right": {
                                                "type": "Identifier",
                                                "name": "y"
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                ],
                "sourceType": "script"
            });
        });
       
        it('should parse Acorn issue 173', () => {
            expect(parseScript('`{${x}}`, `}`', {
                ranges: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "SequenceExpression",
                            "expressions": [
                                {
                                    "type": "TemplateLiteral",
                                    "quasis": [
                                        {
                                            "type": "TemplateElement",
                                            "value": {
                                                "raw": "{",
                                                "cooked": "{"
                                            },
                                            "tail": false
                                        },
                                        {
                                            "type": "TemplateElement",
                                            "value": {
                                                "raw": "}",
                                                "cooked": "}"
                                            },
                                            "tail": true
                                        }
                                    ],
                                    "expressions": [
                                        {
                                            "type": "Identifier",
                                            "name": "x"
                                        }
                                    ]
                                },
                                {
                                    "type": "TemplateLiteral",
                                    "quasis": [
                                        {
                                            "type": "TemplateElement",
                                            "value": {
                                                "raw": "}",
                                                "cooked": "}"
                                            },
                                            "tail": true
                                        }
                                    ],
                                    "expressions": []
                                }
                            ]
                        }
                    }
                ],
                "sourceType": "script"
            });
        });

        it('should parse regular expression', () => {
            expect(parseScript('`${/\\d/.exec("1")[0]}`', {
                locations: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "TemplateLiteral",
                            "quasis": [
                                {
                                    "type": "TemplateElement",
                                    "value": {
                                        "raw": "",
                                        "cooked": ""
                                    },
                                    "tail": false
                                },
                                {
                                    "type": "TemplateElement",
                                    "value": {
                                        "raw": "",
                                        "cooked": ""
                                    },
                                    "tail": true
                                }
                            ],
                            "expressions": [
                                {
                                    "type": "MemberExpression",
                                    "computed": true,
                                    "object": {
                                        "type": "CallExpression",
                                        "callee": {
                                            "type": "MemberExpression",
                                            "computed": false,
                                            "object": {
                                                "type": "Literal",
                                                "value": /\d/,
                                                "raw": "/\\d/",
                                                "regex": {
                                                    "pattern": "\\d",
                                                    "flags": ""
                                                }
                                            },
                                            "property": {
                                                "type": "Identifier",
                                                "name": "exec"
                                            }
                                        },
                                        "arguments": [
                                            {
                                                "type": "Literal",
                                                "value": "1",
                                                "raw": "\"1\""
                                            }
                                        ]
                                    },
                                    "property": {
                                        "type": "Literal",
                                        "value": 0,
                                        "raw": "0"
                                    }
                                }
                            ]
                        }
                    }
                ],
                "sourceType": "script"
            });
        });
        
        it('should parse multiple primitives', () => {
            expect(parseScript('`${0} ${1} ${5} bar`', {
                locations: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "TemplateLiteral",
                            "quasis": [
                                {
                                    "type": "TemplateElement",
                                    "value": {
                                        "raw": "",
                                        "cooked": ""
                                    },
                                    "tail": false
                                },
                                {
                                    "type": "TemplateElement",
                                    "value": {
                                        "raw": " ",
                                        "cooked": " "
                                    },
                                    "tail": false
                                },
                                {
                                    "type": "TemplateElement",
                                    "value": {
                                        "raw": " ",
                                        "cooked": " "
                                    },
                                    "tail": false
                                },
                                {
                                    "type": "TemplateElement",
                                    "value": {
                                        "raw": " bar",
                                        "cooked": " bar"
                                    },
                                    "tail": true
                                }
                            ],
                            "expressions": [
                                {
                                    "type": "Literal",
                                    "value": 0,
                                    "raw": "0"
                                },
                                {
                                    "type": "Literal",
                                    "value": 1,
                                    "raw": "1"
                                },
                                {
                                    "type": "Literal",
                                    "value": 5,
                                    "raw": "5"
                                }
                            ]
                        }
                    }
                ],
                "sourceType": "script"
            });
        });
      
        it('should parse member expression in expression position of template middleList', () => {
            expect(parseScript('`${0} ${1} ${object.number} bar`', {
                ranges: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "TemplateLiteral",
                            "quasis": [
                                {
                                    "type": "TemplateElement",
                                    "value": {
                                        "raw": "",
                                        "cooked": ""
                                    },
                                    "tail": false
                                },
                                {
                                    "type": "TemplateElement",
                                    "value": {
                                        "raw": " ",
                                        "cooked": " "
                                    },
                                    "tail": false
                                },
                                {
                                    "type": "TemplateElement",
                                    "value": {
                                        "raw": " ",
                                        "cooked": " "
                                    },
                                    "tail": false
                                },
                                {
                                    "type": "TemplateElement",
                                    "value": {
                                        "raw": " bar",
                                        "cooked": " bar"
                                    },
                                    "tail": true
                                }
                            ],
                            "expressions": [
                                {
                                    "type": "Literal",
                                    "value": 0,
                                    "raw": "0"
                                },
                                {
                                    "type": "Literal",
                                    "value": 1,
                                    "raw": "1"
                                },
                                {
                                    "type": "MemberExpression",
                                    "computed": false,
                                    "object": {
                                        "type": "Identifier",
                                        "name": "object"
                                    },
                                    "property": {
                                        "type": "Identifier",
                                        "name": "number"
                                    }
                                }
                            ]
                        }
                    }
                ],
                "sourceType": "script"
            });
        });
        it('should parse primitive  value in expression position of template literal', () => {
            expect(parseScript('`foo ${5} bar`', {
                locations: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "TemplateLiteral",
                            "quasis": [
                                {
                                    "type": "TemplateElement",
                                    "value": {
                                        "raw": "foo ",
                                        "cooked": "foo "
                                    },
                                    "tail": false
                                },
                                {
                                    "type": "TemplateElement",
                                    "value": {
                                        "raw": " bar",
                                        "cooked": " bar"
                                    },
                                    "tail": true
                                }
                            ],
                            "expressions": [
                                {
                                    "type": "Literal",
                                    "value": 5,
                                    "raw": "5"
                                }
                            ]
                        }
                    }
                ],
                "sourceType": "script"
            });
        });
        it('should parse with non-ascii signs', () => {
            expect(parseScript('tag`안녕`;', {
                locations: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "TaggedTemplateExpression",
                            "tag": {
                                "type": "Identifier",
                                "name": "tag",
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 0
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 3
                                    }
                                }
                            },
                            "quasi": {
                                "type": "TemplateLiteral",
                                "quasis": [
                                    {
                                        "type": "TemplateElement",
                                        "value": {
                                            "raw": "안녕",
                                            "cooked": "안녕"
                                        },
                                        "tail": true,
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
                                    }
                                ],
                                "expressions": [],
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
        it('should parse template expression - head and tail', () => {
            expect(parseScript('tag`head${a}tail`;', {
                locations: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "TaggedTemplateExpression",
                            "tag": {
                                "type": "Identifier",
                                "name": "tag"
                            },
                            "quasi": {
                                "type": "TemplateLiteral",
                                "quasis": [
                                    {
                                        "type": "TemplateElement",
                                        "value": {
                                            "raw": "head",
                                            "cooked": "head"
                                        },
                                        "tail": false
                                    },
                                    {
                                        "type": "TemplateElement",
                                        "value": {
                                            "raw": "tail",
                                            "cooked": "tail"
                                        },
                                        "tail": true
                                    }
                                ],
                                "expressions": [
                                    {
                                        "type": "Identifier",
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
 
    it('should parse simple template element plus identifier', () => {
        expect(parseScript('`${a}`', {
            locations: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "TemplateLiteral",
                    "quasis": [{
                            "type": "TemplateElement",
                            "value": {
                                "raw": "",
                                "cooked": ""
                            },
                            "tail": false
                        },
                        {
                            "type": "TemplateElement",
                            "value": {
                                "raw": "",
                                "cooked": ""
                            },
                            "tail": true
                        }
                    ],
                    "expressions": [{
                        "type": "Identifier",
                        "name": "a"
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    
    it('should parse multiple dollar sign', () => {
        expect(parseScript('`$$$${a}`', {
            ranges: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "TemplateLiteral",
                    "quasis": [{
                            "type": "TemplateElement",
                            "value": {
                                "raw": "$$$",
                                "cooked": "$$$"
                            },
                            "tail": false
                        },
                        {
                            "type": "TemplateElement",
                            "value": {
                                "raw": "",
                                "cooked": ""
                            },
                            "tail": true
                        }
                    ],
                    "expressions": [{
                        "type": "Identifier",
                        "name": "a"
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse simple identifier', () => {
        expect(parseScript('`a`', {
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "TemplateLiteral",
                        "quasis": [
                            {
                                "type": "TemplateElement",
                                "value": {
                                    "raw": "a",
                                    "cooked": "a"
                                },
                                "tail": true,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 0
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 3
                                    }
                                }
                            }
                        ],
                        "expressions": [],
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 3
                            }
                        }
                    },
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 3
                        }
                    }
                }
            ],
            "sourceType": "script",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 3
                }
            }
        });
    });

    it('should parse template literal + dollar', () => {
        expect(parseScript('`${a}$`', {
            locations: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "TemplateLiteral",
                    "quasis": [{
                            "type": "TemplateElement",
                            "value": {
                                "raw": "",
                                "cooked": ""
                            },
                            "tail": false
                        },
                        {
                            "type": "TemplateElement",
                            "value": {
                                "raw": "$",
                                "cooked": "$"
                            },
                            "tail": true
                        }
                    ],
                    "expressions": [{
                        "type": "Identifier",
                        "name": "a"
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse nested template', () => {
        expect(parseScript('`${a}${b}`', {
            ranges: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "TemplateLiteral",
                    "quasis": [{
                            "type": "TemplateElement",
                            "value": {
                                "raw": "",
                                "cooked": ""
                            },
                            "tail": false
                        },
                        {
                            "type": "TemplateElement",
                            "value": {
                                "raw": "",
                                "cooked": ""
                            },
                            "tail": false
                        },
                        {
                            "type": "TemplateElement",
                            "value": {
                                "raw": "",
                                "cooked": ""
                            },
                            "tail": true
                        }
                    ],
                    "expressions": [{
                            "type": "Identifier",
                            "name": "a"
                        },
                        {
                            "type": "Identifier",
                            "name": "b"
                        }
                    ]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse mixed templates', () => {
        expect(parseScript('``````', {
            ranges: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "TaggedTemplateExpression",
                    "tag": {
                        "type": "TaggedTemplateExpression",
                        "tag": {
                            "type": "TemplateLiteral",
                            "quasis": [{
                                "type": "TemplateElement",
                                "value": {
                                    "raw": "",
                                    "cooked": ""
                                },
                                "tail": true
                            }],
                            "expressions": []
                        },
                        "quasi": {
                            "type": "TemplateLiteral",
                            "quasis": [{
                                "type": "TemplateElement",
                                "value": {
                                    "raw": "",
                                    "cooked": ""
                                },
                                "tail": true
                            }],
                            "expressions": []
                        }
                    },
                    "quasi": {
                        "type": "TemplateLiteral",
                        "quasis": [{
                            "type": "TemplateElement",
                            "value": {
                                "raw": "",
                                "cooked": ""
                            },
                            "tail": true
                        }],
                        "expressions": []
                    }
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse tagged template expression', () => {
        expect(parseScript('a``', {
            ranges: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "TaggedTemplateExpression",
                    "tag": {
                        "type": "Identifier",
                        "name": "a"
                    },
                    "quasi": {
                        "type": "TemplateLiteral",
                        "quasis": [{
                            "type": "TemplateElement",
                            "value": {
                                "raw": "",
                                "cooked": ""
                            },
                            "tail": true
                        }],
                        "expressions": []
                    }
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse parenthesis', () => {
        expect(parseScript('a()``', {
            ranges: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "TaggedTemplateExpression",
                    "tag": {
                        "type": "CallExpression",
                        "callee": {
                            "type": "Identifier",
                            "name": "a"
                        },
                        "arguments": []
                    },
                    "quasi": {
                        "type": "TemplateLiteral",
                        "quasis": [{
                            "type": "TemplateElement",
                            "value": {
                                "raw": "",
                                "cooked": ""
                            },
                            "tail": true
                        }],
                        "expressions": []
                    }
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse new expression', () => {
        expect(parseScript('new a``', {
            ranges: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "NewExpression",
                    "callee": {
                        "type": "TaggedTemplateExpression",
                        "tag": {
                            "type": "Identifier",
                            "name": "a"
                        },
                        "quasi": {
                            "type": "TemplateLiteral",
                            "quasis": [{
                                "type": "TemplateElement",
                                "value": {
                                    "raw": "",
                                    "cooked": ""
                                },
                                "tail": true
                            }],
                            "expressions": []
                        }
                    },
                    "arguments": []
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse new expression plus parenthesis', () => {
        expect(parseScript('new a()``', {
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "TaggedTemplateExpression",
                        "tag": {
                            "type": "NewExpression",
                            "callee": {
                                "type": "Identifier",
                                "name": "a",
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 4
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 5
                                    }
                                }
                            },
                            "arguments": [],
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
                        "quasi": {
                            "type": "TemplateLiteral",
                            "quasis": [
                                {
                                    "type": "TemplateElement",
                                    "value": {
                                        "raw": "",
                                        "cooked": ""
                                    },
                                    "tail": true,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 7
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 9
                                        }
                                    }
                                }
                            ],
                            "expressions": [],
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 7
                                },
                                "end": {
                                    "line": 1,
                                    "column": 9
                                }
                            }
                        },
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 9
                            }
                        }
                    },
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 9
                        }
                    }
                }
            ],
            "sourceType": "script",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 9
                }
            }
        });
    });


    it('should parse if statement plus double braces', () => {
        expect(parseScript('`outer${{x: {y: 10}}}bar${`nested${function(){return 1;}}endnest`}end`', {
            locations: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
              {
                "type": "ExpressionStatement",
                "expression": {
                  "type": "TemplateLiteral",
                  "expressions": [
                    {
                      "type": "ObjectExpression",
                      "properties": [
                        {
                          "type": "Property",
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "name": "x"
                          },
                          "value": {
                            "type": "ObjectExpression",
                            "properties": [
                              {
                                "type": "Property",
                                "method": false,
                                "shorthand": false,
                                "computed": false,
                                "key": {
                                  "type": "Identifier",
                                  "name": "y"
                                },
                                "value": {
                                  "type": "Literal",
                                  "value": 10,
                                  "raw": "10"
                                },
                                "kind": "init"
                              }
                            ]
                          },
                          "kind": "init"
                        }
                      ]
                    },
                    {
                      "type": "TemplateLiteral",
                      "expressions": [
                        {
                          "type": "FunctionExpression",
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [],
                          "body": {
                            "type": "BlockStatement",
                            "body": [
                              {
                                "type": "ReturnStatement",
                                "argument": {
                                  "type": "Literal",
                                  "value": 1,
                                  "raw": "1"
                                }
                              }
                            ]
                          }
                        }
                      ],
                      "quasis": [
                        {
                          "type": "TemplateElement",
                          "value": {
                            "raw": "nested",
                            "cooked": "nested"
                          },
                          "tail": false
                        },
                        {
                          "type": "TemplateElement",
                          "value": {
                            "raw": "endnest",
                            "cooked": "endnest"
                          },
                          "tail": true
                        }
                      ]
                    }
                  ],
                  "quasis": [
                    {
                      "type": "TemplateElement",
                      "value": {
                        "raw": "outer",
                        "cooked": "outer"
                      },
                      "tail": false
                    },
                    {
                      "type": "TemplateElement",
                      "value": {
                        "raw": "bar",
                        "cooked": "bar"
                      },
                      "tail": false
                    },
                    {
                      "type": "TemplateElement",
                      "value": {
                        "raw": "end",
                        "cooked": "end"
                      },
                      "tail": true
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse with new line', () => {
        expect(parseScript('`\r\n\t\n`', {
            locations: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "TemplateLiteral",
                        "expressions": [],
                        "quasis": [
                            {
                                "type": "TemplateElement",
                                "value": {
                                    "cooked": "\r\n\t\n",
                                    "raw": "\r\n\t\n"
                                },
                                "tail": true
                            }
                        ]
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse with new line', () => {
        expect(parseScript('`\n`', {
            locations: false,
            raw: true
        })).to.eql({
              "body": [
                {
                  "expression": {
                    "expressions": [],
                    "quasis": [
                      {
                        "tail": true,
                        "type": "TemplateElement",
                        "value": {
                          "cooked": "\n",
                          "raw": "\n",
                        }
                     },
                    ],
                    "type": "TemplateLiteral"
                 },
                  "type": "ExpressionStatement"
                }
              ],
              "sourceType": "script",
              "type": "Program"
            });
    });


    it('should parse if statement plus double braces', () => {
        expect(parseScript('if(a) { (`${b}`) }', {
            locations: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "IfStatement",
                    "test": {
                        "type": "Identifier",
                        "name": "a"
                    },
                    "consequent": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "TemplateLiteral",
                                    "quasis": [
                                        {
                                            "type": "TemplateElement",
                                            "value": {
                                                "raw": "",
                                                "cooked": ""
                                            },
                                            "tail": false
                                        },
                                        {
                                            "type": "TemplateElement",
                                            "value": {
                                                "raw": "",
                                                "cooked": ""
                                            },
                                            "tail": true
                                        }
                                    ],
                                    "expressions": [
                                        {
                                            "type": "Identifier",
                                            "name": "b"
                                        }
                                    ]
                                }
                            }
                        ]
                    },
                    "alternate": null
                }
            ],
            "sourceType": "script"
        });
    });


    it('should parse URL sourcemap template string (module code)', () => {
        expect(parseScript('`foo${bar}\\u25a0`', {
            ranges: false,
            raw: true,
            v8: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "TemplateLiteral",
                        "quasis": [
                            {
                                "type": "TemplateElement",
                                "value": {
                                    "raw": "foo",
                                    "cooked": "foo"
                                },
                                "tail": false
                            },
                            {
                                "type": "TemplateElement",
                                "value": {
                                    "raw": "\\u25a0",
                                    "cooked": "■"
                                },
                                "tail": true
                            }
                        ],
                        "expressions": [
                            {
                                "type": "Identifier",
                                "name": "bar"
                            }
                        ]
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse URL sourcemap template string (module code)', () => {
        expect(parseScript('foo`foo${bar}\\u25a0`', {
            ranges: false,
            raw: true,
            v8: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "TaggedTemplateExpression",
                        "tag": {
                            "type": "Identifier",
                            "name": "foo"
                        },
                        "quasi": {
                            "type": "TemplateLiteral",
                            "quasis": [
                                {
                                    "type": "TemplateElement",
                                    "value": {
                                        "raw": "foo",
                                        "cooked": "foo"
                                    },
                                    "tail": false
                                },
                                {
                                    "type": "TemplateElement",
                                    "value": {
                                        "raw": "\\u25a0",
                                        "cooked": "■"
                                    },
                                    "tail": true
                                }
                            ],
                            "expressions": [
                                {
                                    "type": "Identifier",
                                    "name": "bar"
                                }
                            ]
                        }
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse URL sourcemap template string (module code)', () => {
        expect(parseScript('`${ {class: 1} }`', {
            ranges: false,
            raw: true,
            v8: true
        })).to.eql({
              "body": [
                {
                  "expression": {
                    "expressions": [
                      {
                        "properties": [
                          {
                            "computed": false,
                           "key": {
                              "name": "class",
                              "type": "Identifier"
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": false,
                           "type": "Property",
                            "value": {
                              "raw": "1",
                              "type": "Literal",
                              "value": 1,
                            }
                          }
                        ],
                        "type": "ObjectExpression"
                      }
                    ],
                    "quasis": [
                      {
                        "tail": false,
                        "type": "TemplateElement",
                        "value": {
                          "cooked": "",
                          "raw": "",
                        }
                      },
                      {
                        "tail": true,
                        "type": "TemplateElement",
                        "value": {
                          "cooked": "",
                          "raw": "",
                        }
                      }
                    ],
                    "type": "TemplateLiteral"
                  },
                 "type": "ExpressionStatement"
                }
              ],
              "sourceType": "script",
              "type": "Program"
            });
    });

    it('should parse "sampleTag`left${0}\\01${1}right`"', () => {
        expect(parseScript('sampleTag`left${0}\\01${1}right`', {
            ranges: false,
            raw: true,
            v8: true
        })).to.eql({
              "body": [
                {
                  "expression": {
                    "quasi": {
                      "expressions": [
                        {
                          "raw": "0",
                          "type": "Literal",
                          "value": 0
                        },
                        {
                          "raw": "1",
                          "type": "Literal",
                          "value": 1
                        }
                     ],
                      "quasis": [
                        {
                          "tail": false,
                          "type": "TemplateElement",
                          "value": {
                            "cooked": "left",
                            "raw": "left",
                          }
                        },
                        {
                          "tail": false,
                          "type": "TemplateElement",
                          "value": {
                            "cooked": "\u0001",
                            "raw": "\\01",
                          }
                       },
                        {
                         "tail": true,
                         "type": "TemplateElement",
                          "value": {
                            "cooked": "right",
                            "raw": "right"
                          }
                        }
                      ],
                      "type": "TemplateLiteral"
                    },
                    "tag": {
                      "name": "sampleTag",
                      "type": "Identifier",
                    },
                    "type": "TaggedTemplateExpression"
                  },
                  "type": "ExpressionStatement"
                }
              ],
              "sourceType": "script",
              "type": "Program"
            });
    });

    it('should parse "sampleTag`left${0}\\u{0`"', () => {
        expect(parseScript('sampleTag`left${0}\\u{0`', {
            ranges: false,
            raw: true,
            v8: true
        })).to.eql({
              "body": [
                {
                 "expression": {
                    "quasi": {
                      "expressions": [
                        {
                          "raw": "0",
                          "type": "Literal",
                          "value": 0
                        }
                      ],
                      "quasis": [
                        {
                          "tail": false,
                          "type": "TemplateElement",
                         "value": {
                            "cooked": "left",
                            "raw": "left",
                          }
                        },
                        {
                          "tail": true,
                          "type": "TemplateElement",
                          "value": {
                            "cooked": null,
                            "raw": "\\u{0"
                          }
                        }
                      ],
                      "type": "TemplateLiteral"
                    },
                    "tag": {
                      "name": "sampleTag",
                      "type": "Identifier",
                    },
                   "type": "TaggedTemplateExpression"
                  },
                  "type": "ExpressionStatement"
                }
              ],
              "sourceType": "script",
              "type": "Program"
            });
    });

    it('should parse literal expression object', () => {
        expect(parseScript('`${{}}`', {
            ranges: true,
            raw: true,
            v8: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "TemplateLiteral",
                        "expressions": [
                            {
                                "type": "ObjectExpression",
                                "properties": [],
                                "start": 3,
                                "end": 5
                            }
                        ],
                        "quasis": [
                            {
                                "type": "TemplateElement",
                                "value": {
                                    "cooked": "",
                                    "raw": ""
                                },
                                "tail": false,
                                "start": 5,
                                "end": 5
                            },
                            {
                                "type": "TemplateElement",
                                "value": {
                                    "cooked": "",
                                    "raw": ""
                                },
                                "tail": true,
                                "start": 5,
                                "end": 7
                            }
                        ],
                        "start": 0,
                        "end": 7
                    },
                    "start": 0,
                    "end": 7
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 7
        });
    });

    it('should parse literal expression template', () => {
        expect(parseScript('`foo ${`bar ${5} baz`} qux`', {
            ranges: true,
            raw: false,
            v8: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "TemplateLiteral",
                        "expressions": [
                            {
                                "type": "TemplateLiteral",
                                "expressions": [
                                    {
                                        "type": "Literal",
                                        "value": 5,
                                        "start": 14,
                                        "end": 15
                                    }
                                ],
                                "quasis": [
                                    {
                                        "type": "TemplateElement",
                                        "value": {
                                            "cooked": "bar ",
                                            "raw": "bar "
                                        },
                                        "tail": false,
                                        "start": 15,
                                        "end": 15
                                    },
                                    {
                                        "type": "TemplateElement",
                                        "value": {
                                            "cooked": " baz",
                                            "raw": " baz"
                                        },
                                        "tail": true,
                                        "start": 15,
                                        "end": 21
                                    }
                                ],
                                "start": 7,
                                "end": 21
                            }
                        ],
                        "quasis": [
                            {
                                "type": "TemplateElement",
                                "value": {
                                    "cooked": "foo ",
                                    "raw": "foo "
                                },
                                "tail": false,
                                "start": 21,
                                "end": 21
                            },
                            {
                                "type": "TemplateElement",
                                "value": {
                                    "cooked": " qux",
                                    "raw": " qux"
                                },
                                "tail": true,
                                "start": 21,
                                "end": 27
                            }
                        ],
                        "start": 0,
                        "end": 27
                    },
                    "start": 0,
                    "end": 27
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 27
        });
    });

    it('should parse middle list many expression objects', () => {
        expect(parseScript('`${0} ${1} ${{}}}`', {
            ranges: true,
            raw: true,
            v8: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "TemplateLiteral",
                        "expressions": [
                            {
                                "type": "Literal",
                                "value": 0,
                                "start": 3,
                                "end": 4,
                                "raw": "0"
                            },
                            {
                                "type": "Literal",
                                "value": 1,
                                "start": 8,
                                "end": 9,
                                "raw": "1"
                            },
                            {
                                "type": "ObjectExpression",
                                "properties": [],
                                "start": 13,
                                "end": 15
                            }
                        ],
                        "quasis": [
                            {
                                "type": "TemplateElement",
                                "value": {
                                    "cooked": "",
                                    "raw": ""
                                },
                                "tail": false,
                                "start": 4,
                                "end": 4
                            },
                            {
                                "type": "TemplateElement",
                                "value": {
                                    "cooked": " ",
                                    "raw": " "
                                },
                                "tail": false,
                                "start": 9,
                                "end": 9
                            },
                            {
                                "type": "TemplateElement",
                                "value": {
                                    "cooked": " ",
                                    "raw": " "
                                },
                                "tail": false,
                                "start": 15,
                                "end": 15
                            },
                            {
                                "type": "TemplateElement",
                                "value": {
                                    "cooked": "}",
                                    "raw": "}"
                                },
                                "tail": true,
                                "start": 15,
                                "end": 18
                            }
                        ],
                        "start": 0,
                        "end": 18
                    },
                    "start": 0,
                    "end": 18
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 18
        });
    });

    it('should parse literal expression object', () => {
        expect(parseScript('`\\u{000042}\\u0042\\x42u0\A`;', {
            ranges: true,
            raw: true,
            v8: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "TemplateLiteral",
                        "expressions": [],
                        "quasis": [
                            {
                                "type": "TemplateElement",
                                "value": {
                                    "cooked": "BBBu0A",
                                    "raw": "\\u{000042}\\u0042\\x42u0A"
                                },
                                "tail": true,
                                "start": 0,
                                "end": 25
                            }
                        ],
                        "start": 0,
                        "end": 25
                    },
                    "start": 0,
                    "end": 26
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 26
        });
    });

    it('should parse invalid identifier', () => {
        expect(parseScript('`xx\\`x`;', {
            ranges: true,
            raw: true,
            v8: true
        })).to.eql({
              "body": [
                {
                  "end": 8,
                  "expression": {
                    "end": 7,
                    "expressions": [],
                    "quasis": [
                      {
                        "end": 7,
                        "start": 0,
                        "tail": true,
                        "type": "TemplateElement",
                        "value": {
                         "cooked": "xx`x",
                          "raw": "xx\\`x",
                        }
                      }
                    ],
                    "start": 0,
                    "type": "TemplateLiteral",
                  },
                  "start": 0,
                 "type": "ExpressionStatement",
                }
             ],
              "end": 8,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should parse binary expression', () => {
        expect(parseScript('`${ a + 1 }`;', {
            ranges: true,
            raw: true,
            v8: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "TemplateLiteral",
                        "expressions": [
                            {
                                "type": "BinaryExpression",
                                "left": {
                                    "type": "Identifier",
                                    "name": "a",
                                    "start": 4,
                                    "end": 5
                                },
                                "right": {
                                    "type": "Literal",
                                    "value": 1,
                                    "start": 8,
                                    "end": 9,
                                    "raw": "1"
                                },
                                "operator": "+",
                                "start": 4,
                                "end": 9
                            }
                        ],
                        "quasis": [
                            {
                                "type": "TemplateElement",
                                "value": {
                                    "cooked": "",
                                    "raw": ""
                                },
                                "tail": false,
                                "start": 10,
                                "end": 9
                            },
                            {
                                "type": "TemplateElement",
                                "value": {
                                    "cooked": "",
                                    "raw": ""
                                },
                                "tail": true,
                                "start": 10,
                                "end": 12
                            }
                        ],
                        "start": 0,
                        "end": 12
                    },
                    "start": 0,
                    "end": 13
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 13
        });
    });

    it('should parse identifier + binary expression', () => {
        expect(parseScript('` foo ${ b + `baz ${ c }` }`;', {
            ranges: true,
            raw: true,
            v8: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "TemplateLiteral",
                        "expressions": [
                            {
                                "type": "BinaryExpression",
                                "left": {
                                    "type": "Identifier",
                                    "name": "b",
                                    "start": 9,
                                    "end": 10
                                },
                                "right": {
                                    "type": "TemplateLiteral",
                                    "expressions": [
                                        {
                                            "type": "Identifier",
                                            "name": "c",
                                            "start": 21,
                                            "end": 22
                                        }
                                    ],
                                    "quasis": [
                                        {
                                            "type": "TemplateElement",
                                            "value": {
                                                "cooked": "baz ",
                                                "raw": "baz "
                                            },
                                            "tail": false,
                                            "start": 23,
                                            "end": 22
                                        },
                                        {
                                            "type": "TemplateElement",
                                            "value": {
                                                "cooked": "",
                                                "raw": ""
                                            },
                                            "tail": true,
                                            "start": 23,
                                            "end": 25
                                        }
                                    ],
                                    "start": 13,
                                    "end": 25
                                },
                                "operator": "+",
                                "start": 9,
                                "end": 25
                            }
                        ],
                        "quasis": [
                            {
                                "type": "TemplateElement",
                                "value": {
                                    "cooked": " foo ",
                                    "raw": " foo "
                                },
                                "tail": false,
                                "start": 26,
                                "end": 25
                            },
                            {
                                "type": "TemplateElement",
                                "value": {
                                    "cooked": "",
                                    "raw": ""
                                },
                                "tail": true,
                                "start": 26,
                                "end": 28
                            }
                        ],
                        "start": 0,
                        "end": 28
                    },
                    "start": 0,
                    "end": 29
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 29
        });
    });

    it('should parse nothing', () => {
        expect(parseScript('``;', {
            ranges: true,
            raw: true,
            v8: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "TemplateLiteral",
                        "expressions": [],
                        "quasis": [
                            {
                                "type": "TemplateElement",
                                "value": {
                                    "cooked": "",
                                    "raw": ""
                                },
                                "tail": true,
                                "start": 0,
                                "end": 2
                            }
                        ],
                        "start": 0,
                        "end": 2
                    },
                    "start": 0,
                    "end": 3
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 3
        });
    });

    it('should parse literal expression object', () => {
        expect(parseScript('`\\``', {
            ranges: true,
            raw: true,
            v8: true
        })).to.eql({
              "body": [
                {
                  "end": 4,
                  "expression": {
                    "end": 4,
                    "expressions": [],
                    "quasis": [
                      {
                        "end": 4,
                        "start": 0,
                        "tail": true,
                        "type": "TemplateElement",
                        "value": {
                          "cooked": "`",
                          "raw": "\\`",
                       }
                      }
                    ],
                    "start": 0,
                    "type": "TemplateLiteral",
                  },
                  "start": 0,
                  "type": "ExpressionStatement",
                }
              ],
              "end": 4,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should parse literal expression primitive', () => {
        expect(parseScript('`foo ${5} bar`', {
            ranges: true,
            raw: true,
            v8: true
        })).to.eql({
              "body": [
                {
                  "end": 14,
                  "expression": {
                    "end": 14,
                    "expressions": [
                     {
                        "end": 8,
                       "raw": "5",
                        "start": 7,
                        "type": "Literal",
                        "value": 5,
                      }
                    ],
                    "quasis": [
                      {
                        "end": 8,
                        "start": 8,
                        "tail": false,
                        "type": "TemplateElement",
                        "value": {
                          "cooked": "foo ",
                          "raw": "foo ",
                        }
                      },
                      {
                        "end": 14,
                        "start": 8,
                       "tail": true,
                        "type": "TemplateElement",
                        "value": {
                          "cooked": " bar",
                          "raw": " bar",
                        }
                      }
                    ],
                    "start": 0,
                    "type": "TemplateLiteral"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                }
              ],
              "end": 14,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should parse "sampleTag`left${0}\\u{\\`"', () => {
        expect(parseScript('sampleTag`left${0}\\u{\\u{0}`', {
            ranges: false,
            raw: true,
            v8: true
        })).to.eql({
              "body": [
                {
                  "expression": {
                    "quasi": {
                      "expressions": [
                        {
                          "raw": "0",
                          "type": "Literal",
                          "value": 0,
                        }
                      ],
                      "quasis": [
                        {
                          "tail": false,
                          "type": "TemplateElement",
                          "value": {
                            "cooked": "left",
                            "raw": "left",
                          }
                        },
                        {
                          "tail": true,
                          "type": "TemplateElement",
                          "value": {
                            "cooked": null,
                            "raw": "\\u{\\u{0}",
                          }
                        }
                      ],
                      "type": "TemplateLiteral"
                    },
                   "tag": {
                      "name": "sampleTag",
                      "type": "Identifier",
                    },
                    "type": "TaggedTemplateExpression"
                  },
                  "type": "ExpressionStatement"
                }
             ],
              "sourceType": "script",
              "type": "Program",
            });
    });

    it('should parse "sampleTag`left${0}\\u{`"', () => {
        expect(parseScript('sampleTag`left${0}\\u{`', {
            ranges: false,
            raw: true,
            v8: true
        })).to.eql({
              "body": [
                {
                  "expression": {
                    "quasi": {
                      "expressions": [
                        {
                          "raw": "0",
                          "type": "Literal",
                          "value": 0
                        }
                      ],
                      "quasis": [
                        {
                          "tail": false,
                          "type": "TemplateElement",
                          "value": {
                            "cooked": "left",
                            "raw": "left",
                          }
                        },
                        {
                          "tail": true,
                          "type": "TemplateElement",
                          "value": {
                            "cooked": null,
                            "raw": "\\u{"
                          }
                        }
                      ],
                      "type": "TemplateLiteral",
                    },
                    "tag": {
                      "name": "sampleTag",
                      "type": "Identifier",
                    },
                   "type": "TaggedTemplateExpression"
                  },
                  "type": "ExpressionStatement"
                }
              ],
              "sourceType": "script",
              "type": "Program",
            });
    });

    it('should parse "sampleTag`left${0}\\u{-0}${1}right`"', () => {
        expect(parseScript('sampleTag`left${0}\\u{-0}${1}right`', {
            ranges: false,
            raw: true,
            v8: true
        })).to.eql({
              "body": [
                {
                  "expression": {
                    "quasi": {
                      "expressions": [
                        {
                          "raw": "0",
                          "type": "Literal",
                          "value": 0,
                        },
                        {
                          "raw": "1",
                          "type": "Literal",
                          "value": 1,
                        }
                      ],
                      "quasis": [
                       {
                          "tail": false,
                          "type": "TemplateElement",
                         "value": {
                            "cooked": "left",
                            "raw": "left",
                          }
                        },
                        {
                          "tail": false,
                          "type": "TemplateElement",
                          "value": {
                            "cooked": null,
                            "raw": "\\u{-0}"
                          }
                        },
                        {
                          "tail": true,
                          "type": "TemplateElement",
                          "value": {
                            "cooked": "right",
                            "raw": "right"
                          }
                        }
                      ],
                      "type": "TemplateLiteral",
                    },
                    "tag": {
                      "name": "sampleTag",
                      "type": "Identifier",
                    },
                    "type": "TaggedTemplateExpression"
                  },
                  "type": "ExpressionStatement"
                }
              ],
              "sourceType": "script",
              "type": "Program"
            });
    });

    it('should parse "`\\n`', () => {
        expect(parseScript('`\\n`', {
            ranges: true,
            locations: true,
            raw: true,
            v8: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "TemplateLiteral",
                        "expressions": [],
                        "quasis": [
                            {
                                "type": "TemplateElement",
                                "value": {
                                    "cooked": "\n",
                                    "raw": "\\n"
                                },
                                "tail": true,
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
                                }
                            }
                        ],
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
                        }
                    },
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
                    }
                }
            ],
            "sourceType": "script",
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
            }
        });
    });

    it('should parse "`\\\"`"', () => {
        expect(parseScript('`\\\"`', {
            ranges: true,
            locations: true,
            raw: true,
            v8: true
        })).to.eql({
              "body": [
                {
                  "end": 4,
                  "expression": {
                    "end": 4,
                    "expressions": [],
                    "loc": {
                      "end": {
                        "column": 4,
                        "line": 1,
                      },
                      "start": {
                        "column": 0,
                        "line": 1,
                      }
                    },
                    "quasis": [
                      {
                        "end": 4,
                        "loc": {
                          "end": {
                            "column": 4,
                            "line": 1,
                          },
                          "start": {
                            "column": 0,
                            "line": 1,
                          }
                        },
                        "start": 0,
                        "tail": true,
                        "type": "TemplateElement",
                        "value": {
                          "cooked": "\"",
                          "raw": "\\\"",
                        }
                      }
                    ],
                    "start": 0,
                    "type": "TemplateLiteral",
                  },
                  "loc": {
                    "end": {
                      "column": 4,
                      "line": 1
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
              "end": 4,
              "loc": {
                "end": {
                  "column": 4,
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

    it('should parse "sampleTag`left${0}\\u{g}${1}right`', () => {
        expect(parseScript('sampleTag`left${0}\\u{g}${1}right`', {
            ranges: false,
            raw: true,
            v8: true
        })).to.eql({
              "body": [
                {
                  "expression": {
                    "quasi": {
                      "expressions": [
                        {
                          "raw": "0",
                          "type": "Literal",
                          "value": 0,
                        },
                        {
                          "raw": "1",
                          "type": "Literal",
                          "value": 1
                       },
                      ],
                      "quasis": [
                      {
                          "tail": false,
                          "type": "TemplateElement",
                          "value": {
                            "cooked": "left",
                            "raw": "left",
                          }
                        },
                        {
                          "tail": false,
                          "type": "TemplateElement",
                          "value": {
                            "cooked": null,
                            "raw": "\\u{g}",
                          }
                        },
                        {
                          "tail": true,
                          "type": "TemplateElement",
                          "value": {
                            "cooked": "right",
                            "raw": "right",
                          }
                        }
                      ],
                      "type": "TemplateLiteral",
                    },
                    "tag": {
                      "name": "sampleTag",
                      "type": "Identifier",
                    },
                    "type": "TaggedTemplateExpression"
                  },
                  "type": "ExpressionStatement"
                }
              ],
             "sourceType": "script",
              "type": "Program"
            });
    });
    it('should parse "sampleTag`left${0}\\1`"', () => {
        expect(parseScript('sampleTag`left${0}\\1`', {
            ranges: true,
            raw: true,
            v8: true
        })).to.eql({
              "body": [
                {
                  "end": 21,
                  "expression": {
                    "end": 21,
                    "quasi": {
                      "end": 21,
                      "expressions": [
                        {
                          "end": 17,
                          "raw": "0",
                          "start": 16,
                          "type": "Literal",
                          "value": 0
                        }
                      ],
                      "quasis": [
                        {
                          "end": 17,
                          "start": 17,
                          "tail": false,
                          "type": "TemplateElement",
                          "value": {
                            "cooked": "left",
                            "raw": "left",
                          }
                        },
                        {
                          "end": 21,
                          "start": 17,
                          "tail": true,
                          "type": "TemplateElement",
                          "value": {
                            "cooked": "\u0001",
                            "raw": "\\1",
                          }
                        }
                      ],
                      "start": 9,
                      "type": "TemplateLiteral"
                    },
                    "start": 0,
                    "tag": {
                      "end": 9,
                      "name": "sampleTag",
                      "start": 0,
                      "type": "Identifier",
                    },
                    "type": "TaggedTemplateExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                }
              ],
              "end": 21,
              "sourceType": "script",
              "start": 0,
              "type": "Program",
            });
    });

    it('should parse "sampleTag`left${0}\\1${1}right`"', () => {
        expect(parseScript('sampleTag`left${0}\\1${1}right`', {
            ranges: false,
            raw: true,
            v8: true
        })).to.eql({
              "body": [
                {
                  "expression": {
                    "quasi": {
                      "expressions": [
                        {
                          "raw": "0",
                          "type": "Literal",
                          "value": 0
                        },
                        {
                          "raw": "1",
                          "type": "Literal",
                          "value": 1
                        }
                      ],
                      "quasis": [
                        {
                          "tail": false,
                          "type": "TemplateElement",
                          "value": {
                            "cooked": "left",
                            "raw": "left"
                          }
                        },
                        {
                          "tail": false,
                          "type": "TemplateElement",
                          "value": {
                            "cooked": "\u0001",
                            "raw": "\\1",
                          }
                        },
                        {
                          "tail": true,
                          "type": "TemplateElement",
                          "value": {
                            "cooked": "right",
                            "raw": "right",
                          }
                       }
                      ],
                      "type": "TemplateLiteral"
                    },
                    "tag": {
                      "name": "sampleTag",
                      "type": "Identifier",
                    },
                    "type": "TaggedTemplateExpression"
                  },
                  "type": "ExpressionStatement"
                }
              ],
              "sourceType": "script",
              "type": "Program"
            });
    });

    it('should parse "sampleTag`left${0}\\u{g}`"', () => {
        expect(parseScript('sampleTag`left${0}\\u{g}`', {
            ranges: false,
            raw: true,
            v8: true
        })).to.eql({
              "body": [
                {
                  "expression": {
                    "quasi": {
                      "expressions": [
                        {
                          "raw": "0",
                          "type": "Literal",
                         "value": 0
                        }
                      ],
                      "quasis": [
                       {
                          "tail": false,
                          "type": "TemplateElement",
                          "value": {
                            "cooked": "left",
                            "raw": "left",
                          }
                        },
                        {
                          "tail": true,
                          "type": "TemplateElement",
                          "value": {
                            "cooked": null,
                            "raw": "\\u{g}"
                          }
                        }
                      ],
                      "type": "TemplateLiteral"
                    },
                    "tag": {
                      "name": "sampleTag",
                      "type": "Identifier",
                    },
                    "type": "TaggedTemplateExpression"
                  },
                  "type": "ExpressionStatement"
                }
              ],
              "sourceType": "script",
              "type": "Program"
            });
    });

    it('should parse "sampleTag`left${0}\\u{-0}${1}right`', () => {
        expect(parseScript('sampleTag`left${0}\\u{-0}${1}right`', {
            ranges: false,
            raw: true,
            v8: true
        })).to.eql({
              "body": [
                {
                  "expression": {
                    "quasi": {
                      "expressions": [
                        {
                          "raw": "0",
                          "type": "Literal",
                          "value": 0
                        },
                        {
                          "raw": "1",
                          "type": "Literal",
                          "value": 1
                        }
                    ],
                      "quasis": [
                       {
                          "tail": false,
                          "type": "TemplateElement",
                          "value": {
                            "cooked": "left",
                            "raw": "left",
                          }
                       },
                        {
                          "tail": false,
                          "type": "TemplateElement",
                          "value": {
                            "cooked": null,
                            "raw": "\\u{-0}"
                          }
                        },
                        {
                          "tail": true,
                          "type": "TemplateElement",
                          "value": {
                            "cooked": "right",
                            "raw": "right",
                          }
                        }
                      ],
                      "type": "TemplateLiteral",
                    },
                    "tag": {
                      "name": "sampleTag",
                      "type": "Identifier",
                    },
                    "type": "TaggedTemplateExpression",
                  },
                  "type": "ExpressionStatement",
                },
              ],
              "sourceType": "script",
              "type": "Program"
            });
    });

    it('should parse "sampleTag`left${0}\\u{-0}`"', () => {
        expect(parseScript('sampleTag`left${0}\\u{-0}`', {
            ranges: true,
            raw: true,
            v8: true
        })).to.eql({
              "body": [
                {
                  "end": 25,
                  "expression": {
                    "end": 25,
                    "quasi": {
                      "end": 25,
                      "expressions": [
                        {
                         "end": 17,
                          "raw": "0",
                          "start": 16,
                          "type": "Literal",
                          "value": 0
                        }
                      ],
                      "quasis": [
                       {
                          "end": 17,
                          "start": 17,
                          "tail": false,
                          "type": "TemplateElement",
                          "value": {
                            "cooked": "left",
                            "raw": "left",
                          }
                        },
                        {
                          "end": 25,
                          "start": 17,
                          "tail": true,
                          "type": "TemplateElement",
                          "value": {
                           "cooked": null,
                            "raw": "\\u{-0}"
                          }
                        }
                      ],
                      "start": 9,
                      "type": "TemplateLiteral"
                    },
                    "start": 0,
                    "tag": {
                      "end": 9,
                     "name": "sampleTag",
                      "start": 0,
                      "type": "Identifier"
                    },
                    "type": "TaggedTemplateExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                }
              ],
              "end": 25,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should parse "sampleTag`left${0}\\u000g${1}right`"', () => {
        expect(parseScript('sampleTag`left${0}\\u000g${1}right`', {
            ranges: false,
            raw: true,
            v8: true
        })).to.eql({
              "body": [
                {
                  "expression": {
                    "quasi": {
                      "expressions": [
                        {
                          "raw": "0",
                          "type": "Literal",
                          "value": 0
                        },
                        {
                          "raw": "1",
                          "type": "Literal",
                          "value": 1
                        }
                      ],
                      "quasis": [
                        {
                          "tail": false,
                          "type": "TemplateElement",
                          "value": {
                            "cooked": "left",
                            "raw": "left",
                          }
                        },
                        {
                          "tail": false,
                          "type": "TemplateElement",
                          "value": {
                            "cooked": null,
                            "raw": "\\u000g",
                          }
                        },
                        {
                          "tail": true,
                          "type": "TemplateElement",
                          "value": {
                            "cooked": "right",
                            "raw": "right",
                          }
                        }
                      ],
                      "type": "TemplateLiteral",
                    },
                    "tag": {
                      "name": "sampleTag",
                      "type": "Identifier",
                    },
                    "type": "TaggedTemplateExpression"
                  },
                  "type": "ExpressionStatement"
                }
              ],
              "sourceType": "script",
              "type": "Program",
            });
    });

    it('should parse "sampleTag`left${0}\\u0g${1}right`"', () => {
        expect(parseScript('sampleTag`left${0}\\u0g${1}right`', {
            ranges: false,
            raw: true,
            v8: true
        })).to.eql({
              "body": [
                {
                  "expression": {
                    "quasi": {
                      "expressions": [
                        {
                          "raw": "0",
                          "type": "Literal",
                          "value": 0
                        },
                       {
                          "raw": "1",
                          "type": "Literal",
                          "value": 1
                       }
                      ],
                      "quasis": [
                        {
                          "tail": false,
                          "type": "TemplateElement",
                          "value": {
                            "cooked": "left",
                            "raw": "left",
                          }
                        },
                        {
                          "tail": false,
                          "type": "TemplateElement",
                          "value": {
                            "cooked": null,
                            "raw": "\\u0g"
                          }
                        },
                        {
                          "tail": true,
                          "type": "TemplateElement",
                          "value": {
                           "cooked": "right",
                            "raw": "right",
                         }
                        }
                      ],
                      "type": "TemplateLiteral"
                    },
                    "tag": {
                      "name": "sampleTag",
                      "type": "Identifier",
                    },
                    "type": "TaggedTemplateExpression"
                  },
                  "type": "ExpressionStatement"
                }
              ],
              "sourceType": "script",
              "type": "Program"
            });
    });

    it('should parse "sampleTag`left${0}\\u0g`', () => {
        expect(parseScript('sampleTag`left${0}\\u{`', {
            ranges: false,
            raw: true,
            v8: true
        })).to.eql({
              "body": [
                {
                  "expression": {
                    "quasi": {
                      "expressions": [
                        {
                          "raw": "0",
                          "type": "Literal",
                          "value": 0,
                        }
                      ],
                      "quasis": [
                        {
                          "tail": false,
                          "type": "TemplateElement",
                          "value": {
                            "cooked": "left",
                            "raw": "left",
                         }
                        },
                       {
                          "tail": true,
                          "type": "TemplateElement",
                         "value": {
                            "cooked": null,
                            "raw": "\\u{"
                          }
                        }
                      ],
                      "type": "TemplateLiteral"
                    },
                    "tag": {
                      "name": "sampleTag",
                      "type": "Identifier",
                    },
                    "type": "TaggedTemplateExpression"
                  },
                  "type": "ExpressionStatement",
                }
              ],
              "sourceType": "script",
              "type": "Program"
            });
    });

    it('should parse "sampleTag`left${0}\\u00g${1}right`"', () => {
        expect(parseScript('sampleTag`left${0}\\u00g${1}right`', {
            ranges: false,
            raw: true,
            v8: true
        })).to.eql({
              "body": [
                {
                  "expression": {
                    "quasi": {
                      "expressions": [
                        {
                          "raw": "0",
                          "type": "Literal",
                          "value": 0,
                        },
                        {
                          "raw": "1",
                          "type": "Literal",
                          "value": 1,
                       }
                      ],
                      "quasis": [
                        {
                          "tail": false,
                          "type": "TemplateElement",
                          "value": {
                            "cooked": "left",
                            "raw": "left",
                          }
                        },
                        {
                          "tail": false,
                          "type": "TemplateElement",
                          "value": {
                           "cooked": null,
                            "raw": "\\u00g"
                          }
                        },
                        {
                          "tail": true,
                          "type": "TemplateElement",
                          "value": {
                            "cooked": "right",
                            "raw": "right",
                          }
                        }
                      ],
                      "type": "TemplateLiteral",
                    },
                    "tag": {
                      "name": "sampleTag",
                      "type": "Identifier",
                    },
                    "type": "TaggedTemplateExpression",
                 },
                  "type": "ExpressionStatement",
                }
              ],
              "sourceType": "script",
              "type": "Program",
            });
    });

    it('should parse "sampleTag`left${0}\\u{\\${1}right`"', () => {
        expect(parseScript('sampleTag`left${0}\\u{\\${1}right`', {
            ranges: true,
            raw: true,
            v8: true
        })).to.eql({
             "body": [
                {
                  "end": 32,
                  "expression": {
                    "end": 32,
                    "quasi": {
                      "end": 32,
                      "expressions": [
                        {
                          "end": 17,
                          "raw": "0",
                          "start": 16,
                          "type": "Literal",
                          "value": 0,
                        }
                      ],
                      "quasis": [
                        {
                          "end": 17,
                          "start": 17,
                          "tail": false,
                          "type": "TemplateElement",
                          "value": {
                            "cooked": "left",
                            "raw": "left",
                          }
                        },
                        {
                          "end": 32,
                         "start": 17,
                          "tail": true,
                          "type": "TemplateElement",
                          "value": {
                            "cooked": null,
                            "raw": "\\u{\\${1}right"
                          }
                        }
                      ],
                      "start": 9,
                      "type": "TemplateLiteral"
                    },
                    "start": 0,
                    "tag": {
                      "end": 9,
                      "name": "sampleTag",
                      "start": 0,
                      "type": "Identifier"
                    },
                    "type": "TaggedTemplateExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                }
              ],
             "end": 32,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should parse "`${ {function: 1} }`', () => {
        expect(parseScript('`${ {function: 1} }`', {
            locations: false,
            raw: true,
            v8: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "TemplateLiteral",
                        "quasis": [
                            {
                                "type": "TemplateElement",
                                "value": {
                                    "raw": "",
                                    "cooked": ""
                                },
                                "tail": false
                            },
                            {
                                "type": "TemplateElement",
                                "value": {
                                    "raw": "",
                                    "cooked": ""
                                },
                                "tail": true
                            }
                        ],
                        "expressions": [
                            {
                                "type": "ObjectExpression",
                                "properties": [
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "function"
                                        },
                                        "computed": false,
                                        "value": {
                                            "type": "Literal",
                                            "value": 1,
                                            "raw": "1"
                                        },
                                        "kind": "init",
                                        "method": false,
                                        "shorthand": false
                                    }
                                ]
                            }
                        ]
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "`${ {enum: 1} }`"', () => {
        expect(parseScript('`${ {enum: 1} }`', {
            ranges: true,
            raw: true,
            v8: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "TemplateLiteral",
                        "expressions": [
                            {
                                "type": "ObjectExpression",
                                "properties": [
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "enum",
                                            "start": 5,
                                            "end": 9
                                        },
                                        "value": {
                                            "type": "Literal",
                                            "value": 1,
                                            "start": 11,
                                            "end": 12,
                                            "raw": "1"
                                        },
                                        "kind": "init",
                                        "computed": false,
                                        "method": false,
                                        "shorthand": false,
                                        "start": 5,
                                        "end": 12
                                    }
                                ],
                                "start": 4,
                                "end": 13
                            }
                        ],
                        "quasis": [
                            {
                                "type": "TemplateElement",
                                "value": {
                                    "cooked": "",
                                    "raw": ""
                                },
                                "tail": false,
                                "start": 14,
                                "end": 13
                            },
                            {
                                "type": "TemplateElement",
                                "value": {
                                    "cooked": "",
                                    "raw": ""
                                },
                                "tail": true,
                                "start": 14,
                                "end": 16
                            }
                        ],
                        "start": 0,
                        "end": 16
                    },
                    "start": 0,
                    "end": 16
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 16
        });
    });

    it('should parse "`${ {function: 1} }`"', () => {
        expect(parseScript('`${ {function: 1} }`', {
            ranges: true,
            raw: true,
            v8: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "TemplateLiteral",
                        "expressions": [
                            {
                                "type": "ObjectExpression",
                                "properties": [
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "function",
                                            "start": 5,
                                            "end": 13
                                        },
                                        "value": {
                                            "type": "Literal",
                                            "value": 1,
                                            "start": 15,
                                            "end": 16,
                                            "raw": "1"
                                        },
                                        "kind": "init",
                                        "computed": false,
                                        "method": false,
                                        "shorthand": false,
                                        "start": 5,
                                        "end": 16
                                    }
                                ],
                                "start": 4,
                                "end": 17
                            }
                        ],
                        "quasis": [
                            {
                                "type": "TemplateElement",
                                "value": {
                                    "cooked": "",
                                    "raw": ""
                                },
                                "tail": false,
                                "start": 18,
                                "end": 17
                            },
                            {
                                "type": "TemplateElement",
                                "value": {
                                    "cooked": "",
                                    "raw": ""
                                },
                                "tail": true,
                                "start": 18,
                                "end": 20
                            }
                        ],
                        "start": 0,
                        "end": 20
                    },
                    "start": 0,
                    "end": 20
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 20
        });
    });

    it('should parse "`${ {delete: 1} }`"', () => {
        expect(parseScript('`${ {delete: 1} }`', {
            ranges: false,
            raw: true,
            v8: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "TemplateLiteral",
                        "quasis": [
                            {
                                "type": "TemplateElement",
                                "value": {
                                    "raw": "",
                                    "cooked": ""
                                },
                                "tail": false
                            },
                            {
                                "type": "TemplateElement",
                                "value": {
                                    "raw": "",
                                    "cooked": ""
                                },
                                "tail": true
                            }
                        ],
                        "expressions": [
                            {
                                "type": "ObjectExpression",
                                "properties": [
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "delete"
                                        },
                                        "computed": false,
                                        "value": {
                                            "type": "Literal",
                                            "value": 1,
                                            "raw": "1"
                                        },
                                        "kind": "init",
                                        "method": false,
                                        "shorthand": false
                                    }
                                ]
                            }
                        ]
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "`${ {class: 1} }`"', () => {
        expect(parseScript('`${ {class: 1} }`', {
            ranges: false,
            raw: true,
            v8: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "TemplateLiteral",
                        "quasis": [
                            {
                                "type": "TemplateElement",
                                "value": {
                                    "raw": "",
                                    "cooked": ""
                                },
                                "tail": false
                            },
                            {
                                "type": "TemplateElement",
                                "value": {
                                    "raw": "",
                                    "cooked": ""
                                },
                                "tail": true
                            }
                        ],
                        "expressions": [
                            {
                                "type": "ObjectExpression",
                                "properties": [
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "class"
                                        },
                                        "computed": false,
                                        "value": {
                                            "type": "Literal",
                                            "value": 1,
                                            "raw": "1"
                                        },
                                        "kind": "init",
                                        "method": false,
                                        "shorthand": false
                                    }
                                ]
                            }
                        ]
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "foo`foo${bar}\\unicode"', () => {
        expect(parseScript('foo`foo${bar}\\unicode`', {
            ranges: false,
            raw: true,
            v8: true
        })).to.eql({
              "body": [
                {
                  "expression": {
                   "quasi": {
                      "expressions": [
                        {
                          "name": "bar",
                          "type": "Identifier"
                        }
                      ],
                      "quasis": [
                        {
                          "tail": false,
                          "type": "TemplateElement",
                         "value": {
                            "cooked": "foo",
                            "raw": "foo",
                          }
                        },
                        {
                          "tail": true,
                          "type": "TemplateElement",
                          "value": {
                            "cooked": null,
                            "raw": "\\unicode"
                          }
                        }
                      ],
                     "type": "TemplateLiteral"
                    },
                    "tag": {
                      "name": "foo",
                      "type": "Identifier",
                    },
                    "type": "TaggedTemplateExpression"
                  },
                  "type": "ExpressionStatement",
                }
             ],
              "sourceType": "script",
              "type": "Program",
            });
    });

    it('should parse "`foo`"', () => {
        expect(parseScript('`foo`', {
            ranges: true,
            raw: true,
            v8: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "TemplateLiteral",
                        "expressions": [],
                        "quasis": [
                            {
                                "type": "TemplateElement",
                                "value": {
                                    "cooked": "foo",
                                    "raw": "foo"
                                },
                                "tail": true,
                                "start": 0,
                                "end": 5
                            }
                        ],
                        "start": 0,
                        "end": 5
                    },
                    "start": 0,
                    "end": 5
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 5
        });
    });

    it('should parse "`foo`"', () => {
        expect(parseScript('`foo\\u25a0`', {
            ranges: true,
            raw: true,
            v8: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "TemplateLiteral",
                        "expressions": [],
                        "quasis": [
                            {
                                "type": "TemplateElement",
                                "value": {
                                    "cooked": "foo■",
                                    "raw": "foo\\u25a0"
                                },
                                "tail": true,
                                "start": 0,
                                "end": 11
                            }
                        ],
                        "start": 0,
                        "end": 11
                    },
                    "start": 0,
                    "end": 11
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 11
        });
    });

    it('should parse "`foo`"', () => {
        expect(parseScript('foo`\\u25a0`', {
            ranges: true,
            raw: true,
            v8: true
        })).to.eql({
              "body": [
                {
                  "end": 11,
                  "expression": {
                    "end": 11,
                    "quasi": {
                      "end": 11,
                      "expressions": [],
                      "quasis": [
                        {
                          "end": 11,
                          "start": 3,
                          "tail": true,
                          "type": "TemplateElement",
                          "value": {
                            "cooked": "■",
                            "raw": "\\u25a0",
                          }
                        }
                      ],
                      "start": 3,
                      "type": "TemplateLiteral"
                    },
                    "start": 0,
                   "tag": {
                      "end": 3,
                      "name": "foo",
                      "start": 0,
                      "type": "Identifier",
                    },
                    "type": "TaggedTemplateExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                },
              ],
              "end": 11,
             "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });
});
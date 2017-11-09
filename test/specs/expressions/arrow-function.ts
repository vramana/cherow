import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Expressions - Arrow function', () => {
    
        it('should fail on invalid parenless parameter', () => {
            expect(() => {
                parseScript(`a () => {}`);
            }).to.throw()
        });

        it('should fail on invalid parenthesized pattern', () => {
            expect(() => {
                parseScript(`f = (a, (x)) => x`);
            }).to.throw()
        });

        it('should fail on invalid parenthesized pattern', () => {
            expect(() => {
                parseScript(`f = ((x)) => x`);
            }).to.throw()
        });
        
        it('should fail on invalid parenless parameter', () => {
            expect(() => {
                parseScript(`foo = x
            => {};`);
            }).to.throw()
        });

        it('should fail on future reserved word before comma in formal param', () => {
            expect(() => {
                parseScript(`(esprima, package) => {'use strict'}`);
            }).to.throw()
        });

        it('should fail on future reserved word before comma in formal param', () => {
            expect(() => {
                parseScript(`async(esprima, package) => {'use strict'}`);
            }).to.throw()
        });


        it('should fail on ASI restricton invalid', () => {
            expect(() => {
                parseScript(`foo = ()
            => {};`);
            }).to.throw()
        });

        it('should fail if arrow parameter contains duplicates', () => {
            expect(() => {
                parseScript(`af = (x, x) => 1;`);
            }).to.throw()
        });

        it('should fail if arrow parameter cover contains duplicates (array)', () => {
            expect(() => {
                parseScript(`af = ([x, x]) => 1;`);
            }).to.throw()
        });

        it('should fail if lone comma in cover param list', () => {
            expect(() => {
                parseScript(`hello = (,) => world`);
            }).to.throw()
        });

        it('should fail if arrow parameter binding identifier contain future reserved word - enum', () => {
            expect(() => {
                parseScript(`foo = enum => 1;`);
            }).to.throw()
        });
    
        it('should fail if arrow parameter binding identifier contain future reserved word - in', () => {
            expect(() => {
                parseScript(`foo = in => 1;`);
            }).to.throw()
        });
    
        it('should fail if arrow parameter binding identifier contain reserved word (strict)', () => {
            expect(() => {
                parseScript(`"use strict"; foo = package => 1;`);
            }).to.throw()
        });
    
        it('should fail if arrow parameter binding identifier contain reserved word - package (strict)', () => {
            expect(() => {
                parseScript(`"use strict"; foo = package => 1;`);
            }).to.throw()
        });
    
        it('should fail if arrow parameter binding identifier contain reserved word - switch (strict)', () => {
            expect(() => {
                parseScript(`"use strict"; foo = switch => 1;`);
            }).to.throw()
        });
    
        it('should fail if arrow parameter binding identifier contain "eval" (strict)', () => {
            expect(() => {
                parseScript(`"use strict"; foo = eval => 1;`);
            }).to.throw()
        });
    
        it('should fail if arrow parameter binding identifier contain rest', () => {
            expect(() => {
                parseScript(`foo = ...x => x;`);
            }).to.throw()
        });
    
        it('should fail if arrow parameter contains arguments (strict)', () => {
            expect(() => {
                parseScript(`"use strict"; foo = (arguments) => 1;`);
            }).to.throw()
        });
    
        it('should fail if arrow parameter followed by call expression', () => {
            expect(() => {
                parseScript(`() => {}()`);
            }).to.throw()
        });

        it('should fail if arrow parameter with identifier followed by call expression', () => {
            expect(() => {
                parseScript(`(a) => {}()`);
            }).to.throw()
        });

        it('should fail if simple arrow are followed by call expression', () => {
            expect(() => {
                parseScript(`a => {}()`);
            }).to.throw()
        });

        it('should fail if arrow parameter contains eval (strict)', () => {
            expect(() => {
                parseScript(`"use strict"; foo = (arguments) => 1;`);
            }).to.throw()
        });
    
        it('should fail if arrow parameter contains arguments after comma (strict)', () => {
            expect(() => {
                parseScript(`"use strict"; foo = (bar, arguments) => 1;`);
            }).to.throw()
        });
    
        it('should fail if arrow parameter contains yield (strict)', () => {
            expect(() => {
                parseScript(`"use strict"; foo = (yield) => 1;`);
            }).to.throw()
        });
    
        it('should fail if arrow parameter contains yield after comma (strict)', () => {
            expect(() => {
                parseScript(`"use strict"; foo = (yield) => 1;`);
            }).to.throw()
        });
    
        it('should fail if arrow parameter contains yield after comma (strict)', () => {
            expect(() => {
                parseScript(`"use strict"; foo = (yield) => 1;`);
            }).to.throw()
        });

        it('should fail on misspelled async function decl', () => {
            expect(() => {
                parseScript('async func');
            }).to.throw();
          });

         it('should parse arrow function followed by comma and identifier', () => {
            expect(parseScript(`a => {}, b;`, {
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
                      "type": "SequenceExpression",
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
                      "expressions": [
                        {
                          "type": "ArrowFunctionExpression",
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
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [
                            {
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
                            }
                          ],
                          "body": {
                            "type": "BlockStatement",
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
                            "body": []
                          }
                        },
                        {
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
                      ]
                    }
                  }
                ],
                "sourceType": "script"
              });
          });
          
          it('should parse arrow function wrapped in paren followed by call expression', () => {
            expect(parseScript(`((() => {}))()`, {
                ranges: true,
                locations: true,
                raw: true
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
                    "type": "ExpressionStatement",
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
                    "expression": {
                      "type": "CallExpression",
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
                      "callee": {
                        "type": "ArrowFunctionExpression",
                        "start": 2,
                        "end": 10,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 2
                          },
                          "end": {
                            "line": 1,
                            "column": 10
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
                          "start": 8,
                          "end": 10,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 8
                            },
                            "end": {
                              "line": 1,
                              "column": 10
                            }
                          },
                          "body": []
                        }
                      },
                      "arguments": []
                    }
                  }
                ],
                "sourceType": "script"
              });
        });

          it('should parse arrow function wrapped in paren followed by call expression', () => {
            expect(parseScript(`(() => {})()`, {
                ranges: true,
                locations: true,
                raw: true
            })).to.eql({
                "type": "Program",
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
                "body": [
                  {
                    "type": "ExpressionStatement",
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
                    "expression": {
                      "type": "CallExpression",
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
                      "callee": {
                        "type": "ArrowFunctionExpression",
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
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
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
                          "body": []
                        }
                      },
                      "arguments": []
                    }
                  }
                ],
                "sourceType": "script"
              });
        });
          it('should parse arrow function with a function call (parenthesized) ', () => {
            expect(parseScript(`([a, , b]) => 42`, {
                ranges: true,
                locations: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 16,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 16
                  }
                },
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 16,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 16
                      }
                    },
                    "expression": {
                      "type": "ArrowFunctionExpression",
                      "start": 0,
                      "end": 16,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 0
                        },
                        "end": {
                          "line": 1,
                          "column": 16
                        }
                      },
                      "id": null,
                      "generator": false,
                      "expression": true,
                      "async": false,
                      "params": [
                        {
                          "type": "ArrayPattern",
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
                          "elements": [
                            {
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
                              "name": "a"
                            },
                            null,
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
                              "name": "b"
                            }
                          ]
                        }
                      ],
                      "body": {
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
                        "value": 42,
                        "raw": "42"
                      }
                    }
                  }
                ],
                "sourceType": "script"
              });
            });            
        it('should parse arrow function with a function call (parenthesized) ', () => {
            expect(parseScript(`(a => b.test())`, {
                ranges: true,
                locations: true,
                raw: true
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
                      "start": 1,
                      "end": 14,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 1
                        },
                        "end": {
                          "line": 1,
                          "column": 14
                        }
                      },
                      "id": null,
                      "generator": false,
                      "expression": true,
                      "async": false,
                      "params": [
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
                        }
                      ],
                      "body": {
                        "type": "CallExpression",
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
                        "callee": {
                          "type": "MemberExpression",
                          "start": 6,
                          "end": 12,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 6
                            },
                            "end": {
                              "line": 1,
                              "column": 12
                            }
                          },
                          "object": {
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
                            "name": "b"
                          },
                          "property": {
                            "type": "Identifier",
                            "start": 8,
                            "end": 12,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 8
                              },
                              "end": {
                                "line": 1,
                                "column": 12
                              }
                            },
                            "name": "test"
                          },
                          "computed": false
                        },
                        "arguments": []
                      }
                    }
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse arrow function with a function call ', () => {
            expect(parseScript(`var fn = () => test();`, {
                ranges: true,
                locations: true,
                raw: true
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
                        "end": 21,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 4
                          },
                          "end": {
                            "line": 1,
                            "column": 21
                          }
                        },
                        "id": {
                          "type": "Identifier",
                          "start": 4,
                          "end": 6,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 4
                            },
                            "end": {
                              "line": 1,
                              "column": 6
                            }
                          },
                          "name": "fn"
                        },
                        "init": {
                          "type": "ArrowFunctionExpression",
                          "start": 9,
                          "end": 21,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 9
                            },
                            "end": {
                              "line": 1,
                              "column": 21
                            }
                          },
                          "id": null,
                          "generator": false,
                          "expression": true,
                          "async": false,
                          "params": [],
                          "body": {
                            "type": "CallExpression",
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
                            "callee": {
                              "type": "Identifier",
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
                              "name": "test"
                            },
                            "arguments": []
                          }
                        }
                      }
                    ],
                    "kind": "var"
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse arrow parameters binding identifier lineterminator concisebody', () => {
            expect(parseScript(`foo = x =>
            x;`, {
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
                    "line": 2,
                    "column": 14
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
                        "line": 2,
                        "column": 14
                      }
                    },
                    "expression": {
                      "type": "AssignmentExpression",
                      "start": 0,
                      "end": 24,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 0
                        },
                        "end": {
                          "line": 2,
                          "column": 13
                        }
                      },
                      "operator": "=",
                      "left": {
                        "type": "Identifier",
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
                        "name": "foo"
                      },
                      "right": {
                        "type": "ArrowFunctionExpression",
                        "start": 6,
                        "end": 24,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 6
                          },
                          "end": {
                            "line": 2,
                            "column": 13
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": true,
                        "async": false,
                        "params": [
                          {
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
                            "name": "x"
                          }
                        ],
                        "body": {
                          "type": "Identifier",
                          "start": 23,
                          "end": 24,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 12
                            },
                            "end": {
                              "line": 2,
                              "column": 13
                            }
                          },
                          "name": "x"
                        }
                      }
                    }
                  }
                ],
                "sourceType": "script"
              });
        });
    
        it('should parse binding identifier yield', () => {
            expect(parseScript(`foo = yield => 1;`, {
                ranges: true,
                locations: true,
                raw: true
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
                "body": [{
                    "type": "ExpressionStatement",
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
                    "expression": {
                        "type": "AssignmentExpression",
                        "start": 0,
                        "end": 16,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 16
                            }
                        },
                        "operator": "=",
                        "left": {
                            "type": "Identifier",
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
                            "name": "foo"
                        },
                        "right": {
                            "type": "ArrowFunctionExpression",
                            "start": 6,
                            "end": 16,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 6
                                },
                                "end": {
                                    "line": 1,
                                    "column": 16
                                }
                            },
                            "id": null,
                            "generator": false,
                            "expression": true,
                            "async": false,
                            "params": [{
                                "type": "Identifier",
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
                                "name": "yield"
                            }],
                            "body": {
                                "type": "Literal",
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
                                "value": 1,
                                "raw": "1"
                            }
                        }
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse cover concisebody assignmentexpression', () => {
            expect(parseScript(`af = (x) => x;`, {
                ranges: true,
                locations: true,
                raw: true
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
                "body": [{
                    "type": "ExpressionStatement",
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
                            "type": "Identifier",
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
                            "name": "af"
                        },
                        "right": {
                            "type": "ArrowFunctionExpression",
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
                            "id": null,
                            "generator": false,
                            "expression": true,
                            "async": false,
                            "params": [{
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
                                "name": "x"
                            }],
                            "body": {
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
                            }
                        }
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse cover formal parameters eval', () => {
            expect(parseScript(`af = (eval) => eval;`, {
                ranges: true,
                locations: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 20,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 20
                    }
                },
                "body": [{
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 20,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 20
                        }
                    },
                    "expression": {
                        "type": "AssignmentExpression",
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
                        "operator": "=",
                        "left": {
                            "type": "Identifier",
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
                            "name": "af"
                        },
                        "right": {
                            "type": "ArrowFunctionExpression",
                            "start": 5,
                            "end": 19,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 5
                                },
                                "end": {
                                    "line": 1,
                                    "column": 19
                                }
                            },
                            "id": null,
                            "generator": false,
                            "expression": true,
                            "async": false,
                            "params": [{
                                "type": "Identifier",
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
                                "name": "eval"
                            }],
                            "body": {
                                "type": "Identifier",
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
                                "name": "eval"
                            }
                        }
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse arrow parameters cover initialize #1', () => {
            expect(parseScript(`af = (x = 1) => x;`, {
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
                    "type": "ExpressionStatement",
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
                    "expression": {
                        "type": "AssignmentExpression",
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
                        "operator": "=",
                        "left": {
                            "type": "Identifier",
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
                            "name": "af"
                        },
                        "right": {
                            "type": "ArrowFunctionExpression",
                            "start": 5,
                            "end": 17,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 5
                                },
                                "end": {
                                    "line": 1,
                                    "column": 17
                                }
                            },
                            "id": null,
                            "generator": false,
                            "expression": true,
                            "async": false,
                            "params": [{
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
                                    "name": "x"
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
                                    "value": 1,
                                    "raw": "1"
                                }
                            }],
                            "body": {
                                "type": "Identifier",
                                "start": 16,
                                "end": 17,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 16
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 17
                                    }
                                },
                                "name": "x"
                            }
                        }
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse arrow parameters cover initialize #2', () => {
            expect(parseScript(`af = (x) =>
            x;`, {
                ranges: true,
                locations: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 26,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 2,
                    "column": 14
                  }
                },
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 26,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 2,
                        "column": 14
                      }
                    },
                    "expression": {
                      "type": "AssignmentExpression",
                      "start": 0,
                      "end": 25,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 0
                        },
                        "end": {
                          "line": 2,
                          "column": 13
                        }
                      },
                      "operator": "=",
                      "left": {
                        "type": "Identifier",
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
                        "name": "af"
                      },
                      "right": {
                        "type": "ArrowFunctionExpression",
                        "start": 5,
                        "end": 25,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 5
                          },
                          "end": {
                            "line": 2,
                            "column": 13
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": true,
                        "async": false,
                        "params": [
                          {
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
                            "name": "x"
                          }
                        ],
                        "body": {
                          "type": "Identifier",
                          "start": 24,
                          "end": 25,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 12
                            },
                            "end": {
                              "line": 2,
                              "column": 13
                            }
                          },
                          "name": "x"
                        }
                      }
                    }
                  }
                ],
                "sourceType": "script"
              });
        });
        describe('Variations', () => {
    
            it('should parse "(() => { return 3; })(), 3"', () => {
                expect(parseScript(`(() => { return 3; })(), 3`, {
                    ranges: true,
                    locations: true,
                    raw: true
                })).to.eql({
                    "type": "Program",
                    "start": 0,
                    "end": 26,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 26
                        }
                    },
                    "body": [{
                        "type": "ExpressionStatement",
                        "start": 0,
                        "end": 26,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 26
                            }
                        },
                        "expression": {
                            "type": "SequenceExpression",
                            "start": 0,
                            "end": 26,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 26
                                }
                            },
                            "expressions": [{
                                    "type": "CallExpression",
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
                                    "callee": {
                                        "type": "ArrowFunctionExpression",
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
                                        "id": null,
                                        "generator": false,
                                        "expression": false,
                                        "async": false,
                                        "params": [],
                                        "body": {
                                            "type": "BlockStatement",
                                            "start": 7,
                                            "end": 20,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 7
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 20
                                                }
                                            },
                                            "body": [{
                                                "type": "ReturnStatement",
                                                "start": 9,
                                                "end": 18,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 9
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 18
                                                    }
                                                },
                                                "argument": {
                                                    "type": "Literal",
                                                    "start": 16,
                                                    "end": 17,
                                                    "loc": {
                                                        "start": {
                                                            "line": 1,
                                                            "column": 16
                                                        },
                                                        "end": {
                                                            "line": 1,
                                                            "column": 17
                                                        }
                                                    },
                                                    "value": 3,
                                                    "raw": "3"
                                                }
                                            }]
                                        }
                                    },
                                    "arguments": []
                                },
                                {
                                    "type": "Literal",
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
                                    "value": 3,
                                    "raw": "3"
                                }
                            ]
                        }
                    }],
                    "sourceType": "script"
                });
            });
    
            it('should parse "(a => a + 1)(1), 2"', () => {
                expect(parseScript(`(a => a + 1)(1), 2`, {
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
                        "type": "ExpressionStatement",
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
                        "expression": {
                            "type": "SequenceExpression",
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
                            "expressions": [{
                                    "type": "CallExpression",
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
                                    "callee": {
                                        "type": "ArrowFunctionExpression",
                                        "start": 1,
                                        "end": 11,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 1
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 11
                                            }
                                        },
                                        "id": null,
                                        "generator": false,
                                        "expression": true,
                                        "async": false,
                                        "params": [{
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
                                        }],
                                        "body": {
                                            "type": "BinaryExpression",
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
                                                "name": "a"
                                            },
                                            "operator": "+",
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
                                                "value": 1,
                                                "raw": "1"
                                            }
                                        }
                                    },
                                    "arguments": [{
                                        "type": "Literal",
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
                                        "value": 1,
                                        "raw": "1"
                                    }]
                                },
                                {
                                    "type": "Literal",
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
                                    "value": 2,
                                    "raw": "2"
                                }
                            ]
                        }
                    }],
                    "sourceType": "script"
                });
            });
    
    
            it('should parse "(() => { return 3; })(), 3"', () => {
                expect(parseScript(`(() => { return 3; })(), 3`, {
                    ranges: true,
                    locations: true,
                    raw: true
                })).to.eql({
                    "type": "Program",
                    "start": 0,
                    "end": 26,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 26
                        }
                    },
                    "body": [{
                        "type": "ExpressionStatement",
                        "start": 0,
                        "end": 26,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 26
                            }
                        },
                        "expression": {
                            "type": "SequenceExpression",
                            "start": 0,
                            "end": 26,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 26
                                }
                            },
                            "expressions": [{
                                    "type": "CallExpression",
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
                                    "callee": {
                                        "type": "ArrowFunctionExpression",
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
                                        "id": null,
                                        "generator": false,
                                        "expression": false,
                                        "async": false,
                                        "params": [],
                                        "body": {
                                            "type": "BlockStatement",
                                            "start": 7,
                                            "end": 20,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 7
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 20
                                                }
                                            },
                                            "body": [{
                                                "type": "ReturnStatement",
                                                "start": 9,
                                                "end": 18,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 9
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 18
                                                    }
                                                },
                                                "argument": {
                                                    "type": "Literal",
                                                    "start": 16,
                                                    "end": 17,
                                                    "loc": {
                                                        "start": {
                                                            "line": 1,
                                                            "column": 16
                                                        },
                                                        "end": {
                                                            "line": 1,
                                                            "column": 17
                                                        }
                                                    },
                                                    "value": 3,
                                                    "raw": "3"
                                                }
                                            }]
                                        }
                                    },
                                    "arguments": []
                                },
                                {
                                    "type": "Literal",
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
                                    "value": 3,
                                    "raw": "3"
                                }
                            ]
                        }
                    }],
                    "sourceType": "script"
                });
            });
    
            it('should parse "(a => { return a + 3; })(1), 4"', () => {
                expect(parseScript(`(a => { return a + 3; })(1), 4`, {
                    ranges: true,
                    locations: true,
                    raw: true
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
                    "body": [{
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
                            "type": "SequenceExpression",
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
                            "expressions": [{
                                    "type": "CallExpression",
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
                                    "callee": {
                                        "type": "ArrowFunctionExpression",
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
                                        "id": null,
                                        "generator": false,
                                        "expression": false,
                                        "async": false,
                                        "params": [{
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
                                        }],
                                        "body": {
                                            "type": "BlockStatement",
                                            "start": 6,
                                            "end": 23,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 6
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 23
                                                }
                                            },
                                            "body": [{
                                                "type": "ReturnStatement",
                                                "start": 8,
                                                "end": 21,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 8
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 21
                                                    }
                                                },
                                                "argument": {
                                                    "type": "BinaryExpression",
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
                                                        "name": "a"
                                                    },
                                                    "operator": "+",
                                                    "right": {
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
                                                        "value": 3,
                                                        "raw": "3"
                                                    }
                                                }
                                            }]
                                        }
                                    },
                                    "arguments": [{
                                        "type": "Literal",
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
                                        "value": 1,
                                        "raw": "1"
                                    }]
                                },
                                {
                                    "type": "Literal",
                                    "start": 29,
                                    "end": 30,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 29
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 30
                                        }
                                    },
                                    "value": 4,
                                    "raw": "4"
                                }
                            ]
                        }
                    }],
                    "sourceType": "script"
                });
            });
    
            it('should parse "((a, b) => a + b)(1, 4), 5"', () => {
                expect(parseScript(`((a, b) => a + b)(1, 4), 5`, {
                    ranges: true,
                    locations: true,
                    raw: true
                })).to.eql({
                    "type": "Program",
                    "start": 0,
                    "end": 26,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 26
                        }
                    },
                    "body": [{
                        "type": "ExpressionStatement",
                        "start": 0,
                        "end": 26,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 26
                            }
                        },
                        "expression": {
                            "type": "SequenceExpression",
                            "start": 0,
                            "end": 26,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 26
                                }
                            },
                            "expressions": [{
                                    "type": "CallExpression",
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
                                    "callee": {
                                        "type": "ArrowFunctionExpression",
                                        "start": 1,
                                        "end": 16,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 1
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 16
                                            }
                                        },
                                        "id": null,
                                        "generator": false,
                                        "expression": true,
                                        "async": false,
                                        "params": [{
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
                                                "name": "a"
                                            },
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
                                            }
                                        ],
                                        "body": {
                                            "type": "BinaryExpression",
                                            "start": 11,
                                            "end": 16,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 11
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 16
                                                }
                                            },
                                            "left": {
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
                                                "name": "a"
                                            },
                                            "operator": "+",
                                            "right": {
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
                                                "name": "b"
                                            }
                                        }
                                    },
                                    "arguments": [{
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
                                            "value": 1,
                                            "raw": "1"
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
                                            "value": 4,
                                            "raw": "4"
                                        }
                                    ]
                                },
                                {
                                    "type": "Literal",
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
                                    "value": 5,
                                    "raw": "5"
                                }
                            ]
                        }
                    }],
                    "sourceType": "script"
                });
            });
    
            it('should parse "((a, b) => { return a + b; })(1, 5), 6"', () => {
                expect(parseScript(`((a, b) => { return a + b; })(1, 5), 6`, {
                    ranges: true,
                    locations: true,
                    raw: true
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
                    "body": [{
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
                            "type": "SequenceExpression",
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
                            "expressions": [{
                                    "type": "CallExpression",
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
                                    },
                                    "callee": {
                                        "type": "ArrowFunctionExpression",
                                        "start": 1,
                                        "end": 28,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 1
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 28
                                            }
                                        },
                                        "id": null,
                                        "generator": false,
                                        "expression": false,
                                        "async": false,
                                        "params": [{
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
                                                "name": "a"
                                            },
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
                                            }
                                        ],
                                        "body": {
                                            "type": "BlockStatement",
                                            "start": 11,
                                            "end": 28,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 11
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 28
                                                }
                                            },
                                            "body": [{
                                                "type": "ReturnStatement",
                                                "start": 13,
                                                "end": 26,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 13
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 26
                                                    }
                                                },
                                                "argument": {
                                                    "type": "BinaryExpression",
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
                                                    "left": {
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
                                                        "name": "a"
                                                    },
                                                    "operator": "+",
                                                    "right": {
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
                                                        "name": "b"
                                                    }
                                                }
                                            }]
                                        }
                                    },
                                    "arguments": [{
                                            "type": "Literal",
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
                                            "value": 1,
                                            "raw": "1"
                                        },
                                        {
                                            "type": "Literal",
                                            "start": 33,
                                            "end": 34,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 33
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 34
                                                }
                                            },
                                            "value": 5,
                                            "raw": "5"
                                        }
                                    ]
                                },
                                {
                                    "type": "Literal",
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
                                    "value": 6,
                                    "raw": "6"
                                }
                            ]
                        }
                    }],
                    "sourceType": "script"
                });
            });
    
        });
    
        it('should parse await (strict)', () => {
            expect(parseScript(`"use strict"; foo = await => 1;`, {
                ranges: true,
                locations: true,
                raw: true
            })).to.eql({
                "type": "Program",
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
                "body": [{
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
                        "end": 31,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 14
                            },
                            "end": {
                                "line": 1,
                                "column": 31
                            }
                        },
                        "expression": {
                            "type": "AssignmentExpression",
                            "start": 14,
                            "end": 30,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 14
                                },
                                "end": {
                                    "line": 1,
                                    "column": 30
                                }
                            },
                            "operator": "=",
                            "left": {
                                "type": "Identifier",
                                "start": 14,
                                "end": 17,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 14
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 17
                                    }
                                },
                                "name": "foo"
                            },
                            "right": {
                                "type": "ArrowFunctionExpression",
                                "start": 20,
                                "end": 30,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 20
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 30
                                    }
                                },
                                "id": null,
                                "generator": false,
                                "expression": true,
                                "async": false,
                                "params": [{
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
                                    "name": "await"
                                }],
                                "body": {
                                    "type": "Literal",
                                    "start": 29,
                                    "end": 30,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 29
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 30
                                        }
                                    },
                                    "value": 1,
                                    "raw": "1"
                                }
                            }
                        }
                    }
                ],
                "sourceType": "script"
            });
        });
    
        it('should parse await (sloppy)', () => {
            expect(parseScript(`foo = await => 1;`, {
                ranges: true,
                locations: true,
                raw: true
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
                "body": [{
                    "type": "ExpressionStatement",
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
                    "expression": {
                        "type": "AssignmentExpression",
                        "start": 0,
                        "end": 16,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 16
                            }
                        },
                        "operator": "=",
                        "left": {
                            "type": "Identifier",
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
                            "name": "foo"
                        },
                        "right": {
                            "type": "ArrowFunctionExpression",
                            "start": 6,
                            "end": 16,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 6
                                },
                                "end": {
                                    "line": 1,
                                    "column": 16
                                }
                            },
                            "id": null,
                            "generator": false,
                            "expression": true,
                            "async": false,
                            "params": [{
                                "type": "Identifier",
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
                                "name": "await"
                            }],
                            "body": {
                                "type": "Literal",
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
                                "value": 1,
                                "raw": "1"
                            }
                        }
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse yield', () => {
            expect(parseScript(`foo = yield => 1;`, {
                ranges: true,
                locations: true,
                raw: true
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
                "body": [{
                    "type": "ExpressionStatement",
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
                    "expression": {
                        "type": "AssignmentExpression",
                        "start": 0,
                        "end": 16,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 16
                            }
                        },
                        "operator": "=",
                        "left": {
                            "type": "Identifier",
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
                            "name": "foo"
                        },
                        "right": {
                            "type": "ArrowFunctionExpression",
                            "start": 6,
                            "end": 16,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 6
                                },
                                "end": {
                                    "line": 1,
                                    "column": 16
                                }
                            },
                            "id": null,
                            "generator": false,
                            "expression": true,
                            "async": false,
                            "params": [{
                                "type": "Identifier",
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
                                "name": "yield"
                            }],
                            "body": {
                                "type": "Literal",
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
                                "value": 1,
                                "raw": "1"
                            }
                        }
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse assignment', () => {
            expect(parseScript(`foo = eeval => 1;`, {
                ranges: true,
                locations: true,
                raw: true
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
                "body": [{
                    "type": "ExpressionStatement",
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
                    "expression": {
                        "type": "AssignmentExpression",
                        "start": 0,
                        "end": 16,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 16
                            }
                        },
                        "operator": "=",
                        "left": {
                            "type": "Identifier",
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
                            "name": "foo"
                        },
                        "right": {
                            "type": "ArrowFunctionExpression",
                            "start": 6,
                            "end": 16,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 6
                                },
                                "end": {
                                    "line": 1,
                                    "column": 16
                                }
                            },
                            "id": null,
                            "generator": false,
                            "expression": true,
                            "async": false,
                            "params": [{
                                "type": "Identifier",
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
                                "name": "eeval"
                            }],
                            "body": {
                                "type": "Literal",
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
                                "value": 1,
                                "raw": "1"
                            }
                        }
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse with two paramaters', () => {
            expect(parseScript(`foo((x, y) => {});`, {
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
                    "type": "ExpressionStatement",
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
                    "expression": {
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
                            "type": "Identifier",
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
                            "name": "foo"
                        },
                        "arguments": [{
                            "type": "ArrowFunctionExpression",
                            "start": 4,
                            "end": 16,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 4
                                },
                                "end": {
                                    "line": 1,
                                    "column": 16
                                }
                            },
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [{
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
                                    "name": "x"
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
                                    "name": "y"
                                }
                            ],
                            "body": {
                                "type": "BlockStatement",
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
                                "body": []
                            }
                        }]
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse with two paramaters', () => {
            expect(parseScript(`(x, y) => {};`, {
                ranges: true,
                locations: true,
                raw: true
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
                "body": [{
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
                        "type": "ArrowFunctionExpression",
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
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [{
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
                                "name": "x"
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
                                "name": "y"
                            }
                        ],
                        "body": {
                            "type": "BlockStatement",
                            "start": 10,
                            "end": 12,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 10
                                },
                                "end": {
                                    "line": 1,
                                    "column": 12
                                }
                            },
                            "body": []
                        }
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse basic', () => {
            expect(parseScript(`() => "test";`, {
                ranges: true,
                locations: true,
                raw: true
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
                "body": [{
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
                        "type": "ArrowFunctionExpression",
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
                        "id": null,
                        "generator": false,
                        "expression": true,
                        "async": false,
                        "params": [],
                        "body": {
                            "type": "Literal",
                            "start": 6,
                            "end": 12,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 6
                                },
                                "end": {
                                    "line": 1,
                                    "column": 12
                                }
                            },
                            "value": "test",
                            "raw": "\"test\""
                        }
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse block body not label', () => {
            expect(parseScript(`e => { label: 42 };`, {
                ranges: true,
                locations: true,
                raw: true
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
                "body": [{
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
                        "type": "ArrowFunctionExpression",
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
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [{
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
                            "name": "e"
                        }],
                        "body": {
                            "type": "BlockStatement",
                            "start": 5,
                            "end": 18,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 5
                                },
                                "end": {
                                    "line": 1,
                                    "column": 18
                                }
                            },
                            "body": [{
                                "type": "LabeledStatement",
                                "start": 7,
                                "end": 16,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 7
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 16
                                    }
                                },
                                "body": {
                                    "type": "ExpressionStatement",
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
                                    "expression": {
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
                                        "value": 42,
                                        "raw": "42"
                                    }
                                },
                                "label": {
                                    "type": "Identifier",
                                    "start": 7,
                                    "end": 12,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 7
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 12
                                        }
                                    },
                                    "name": "label"
                                }
                            }]
                        }
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse block body', () => {
            expect(parseScript(`e => { 42; };`, {
                ranges: true,
                locations: true,
                raw: true
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
                "body": [{
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
                        "type": "ArrowFunctionExpression",
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
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [{
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
                            "name": "e"
                        }],
                        "body": {
                            "type": "BlockStatement",
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
                            "body": [{
                                "type": "ExpressionStatement",
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
                                "expression": {
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
                                    "value": 42,
                                    "raw": "42"
                                }
                            }]
                        }
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse as expression', () => {
            expect(parseScript(`(x => x);`, {
                ranges: true,
                locations: true,
                raw: true
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
                        "type": "ArrowFunctionExpression",
                        "start": 1,
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
                        },
                        "id": null,
                        "generator": false,
                        "expression": true,
                        "async": false,
                        "params": [{
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
                            "name": "x"
                        }],
                        "body": {
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
                            "name": "x"
                        }
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse argument identifier (sloppy mode)', () => {
            expect(parseScript(`arguments => 42;`, {
                ranges: true,
                locations: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 16,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 16
                    }
                },
                "body": [{
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 16,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 16
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
                        "params": [{
                            "type": "Identifier",
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
                            "name": "arguments"
                        }],
                        "body": {
                            "type": "Literal",
                            "start": 13,
                            "end": 15,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 13
                                },
                                "end": {
                                    "line": 1,
                                    "column": 15
                                }
                            },
                            "value": 42,
                            "raw": "42"
                        }
                    }
                }],
                "sourceType": "script"
            });
        });

        it('should parse call with arrow inside', () => {
            expect(parseScript(`foo((x, y) => {})`, {
                ranges: true,
                locations: true,
                raw: true
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
                    "type": "ExpressionStatement",
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
                    "expression": {
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
                        "type": "Identifier",
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
                        "name": "foo"
                      },
                      "arguments": [
                        {
                          "type": "ArrowFunctionExpression",
                          "start": 4,
                          "end": 16,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 4
                            },
                            "end": {
                              "line": 1,
                              "column": 16
                            }
                          },
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [
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
                              "name": "x"
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
                              "name": "y"
                            }
                          ],
                          "body": {
                            "type": "BlockStatement",
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
                            "body": []
                          }
                        }
                      ]
                    }
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse call with arrow inside', () => {
            expect(parseScript(`foo(() => {})`, {
                ranges: true,
                locations: true,
                raw: true
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
                        "name": "foo"
                      },
                      "arguments": [
                        {
                          "type": "ArrowFunctionExpression",
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
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [],
                          "body": {
                            "type": "BlockStatement",
                            "start": 10,
                            "end": 12,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 10
                              },
                              "end": {
                                "line": 1,
                                "column": 12
                              }
                            },
                            "body": []
                          }
                        }
                      ]
                    }
                  }
                ],
                "sourceType": "script"
              });
        });
        
        it('should parse eval params assignment (sloppy mode)', () => {
            expect(parseScript(`(eval, a = 10) => 42`, {
                ranges: true,
                locations: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 20,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 20
                  }
                },
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 20,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 20
                      }
                    },
                    "expression": {
                      "type": "ArrowFunctionExpression",
                      "start": 0,
                      "end": 20,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 0
                        },
                        "end": {
                          "line": 1,
                          "column": 20
                        }
                      },
                      "id": null,
                      "generator": false,
                      "expression": true,
                      "async": false,
                      "params": [
                        {
                          "type": "Identifier",
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
                          "name": "eval"
                        },
                        {
                          "type": "AssignmentPattern",
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
                          "left": {
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
                          "right": {
                            "type": "Literal",
                            "start": 11,
                            "end": 13,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 11
                              },
                              "end": {
                                "line": 1,
                                "column": 13
                              }
                            },
                            "value": 10,
                            "raw": "10"
                          }
                        }
                      ],
                      "body": {
                        "type": "Literal",
                        "start": 18,
                        "end": 20,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 18
                          },
                          "end": {
                            "line": 1,
                            "column": 20
                          }
                        },
                        "value": 42,
                        "raw": "42"
                      }
                    }
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse eval params assignment (sloppy mode)', () => {
            expect(parseScript(`(eval = 10) => 42`, {
                ranges: true,
                locations: true,
                raw: true
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
                    "type": "ExpressionStatement",
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
                    "expression": {
                      "type": "ArrowFunctionExpression",
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
                      "id": null,
                      "generator": false,
                      "expression": true,
                      "async": false,
                      "params": [
                        {
                          "type": "AssignmentPattern",
                          "start": 1,
                          "end": 10,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 1
                            },
                            "end": {
                              "line": 1,
                              "column": 10
                            }
                          },
                          "left": {
                            "type": "Identifier",
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
                            "name": "eval"
                          },
                          "right": {
                            "type": "Literal",
                            "start": 8,
                            "end": 10,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 8
                              },
                              "end": {
                                "line": 1,
                                "column": 10
                              }
                            },
                            "value": 10,
                            "raw": "10"
                          }
                        }
                      ],
                      "body": {
                        "type": "Literal",
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
                        "value": 42,
                        "raw": "42"
                      }
                    }
                  }
                ],
                "sourceType": "script"
              });
        });
    
        it('should parse eval params (sloppy mode)', () => {
            expect(parseScript(`(eval, a) => 42;`, {
                ranges: true,
                locations: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 16,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 16
                    }
                },
                "body": [{
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 16,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 16
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
                        "params": [{
                                "type": "Identifier",
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
                                "name": "eval"
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
                                "name": "a"
                            }
                        ],
                        "body": {
                            "type": "Literal",
                            "start": 13,
                            "end": 15,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 13
                                },
                                "end": {
                                    "line": 1,
                                    "column": 15
                                }
                            },
                            "value": 42,
                            "raw": "42"
                        }
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse as eval identifier (sloppy mode)', () => {
            expect(parseScript(`eval => 42;`, {
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
                        "type": "ArrowFunctionExpression",
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
                        "id": null,
                        "generator": false,
                        "expression": true,
                        "async": false,
                        "params": [{
                            "type": "Identifier",
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
                            "name": "eval"
                        }],
                        "body": {
                            "type": "Literal",
                            "start": 8,
                            "end": 10,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 8
                                },
                                "end": {
                                    "line": 1,
                                    "column": 10
                                }
                            },
                            "value": 42,
                            "raw": "42"
                        }
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse octal (sloppy mode)', () => {
            expect(parseScript(`(a) => 00;`, {
                ranges: true,
                locations: true,
                raw: true
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
                      "type": "ArrowFunctionExpression",
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
                      "id": null,
                      "generator": false,
                      "expression": true,
                      "async": false,
                      "params": [
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
                        }
                      ],
                      "body": {
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
                        "value": 0,
                        "raw": "00"
                      }
                    }
                  }
                ],
                "sourceType": "script"
              });
        });
    
        it('should parse single param parens', () => {
            expect(parseScript(`(e) => "test";`, {
                ranges: true,
                locations: true,
                raw: true
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
                "body": [{
                    "type": "ExpressionStatement",
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
                    "expression": {
                        "type": "ArrowFunctionExpression",
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
                        "id": null,
                        "generator": false,
                        "expression": true,
                        "async": false,
                        "params": [{
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
                            "name": "e"
                        }],
                        "body": {
                            "type": "Literal",
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
                            "value": "test",
                            "raw": "\"test\""
                        }
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should return arrow function', () => {
            expect(parseScript(`x => y => 42;`, {
                ranges: true,
                locations: true,
                raw: true
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
                "body": [{
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
                        "type": "ArrowFunctionExpression",
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
                        "id": null,
                        "generator": false,
                        "expression": true,
                        "async": false,
                        "params": [{
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
                        }],
                        "body": {
                            "type": "ArrowFunctionExpression",
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
                            "id": null,
                            "generator": false,
                            "expression": true,
                            "async": false,
                            "params": [{
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
                            }],
                            "body": {
                                "type": "Literal",
                                "start": 10,
                                "end": 12,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 10
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 12
                                    }
                                },
                                "value": 42,
                                "raw": "42"
                            }
                        }
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse sequence', () => {
            expect(parseScript(`(x) => ((y, z) => (x, y, z));`, {
                ranges: true,
                locations: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 29,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 29
                    }
                },
                "body": [{
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 29,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 29
                        }
                    },
                    "expression": {
                        "type": "ArrowFunctionExpression",
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
                        "id": null,
                        "generator": false,
                        "expression": true,
                        "async": false,
                        "params": [{
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
                            "name": "x"
                        }],
                        "body": {
                            "type": "ArrowFunctionExpression",
                            "start": 8,
                            "end": 27,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 8
                                },
                                "end": {
                                    "line": 1,
                                    "column": 27
                                }
                            },
                            "id": null,
                            "generator": false,
                            "expression": true,
                            "async": false,
                            "params": [{
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
                                    "name": "y"
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
                                    "name": "z"
                                }
                            ],
                            "body": {
                                "type": "SequenceExpression",
                                "start": 19,
                                "end": 26,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 19
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 26
                                    }
                                },
                                "expressions": [{
                                        "type": "Identifier",
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
                                        "name": "x"
                                    },
                                    {
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
                                        "name": "y"
                                    },
                                    {
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
                                    }
                                ]
                            }
                        }
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse single param', () => {
            expect(parseScript(`e => "test";`, {
                ranges: true,
                locations: true,
                raw: true
            })).to.eql({
                "type": "Program",
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
                "body": [{
                    "type": "ExpressionStatement",
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
                    "expression": {
                        "type": "ArrowFunctionExpression",
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
                        "id": null,
                        "generator": false,
                        "expression": true,
                        "async": false,
                        "params": [{
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
                            "name": "e"
                        }],
                        "body": {
                            "type": "Literal",
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
                            "value": "test",
                            "raw": "\"test\""
                        }
                    }
                }],
                "sourceType": "script"
            });
        });

        it('should parse with comma dangle', () => {
            expect(parseScript(`(a, b,) => { }`, {
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
                    "type": "ExpressionStatement",
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
                    "expression": {
                      "type": "ArrowFunctionExpression",
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
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [
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
                      ],
                      "body": {
                        "type": "BlockStatement",
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
                        "body": []
                      }
                    }
                  }
                ],
                "sourceType": "script"
              });
        });
    
        it('should parse async arrow function where new line comes after "async"', () => {
            expect(parseScript(`async 
            ()`, {
                ranges: true,
                locations: true,
                raw: true
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
                    "line": 2,
                    "column": 14
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
                        "line": 2,
                        "column": 14
                      }
                    },
                    "expression": {
                      "type": "CallExpression",
                      "start": 0,
                      "end": 21,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 0
                        },
                        "end": {
                          "line": 2,
                          "column": 14
                        }
                      },
                      "callee": {
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
                        "name": "async"
                      },
                      "arguments": []
                    }
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse arrow function with function call', () => {
            expect(parseScript(`(a => a.b())`, {
                ranges: true,
                locations: true,
                raw: true
            })).to.eql({
                "type": "Program",
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
                "body": [
                  {
                    "type": "ExpressionStatement",
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
                    "expression": {
                      "type": "ArrowFunctionExpression",
                      "start": 1,
                      "end": 11,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 1
                        },
                        "end": {
                          "line": 1,
                          "column": 11
                        }
                      },
                      "id": null,
                      "generator": false,
                      "expression": true,
                      "async": false,
                      "params": [
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
                        }
                      ],
                      "body": {
                        "type": "CallExpression",
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
                        "callee": {
                          "type": "MemberExpression",
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
                          "object": {
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
                            "name": "a"
                          },
                          "property": {
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
                          "computed": false
                        },
                        "arguments": []
                      }
                    }
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse arrow function with function call', () => {
            expect(parseScript(`fn = () => test();`, {
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
                "body": [
                  {
                    "type": "ExpressionStatement",
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
                    "expression": {
                      "type": "AssignmentExpression",
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
                      "operator": "=",
                      "left": {
                        "type": "Identifier",
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
                        "name": "fn"
                      },
                      "right": {
                        "type": "ArrowFunctionExpression",
                        "start": 5,
                        "end": 17,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 5
                          },
                          "end": {
                            "line": 1,
                            "column": 17
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": true,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "CallExpression",
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
                          "callee": {
                            "type": "Identifier",
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
                            },
                            "name": "test"
                          },
                          "arguments": []
                        }
                      }
                    }
                  }
                ],
                "sourceType": "script"
              });
        });
        
        it('should parse two arrow declaration functions', () => {
            expect(parseScript(`(x=1) => x * x`, {
                ranges: true,
                locations: true,
                raw: true
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
                    "type": "ExpressionStatement",
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
                    "expression": {
                      "type": "ArrowFunctionExpression",
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
                      "id": null,
                      "generator": false,
                      "expression": true,
                      "async": false,
                      "params": [
                        {
                          "type": "AssignmentPattern",
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
                            "name": "x"
                          },
                          "right": {
                            "type": "Literal",
                            "start": 3,
                            "end": 4,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 3
                              },
                              "end": {
                                "line": 1,
                                "column": 4
                              }
                            },
                            "value": 1,
                            "raw": "1"
                          }
                        }
                      ],
                      "body": {
                        "type": "BinaryExpression",
                        "start": 9,
                        "end": 14,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 9
                          },
                          "end": {
                            "line": 1,
                            "column": 14
                          }
                        },
                        "left": {
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
                          "name": "x"
                        },
                        "operator": "*",
                        "right": {
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
                          "name": "x"
                        }
                      }
                    }
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse two arrow declaration functions', () => {
            expect(parseScript(`() => {}
            () => {}`, {
                ranges: true,
                locations: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 29,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 2,
                    "column": 20
                  }
                },
                "body": [
                  {
                    "type": "ExpressionStatement",
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
                    "expression": {
                      "type": "ArrowFunctionExpression",
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
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [],
                      "body": {
                        "type": "BlockStatement",
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
                        "body": []
                      }
                    }
                  },
                  {
                    "type": "ExpressionStatement",
                    "start": 21,
                    "end": 29,
                    "loc": {
                      "start": {
                        "line": 2,
                        "column": 12
                      },
                      "end": {
                        "line": 2,
                        "column": 20
                      }
                    },
                    "expression": {
                      "type": "ArrowFunctionExpression",
                      "start": 21,
                      "end": 29,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 12
                        },
                        "end": {
                          "line": 2,
                          "column": 20
                        }
                      },
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [],
                      "body": {
                        "type": "BlockStatement",
                        "start": 27,
                        "end": 29,
                        "loc": {
                          "start": {
                            "line": 2,
                            "column": 18
                          },
                          "end": {
                            "line": 2,
                            "column": 20
                          }
                        },
                        "body": []
                      }
                    }
                  }
                ],
                "sourceType": "script"
              });
        });
    });
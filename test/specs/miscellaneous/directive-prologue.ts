import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Miscellaneous - Directive prologue', () => {

    it('should fail if Use Strict Directive Prologue is "use strict";', () => {
        expect(() => {
            parseScript(`"use strict"; var public = 1;`);
        }).to.throw();
    });

    it('should fail on a Use Strict Directive followed by a strict mode', () => {
        expect(() => {
            parseScript(`"use strict"; eval = 42;`);
        }).to.throw();
    });

    it('should fail on a Use Strict Directive followed by a strict mode wrapped in parenthesis', () => {
        expect(() => {
            parseScript(`("use strict";) eval = 42;`);
        }).to.throw();
    });

    it('should parse if Use Strict Directive Prologue contain a EscapeSequence', () => {
        expect(parseScript('"use\\u0020strict"; eval = 42;', {
            locations: true,
            raw: true,
            ranges: true,
            directives: true
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
                "directive": "use\\u0020strict",
                "expression": {
                  "type": "Literal",
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
                  "value": "use strict",
                  "raw": "\"use\\u0020strict\""
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 19,
                "end": 29,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 19
                  },
                  "end": {
                    "line": 1,
                    "column": 29
                  }
                },
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 19,
                  "end": 28,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 19
                    },
                    "end": {
                      "line": 1,
                      "column": 28
                    }
                  },
                  "operator": "=",
                  "left": {
                    "type": "Identifier",
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
                    },
                    "name": "eval"
                  },
                  "right": {
                    "type": "Literal",
                    "start": 26,
                    "end": 28,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 26
                      },
                      "end": {
                        "line": 1,
                        "column": 28
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

    it('should parse if Use Strict Directive Prologue is wrapped inside parenthesis', () => {
        expect(parseScript('("use strict"); eval = 42;', {
            locations: true,
            raw: true,
            ranges: true,
            directives: true
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
                  "type": "Literal",
                  "start": 1,
                  "end": 13,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 13
                    }
                  },
                  "value": "use strict",
                  "raw": "\"use strict\""
                }
              },
              {
                "type": "ExpressionStatement",
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
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 16,
                  "end": 25,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 16
                    },
                    "end": {
                      "line": 1,
                      "column": 25
                    }
                  },
                  "operator": "=",
                  "left": {
                    "type": "Identifier",
                    "start": 16,
                    "end": 20,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 16
                      },
                      "end": {
                        "line": 1,
                        "column": 20
                      }
                    },
                    "name": "eval"
                  },
                  "right": {
                    "type": "Literal",
                    "start": 23,
                    "end": 25,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 23
                      },
                      "end": {
                        "line": 1,
                        "column": 25
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

    it('should parse if Use Strict Directive Prologue is "USE STRICT"', () => {
        expect(parseScript('"USE STRICT";  var public = 1;', {
            locations: false,
            raw: true,
            ranges: true,
            directives: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 30,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 13,
                "directive": "USE STRICT",
                "expression": {
                  "type": "Literal",
                  "start": 0,
                  "end": 12,
                  "value": "USE STRICT",
                  "raw": "\"USE STRICT\""
                }
              },
              {
                "type": "VariableDeclaration",
                "start": 15,
                "end": 30,
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 19,
                    "end": 29,
                    "id": {
                      "type": "Identifier",
                      "start": 19,
                      "end": 25,
                      "name": "public"
                    },
                    "init": {
                      "type": "Literal",
                      "start": 28,
                      "end": 29,
                      "value": 1,
                      "raw": "1"
                    }
                  }
                ],
                "kind": "var"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "scans a single "use\\x20strict"""', () => {
        expect(parseScript('"use\\x20strict"', {
            locations: false,
            raw: true,
            directives: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "Literal",
                        "value": "use strict",
                        "raw": "\"use\\x20strict\"",
                    },
                    "directive": "use\\x20strict",
                }
            ],
            "sourceType": "script",
        });
    });

    it('should parse "use asm" + semi + "use strict"', () => {
        expect(parseModule('"use strict"; 1', {
            raw: true,
            directives: true
        })).to.eql({
            "type": "Program",
            "body": [
              {
                "type": "ExpressionStatement",
                "expression": {
                  "type": "Literal",
                  "value": "use strict",
                  "raw": "\"use strict\"",
                },
                "directive": "use strict",
              },
              {
                "type": "ExpressionStatement",
                "expression": {
                  "type": "Literal",
                  "value": 1,
                  "raw": "1",
                },
              }
            ],
            "sourceType": "module",
          });
    });

    it('should parse "use asm" + semi + "use strict"', () => {
        expect(parseScript('"use asm"; "use strict"', {
            locations: true,
            raw: true,
            directives: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "Literal",
                        "value": "use asm",
                        "raw": "\"use asm\"",
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
                    "directive": "use asm",
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 10
                        }
                    }
                },
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "Literal",
                        "value": "use strict",
                        "raw": "\"use strict\"",
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 11
                            },
                            "end": {
                                "line": 1,
                                "column": 23
                            }
                        }
                    },
                    "directive": "use strict",
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 11
                        },
                        "end": {
                            "line": 1,
                            "column": 23
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
                    "column": 23
                }
            }
        });
    });

    it('should parse "function wrap() { "use asm"; "use strict"; foo }"', () => {
        expect(parseScript('function wrap() { "use asm"; "use strict"; foo }', {
            locations: true,
            raw: true,
            directives: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "wrap",
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 9
                            },
                            "end": {
                                "line": 1,
                                "column": 13
                            }
                        }
                    },
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "Literal",
                                    "value": "use asm",
                                    "raw": "\"use asm\"",
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 18
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 27
                                        }
                                    }
                                },
                                "directive": "use asm",
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 18
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 28
                                    }
                                }
                            },
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "Literal",
                                    "value": "use strict",
                                    "raw": "\"use strict\"",
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 29
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 41
                                        }
                                    }
                                },
                                "directive": "use strict",
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 29
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 42
                                    }
                                }
                            },
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "Identifier",
                                    "name": "foo",
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 43
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 46
                                        }
                                    }
                                },
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 43
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 46
                                    }
                                }
                            }
                        ],
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 16
                            },
                            "end": {
                                "line": 1,
                                "column": 48
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
                            "column": 48
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
                    "column": 48
                }
            }
        });
    });
    it('should parse "function wrap() { "use asm"; "use strict"; foo }"', () => {
        expect(parseScript('function wrap() { "use asm"; "use strict"; foo }', {
            locations: true,
            raw: true,
            directives: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "wrap",
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 9
                            },
                            "end": {
                                "line": 1,
                                "column": 13
                            }
                        }
                    },
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "Literal",
                                    "value": "use asm",
                                    "raw": "\"use asm\"",
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 18
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 27
                                        }
                                    }
                                },
                                "directive": "use asm",
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 18
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 28
                                    }
                                }
                            },
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "Literal",
                                    "value": "use strict",
                                    "raw": "\"use strict\"",
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 29
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 41
                                        }
                                    }
                                },
                                "directive": "use strict",
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 29
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 42
                                    }
                                }
                            },
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "Identifier",
                                    "name": "foo",
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 43
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 46
                                        }
                                    }
                                },
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 43
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 46
                                    }
                                }
                            }
                        ],
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 16
                            },
                            "end": {
                                "line": 1,
                                "column": 48
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
                            "column": 48
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
                    "column": 48
                }
            }
        });
    });

    it('should parse one string after other expressions', () => {
        expect(parseScript('"use asm"; foo; "use strict";', {
            locations: true,
            raw: true,
            directives: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "Literal",
                        "value": "use asm",
                        "raw": "\"use asm\"",
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
                    "directive": "use asm",
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 10
                        }
                    }
                },
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "Identifier",
                        "name": "foo",
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 11
                            },
                            "end": {
                                "line": 1,
                                "column": 14
                            }
                        }
                    },
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
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "Literal",
                        "value": "use strict",
                        "raw": "\"use strict\"",
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 16
                            },
                            "end": {
                                "line": 1,
                                "column": 28
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
                            "column": 29
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
                    "column": 29
                }
            }
        });
    });

    it('should parse use strict in the body of a function', () => {
        expect(parseScript('function wrap() { "use asm"; foo; "use strict" }', {
            locations: true,
            raw: true,
            directives: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "wrap",
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 9
                            },
                            "end": {
                                "line": 1,
                                "column": 13
                            }
                        }
                    },
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "Literal",
                                    "value": "use asm",
                                    "raw": "\"use asm\"",
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 18
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 27
                                        }
                                    }
                                },
                                "directive": "use asm",
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 18
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 28
                                    }
                                }
                            },
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "Identifier",
                                    "name": "foo",
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 29
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 32
                                        }
                                    }
                                },
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
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "Literal",
                                    "value": "use strict",
                                    "raw": "\"use strict\"",
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 34
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 46
                                        }
                                    }
                                },
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 34
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 46
                                    }
                                }
                            }
                        ],
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 16
                            },
                            "end": {
                                "line": 1,
                                "column": 48
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
                            "column": 48
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
                    "column": 48
                }
            }
        });
    });

    it('should parse one string in a block', () => {
        expect(parseScript('{ "use strict"; }', {
            locations: true,
            raw: true,
            directives: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "BlockStatement",
                    "body": [
                        {
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "Literal",
                                "value": "use strict",
                                "raw": "\"use strict\"",
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 2
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 14
                                    }
                                }
                            },
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 2
                                },
                                "end": {
                                    "line": 1,
                                    "column": 15
                                }
                            }
                        }
                    ],
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 17
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
                    "column": 17
                }
            }
        });
    });

    it('should parse one string with parentheses.', () => {
        expect(parseScript('function wrap() { ( "use strict"); foo }', {
            locations: true,
            raw: true,
            directives: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "wrap",
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 9
                            },
                            "end": {
                                "line": 1,
                                "column": 13
                            }
                        }
                    },
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "Literal",
                                    "value": "use strict",
                                    "raw": "\"use strict\"",
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 20
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 32
                                        }
                                    }
                                },
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 18
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 34
                                    }
                                }
                            },
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "Identifier",
                                    "name": "foo",
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 35
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 38
                                        }
                                    }
                                },
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 35
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 38
                                    }
                                }
                            }
                        ],
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 16
                            },
                            "end": {
                                "line": 1,
                                "column": 40
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
                            "column": 40
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
                    "column": 40
                }
            }
        });
    });

    it('should parse function in a default parameter"', () => {
        expect(parseScript('function a() { "use strict" } "use strict"; foo', {
            locations: true,
            raw: true,
            directives: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "a",
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 9
                            },
                            "end": {
                                "line": 1,
                                "column": 10
                            }
                        }
                    },
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "Literal",
                                    "value": "use strict",
                                    "raw": "\"use strict\"",
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 15
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 27
                                        }
                                    }
                                },
                                "directive": "use strict",
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 15
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 27
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
                                "column": 29
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
                            "column": 29
                        }
                    }
                },
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "Literal",
                        "value": "use strict",
                        "raw": "\"use strict\"",
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 30
                            },
                            "end": {
                                "line": 1,
                                "column": 42
                            }
                        }
                    },
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 30
                        },
                        "end": {
                            "line": 1,
                            "column": 43
                        }
                    }
                },
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "Identifier",
                        "name": "foo",
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 44
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
                            "column": 44
                        },
                        "end": {
                            "line": 1,
                            "column": 47
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
                    "column": 47
                }
            }
        });
    });
});
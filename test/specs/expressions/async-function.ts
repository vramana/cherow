import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Expressions - Async function', () => {

    it('should fail on invalid yield default', () => {
        expect(() => {
            parseScript(`function* wrap() {
          async(a = yield b) => a
        };`);
        }).to.not.throw()
    });


    it('should fail on invalid nested async', () => {
        expect(() => {
            parseScript(`async function wrap() {
        async function await() { }
      };`);
        }).to.throw()
    });

    it('should fail on invalid await param', () => {
        expect(() => {
            parseScript(`async function foo(await) { };`);
        }).to.throw()
    });

    it('should fail on invalid await param expression', () => {
        expect(() => {
            parseScript(`(async function foo(await) { });`);
        }).to.throw()
    });

    it('should fail on invalid await name destructed', () => {
        expect(() => {
            parseScript(`async ({a: await}) => 1;`);
        }).to.not.throw()
    });

    it('should fail on invalid await function expression', () => {
        expect(() => {
            parseScript(`(async function await() { });`);
        }).to.not.throw()
    });
  
    it('should parse await identifier math', () => {
        expect(parseScript(`async function foo() { await + 1 };`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
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
            "body": [{
                    "type": "FunctionDeclaration",
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
                    "id": {
                        "type": "Identifier",
                        "start": 15,
                        "end": 18,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 15
                            },
                            "end": {
                                "line": 1,
                                "column": 18
                            }
                        },
                        "name": "foo"
                    },
                    "generator": false,
                    "expression": false,
                    "async": true,
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "start": 21,
                        "end": 34,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 21
                            },
                            "end": {
                                "line": 1,
                                "column": 34
                            }
                        },
                        "body": [{
                            "type": "ExpressionStatement",
                            "start": 23,
                            "end": 32,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 23
                                },
                                "end": {
                                    "line": 1,
                                    "column": 32
                                }
                            },
                            "expression": {
                                "type": "AwaitExpression",
                                "start": 23,
                                "end": 32,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 23
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 32
                                    }
                                },
                                "argument": {
                                    "type": "UnaryExpression",
                                    "start": 29,
                                    "end": 32,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 29
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 32
                                        }
                                    },
                                    "operator": "+",
                                    "prefix": true,
                                    "argument": {
                                        "type": "Literal",
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
                                        "value": 1,
                                        "raw": "1"
                                    }
                                }
                            }
                        }]
                    }
                },
                {
                    "type": "EmptyStatement",
                    "start": 34,
                    "end": 35,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 34
                        },
                        "end": {
                            "line": 1,
                            "column": 35
                        }
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse async await inside parens', () => {
        expect(parseScript(`async function wrap() {
      (a = await b)
  };`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 48,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 3,
                    "column": 4
                }
            },
            "body": [{
                    "type": "FunctionDeclaration",
                    "start": 0,
                    "end": 47,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 3,
                            "column": 3
                        }
                    },
                    "id": {
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
                        "name": "wrap"
                    },
                    "generator": false,
                    "expression": false,
                    "async": true,
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "start": 22,
                        "end": 47,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 22
                            },
                            "end": {
                                "line": 3,
                                "column": 3
                            }
                        },
                        "body": [{
                            "type": "ExpressionStatement",
                            "start": 30,
                            "end": 43,
                            "loc": {
                                "start": {
                                    "line": 2,
                                    "column": 6
                                },
                                "end": {
                                    "line": 2,
                                    "column": 19
                                }
                            },
                            "expression": {
                                "type": "AssignmentExpression",
                                "start": 31,
                                "end": 42,
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 7
                                    },
                                    "end": {
                                        "line": 2,
                                        "column": 18
                                    }
                                },
                                "operator": "=",
                                "left": {
                                    "type": "Identifier",
                                    "start": 31,
                                    "end": 32,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 7
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 8
                                        }
                                    },
                                    "name": "a"
                                },
                                "right": {
                                    "type": "AwaitExpression",
                                    "start": 35,
                                    "end": 42,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 11
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 18
                                        }
                                    },
                                    "argument": {
                                        "type": "Identifier",
                                        "start": 41,
                                        "end": 42,
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 17
                                            },
                                            "end": {
                                                "line": 2,
                                                "column": 18
                                            }
                                        },
                                        "name": "b"
                                    }
                                }
                            }
                        }]
                    }
                },
                {
                    "type": "EmptyStatement",
                    "start": 47,
                    "end": 48,
                    "loc": {
                        "start": {
                            "line": 3,
                            "column": 3
                        },
                        "end": {
                            "line": 3,
                            "column": 4
                        }
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse argument async function expression', () => {
        expect(parseScript(`f(async function(x) { await x })`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 32,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 32
                }
            },
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 32,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 32
                    }
                },
                "expression": {
                    "type": "CallExpression",
                    "start": 0,
                    "end": 32,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 32
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
                        "name": "f"
                    },
                    "arguments": [{
                        "type": "FunctionExpression",
                        "start": 2,
                        "end": 31,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 2
                            },
                            "end": {
                                "line": 1,
                                "column": 31
                            }
                        },
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": true,
                        "params": [{
                            "type": "Identifier",
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
                            "name": "x"
                        }],
                        "body": {
                            "type": "BlockStatement",
                            "start": 20,
                            "end": 31,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 20
                                },
                                "end": {
                                    "line": 1,
                                    "column": 31
                                }
                            },
                            "body": [{
                                "type": "ExpressionStatement",
                                "start": 22,
                                "end": 29,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 22
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 29
                                    }
                                },
                                "expression": {
                                    "type": "AwaitExpression",
                                    "start": 22,
                                    "end": 29,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 22
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 29
                                        }
                                    },
                                    "argument": {
                                        "type": "Identifier",
                                        "start": 28,
                                        "end": 29,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 28
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 29
                                            }
                                        },
                                        "name": "x"
                                    }
                                }
                            }]
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse async function declaration await', () => {
        expect(parseScript(`async function f(a) { await a }`, {
            ranges: true,
            raw: true,
            locations: true
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
                "type": "FunctionDeclaration",
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
                "id": {
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
                    "name": "f"
                },
                "generator": false,
                "expression": false,
                "async": true,
                "params": [{
                    "type": "Identifier",
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
                    "name": "a"
                }],
                "body": {
                    "type": "BlockStatement",
                    "start": 20,
                    "end": 31,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 20
                        },
                        "end": {
                            "line": 1,
                            "column": 31
                        }
                    },
                    "body": [{
                        "type": "ExpressionStatement",
                        "start": 22,
                        "end": 29,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 22
                            },
                            "end": {
                                "line": 1,
                                "column": 29
                            }
                        },
                        "expression": {
                            "type": "AwaitExpression",
                            "start": 22,
                            "end": 29,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 22
                                },
                                "end": {
                                    "line": 1,
                                    "column": 29
                                }
                            },
                            "argument": {
                                "type": "Identifier",
                                "start": 28,
                                "end": 29,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 28
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 29
                                    }
                                },
                                "name": "a"
                            }
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse async function declaration', () => {
        expect(parseScript(`async function f() {}`, {
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
            "body": [{
                "type": "FunctionDeclaration",
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
                "id": {
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
                    "name": "f"
                },
                "generator": false,
                "expression": false,
                "async": true,
                "params": [],
                "body": {
                    "type": "BlockStatement",
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
                    "body": []
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse async function expression as parameter', () => {
        expect(parseScript(`f(b, async function(b) { await b }, c)`, {
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
                    "type": "CallExpression",
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
                        "name": "f"
                    },
                    "arguments": [{
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
                        {
                            "type": "FunctionExpression",
                            "start": 5,
                            "end": 34,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 5
                                },
                                "end": {
                                    "line": 1,
                                    "column": 34
                                }
                            },
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": true,
                            "params": [{
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
                                "name": "b"
                            }],
                            "body": {
                                "type": "BlockStatement",
                                "start": 23,
                                "end": 34,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 23
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 34
                                    }
                                },
                                "body": [{
                                    "type": "ExpressionStatement",
                                    "start": 25,
                                    "end": 32,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 25
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 32
                                        }
                                    },
                                    "expression": {
                                        "type": "AwaitExpression",
                                        "start": 25,
                                        "end": 32,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 25
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 32
                                            }
                                        },
                                        "argument": {
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
                                            "name": "b"
                                        }
                                    }
                                }]
                            }
                        },
                        {
                            "type": "Identifier",
                            "start": 36,
                            "end": 37,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 36
                                },
                                "end": {
                                    "line": 1,
                                    "column": 37
                                }
                            },
                            "name": "c"
                        }
                    ]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse async function expression await', () => {
        expect(parseScript(`x = async function(a) { await a }`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 33,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 33
                }
            },
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 33,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 33
                    }
                },
                "expression": {
                    "type": "AssignmentExpression",
                    "start": 0,
                    "end": 33,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 33
                        }
                    },
                    "operator": "=",
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
                    "right": {
                        "type": "FunctionExpression",
                        "start": 4,
                        "end": 33,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 4
                            },
                            "end": {
                                "line": 1,
                                "column": 33
                            }
                        },
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": true,
                        "params": [{
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
                            "name": "a"
                        }],
                        "body": {
                            "type": "BlockStatement",
                            "start": 22,
                            "end": 33,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 22
                                },
                                "end": {
                                    "line": 1,
                                    "column": 33
                                }
                            },
                            "body": [{
                                "type": "ExpressionStatement",
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
                                "expression": {
                                    "type": "AwaitExpression",
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
                                    "argument": {
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
                                        "name": "a"
                                    }
                                }
                            }]
                        }
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse async function expression named await', () => {
        expect(parseScript(`x = async function f(a) { await a }`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
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
            "body": [{
                "type": "ExpressionStatement",
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
                "expression": {
                    "type": "AssignmentExpression",
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
                    "operator": "=",
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
                    "right": {
                        "type": "FunctionExpression",
                        "start": 4,
                        "end": 35,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 4
                            },
                            "end": {
                                "line": 1,
                                "column": 35
                            }
                        },
                        "id": {
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
                            "name": "f"
                        },
                        "generator": false,
                        "expression": false,
                        "async": true,
                        "params": [{
                            "type": "Identifier",
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
                            "name": "a"
                        }],
                        "body": {
                            "type": "BlockStatement",
                            "start": 24,
                            "end": 35,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 24
                                },
                                "end": {
                                    "line": 1,
                                    "column": 35
                                }
                            },
                            "body": [{
                                "type": "ExpressionStatement",
                                "start": 26,
                                "end": 33,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 26
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 33
                                    }
                                },
                                "expression": {
                                    "type": "AwaitExpression",
                                    "start": 26,
                                    "end": 33,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 26
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 33
                                        }
                                    },
                                    "argument": {
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
                                        "name": "a"
                                    }
                                }
                            }]
                        }
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse async function expression named', () => {
        expect(parseScript(`a = async function f() {}`, {
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
            "body": [{
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
                    "type": "AssignmentExpression",
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
                    "operator": "=",
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
                    "right": {
                        "type": "FunctionExpression",
                        "start": 4,
                        "end": 25,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 4
                            },
                            "end": {
                                "line": 1,
                                "column": 25
                            }
                        },
                        "id": {
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
                            "name": "f"
                        },
                        "generator": false,
                        "expression": false,
                        "async": true,
                        "params": [],
                        "body": {
                            "type": "BlockStatement",
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
                            "body": []
                        }
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse async function expression', () => {
        expect(parseScript(`a = async function() {}`, {
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
            "body": [{
                "type": "ExpressionStatement",
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
                "expression": {
                    "type": "AssignmentExpression",
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
                    "operator": "=",
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
                    "right": {
                        "type": "FunctionExpression",
                        "start": 4,
                        "end": 23,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 4
                            },
                            "end": {
                                "line": 1,
                                "column": 23
                            }
                        },
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": true,
                        "params": [],
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
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse inner function async', () => {
        expect(parseScript(`(function(x) { async function inner() { await x } })`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 52,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 52
                }
            },
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 52,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 52
                    }
                },
                "expression": {
                    "type": "FunctionExpression",
                    "start": 1,
                    "end": 51,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 1
                        },
                        "end": {
                            "line": 1,
                            "column": 51
                        }
                    },
                    "id": null,
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [{
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
                        "name": "x"
                    }],
                    "body": {
                        "type": "BlockStatement",
                        "start": 13,
                        "end": 51,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 13
                            },
                            "end": {
                                "line": 1,
                                "column": 51
                            }
                        },
                        "body": [{
                            "type": "FunctionDeclaration",
                            "start": 15,
                            "end": 49,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 15
                                },
                                "end": {
                                    "line": 1,
                                    "column": 49
                                }
                            },
                            "id": {
                                "type": "Identifier",
                                "start": 30,
                                "end": 35,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 30
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 35
                                    }
                                },
                                "name": "inner"
                            },
                            "generator": false,
                            "expression": false,
                            "async": true,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "start": 38,
                                "end": 49,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 38
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 49
                                    }
                                },
                                "body": [{
                                    "type": "ExpressionStatement",
                                    "start": 40,
                                    "end": 47,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 40
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 47
                                        }
                                    },
                                    "expression": {
                                        "type": "AwaitExpression",
                                        "start": 40,
                                        "end": 47,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 40
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 47
                                            }
                                        },
                                        "argument": {
                                            "type": "Identifier",
                                            "start": 46,
                                            "end": 47,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 46
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 47
                                                }
                                            },
                                            "name": "x"
                                        }
                                    }
                                }]
                            }
                        }]
                    }
                }
            }],
            "sourceType": "script"
        });
    });
});
import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Expressions - Await', () => {

    it('should fail on await expression outside of async function', () => {
        expect(() => {
            parseScript(`await a`);
        }).to.throw()
    });

    it('should fail on await without arguments', () => {
        expect(() => {
            parseScript(`async () => await`);
        }).to.throw();
    });

    it('should fail on await expression in default parameters', () => {
        expect(() => {
            parseScript(`async (a = await b) => {}`);
        }).to.throw()
    });


    it('should fail on invalid plain await (module code)', () => {
        expect(() => {
            parseModule(`await;`);
        }).to.throw()
    });


    it('should fail on invalid plain await arrow', () => {
        expect(() => {
            parseScript(`async () => await;`);
        }).to.throw()
    });


    it('should fail on invalid await arrow param', () => {
        expect(() => {
            parseScript(`async await => 1;`);
        }).to.throw()
    });

    it('should fail on invalid await arrow param parens', () => {
        expect(() => {
            parseScript(`async (await) => 1;`);
        }).to.throw()
    });

    it('should fail on invalid await function', () => {
        expect(() => {
            parseScript(`a = async function () { async function await() {} }`);
        }).to.not.throw()
    });

    it('should fail on invalid await identifier', () => {
        expect(() => {
            parseScript(`async function f() { g(await) }`);
        }).to.throw()
    });


    it('should fail on invalid await no arguments', () => {
        expect(() => {
            parseScript(`async function f() { await }`);
        }).to.throw()
    });

    it('should fail on invalid await outside async', () => {
        expect(() => {
            parseScript(`function f(x) { await x }`);
        }).to.throw()
    });

    it('should fail on invalid await property', () => {
        expect(() => {
            parseScript(`async f() { x = { async await(){} } }`);
        }).to.throw()
    });

    it('should parse async await arrow param', () => {
        expect(parseScript(`async function foo(a = async () => await b) {};`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 47,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 47
                }
            },
            "body": [{
                    "type": "FunctionDeclaration",
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
                    "params": [{
                        "type": "AssignmentPattern",
                        "start": 19,
                        "end": 42,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 19
                            },
                            "end": {
                                "line": 1,
                                "column": 42
                            }
                        },
                        "left": {
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
                        },
                        "right": {
                            "type": "ArrowFunctionExpression",
                            "start": 23,
                            "end": 42,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 23
                                },
                                "end": {
                                    "line": 1,
                                    "column": 42
                                }
                            },
                            "id": null,
                            "generator": false,
                            "expression": true,
                            "async": true,
                            "params": [],
                            "body": {
                                "type": "AwaitExpression",
                                "start": 35,
                                "end": 42,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 35
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 42
                                    }
                                },
                                "argument": {
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
                                    "name": "b"
                                }
                            }
                        }
                    }],
                    "body": {
                        "type": "BlockStatement",
                        "start": 44,
                        "end": 46,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 44
                            },
                            "end": {
                                "line": 1,
                                "column": 46
                            }
                        },
                        "body": []
                    }
                },
                {
                    "type": "EmptyStatement",
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
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse call async await', () => {
        expect(parseScript(`a = async(await);`, {
            ranges: true,
            raw: true,
            locations: true
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
                        "type": "CallExpression",
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
                        "callee": {
                            "type": "Identifier",
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
                            "name": "async"
                        },
                        "arguments": [{
                            "type": "Identifier",
                            "start": 10,
                            "end": 15,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 10
                                },
                                "end": {
                                    "line": 1,
                                    "column": 15
                                }
                            },
                            "name": "await"
                        }]
                    }
                }
            }],
            "sourceType": "script"
        });
    });
});
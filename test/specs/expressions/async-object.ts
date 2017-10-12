import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Expressions - Async Object', () => {

    it('should fail on invalid async property', () => {
        expect(() => {
            parseScript(`({async foo: 1});`);
        }).to.throw()
    });

    it('should fail on invalid async object', () => {
        expect(() => {
            parseScript(`async ({a = b});`);
        }).to.not.throw()
    });

    it('should fail on invalid async method return await', () => {
        expect(() => {
            parseScript(`({async foo() { return {await} }});`);
        }).to.throw()
    });

    it('should fail on invalid async method expression', () => {
        expect(() => {
            parseScript(`({async foo() { var await }});`);
        }).to.throw()
    });

    it('should fail on invalid async method empty await', () => {
        expect(() => {
            parseScript(`({async foo() { await }});`);
        }).to.throw()
    });

    it('should fail on invalid async getter method', () => {
        expect(() => {
            parseScript(`({async get foo() { }});`);
        }).to.not.throw()
    });

    it('should fail on invalid async generator method', () => {
        expect(() => {
            parseScript(`({async* foo() { }});`);
        }).to.throw()
    });


    it('should parse async method literal', () => {
        expect(parseScript(`({ async "xyz"() {} })`, {
            ranges: true,
            raw: true,
            locations: true
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
            "body": [{
                "type": "ExpressionStatement",
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
                "expression": {
                    "type": "ObjectExpression",
                    "start": 1,
                    "end": 21,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 1
                        },
                        "end": {
                            "line": 1,
                            "column": 21
                        }
                    },
                    "properties": [{
                        "type": "Property",
                        "start": 3,
                        "end": 19,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 3
                            },
                            "end": {
                                "line": 1,
                                "column": 19
                            }
                        },
                        "method": true,
                        "shorthand": false,
                        "computed": false,
                        "key": {
                            "type": "Literal",
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
                            "value": "xyz",
                            "raw": "\"xyz\""
                        },
                        "kind": "init",
                        "value": {
                            "type": "FunctionExpression",
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
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": true,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "start": 17,
                                "end": 19,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 17
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 19
                                    }
                                },
                                "body": []
                            }
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse async method computed', () => {
        expect(parseScript(`({ async ["xyz"]() {} })`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 24,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 24
                }
            },
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 24,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 24
                    }
                },
                "expression": {
                    "type": "ObjectExpression",
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
                    "properties": [{
                        "type": "Property",
                        "start": 3,
                        "end": 21,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 3
                            },
                            "end": {
                                "line": 1,
                                "column": 21
                            }
                        },
                        "method": true,
                        "shorthand": false,
                        "computed": true,
                        "key": {
                            "type": "Literal",
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
                            "value": "xyz",
                            "raw": "\"xyz\""
                        },
                        "kind": "init",
                        "value": {
                            "type": "FunctionExpression",
                            "start": 16,
                            "end": 21,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 16
                                },
                                "end": {
                                    "line": 1,
                                    "column": 21
                                }
                            },
                            "id": null,
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
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse async method await', () => {
        expect(parseScript(`({ async f(a) { await a } })`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
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
            "body": [{
                "type": "ExpressionStatement",
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
                "expression": {
                    "type": "ObjectExpression",
                    "start": 1,
                    "end": 27,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 1
                        },
                        "end": {
                            "line": 1,
                            "column": 27
                        }
                    },
                    "properties": [{
                        "type": "Property",
                        "start": 3,
                        "end": 25,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 3
                            },
                            "end": {
                                "line": 1,
                                "column": 25
                            }
                        },
                        "method": true,
                        "shorthand": false,
                        "computed": false,
                        "key": {
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
                            "name": "f"
                        },
                        "kind": "init",
                        "value": {
                            "type": "FunctionExpression",
                            "start": 10,
                            "end": 25,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 10
                                },
                                "end": {
                                    "line": 1,
                                    "column": 25
                                }
                            },
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": true,
                            "params": [{
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
                            }],
                            "body": {
                                "type": "BlockStatement",
                                "start": 14,
                                "end": 25,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 14
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 25
                                    }
                                },
                                "body": [{
                                    "type": "ExpressionStatement",
                                    "start": 16,
                                    "end": 23,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 16
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 23
                                        }
                                    },
                                    "expression": {
                                        "type": "AwaitExpression",
                                        "start": 16,
                                        "end": 23,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 16
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 23
                                            }
                                        },
                                        "argument": {
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
                                            "name": "a"
                                        }
                                    }
                                }]
                            }
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });
});
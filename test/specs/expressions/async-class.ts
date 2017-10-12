import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Expressions - Async Class', () => {

        it('should fail on invalid async method await param', () => {
            expect(() => {
                parseScript(`class A {async foo(await) { }};`);
            }).to.throw()
        });

        it('should fail on invalid async constructor', () => {
            expect(() => {
                parseScript(`class A {async constructor() { }};`);
            }).to.throw()
        });

        it('should fail on invalid async class setter', () => {
            expect(() => {
                parseScript(`class A {async set foo(value) { }};`);
            }).to.throw()
        });

        it('should fail on invalid async class method await', () => {
            expect(() => {
                parseScript(`class A {async foo() { return {await} }};`);
            }).to.throw()
        });

        it('should fail on invalid async class method empty await', () => {
            expect(() => {
                parseScript(`(class {async foo() { await }});`);
            }).to.throw()
        });

        it('should fail on invalid async method await identifier', () => {
            expect(() => {
                parseScript(`class A {async foo() { var await }};`);
            }).to.throw()
        });
    
        it('should fail on invalid static async getter', () => {
            expect(() => {
                parseScript(`class A {static async get foo() { }};`);
            }).to.throw()
        });
    
        it('should fail on invalid static async setter', () => {
            expect(() => {
                parseScript(`class A {static async set foo(value) { }};`);
            }).to.throw()
        });
    
        it('should parse async named class method', () => {
            expect(parseScript(`class A {static async() { }};`, {
                ranges: true,
                raw: true,
                locations: true
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
                        "type": "ClassDeclaration",
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
                        "id": {
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
                            "name": "A"
                        },
                        "superClass": null,
                        "body": {
                            "type": "ClassBody",
                            "start": 8,
                            "end": 28,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 8
                                },
                                "end": {
                                    "line": 1,
                                    "column": 28
                                }
                            },
                            "body": [{
                                "type": "MethodDefinition",
                                "start": 9,
                                "end": 27,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 9
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 27
                                    }
                                },
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
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
                                    "name": "async"
                                },
                                "static": true,
                                "kind": "method",
                                "value": {
                                    "type": "FunctionExpression",
                                    "start": 21,
                                    "end": 27,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 21
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 27
                                        }
                                    },
                                    "id": null,
                                    "generator": false,
                                    "expression": false,
                                    "async": false,
                                    "params": [],
                                    "body": {
                                        "type": "BlockStatement",
                                        "start": 24,
                                        "end": 27,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 24
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 27
                                            }
                                        },
                                        "body": []
                                    }
                                }
                            }]
                        }
                    },
                    {
                        "type": "EmptyStatement",
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
                        }
                    }
                ],
                "sourceType": "script"
            });
        });
    
        it('should parse async await class method param', () => {
            expect(parseScript(`async function foo(a = class {async bar() { await b }}) {};`, {
                ranges: true,
                raw: true,
                locations: true
            })).to.eql({
                "type": "Program",
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
                },
                "body": [{
                        "type": "FunctionDeclaration",
                        "start": 0,
                        "end": 58,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 58
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
                            "end": 54,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 19
                                },
                                "end": {
                                    "line": 1,
                                    "column": 54
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
                                "type": "ClassExpression",
                                "start": 23,
                                "end": 54,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 23
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 54
                                    }
                                },
                                "id": null,
                                "superClass": null,
                                "body": {
                                    "type": "ClassBody",
                                    "start": 29,
                                    "end": 54,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 29
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 54
                                        }
                                    },
                                    "body": [{
                                        "type": "MethodDefinition",
                                        "start": 30,
                                        "end": 53,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 30
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 53
                                            }
                                        },
                                        "computed": false,
                                        "key": {
                                            "type": "Identifier",
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
                                            },
                                            "name": "bar"
                                        },
                                        "static": false,
                                        "kind": "method",
                                        "value": {
                                            "type": "FunctionExpression",
                                            "start": 39,
                                            "end": 53,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 39
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 53
                                                }
                                            },
                                            "id": null,
                                            "generator": false,
                                            "expression": false,
                                            "async": true,
                                            "params": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "start": 42,
                                                "end": 53,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 42
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 53
                                                    }
                                                },
                                                "body": [{
                                                    "type": "ExpressionStatement",
                                                    "start": 44,
                                                    "end": 51,
                                                    "loc": {
                                                        "start": {
                                                            "line": 1,
                                                            "column": 44
                                                        },
                                                        "end": {
                                                            "line": 1,
                                                            "column": 51
                                                        }
                                                    },
                                                    "expression": {
                                                        "type": "AwaitExpression",
                                                        "start": 44,
                                                        "end": 51,
                                                        "loc": {
                                                            "start": {
                                                                "line": 1,
                                                                "column": 44
                                                            },
                                                            "end": {
                                                                "line": 1,
                                                                "column": 51
                                                            }
                                                        },
                                                        "argument": {
                                                            "type": "Identifier",
                                                            "start": 50,
                                                            "end": 51,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 1,
                                                                    "column": 50
                                                                },
                                                                "end": {
                                                                    "line": 1,
                                                                    "column": 51
                                                                }
                                                            },
                                                            "name": "b"
                                                        }
                                                    }
                                                }]
                                            }
                                        }
                                    }]
                                }
                            }
                        }],
                        "body": {
                            "type": "BlockStatement",
                            "start": 56,
                            "end": 58,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 56
                                },
                                "end": {
                                    "line": 1,
                                    "column": 58
                                }
                            },
                            "body": []
                        }
                    },
                    {
                        "type": "EmptyStatement",
                        "start": 58,
                        "end": 59,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 58
                            },
                            "end": {
                                "line": 1,
                                "column": 59
                            }
                        }
                    }
                ],
                "sourceType": "script"
            });
        });
    
        it('should parse async await class expression method', () => {
            expect(parseScript(`(class {async foo(a) { await a }});`, {
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
                        "type": "ClassExpression",
                        "start": 1,
                        "end": 33,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 1
                            },
                            "end": {
                                "line": 1,
                                "column": 33
                            }
                        },
                        "id": null,
                        "superClass": null,
                        "body": {
                            "type": "ClassBody",
                            "start": 7,
                            "end": 33,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 7
                                },
                                "end": {
                                    "line": 1,
                                    "column": 33
                                }
                            },
                            "body": [{
                                "type": "MethodDefinition",
                                "start": 8,
                                "end": 32,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 8
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 32
                                    }
                                },
                                "computed": false,
                                "key": {
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
                                "static": false,
                                "kind": "method",
                                "value": {
                                    "type": "FunctionExpression",
                                    "start": 17,
                                    "end": 32,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 17
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 32
                                        }
                                    },
                                    "id": null,
                                    "generator": false,
                                    "expression": false,
                                    "async": true,
                                    "params": [{
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
                                        "name": "a"
                                    }],
                                    "body": {
                                        "type": "BlockStatement",
                                        "start": 21,
                                        "end": 32,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 21
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 32
                                            }
                                        },
                                        "body": [{
                                            "type": "ExpressionStatement",
                                            "start": 23,
                                            "end": 30,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 23
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 30
                                                }
                                            },
                                            "expression": {
                                                "type": "AwaitExpression",
                                                "start": 23,
                                                "end": 30,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 23
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 30
                                                    }
                                                },
                                                "argument": {
                                                    "type": "Identifier",
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
                                                    "name": "a"
                                                }
                                            }
                                        }]
                                    }
                                }
                            }]
                        }
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse async await class method named', () => {
            expect(parseScript(`class A {async await() { }};`, {
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
                        "type": "ClassDeclaration",
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
                        "id": {
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
                            "name": "A"
                        },
                        "superClass": null,
                        "body": {
                            "type": "ClassBody",
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
                            "body": [{
                                "type": "MethodDefinition",
                                "start": 9,
                                "end": 26,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 9
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 26
                                    }
                                },
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
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
                                    "name": "await"
                                },
                                "static": false,
                                "kind": "method",
                                "value": {
                                    "type": "FunctionExpression",
                                    "start": 20,
                                    "end": 26,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 20
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 26
                                        }
                                    },
                                    "id": null,
                                    "generator": false,
                                    "expression": false,
                                    "async": true,
                                    "params": [],
                                    "body": {
                                        "type": "BlockStatement",
                                        "start": 23,
                                        "end": 26,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 23
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 26
                                            }
                                        },
                                        "body": []
                                    }
                                }
                            }]
                        }
                    },
                    {
                        "type": "EmptyStatement",
                        "start": 27,
                        "end": 28,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 27
                            },
                            "end": {
                                "line": 1,
                                "column": 28
                            }
                        }
                    }
                ],
                "sourceType": "script"
            });
        });
    
        it('should parse async class method ', () => {
            expect(parseScript(`class A {async foo() { }};`, {
                ranges: true,
                raw: true,
                locations: true
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
                        "type": "ClassDeclaration",
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
                        "id": {
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
                            "name": "A"
                        },
                        "superClass": null,
                        "body": {
                            "type": "ClassBody",
                            "start": 8,
                            "end": 25,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 8
                                },
                                "end": {
                                    "line": 1,
                                    "column": 25
                                }
                            },
                            "body": [{
                                "type": "MethodDefinition",
                                "start": 9,
                                "end": 24,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 9
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 24
                                    }
                                },
                                "computed": false,
                                "key": {
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
                                "static": false,
                                "kind": "method",
                                "value": {
                                    "type": "FunctionExpression",
                                    "start": 18,
                                    "end": 24,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 18
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 24
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
                                        },
                                        "body": []
                                    }
                                }
                            }]
                        }
                    },
                    {
                        "type": "EmptyStatement",
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
                        }
                    }
                ],
                "sourceType": "script"
            });
        });
    
        it('should parse async await class method named await', () => {
            expect(parseScript(`class A {static async await() { }};`, {
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
                        "type": "ClassDeclaration",
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
                            "name": "A"
                        },
                        "superClass": null,
                        "body": {
                            "type": "ClassBody",
                            "start": 8,
                            "end": 34,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 8
                                },
                                "end": {
                                    "line": 1,
                                    "column": 34
                                }
                            },
                            "body": [{
                                "type": "MethodDefinition",
                                "start": 9,
                                "end": 33,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 9
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 33
                                    }
                                },
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "start": 22,
                                    "end": 27,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 22
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 27
                                        }
                                    },
                                    "name": "await"
                                },
                                "static": true,
                                "kind": "method",
                                "value": {
                                    "type": "FunctionExpression",
                                    "start": 27,
                                    "end": 33,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 27
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
                                    "params": [],
                                    "body": {
                                        "type": "BlockStatement",
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
                                        },
                                        "body": []
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
    
        it('should parse async static class method', () => {
            expect(parseScript(`class A {static async foo() { }};`, {
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
                        "type": "ClassDeclaration",
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
                        "id": {
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
                            "name": "A"
                        },
                        "superClass": null,
                        "body": {
                            "type": "ClassBody",
                            "start": 8,
                            "end": 32,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 8
                                },
                                "end": {
                                    "line": 1,
                                    "column": 32
                                }
                            },
                            "body": [{
                                "type": "MethodDefinition",
                                "start": 9,
                                "end": 31,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 9
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 31
                                    }
                                },
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "start": 22,
                                    "end": 25,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 22
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 25
                                        }
                                    },
                                    "name": "foo"
                                },
                                "static": true,
                                "kind": "method",
                                "value": {
                                    "type": "FunctionExpression",
                                    "start": 25,
                                    "end": 31,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 25
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
                                    "params": [],
                                    "body": {
                                        "type": "BlockStatement",
                                        "start": 28,
                                        "end": 31,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 28
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 31
                                            }
                                        },
                                        "body": []
                                    }
                                }
                            }]
                        }
                    },
                    {
                        "type": "EmptyStatement",
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
                        }
                    }
                ],
                "sourceType": "script"
            });
        });
    
        it('should parse class async method', () => {
            expect(parseScript(`class X { async f(){} }`, {
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
                    "type": "ClassDeclaration",
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
                    "id": {
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
                        "name": "X"
                    },
                    "superClass": null,
                    "body": {
                        "type": "ClassBody",
                        "start": 8,
                        "end": 23,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 8
                            },
                            "end": {
                                "line": 1,
                                "column": 23
                            }
                        },
                        "body": [{
                            "type": "MethodDefinition",
                            "start": 10,
                            "end": 21,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 10
                                },
                                "end": {
                                    "line": 1,
                                    "column": 21
                                }
                            },
                            "computed": false,
                            "key": {
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
                                "name": "f"
                            },
                            "static": false,
                            "kind": "method",
                            "value": {
                                "type": "FunctionExpression",
                                "start": 17,
                                "end": 21,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 17
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
    
        it('should parse async class static method', () => {
            expect(parseScript(`class X { static async f(){} }`, {
                ranges: true,
                raw: true,
                locations: true
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
                    "type": "ClassDeclaration",
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
                    "id": {
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
                        "name": "X"
                    },
                    "superClass": null,
                    "body": {
                        "type": "ClassBody",
                        "start": 8,
                        "end": 30,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 8
                            },
                            "end": {
                                "line": 1,
                                "column": 30
                            }
                        },
                        "body": [{
                            "type": "MethodDefinition",
                            "start": 10,
                            "end": 28,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 10
                                },
                                "end": {
                                    "line": 1,
                                    "column": 28
                                }
                            },
                            "computed": false,
                            "key": {
                                "type": "Identifier",
                                "start": 23,
                                "end": 24,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 23
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 24
                                    }
                                },
                                "name": "f"
                            },
                            "static": true,
                            "kind": "method",
                            "value": {
                                "type": "FunctionExpression",
                                "start": 24,
                                "end": 28,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 24
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 28
                                    }
                                },
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": true,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
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
                                    "body": []
                                }
                            }
                        }]
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse class async method number', () => {
            expect(parseScript(`class X { async 3(){} }`, {
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
                    "type": "ClassDeclaration",
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
                    "id": {
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
                        "name": "X"
                    },
                    "superClass": null,
                    "body": {
                        "type": "ClassBody",
                        "start": 8,
                        "end": 23,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 8
                            },
                            "end": {
                                "line": 1,
                                "column": 23
                            }
                        },
                        "body": [{
                            "type": "MethodDefinition",
                            "start": 10,
                            "end": 21,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 10
                                },
                                "end": {
                                    "line": 1,
                                    "column": 21
                                }
                            },
                            "computed": false,
                            "key": {
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
                            },
                            "static": false,
                            "kind": "method",
                            "value": {
                                "type": "FunctionExpression",
                                "start": 17,
                                "end": 21,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 17
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
    
        it('should parse async class async method literal', () => {
            expect(parseScript(`class X { async "f"(){} }`, {
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
                    "type": "ClassDeclaration",
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
                    "id": {
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
                        "name": "X"
                    },
                    "superClass": null,
                    "body": {
                        "type": "ClassBody",
                        "start": 8,
                        "end": 25,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 8
                            },
                            "end": {
                                "line": 1,
                                "column": 25
                            }
                        },
                        "body": [{
                            "type": "MethodDefinition",
                            "start": 10,
                            "end": 23,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 10
                                },
                                "end": {
                                    "line": 1,
                                    "column": 23
                                }
                            },
                            "computed": false,
                            "key": {
                                "type": "Literal",
                                "start": 16,
                                "end": 19,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 16
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 19
                                    }
                                },
                                "value": "f",
                                "raw": "\"f\""
                            },
                            "static": false,
                            "kind": "method",
                            "value": {
                                "type": "FunctionExpression",
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
                        }]
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse async class async method await', () => {
            expect(parseScript(`class X { async f(a) { await a } }`, {
                ranges: true,
                raw: true,
                locations: true
            })).to.eql({
                "type": "Program",
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
                "body": [{
                    "type": "ClassDeclaration",
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
                        "name": "X"
                    },
                    "superClass": null,
                    "body": {
                        "type": "ClassBody",
                        "start": 8,
                        "end": 34,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 8
                            },
                            "end": {
                                "line": 1,
                                "column": 34
                            }
                        },
                        "body": [{
                            "type": "MethodDefinition",
                            "start": 10,
                            "end": 32,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 10
                                },
                                "end": {
                                    "line": 1,
                                    "column": 32
                                }
                            },
                            "computed": false,
                            "key": {
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
                                "name": "f"
                            },
                            "static": false,
                            "kind": "method",
                            "value": {
                                "type": "FunctionExpression",
                                "start": 17,
                                "end": 32,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 17
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 32
                                    }
                                },
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": true,
                                "params": [{
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
                                    "name": "a"
                                }],
                                "body": {
                                    "type": "BlockStatement",
                                    "start": 21,
                                    "end": 32,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 21
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 32
                                        }
                                    },
                                    "body": [{
                                        "type": "ExpressionStatement",
                                        "start": 23,
                                        "end": 30,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 23
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 30
                                            }
                                        },
                                        "expression": {
                                            "type": "AwaitExpression",
                                            "start": 23,
                                            "end": 30,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 23
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 30
                                                }
                                            },
                                            "argument": {
                                                "type": "Identifier",
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
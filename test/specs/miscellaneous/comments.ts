import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Miscellaneous - comments', () => {

        it('should fail on arbitrary character sequence before HTMLCloseComment token', () => {
            expect(() => {
                parseScript(`    /*
                */ the comment should not include these characters, regardless of AnnexB extensions -->`);
            }).to.throw();
        });

    it('should fail on unclosed Multi line comment', () => {
        expect(() => {
            parseScript(`/*CHEROW/`);
        }).to.throw();
    });

    it('should fail on nested Multi line comment', () => {
        expect(() => {
            parseScript(`/*
            var
            /* x */
            = 1;
            */`);
        }).to.throw();
    });

    it('should fail if single and Multi line comments are used together', () => {
        expect(() => {
            parseScript(`/* var*/
            x*/`);
        }).to.throw();
    });

    it('should fail if open Multi line comment at the end of Single comment', () => {
        expect(() => {
            parseScript(`// var /* 
            x*/`);
        }).to.throw();
    });

    it('should fail on invalid use of HTML comment in module code', () => {
        expect(() => {
            parseModule(`<!-- HTML comment`);
        }).to.throw();
    });

    it('should fail on invalid use of HTML comment in module code with JSX enabled', () => {
        expect(() => {
            parseModule(`<!-- HTML comment`);
        }).to.throw();
    });

    it('should parse "<!-- HTML comment"', () => {
        expect(parseScript('<!-- HTML comment', {
            ranges: true,
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
            "body": [],
            "sourceType": "script"
        });
    });

    it('should parse ";\n--> HTML comment"', () => {
        expect(parseScript(';\n--> HTML comment', {
            ranges: true
        })).to.eql({
            "body": [{
                "end": 1,
                "start": 0,
                "type": "EmptyStatement"
            }],
            "end": 18,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse a "<!--\n;"', () => {
        expect(parseScript('<!--\n;', {
            ranges: true
        })).to.eql({
            "body": [{
                "end": 6,
                "start": 5,
                "type": "EmptyStatement"
            }],
            "end": 6,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse a single "//\r\nfoo"', () => {
        expect(parseScript('//\rfoo\n', {
            ranges: true
        })).to.eql({
            "body": [{
                "end": 6,
                "expression": {
                    "end": 6,
                    "name": "foo",
                    "start": 3,
                    "type": "Identifier"
                },
                "start": 3,
                "type": "ExpressionStatement"
            }],
            "end": 7,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse a single "//\rfoo\n"', () => {
        expect(parseScript('//\rfoo\n', {
            ranges: true
        })).to.eql({
            "body": [{
                "end": 6,
                "expression": {
                    "end": 6,
                    "name": "foo",
                    "start": 3,
                    "type": "Identifier"
                },
                "start": 3,
                "type": "ExpressionStatement"
            }],
            "end": 7,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse a single "//\nfoo\r\t"', () => {
        expect(parseScript('//\nfoo\r\t', {
            ranges: true
        })).to.eql({
            "body": [{
                "end": 6,
                "expression": {
                    "end": 6,
                    "name": "foo",
                    "start": 3,
                    "type": "Identifier"
                },
                "start": 3,
                "type": "ExpressionStatement"
            }],
            "end": 8,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse a single " /****/"', () => {
        expect(parseScript('/****/', {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 6,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 6
                }
            },
            "body": [],
            "sourceType": "script"
        });
    });

    it('should parse "// line comment"', () => {
        expect(parseScript('// line comment', {
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
            "body": [],
            "sourceType": "script"
        });
    });

    it('should parse a single "var p1;/* block comment 1 */ /* block comment 2 */"', () => {
        expect(parseScript('var p1;/* block comment 1 */ /* block comment 2 */', {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 50,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 50
                }
            },
            "body": [{
                "type": "VariableDeclaration",
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
                "declarations": [{
                    "type": "VariableDeclarator",
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
                        "name": "p1"
                    },
                    "init": null
                }],
                "kind": "var"
            }],
            "sourceType": "script"
        });
    });

    it('should parse a single "42 /*The*/ /*Answer*/"', () => {
        expect(parseScript('42 /*The*/ /*Answer*/', {
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
                    "line": 1,
                    "column": 21
                }
            },
            "body": [{
                "type": "ExpressionStatement",
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
                "expression": {
                    "type": "Literal",
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
                    "value": 42,
                    "raw": "42"
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse a single "use\\x20strict"', () => {
        expect(parseScript(`/* multiline
        comment
        should
        be
        ignored */ 42`, {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 76,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 5,
                    "column": 21
                }
            },
            "body": [{
                "type": "ExpressionStatement",
                "start": 74,
                "end": 76,
                "loc": {
                    "start": {
                        "line": 5,
                        "column": 19
                    },
                    "end": {
                        "line": 5,
                        "column": 21
                    }
                },
                "expression": {
                    "type": "Literal",
                    "start": 74,
                    "end": 76,
                    "loc": {
                        "start": {
                            "line": 5,
                            "column": 19
                        },
                        "end": {
                            "line": 5,
                            "column": 21
                        }
                    },
                    "value": 42,
                    "raw": "42"
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse a single "use\\x20strict"', () => {
        expect(parseScript(`// Hello, world!
        42`, {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 27,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 2,
                    "column": 10
                }
            },
            "body": [{
                "type": "ExpressionStatement",
                "start": 25,
                "end": 27,
                "loc": {
                    "start": {
                        "line": 2,
                        "column": 8
                    },
                    "end": {
                        "line": 2,
                        "column": 10
                    }
                },
                "expression": {
                    "type": "Literal",
                    "start": 25,
                    "end": 27,
                    "loc": {
                        "start": {
                            "line": 2,
                            "column": 8
                        },
                        "end": {
                            "line": 2,
                            "column": 10
                        }
                    },
                    "value": 42,
                    "raw": "42"
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse a single "/**/42"', () => {
        expect(parseScript('/**/42', {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 6,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 6
                }
            },
            "body": [{
                "type": "ExpressionStatement",
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
                "expression": {
                    "type": "Literal",
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
                    "value": 42,
                    "raw": "42"
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse a single "switch (answer) { case 42: bingo() /* perfect */ }"', () => {
        expect(parseScript('switch (answer) { case 42: bingo() /* perfect */ }', {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 50,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 50
                }
            },
            "body": [{
                "type": "SwitchStatement",
                "start": 0,
                "end": 50,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 50
                    }
                },
                "discriminant": {
                    "type": "Identifier",
                    "start": 8,
                    "end": 14,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 8
                        },
                        "end": {
                            "line": 1,
                            "column": 14
                        }
                    },
                    "name": "answer"
                },
                "cases": [{
                    "type": "SwitchCase",
                    "start": 18,
                    "end": 34,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 18
                        },
                        "end": {
                            "line": 1,
                            "column": 34
                        }
                    },
                    "consequent": [{
                        "type": "ExpressionStatement",
                        "start": 27,
                        "end": 34,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 27
                            },
                            "end": {
                                "line": 1,
                                "column": 34
                            }
                        },
                        "expression": {
                            "type": "CallExpression",
                            "start": 27,
                            "end": 34,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 27
                                },
                                "end": {
                                    "line": 1,
                                    "column": 34
                                }
                            },
                            "callee": {
                                "type": "Identifier",
                                "start": 27,
                                "end": 32,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 27
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 32
                                    }
                                },
                                "name": "bingo"
                            },
                            "arguments": []
                        }
                    }],
                    "test": {
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
                }]
            }],
            "sourceType": "script"
        });
    });

    it('should parse a single "/* header */ (function(){ var version = 1; }).call(this)"', () => {
        expect(parseScript('/* header */ (function(){ var version = 1; }).call(this)', {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 56,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 56
                }
            },
            "body": [{
                "type": "ExpressionStatement",
                "start": 13,
                "end": 56,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 13
                    },
                    "end": {
                        "line": 1,
                        "column": 56
                    }
                },
                "expression": {
                    "type": "CallExpression",
                    "start": 13,
                    "end": 56,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 13
                        },
                        "end": {
                            "line": 1,
                            "column": 56
                        }
                    },
                    "callee": {
                        "type": "MemberExpression",
                        "start": 13,
                        "end": 50,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 13
                            },
                            "end": {
                                "line": 1,
                                "column": 50
                            }
                        },
                        "object": {
                            "type": "FunctionExpression",
                            "start": 14,
                            "end": 44,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 14
                                },
                                "end": {
                                    "line": 1,
                                    "column": 44
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
                                "end": 44,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 24
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 44
                                    }
                                },
                                "body": [{
                                    "type": "VariableDeclaration",
                                    "start": 26,
                                    "end": 42,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 26
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 42
                                        }
                                    },
                                    "declarations": [{
                                        "type": "VariableDeclarator",
                                        "start": 30,
                                        "end": 41,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 30
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 41
                                            }
                                        },
                                        "id": {
                                            "type": "Identifier",
                                            "start": 30,
                                            "end": 37,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 30
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 37
                                                }
                                            },
                                            "name": "version"
                                        },
                                        "init": {
                                            "type": "Literal",
                                            "start": 40,
                                            "end": 41,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 40
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 41
                                                }
                                            },
                                            "value": 1,
                                            "raw": "1"
                                        }
                                    }],
                                    "kind": "var"
                                }]
                            }
                        },
                        "property": {
                            "type": "Identifier",
                            "start": 46,
                            "end": 50,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 46
                                },
                                "end": {
                                    "line": 1,
                                    "column": 50
                                }
                            },
                            "name": "call"
                        },
                        "computed": false
                    },
                    "arguments": [{
                        "type": "ThisExpression",
                        "start": 51,
                        "end": 55,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 51
                            },
                            "end": {
                                "line": 1,
                                "column": 55
                            }
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse a single "function x(){ /*esprima*/ return; /*sucks*/}"', () => {
        expect(parseScript('function x(){ /*esprima*/ return; /*sucks*/}', {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 44,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 44
                }
            },
            "body": [{
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 44,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 44
                    }
                },
                "id": {
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
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "start": 12,
                    "end": 44,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 12
                        },
                        "end": {
                            "line": 1,
                            "column": 44
                        }
                    },
                    "body": [{
                        "type": "ReturnStatement",
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
                        "argument": null
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse a while loop with comment in the body', () => {
        expect(parseScript(`while (true) {
            /**
             * comments in empty block
             */
          }`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 97,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 5,
                    "column": 11
                }
            },
            "body": [{
                "type": "WhileStatement",
                "start": 0,
                "end": 97,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 5,
                        "column": 11
                    }
                },
                "test": {
                    "type": "Literal",
                    "start": 7,
                    "end": 11,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 7
                        },
                        "end": {
                            "line": 1,
                            "column": 11
                        }
                    },
                    "value": true,
                    "raw": "true"
                },
                "body": {
                    "type": "BlockStatement",
                    "start": 13,
                    "end": 97,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 13
                        },
                        "end": {
                            "line": 5,
                            "column": 11
                        }
                    },
                    "body": []
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse "(a + /* assignment */b ) * c"', () => {
        expect(parseScript('(a + /* assignment */b ) * c', {
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
                    "type": "BinaryExpression",
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
                    "left": {
                        "type": "BinaryExpression",
                        "start": 1,
                        "end": 22,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 1
                            },
                            "end": {
                                "line": 1,
                                "column": 22
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
                            "name": "a"
                        },
                        "operator": "+",
                        "right": {
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
                            "name": "b"
                        }
                    },
                    "operator": "*",
                    "right": {
                        "type": "Identifier",
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
                        },
                        "name": "c"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "0 /*The*/ /*Answer*/"', () => {
        expect(parseScript('0 /*The*/ /*Answer*/', {
            ranges: true,
            raw: true,
            locations: true
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
                "expression": {
                    "type": "Literal",
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
                    "value": 0,
                    "raw": "0"
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "0 /* The * answer */"', () => {
        expect(parseScript('0 /* The * answer */', {
            ranges: true,
            raw: true,
            locations: true
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
                "expression": {
                    "type": "Literal",
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
                    "value": 0,
                    "raw": "0"
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "/**/0"', () => {
        expect(parseScript('/**/0', {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
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
            "body": [{
                "type": "ExpressionStatement",
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
                "expression": {
                    "type": "Literal",
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
                    "value": 0,
                    "raw": "0"
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "if (x) { // Some comment\ndoThat(); }"', () => {
        expect(parseScript('if (x) { // Some comment\ndoThat(); }', {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "body": [{
                "alternate": null,
                "consequent": {
                    "body": [{
                        "end": 34,
                        "expression": {
                            "arguments": [],
                            "callee": {
                                "end": 31,
                                "loc": {
                                    "end": {
                                        "column": 6,
                                        "line": 2,
                                    },
                                    "start": {
                                        "column": 0,
                                        "line": 2,
                                    }
                                },
                                "name": "doThat",
                                "start": 25,
                                "type": "Identifier",
                            },
                            "end": 33,
                            "loc": {
                                "end": {
                                    "column": 8,
                                    "line": 2,
                                },
                                "start": {
                                    "column": 0,
                                    "line": 2,
                                }
                            },
                            "start": 25,
                            "type": "CallExpression",
                        },
                        "loc": {
                            "end": {
                                "column": 9,
                                "line": 2,
                            },
                            "start": {
                                "column": 0,
                                "line": 2,
                            },
                        },
                        "start": 25,
                        "type": "ExpressionStatement"
                    }, ],
                    "end": 36,
                    "loc": {
                        "end": {
                            "column": 11,
                            "line": 2,
                        },
                        "start": {
                            "column": 7,
                            "line": 1,
                        },
                    },
                    "start": 7,
                    "type": "BlockStatement",
                },
                "end": 36,
                "loc": {
                    "end": {
                        "column": 11,
                        "line": 2,
                    },
                    "start": {
                        "column": 0,
                        "line": 1,
                    }
                },
                "start": 0,
                "test": {
                    "end": 5,
                    "loc": {
                        "end": {
                            "column": 5,
                            "line": 1,
                        },
                        "start": {
                            "column": 4,
                            "line": 1,
                        },
                    },
                    "name": "x",
                    "start": 4,
                    "type": "Identifier",
                },
                "type": "IfStatement"
            }],
            "end": 36,
            "loc": {
                "end": {
                    "column": 11,
                    "line": 2,
                },
                "start": {
                    "column": 0,
                    "line": 1,
                },
            },
            "sourceType": "script",
            "start": 0,
            "type": "Program",
        });
    });

    it('should parse "switch (answer) { case 0: /* perfect */ bingo() }"', () => {
        expect(parseScript('switch (answer) { case 0: /* perfect */ bingo() }', {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 49,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 49
                }
            },
            "body": [{
                "type": "SwitchStatement",
                "start": 0,
                "end": 49,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 49
                    }
                },
                "discriminant": {
                    "type": "Identifier",
                    "start": 8,
                    "end": 14,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 8
                        },
                        "end": {
                            "line": 1,
                            "column": 14
                        }
                    },
                    "name": "answer"
                },
                "cases": [{
                    "type": "SwitchCase",
                    "start": 18,
                    "end": 47,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 18
                        },
                        "end": {
                            "line": 1,
                            "column": 47
                        }
                    },
                    "consequent": [{
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
                            "type": "CallExpression",
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
                            "callee": {
                                "type": "Identifier",
                                "start": 40,
                                "end": 45,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 40
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 45
                                    }
                                },
                                "name": "bingo"
                            },
                            "arguments": []
                        }
                    }],
                    "test": {
                        "type": "Literal",
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
                        "value": 0,
                        "raw": "0"
                    }
                }]
            }],
            "sourceType": "script"
        });
    });

    it('should parse "(function(){ var version = 1; /* sync */ }).call(this)"', () => {
        expect(parseScript('(function(){ var version = 1; /* sync */ }).call(this)', {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 54,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 54
                }
            },
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 54,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 54
                    }
                },
                "expression": {
                    "type": "CallExpression",
                    "start": 0,
                    "end": 54,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 54
                        }
                    },
                    "callee": {
                        "type": "MemberExpression",
                        "start": 0,
                        "end": 48,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 48
                            }
                        },
                        "object": {
                            "type": "FunctionExpression",
                            "start": 1,
                            "end": 42,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 1
                                },
                                "end": {
                                    "line": 1,
                                    "column": 42
                                }
                            },
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "start": 11,
                                "end": 42,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 11
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 42
                                    }
                                },
                                "body": [{
                                    "type": "VariableDeclaration",
                                    "start": 13,
                                    "end": 29,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 13
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 29
                                        }
                                    },
                                    "declarations": [{
                                        "type": "VariableDeclarator",
                                        "start": 17,
                                        "end": 28,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 17
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 28
                                            }
                                        },
                                        "id": {
                                            "type": "Identifier",
                                            "start": 17,
                                            "end": 24,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 17
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 24
                                                }
                                            },
                                            "name": "version"
                                        },
                                        "init": {
                                            "type": "Literal",
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
                                            },
                                            "value": 1,
                                            "raw": "1"
                                        }
                                    }],
                                    "kind": "var"
                                }]
                            }
                        },
                        "property": {
                            "type": "Identifier",
                            "start": 44,
                            "end": 48,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 44
                                },
                                "end": {
                                    "line": 1,
                                    "column": 48
                                }
                            },
                            "name": "call"
                        },
                        "computed": false
                    },
                    "arguments": [{
                        "type": "ThisExpression",
                        "start": 49,
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
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "function f() { /* infinite */ while (true) { } /* bar */ var each; }"', () => {
        expect(parseScript('function f() { /* infinite */ while (true) { } /* bar */ var each; }', {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 68,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 68
                }
            },
            "body": [{
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 68,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 68
                    }
                },
                "id": {
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
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "start": 13,
                    "end": 68,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 13
                        },
                        "end": {
                            "line": 1,
                            "column": 68
                        }
                    },
                    "body": [{
                            "type": "WhileStatement",
                            "start": 30,
                            "end": 46,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 30
                                },
                                "end": {
                                    "line": 1,
                                    "column": 46
                                }
                            },
                            "test": {
                                "type": "Literal",
                                "start": 37,
                                "end": 41,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 37
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 41
                                    }
                                },
                                "value": true,
                                "raw": "true"
                            },
                            "body": {
                                "type": "BlockStatement",
                                "start": 43,
                                "end": 46,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 43
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
                            "type": "VariableDeclaration",
                            "start": 57,
                            "end": 66,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 57
                                },
                                "end": {
                                    "line": 1,
                                    "column": 66
                                }
                            },
                            "declarations": [{
                                "type": "VariableDeclarator",
                                "start": 61,
                                "end": 65,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 61
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 65
                                    }
                                },
                                "id": {
                                    "type": "Identifier",
                                    "start": 61,
                                    "end": 65,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 61
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 65
                                        }
                                    },
                                    "name": "each"
                                },
                                "init": null
                            }],
                            "kind": "var"
                        }
                    ]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "while (i-->0) {}"', () => {
        expect(parseScript('while (i-->0) {}', {
            ranges: true,
            raw: true,
            locations: true
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
                "type": "WhileStatement",
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
                "test": {
                    "type": "BinaryExpression",
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
                    "left": {
                        "type": "UpdateExpression",
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
                        "operator": "--",
                        "prefix": false,
                        "argument": {
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
                            "name": "i"
                        }
                    },
                    "operator": ">",
                    "right": {
                        "type": "Literal",
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
                        "value": 0,
                        "raw": "0"
                    }
                },
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
            }],
            "sourceType": "script"
        });
    });

    it('should parse "var x = 1<!--foo"', () => {
        expect(parseScript('var x = 1<!--foo', {
            ranges: true,
            raw: true,
            locations: true
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
                "type": "VariableDeclaration",
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
                "declarations": [{
                    "type": "VariableDeclarator",
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
                    "id": {
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
                        "name": "x"
                    },
                    "init": {
                        "type": "Literal",
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
                        "value": 1,
                        "raw": "1"
                    }
                }],
                "kind": "var"
            }],
            "sourceType": "script"
        });
    });


    it('should parse "/* not comment*/; i-->0"', () => {
        expect(parseScript('/* not comment*/; i-->0', {
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
                    "type": "EmptyStatement",
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
                    }
                },
                {
                    "type": "ExpressionStatement",
                    "start": 18,
                    "end": 23,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 18
                        },
                        "end": {
                            "line": 1,
                            "column": 23
                        }
                    },
                    "expression": {
                        "type": "BinaryExpression",
                        "start": 18,
                        "end": 23,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 18
                            },
                            "end": {
                                "line": 1,
                                "column": 23
                            }
                        },
                        "left": {
                            "type": "UpdateExpression",
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
                            },
                            "operator": "--",
                            "prefix": false,
                            "argument": {
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
                                "name": "i"
                            }
                        },
                        "operator": ">",
                        "right": {
                            "type": "Literal",
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
                            "value": 0,
                            "raw": "0"
                        }
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "--> comment"', () => {
        expect(parseScript('--> comment', {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
              "body": [],
              "end": 11,
              "loc": {
                "end": {
                  "column": 11,
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

    it('should parse " \n --> comment"', () => {
        expect(parseScript(' \n --> comment', {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
              "body": [],
              "end": 14,
              "loc": {
                "end": {
                  "column": 12,
                  "line": 2,
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

    it('/** @this foo */ function a() {}', () => {
            expect(parseScript('/** @this foo */ function a() {}', {
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
                "body": [
                  {
                    "type": "FunctionDeclaration",
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
                    "id": {
                      "type": "Identifier",
                      "start": 26,
                      "end": 27,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 26
                        },
                        "end": {
                          "line": 1,
                          "column": 27
                        }
                      },
                      "name": "a"
                    },
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [],
                    "body": {
                      "type": "BlockStatement",
                      "start": 30,
                      "end": 32,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 30
                        },
                        "end": {
                          "line": 1,
                          "column": 32
                        }
                      },
                      "body": []
                    }
                  }
                ],
                "sourceType": "script"
              });
    });

    it('/** @this foo */function a() {}', () => {
        expect(parseScript(`function a() {
            return /** @this foo */ function() {
            };
        }`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 88,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 4,
                "column": 9
              }
            },
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 88,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 4,
                    "column": 9
                  }
                },
                "id": {
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
                  "name": "a"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 13,
                  "end": 88,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 13
                    },
                    "end": {
                      "line": 4,
                      "column": 9
                    }
                  },
                  "body": [
                    {
                      "type": "ReturnStatement",
                      "start": 27,
                      "end": 78,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 12
                        },
                        "end": {
                          "line": 3,
                          "column": 14
                        }
                      },
                      "argument": {
                        "type": "FunctionExpression",
                        "start": 51,
                        "end": 77,
                        "loc": {
                          "start": {
                            "line": 2,
                            "column": 36
                          },
                          "end": {
                            "line": 3,
                            "column": 13
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
                          "start": 62,
                          "end": 77,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 47
                            },
                            "end": {
                              "line": 3,
                              "column": 13
                            }
                          },
                          "body": []
                        }
                      }
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('/** @this foo */function a() {}', () => {
        expect(parseScript('/** @this foo */function a() {}', {
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
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 16,
                "end": 31,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 16
                  },
                  "end": {
                    "line": 1,
                    "column": 31
                  }
                },
                "id": {
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
                  "name": "a"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 29,
                  "end": 31,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 29
                    },
                    "end": {
                      "line": 1,
                      "column": 31
                    }
                  },
                  "body": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse " \r --> comment"', () => {
        expect(parseScript(' \r --> comment', {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
              "body": [],
              "end": 14,
              "loc": {
                "end": {
                  "column": 12,
                  "line": 2,
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

    it('should parse "/**/ function a() {function o() {}}"', () => {
        expect(parseScript('/**/ function a() {function o() {}}', {
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
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 5,
                "end": 35,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 5
                  },
                  "end": {
                    "line": 1,
                    "column": 35
                  }
                },
                "id": {
                  "type": "Identifier",
                  "start": 14,
                  "end": 15,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 14
                    },
                    "end": {
                      "line": 1,
                      "column": 15
                    }
                  },
                  "name": "a"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 18,
                  "end": 35,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 18
                    },
                    "end": {
                      "line": 1,
                      "column": 35
                    }
                  },
                  "body": [
                    {
                      "type": "FunctionDeclaration",
                      "start": 19,
                      "end": 34,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 19
                        },
                        "end": {
                          "line": 1,
                          "column": 34
                        }
                      },
                      "id": {
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
                        "name": "o"
                      },
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [],
                      "body": {
                        "type": "BlockStatement",
                        "start": 32,
                        "end": 34,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 32
                          },
                          "end": {
                            "line": 1,
                            "column": 34
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

    it('should parse "/**/ function a() {/**/function o() {}}"', () => {
        expect(parseScript('/**/ function a() {/**/function o() {}}', {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 39,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 39
              }
            },
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 5,
                "end": 39,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 5
                  },
                  "end": {
                    "line": 1,
                    "column": 39
                  }
                },
                "id": {
                  "type": "Identifier",
                  "start": 14,
                  "end": 15,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 14
                    },
                    "end": {
                      "line": 1,
                      "column": 15
                    }
                  },
                  "name": "a"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 18,
                  "end": 39,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 18
                    },
                    "end": {
                      "line": 1,
                      "column": 39
                    }
                  },
                  "body": [
                    {
                      "type": "FunctionDeclaration",
                      "start": 23,
                      "end": 38,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 23
                        },
                        "end": {
                          "line": 1,
                          "column": 38
                        }
                      },
                      "id": {
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
                        "name": "o"
                      },
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [],
                      "body": {
                        "type": "BlockStatement",
                        "start": 36,
                        "end": 38,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 36
                          },
                          "end": {
                            "line": 1,
                            "column": 38
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

});
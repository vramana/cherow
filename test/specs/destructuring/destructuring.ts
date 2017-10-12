import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Destructuring - Destructuring', () => {

    it('should fail on "[0] = 0"', () => {
        expect(() => {
            parseScript('[0] = 0');
        }).to.throw();
    });

    it('should fail on "[x] += 0"', () => {
        expect(() => {
            parseScript('[x] += 0');
        }).to.not.throw();
    });


    it('should fail "[...a, ] = c;"', () => {
        expect(() => {
            parseScript('[...a, ] = c;');
        }).to.not.throw();
    });

    it('should parse "[[x]] = 0"', () => {
        expect(parseScript('[[x]] = 0', {
            ranges: true,
            raw: true,
            locations: true
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
                    "type": "AssignmentExpression",
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
                    "operator": "=",
                    "left": {
                        "type": "ArrayPattern",
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
                        "elements": [{
                            "type": "ArrayPattern",
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
                            "elements": [{
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
                                "name": "x"
                            }]
                        }]
                    },
                    "right": {
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
                        "value": 0,
                        "raw": "0"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse function destructed', () => {
        expect(parseScript(`function a({a}) {}`, {
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
                "type": "FunctionDeclaration",
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
                "params": [{
                    "type": "ObjectPattern",
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
                    "properties": [{
                        "type": "Property",
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
                        "method": false,
                        "shorthand": true,
                        "computed": false,
                        "key": {
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
                            "name": "a"
                        },
                        "kind": "init",
                        "value": {
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
                            "name": "a"
                        }
                    }]
                }],
                "body": {
                    "type": "BlockStatement",
                    "start": 16,
                    "end": 18,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 16
                        },
                        "end": {
                            "line": 1,
                            "column": 18
                        }
                    },
                    "body": []
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse function destructed', () => {
        expect(parseScript(`function a({a} = {a: 1}) {}`, {
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
                    "line": 1,
                    "column": 27
                }
            },
            "body": [{
                "type": "FunctionDeclaration",
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
                "params": [{
                    "type": "AssignmentPattern",
                    "start": 11,
                    "end": 23,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 11
                        },
                        "end": {
                            "line": 1,
                            "column": 23
                        }
                    },
                    "left": {
                        "type": "ObjectPattern",
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
                        "properties": [{
                            "type": "Property",
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
                            "method": false,
                            "shorthand": true,
                            "computed": false,
                            "key": {
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
                                "name": "a"
                            },
                            "kind": "init",
                            "value": {
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
                                "name": "a"
                            }
                        }]
                    },
                    "right": {
                        "type": "ObjectExpression",
                        "start": 17,
                        "end": 23,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 17
                            },
                            "end": {
                                "line": 1,
                                "column": 23
                            }
                        },
                        "properties": [{
                            "type": "Property",
                            "start": 18,
                            "end": 22,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 18
                                },
                                "end": {
                                    "line": 1,
                                    "column": 22
                                }
                            },
                            "method": false,
                            "shorthand": false,
                            "computed": false,
                            "key": {
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
                            },
                            "value": {
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
                                "value": 1,
                                "raw": "1"
                            },
                            "kind": "init"
                        }]
                    }
                }],
                "body": {
                    "type": "BlockStatement",
                    "start": 25,
                    "end": 27,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 25
                        },
                        "end": {
                            "line": 1,
                            "column": 27
                        }
                    },
                    "body": []
                }
            }],
            "sourceType": "script"
        });
    });
});
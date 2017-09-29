import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Next - BigInt', () => {

    it('should fail on invalid exponent part', () => {
        expect(() => {
            parseScript('0e0n;', {
                next: true
            });
        }).to.throw();
    });

    it('should fail on invalid hexadecimal digit', () => {
        expect(() => {
            parseScript('0xgn;', {
                next: true
            });
        }).to.throw('Expected number in radix');
    });

    it('should fail if the MV is not an integer', () => {
        expect(() => {
            parseScript('2017.8n;', {
                next: true
            });
        }).to.throw();
    });

    it('should fail if binary contain an invalid digit', () => {
        expect(() => {
            parseScript('0b2n;', {
                next: true
            });
        }).to.throw();
    });

    it('should fail if octal contain an invalid digit', () => {
        expect(() => {
            parseScript('0o9n;', {
                next: true
            });
        }).to.throw();
    });

    it('should fail if if the MV is not an integer (dot decimalDigits)', () => {
        expect(() => {
            parseScript('.0000000001n;', {
                next: true
            });
        }).to.throw();
    });

    it('should parse negative number', () => {
        expect(parseScript(`-1n`, {
            raw: true,
            next: true,
            ranges: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "UnaryExpression",
                        "operator": "-",
                        "argument": {
                            "type": "Literal",
                            "value": 1,
                            "bigint": "1",
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
                            "raw": "1"
                        },
                        "prefix": true,
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
            "end": 3,
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

    it('should parse binary', () => {
        expect(parseScript(`0b101011101n`, {
            raw: true,
            next: true,
            ranges: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "Literal",
                        "value": 349,
                        "bigint": "0b101011101n",
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
                        "raw": "0b101011101n"
                    },
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
                    }
                }
            ],
            "sourceType": "script",
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
            }
        });
    });

    it('should parse octal', () => {
        expect(parseScript(`0o16432n`, {
            raw: true,
            next: true,
            ranges: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "Literal",
                        "bigint": "0o16432n",
                        "value": 7450,
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
                        "raw": "0o16432n"
                    },
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
                    }
                }
            ],
            "sourceType": "script",
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
            }
        });
    });

    it('should parse hex', () => {
        expect(parseScript(`0xFFF123n`, {
            raw: true,
            next: true,
            ranges: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "Literal",
                        "value": 16773411,
                        "bigint": "0xFFF123n",
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
                        "raw": "0xFFF123n"
                    },
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
                    }
                }
            ],
            "sourceType": "script",
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
            }
        });
    });
    it('should parse small number', () => {
        expect(parseScript(`100n`, {
            raw: true,
            next: true,
            ranges: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "Literal",
                        "value": 100,
                        "bigint": "100",
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
                        "raw": "100"
                    },
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
                    "column": 5
                }
            }
        });
    });

    it('should parse large number', () => {
        expect(parseScript(`9223372036854775807n`, {
            raw: true,
            next: true,
            ranges: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "Literal",
                        "value": 9223372036854776000,
                        "bigint": "9223372036854775807",
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
                        "raw": "9223372036854775807"
                    },
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
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 20,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 21
                }
            }
        });
    });
});
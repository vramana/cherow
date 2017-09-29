import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Next - BigInt', () => {

    it('should fail on invalid float', () => {
        expect(() => {
            parseScript('1.0n', {
                next: true
            });
        }).to.throw();
    });
    it('should fail on invalid e', () => {
        expect(() => {
            parseScript('2e9n', {
                next: true
            });
        }).to.throw();
    });
    it('should fail on invalid noctal', () => {
        expect(() => {
            parseScript('016432n', {
                next: true
            });
        }).to.not.throw();
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
              "body": [
                {
                  "end": 4,
                  "expression": {
                    "bigint": "100n",
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
                    "raw": "100n",
                    "start": 0,
                    "type": "Literal",
                    "value": 100,
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
                  "start": 0,
                  "type": "ExpressionStatement"
                },
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

    it('should parse large number', () => {
        expect(parseScript(`9223372036854775807n`, {
            raw: true,
            next: true,
            ranges: true,
            locations: true
        })).to.eql({
              "body": [
                {
                  "end": 20,
                  "expression": {
                    "bigint": "9223372036854775807n",
                    "end": 20,
                    "loc": {
                      "end": {
                        "column": 20,
                        "line": 1,
                      },
                      "start": {
                        "column": 0,
                        "line": 1,
                      }
                    },
                    "raw": "9223372036854775807n",
                    "start": 0,
                    "type": "Literal",
                    "value": 9223372036854776000
                  },
                  "loc": {
                    "end": {
                      "column": 20,
                      "line": 1,
                    },
                    "start": {
                      "column": 0,
                      "line": 1,
                    }
                  },
                  "start": 0,
                  "type": "ExpressionStatement",
                },
              ],
              "end": 20,
              "loc": {
                "end": {
                  "column": 20,
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
});
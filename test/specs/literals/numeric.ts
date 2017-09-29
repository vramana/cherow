import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Literal - Numeric', () => {

        it('should fail "const t = 2.34e-;const b = 4.3e--3;"', () => {
            expect(() => {
                parseScript('const t = 2.34e-;const b = 4.3e--3;')
            }).to.throw();
        });

        it('should fail on octal extension (000) in strict mode', () => {
            expect(() => {
                parseScript('"use strict"; var foo = 000;')
            }).to.throw();
        });

        it('should fail on octal extension (07) in strict mode', () => {
            expect(() => {
                parseScript('"use strict"; var foo = 07;')
            }).to.throw();
        });

        it('should fail on octal extension (05) in strict mode', () => {
            expect(() => {
                parseScript('"use strict"; var foo = 05;')
            }).to.throw();
        });

        it('should fail on octal extension (010) in strict mode', () => {
            expect(() => {
                parseScript('"use strict"; var y = 010;')
            }).to.throw();
        });

        it('should fail on invalid hex', () => {
            expect(() => {
                parseScript('0x')
            }).to.throw();
        });

        it('should fail on invalid binary digit', () => {
            expect(() => {
                parseScript('0b2;')
            }).to.throw();
        });
    
        it('should fail on invalid binary leading', () => {
            expect(() => {
                parseScript('00b0;')
            }).to.throw();
        });
    
        it('should fail on invalid binary truncated', () => {
            expect(() => {
                parseScript('0b;')
            }).to.throw();
        });
    
        it('should fail on invalid binary unicode', () => {
            expect(() => {
                parseScript('0\\u00620;')
            }).to.throw();
        });
    
        it('should fail on invalid binary truncated', () => {
            expect(() => {
                parseScript('"use strict"; 00;')
            }).to.throw();
        });
    
        it('should fail on invalid octal digit', () => {
            expect(() => {
                parseScript('0o8;')
            }).to.throw();
        });
    
        it('should fail on invalid octal truncated', () => {
            expect(() => {
                parseScript('0o;')
            }).to.throw();
        });
    
        it('should fail on invalid octal unicode', () => {
            expect(() => {
                parseScript('0\\u006f0;')
            }).to.throw();
        });
    
        it('should fail on invalid non octal decimal literal ( strict)', () => {
            expect(() => {
                parseScript('"use strict"; 08;')
            }).to.not.throw();
        });
    
    
        describe('ExponentPart :: ExponentIndicator ( /+/-) 0 DecimalDigits is allowed', () => {
    
            it('8E+01', () => {
                expect(parseScript('8E+01', {
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
                        "expression": {
                            "type": "Literal",
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
                            "value": 80,
                            "raw": "8E+01"
                        }
                    }],
                    "sourceType": "script"
                });
            });
    
            it('3e00', () => {
                expect(parseScript('3e00', {
                    ranges: true,
                    raw: true,
                    locations: true
                })).to.eql({
                    "type": "Program",
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
                    "body": [{
                        "type": "ExpressionStatement",
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
                        "expression": {
                            "type": "Literal",
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
                            "value": 3,
                            "raw": "3e00"
                        }
                    }],
                    "sourceType": "script"
                });
            });
    
            it('0e+01', () => {
                expect(parseScript('0e+01', {
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
                        "expression": {
                            "type": "Literal",
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
                            "value": 0,
                            "raw": "0e+01"
                        }
                    }],
                    "sourceType": "script"
                });
            });
    
            it('1e+01', () => {
                expect(parseScript('1e+01', {
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
                        "expression": {
                            "type": "Literal",
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
                            "value": 10,
                            "raw": "1e+01"
                        }
                    }],
                    "sourceType": "script"
                })
            })
    
            it('2e+01', () => {
                expect(parseScript('2e+01', {
                    ranges: true,
                    raw: true
                })).to.eql({
                    "body": [{
                        "end": 5,
                        "expression": {
                            "end": 5,
                            "raw": "2e+01",
                            "start": 0,
                            "type": "Literal",
                            "value": 20
                        },
                        "start": 0,
                        "type": "ExpressionStatement"
                    }],
                    "end": 5,
                    "sourceType": "script",
                    "start": 0,
                    "type": "Program"
                })
            })
    
            it('4e+01', () => {
                expect(parseScript('4e+01', {
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
                        "expression": {
                            "type": "Literal",
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
                            "value": 40,
                            "raw": "4e+01"
                        }
                    }],
                    "sourceType": "script"
                })
            })
    
    
            it('7e+01', () => {
                expect(parseScript('7e+01', {
                    ranges: true,
                    raw: true
                })).to.eql({
                    "body": [{
                        "end": 5,
                        "expression": {
                            "end": 5,
                            "raw": "7e+01",
                            "start": 0,
                            "type": "Literal",
                            "value": 70
                        },
                        "start": 0,
                        "type": "ExpressionStatement"
                    }],
                    "end": 5,
                    "sourceType": "script",
                    "start": 0,
                    "type": "Program"
                })
            })
    
            it('9e+01', () => {
                expect(parseScript('9e+01', {
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
                        "expression": {
                            "type": "Literal",
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
                            "value": 90,
                            "raw": "9e+01"
                        }
                    }],
                    "sourceType": "script"
                })
            })
    
            it('3E-01', () => {
                expect(parseScript('3E-01', {
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
                        "expression": {
                            "type": "Literal",
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
                            "value": 0.3,
                            "raw": "3E-01"
                        }
                    }],
                    "sourceType": "script"
                })
            })
    
    
            it('3e-01', () => {
                expect(parseScript('3e-01', {
                    ranges: true,
                    raw: true
                })).to.eql({
                    "body": [{
                        "end": 5,
                        "expression": {
                            "end": 5,
                            "raw": "3e-01",
                            "start": 0,
                            "type": "Literal",
                            "value": 0.3
                        },
                        "start": 0,
                        "type": "ExpressionStatement"
                    }],
                    "end": 5,
                    "sourceType": "script",
                    "start": 0,
                    "type": "Program"
                })
            })
    
            it('2E01', () => {
                expect(parseScript('2E01', {
                    ranges: true,
                    raw: true
                })).to.eql({
                    "body": [{
                        "end": 4,
                        "expression": {
                            "end": 4,
                            "raw": "2E01",
                            "start": 0,
                            "type": "Literal",
                            "value": 20
                        },
                        "start": 0,
                        "type": "ExpressionStatement"
                    }],
                    "end": 4,
                    "sourceType": "script",
                    "start": 0,
                    "type": "Program"
                })
            })
    
            it('8e01', () => {
                expect(parseScript('8e01', {
                    ranges: true,
                    raw: true,
                    locations: true
                })).to.eql({
                    "type": "Program",
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
                    "body": [{
                        "type": "ExpressionStatement",
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
                        "expression": {
                            "type": "Literal",
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
                            "value": 80,
                            "raw": "8e01"
                        }
                    }],
                    "sourceType": "script"
                })
            })
        });
    
    
        describe('DecimalLiteral :: DecimalIntegerLiteral. ExponentPart', () => {
    
            it('0.E0', () => {
                expect(parseScript('0.E0', {
                    ranges: true,
                    raw: true
                })).to.eql({
                    "body": [{
                        "end": 4,
                        "expression": {
                            "end": 4,
                            "raw": "0.E0",
                            "start": 0,
                            "type": "Literal",
                            "value": 0
                        },
                        "start": 0,
                        "type": "ExpressionStatement"
                    }],
                    "end": 4,
                    "sourceType": "script",
                    "start": 0,
                    "type": "Program"
                })
            })
    
            it('4.E0 ', () => {
                expect(parseScript('4.E0 ', {
                    ranges: true,
                    raw: true
                })).to.eql({
                    "body": [{
                        "end": 4,
                        "expression": {
                            "end": 4,
                            "raw": "4.E0",
                            "start": 0,
                            "type": "Literal",
                            "value": 4
                        },
                        "start": 0,
                        "type": "ExpressionStatement"
                    }],
                    "end": 5,
                    "sourceType": "script",
                    "start": 0,
                    "type": "Program"
                })
            })
    
            it('9.E0', () => {
                expect(parseScript('9.E0', {
                    ranges: true,
                    raw: true
                })).to.eql({
                    "body": [{
                        "end": 4,
                        "expression": {
                            "end": 4,
                            "raw": "9.E0",
                            "start": 0,
                            "type": "Literal",
                            "value": 9
                        },
                        "start": 0,
                        "type": "ExpressionStatement"
                    }],
                    "end": 4,
                    "sourceType": "script",
                    "start": 0,
                    "type": "Program"
                })
            })
    
            it('3.e0', () => {
                expect(parseScript('3.e0', {
                    ranges: true,
                    raw: true
                })).to.eql({
                    "body": [{
                        "end": 4,
                        "expression": {
                            "end": 4,
                            "raw": "3.e0",
                            "start": 0,
                            "type": "Literal",
                            "value": 3
                        },
                        "start": 0,
                        "type": "ExpressionStatement"
                    }],
                    "end": 4,
                    "sourceType": "script",
                    "start": 0,
                    "type": "Program"
                })
            })
    
            it('2.2E+1', () => {
                expect(parseScript('2.2E+1', {
                    ranges: true,
                    raw: true
                })).to.eql({
                    "body": [{
                        "end": 6,
                        "expression": {
                            "end": 6,
                            "raw": "2.2E+1",
                            "start": 0,
                            "type": "Literal",
                            "value": 22
                        },
                        "start": 0,
                        "type": "ExpressionStatement"
                    }],
                    "end": 6,
                    "sourceType": "script",
                    "start": 0,
                    "type": "Program"
                })
            })
    
            it('6.6e+1', () => {
                expect(parseScript('6.6e+1', {
                    ranges: true,
                    raw: true
                })).to.eql({
                    "body": [{
                        "end": 6,
                        "expression": {
                            "end": 6,
                            "raw": "6.6e+1",
                            "start": 0,
                            "type": "Literal",
                            "value": 66
                        },
                        "start": 0,
                        "type": "ExpressionStatement"
                    }],
                    "end": 6,
                    "sourceType": "script",
                    "start": 0,
                    "type": "Program"
                })
            })
    
            it('7.7E-1', () => {
                expect(parseScript('7.7E-1', {
                    ranges: true,
                    raw: true
                })).to.eql({
                    "body": [{
                        "end": 6,
                        "expression": {
                            "end": 6,
                            "raw": "7.7E-1",
                            "start": 0,
                            "type": "Literal",
                            "value": 0.77
                        },
                        "start": 0,
                        "type": "ExpressionStatement"
                    }],
                    "end": 6,
                    "sourceType": "script",
                    "start": 0,
                    "type": "Program"
                })
            })
    
            it('8.8e-1', () => {
                expect(parseScript('8.8e-1', {
                    ranges: true,
                    raw: true
                })).to.eql({
                    "body": [{
                        "end": 6,
                        "expression": {
                            "end": 6,
                            "raw": "8.8e-1",
                            "start": 0,
                            "type": "Literal",
                            "value": 0.88
                        },
                        "start": 0,
                        "type": "ExpressionStatement"
                    }],
                    "end": 6,
                    "sourceType": "script",
                    "start": 0,
                    "type": "Program"
                })
            })
    
            it('2.2E1', () => {
                expect(parseScript('2.2E1', {
                    ranges: true,
                    raw: true
                })).to.eql({
                    "body": [{
                        "end": 5,
                        "expression": {
                            "end": 5,
                            "raw": "2.2E1",
                            "start": 0,
                            "type": "Literal",
                            "value": 22
                        },
                        "start": 0,
                        "type": "ExpressionStatement"
                    }],
                    "end": 5,
                    "sourceType": "script",
                    "start": 0,
                    "type": "Program"
                })
            })
    
            it('4.4e1', () => {
                expect(parseScript('4.4e1', {
                    ranges: true,
                    raw: true
                })).to.eql({
                    "body": [{
                        "end": 5,
                        "expression": {
                            "end": 5,
                            "raw": "4.4e1",
                            "start": 0,
                            "type": "Literal",
                            "value": 44
                        },
                        "start": 0,
                        "type": "ExpressionStatement"
                    }],
                    "end": 5,
                    "sourceType": "script",
                    "start": 0,
                    "type": "Program"
                })
            })
    
            it('5.E0', () => {
                expect(parseScript('5.E0', {
                    ranges: true,
                    raw: true
                })).to.eql({
                    "body": [{
                        "end": 4,
                        "expression": {
                            "end": 4,
                            "raw": "5.E0",
                            "start": 0,
                            "type": "Literal",
                            "value": 5
                        },
                        "start": 0,
                        "type": "ExpressionStatement"
                    }],
                    "end": 4,
                    "sourceType": "script",
                    "start": 0,
                    "type": "Program"
                })
            })
    
            it('7.e0', () => {
                expect(parseScript('7.e0', {
                    ranges: true,
                    raw: true
                })).to.eql({
                    "body": [{
                        "end": 4,
                        "expression": {
                            "end": 4,
                            "raw": "7.e0",
                            "start": 0,
                            "type": "Literal",
                            "value": 7
                        },
                        "start": 0,
                        "type": "ExpressionStatement"
                    }],
                    "end": 4,
                    "sourceType": "script",
                    "start": 0,
                    "type": "Program"
                })
            })
    
            it('3.E+1', () => {
                expect(parseScript('3.E+1', {
                    ranges: true,
                    raw: true
                })).to.eql({
                    "body": [{
                        "end": 5,
                        "expression": {
                            "end": 5,
                            "raw": "3.E+1",
                            "start": 0,
                            "type": "Literal",
                            "value": 30
                        },
                        "start": 0,
                        "type": "ExpressionStatement"
                    }],
                    "end": 5,
                    "sourceType": "script",
                    "start": 0,
                    "type": "Program"
                })
            })
    
            it('2.e+1', () => {
                expect(parseScript('2.e+1', {
                    ranges: true,
                    raw: true
                })).to.eql({
                    "body": [{
                        "end": 5,
                        "expression": {
                            "end": 5,
                            "raw": "2.e+1",
                            "start": 0,
                            "type": "Literal",
                            "value": 20
                        },
                        "start": 0,
                        "type": "ExpressionStatement"
                    }],
                    "end": 5,
                    "sourceType": "script",
                    "start": 0,
                    "type": "Program"
                })
            })
    
            it('0.E-1', () => {
                expect(parseScript('0.E-1', {
                    ranges: true,
                    raw: true
                })).to.eql({
                    "body": [{
                        "end": 5,
                        "expression": {
                            "end": 5,
                            "raw": "0.E-1",
                            "start": 0,
                            "type": "Literal",
                            "value": 0
                        },
                        "start": 0,
                        "type": "ExpressionStatement"
                    }],
                    "end": 5,
                    "sourceType": "script",
                    "start": 0,
                    "type": "Program"
                })
            })
    
            it('3.e-1', () => {
                expect(parseScript('3.e-1', {
                    ranges: true,
                    raw: true
                })).to.eql({
                    "body": [{
                        "end": 5,
                        "expression": {
                            "end": 5,
                            "raw": "3.e-1",
                            "start": 0,
                            "type": "Literal",
                            "value": 0.3
                        },
                        "start": 0,
                        "type": "ExpressionStatement"
                    }],
                    "end": 5,
                    "sourceType": "script",
                    "start": 0,
                    "type": "Program"
                })
            })
    
            it('6.E1', () => {
                expect(parseScript('6.E1', {
                    ranges: true,
                    raw: true
                })).to.eql({
                    "body": [{
                        "end": 4,
                        "expression": {
                            "end": 4,
                            "raw": "6.E1",
                            "start": 0,
                            "type": "Literal",
                            "value": 60
                        },
                        "start": 0,
                        "type": "ExpressionStatement"
                    }],
                    "end": 4,
                    "sourceType": "script",
                    "start": 0,
                    "type": "Program"
                })
            })
    
    
            it('0.e1', () => {
                expect(parseScript('0.e1', {
                    ranges: true,
                    raw: true
                })).to.eql({
                    "body": [{
                        "end": 4,
                        "expression": {
                            "end": 4,
                            "raw": "0.e1",
                            "start": 0,
                            "type": "Literal",
                            "value": 0
                        },
                        "start": 0,
                        "type": "ExpressionStatement"
                    }],
                    "end": 4,
                    "sourceType": "script",
                    "start": 0,
                    "type": "Program"
                })
            })
        });
    
    
        describe('DecimalLiteral :: DecimalIntegerLiteral. DecimalDigits', () => {
    
            it('0.00', () => {
                expect(parseScript('0.00', {
                    ranges: true,
                    raw: true
                })).to.eql({
                    "body": [{
                        "end": 4,
                        "expression": {
                            "end": 4,
                            "raw": "0.00",
                            "start": 0,
                            "type": "Literal",
                            "value": 0
                        },
                        "start": 0,
                        "type": "ExpressionStatement"
                    }],
                    "end": 4,
                    "sourceType": "script",
                    "start": 0,
                    "type": "Program"
                })
            })
    
            it('2.0', () => {
                expect(parseScript('2.0', {
                    ranges: true,
                    raw: true
                })).to.eql({
                    "body": [{
                        "end": 3,
                        "expression": {
                            "end": 3,
                            "raw": "2.0",
                            "start": 0,
                            "type": "Literal",
                            "value": 2
                        },
                        "start": 0,
                        "type": "ExpressionStatement"
                    }],
                    "end": 3,
                    "sourceType": "script",
                    "start": 0,
                    "type": "Program"
                })
            })
        });
    
        it('should parse decimalIntegerLiteral :: 0, NoNZeroDigit', () => {
            expect(parseScript('9', {
                ranges: true,
                raw: true
            })).to.eql({
                "body": [{
                    "end": 1,
                    "expression": {
                        "end": 1,
                        "raw": "9",
                        "start": 0,
                        "type": "Literal",
                        "value": 9
                    },
                    "start": 0,
                    "type": "ExpressionStatement"
                }],
                "end": 1,
                "sourceType": "script",
                "start": 0,
                "type": "Program"
            })
        })
    
        it('should parse exponentPart :: e DecimalDigits', () => {
            expect(parseScript('0e1', {
                ranges: true,
                raw: true
            })).to.eql({
                "body": [{
                    "end": 3,
                    "expression": {
                        "end": 3,
                        "raw": "0e1",
                        "start": 0,
                        "type": "Literal",
                        "value": 0
                    },
                    "start": 0,
                    "type": "ExpressionStatement"
                }],
                "end": 3,
                "sourceType": "script",
                "start": 0,
                "type": "Program"
            })
        })
    
        describe('DecimalIntegerLiteral :: NoNZeroDigit DecimalDigigts', () => {
    
            it('11.', () => {
                expect(parseScript('11.', {
                    ranges: true,
                    raw: true
                })).to.eql({
                    "body": [{
                        "end": 3,
                        "expression": {
                            "end": 3,
                            "raw": "11.",
                            "start": 0,
                            "type": "Literal",
                            "value": 11
                        },
                        "start": 0,
                        "type": "ExpressionStatement"
                    }],
                    "end": 3,
                    "sourceType": "script",
                    "start": 0,
                    "type": "Program"
                })
            })
        });
    
        it('should parse decimalIntegerLiteral :: 0, NoNZeroDigit.', () => {
            expect(parseScript('0.', {
                ranges: true,
                raw: true
            })).to.eql({
                "body": [{
                    "end": 2,
                    "expression": {
                        "end": 2,
                        "raw": "0.",
                        "start": 0,
                        "type": "Literal",
                        "value": 0
                    },
                    "start": 0,
                    "type": "ExpressionStatement"
                }],
                "end": 2,
                "sourceType": "script",
                "start": 0,
                "type": "Program"
            })
        })
    
    
        it('should parse exponentPart :: E 0', () => {
            expect(parseScript('.0E0', {
                ranges: true,
                raw: true
            })).to.eql({
                "body": [{
                    "end": 4,
                    "expression": {
                        "end": 4,
                        "raw": ".0E0",
                        "start": 0,
                        "type": "Literal",
                        "value": 0.0
                    },
                    "start": 0,
                    "type": "ExpressionStatement"
                }],
                "end": 4,
                "sourceType": "script",
                "start": 0,
                "type": "Program"
            })
        })
    
        it('should parse exponentPart :: e 0', () => {
            expect(parseScript('.0e0', {
                ranges: true,
                raw: true
            })).to.eql({
                "body": [{
                    "end": 4,
                    "expression": {
                        "end": 4,
                        "raw": ".0e0",
                        "start": 0,
                        "type": "Literal",
                        "value": 0.0
                    },
                    "start": 0,
                    "type": "ExpressionStatement"
                }],
                "end": 4,
                "sourceType": "script",
                "start": 0,
                "type": "Program"
            })
        })
    
        it('should parse exponentPart ::  E +DecimalDigits', () => {
            expect(parseScript('.5E+1', {
                ranges: true,
                raw: true
            })).to.eql({
                "body": [{
                    "end": 5,
                    "expression": {
                        "end": 5,
                        "raw": ".5E+1",
                        "start": 0,
                        "type": "Literal",
                        "value": 5
                    },
                    "start": 0,
                    "type": "ExpressionStatement"
                }],
                "end": 5,
                "sourceType": "script",
                "start": 0,
                "type": "Program"
            })
        })
    
        it('should parse exponentPart ::  e +DecimalDigits', () => {
            expect(parseScript('.5e+1', {
                ranges: true,
                raw: true
            })).to.eql({
                "body": [{
                    "end": 5,
                    "expression": {
                        "end": 5,
                        "raw": ".5e+1",
                        "start": 0,
                        "type": "Literal",
                        "value": 5
                    },
                    "start": 0,
                    "type": "ExpressionStatement"
                }],
                "end": 5,
                "sourceType": "script",
                "start": 0,
                "type": "Program"
            })
        })
    
        it('should parse exponentPart ::  E DecimalDigits', () => {
            expect(parseScript('.0E1', {
                ranges: true,
                raw: true
            })).to.eql({
                "body": [{
                    "end": 4,
                    "expression": {
                        "end": 4,
                        "raw": ".0E1",
                        "start": 0,
                        "type": "Literal",
                        "value": 0
                    },
                    "start": 0,
                    "type": "ExpressionStatement"
                }],
                "end": 4,
                "sourceType": "script",
                "start": 0,
                "type": "Program"
            })
        })
    
        it('should parse exponentPart :: e DecimalDigits', () => {
            expect(parseScript('.0e1', {
                ranges: true,
                raw: true
            })).to.eql({
                "body": [{
                    "end": 4,
                    "expression": {
                        "end": 4,
                        "raw": ".0e1",
                        "start": 0,
                        "type": "Literal",
                        "value": 0
                    },
                    "start": 0,
                    "type": "ExpressionStatement"
                }],
                "end": 4,
                "sourceType": "script",
                "start": 0,
                "type": "Program"
            })
        })
    
        it('should use .DecimalDigits that have at the end zeros', () => {
            expect(parseScript('.10', {
                ranges: true,
                raw: true
            })).to.eql({
                "body": [{
                    "end": 3,
                    "expression": {
                        "end": 3,
                        "raw": ".10",
                        "start": 0,
                        "type": "Literal",
                        "value": 0.1
                    },
                    "start": 0,
                    "type": "ExpressionStatement"
                }],
                "end": 3,
                "sourceType": "script",
                "start": 0,
                "type": "Program"
            })
        })
    
        it('should use decimalDigits', () => {
            expect(parseScript('.33', {
                ranges: true,
                raw: true
            })).to.eql({
                "body": [{
                    "end": 3,
                    "expression": {
                        "end": 3,
                        "raw": ".33",
                        "start": 0,
                        "type": "Literal",
                        "value": 0.33
                    },
                    "start": 0,
                    "type": "ExpressionStatement"
                }],
                "end": 3,
                "sourceType": "script",
                "start": 0,
                "type": "Program"
            })
        })
    
        it('should pare with wxponentIndicator :: E', () => {
            expect(parseScript('4E-01', {
                ranges: true,
                raw: true
            })).to.eql({
                "body": [{
                    "end": 5,
                    "expression": {
                        "end": 5,
                        "raw": "4E-01",
                        "start": 0,
                        "type": "Literal",
                        "value": 0.4
                    },
                    "start": 0,
                    "type": "ExpressionStatement"
                }],
                "end": 5,
                "sourceType": "script",
                "start": 0,
                "type": "Program"
            })
        });
    
        it('should parse "0X010000000"', () => {
            expect(parseScript('0X010000000', {
                ranges: true,
                raw: true,
                locations: true
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
                        "type": "Literal",
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
                        "value": 268435456,
                        "raw": "0X010000000"
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse "0X010000"', () => {
            expect(parseScript('0X010000', {
                ranges: true,
                raw: true,
                locations: true
            })).to.eql({
                "type": "Program",
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
                "body": [{
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
                        "type": "Literal",
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
                        "value": 65536,
                        "raw": "0X010000"
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse "0x10"', () => {
            expect(parseScript('0x10', {
                ranges: true,
                raw: true,
                locations: true
            })).to.eql({
                "type": "Program",
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
                "body": [{
                    "type": "ExpressionStatement",
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
                    "expression": {
                        "type": "Literal",
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
                        "value": 16,
                        "raw": "0x10"
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse hex integer literal :: 0X0 Digits', () => {
            expect(parseScript('0X010', {
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
                    "expression": {
                        "type": "Literal",
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
                        "value": 16,
                        "raw": "0X010"
                    }
                }],
                "sourceType": "script"
            });
        })
    
        it('should pare hexIntegerLiteral :: 0X1 Digits', () => {
            expect(parseScript('0X1A', {
                ranges: true,
                raw: true,
                locations: true
            })).to.eql({
                "type": "Program",
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
                "body": [{
                    "type": "ExpressionStatement",
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
                    "expression": {
                        "type": "Literal",
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
                        "value": 26,
                        "raw": "0X1A"
                    }
                }],
                "sourceType": "script"
            })
        })
    
        it('should pare hexIntegerLiteral :: 0X1 Digits', () => {
            expect(parseScript('0012', {
                ranges: true,
                raw: true,
                locations: true
            })).to.eql({
                "type": "Program",
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
                "body": [{
                    "type": "ExpressionStatement",
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
                    "expression": {
                        "type": "Literal",
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
                        "value": 10,
                        "raw": "0012"
                    }
                }],
                "sourceType": "script"
            })
        })
    
        it('should parse simple digit', () => {
            expect(parseScript('3', {
                ranges: true,
                raw: true,
                locations: true
            })).to.eql({
                "type": "Program",
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
                        "value": 3,
                        "raw": "3"
                    }
                }],
                "sourceType": "script"
            })
        })
    
        it('should parse long decimal number with exponentIndicator :: E+', () => {
            expect(parseScript('6.02214179e+23', {
                ranges: true,
                raw: true
            })).to.eql({
                "body": [{
                    "end": 14,
                    "expression": {
                        "end": 14,
                        "raw": "6.02214179e+23",
                        "start": 0,
                        "type": "Literal",
                        "value": 6.02214179e+23
                    },
                    "start": 0,
                    "type": "ExpressionStatement"
                }],
                "end": 14,
                "sourceType": "script",
                "start": 0,
                "type": "Program"
            })
        })
    
        it('should parse long decimal number with exponentIndicator :: E-', () => {
            expect(parseScript('1.492417830e-10', {
                ranges: true,
                raw: true
            })).to.eql({
                "body": [{
                    "end": 15,
                    "expression": {
                        "end": 15,
                        "raw": "1.492417830e-10",
                        "start": 0,
                        "type": "Literal",
                        "value": 1.49241783e-10
                    },
                    "start": 0,
                    "type": "ExpressionStatement"
                }],
                "end": 15,
                "sourceType": "script",
                "start": 0,
                "type": "Program"
            })
        })
    
        it('should parse hexIntegerLiteral :: 0x one of a, b, c, d, e, f', () => {
            expect(parseScript('0xf', {
                ranges: true,
                raw: true
            })).to.eql({
                "body": [{
                    "end": 3,
                    "expression": {
                        "end": 3,
                        "raw": "0xf",
                        "start": 0,
                        "type": "Literal",
                        "value": 15
                    },
                    "start": 0,
                    "type": "ExpressionStatement"
                }],
                "end": 3,
                "sourceType": "script",
                "start": 0,
                "type": "Program"
            })
        });
    
        describe('Mathematical value of valid binary integer literals', () => {
            it('0b0', () => {
                expect(parseScript('0b0', {
                    ranges: true,
                    locations: true,
                    raw: true
                })).to.eql({
                    "type": "Program",
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
                    "body": [{
                        "type": "ExpressionStatement",
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
                        "expression": {
                            "type": "Literal",
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
                            "value": 0,
                            "raw": "0b0"
                        }
                    }],
                    "sourceType": "script"
                })
            })
    
            it('0b00', () => {
                expect(parseScript('0b00', {
                    ranges: true,
                    locations: true,
                    raw: true
                })).to.eql({
                    "type": "Program",
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
                    "body": [{
                        "type": "ExpressionStatement",
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
                        "expression": {
                            "type": "Literal",
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
                            "value": 0,
                            "raw": "0b00"
                        }
                    }],
                    "sourceType": "script"
                })
            })
    
            it('0B1', () => {
                expect(parseScript('0B1', {
                    ranges: true,
                    raw: true,
                    locations: true
                })).to.eql({
                    "type": "Program",
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
                    "body": [{
                        "type": "ExpressionStatement",
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
                        "expression": {
                            "type": "Literal",
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
                            "value": 1,
                            "raw": "0B1"
                        }
                    }],
                    "sourceType": "script"
                })
            })
    
            it('0b10', () => {
                expect(parseScript('0b10', {
                    ranges: true,
                    raw: true
                })).to.eql({
                    "body": [{
                        "end": 4,
                        "expression": {
                            "end": 4,
                            "raw": "0b10",
                            "start": 0,
                            "type": "Literal",
                            "value": 2
                        },
                        "start": 0,
                        "type": "ExpressionStatement"
                    }],
                    "end": 4,
                    "sourceType": "script",
                    "start": 0,
                    "type": "Program"
                })
            })
    
            it('0b11', () => {
                expect(parseScript('0b11', {
                    ranges: true,
                    raw: true
                })).to.eql({
                    "body": [{
                        "end": 4,
                        "expression": {
                            "end": 4,
                            "raw": "0b11",
                            "start": 0,
                            "type": "Literal",
                            "value": 3
                        },
                        "start": 0,
                        "type": "ExpressionStatement"
                    }],
                    "end": 4,
                    "sourceType": "script",
                    "start": 0,
                    "type": "Program"
                })
            })
    
            it('should fail on invalid hex with invalid letters', () => {
                expect(() => {
                    parseScript('0x¤%&/()')
                }).to.throw();
            });
    
            it('should fail on binary invalid unicode escape sequence', () => {
                expect(() => {
                    parseScript('"use strict"; 09')
                }).to.not.throw();
            });
    
            it('should fail on binary invalid unicode escape sequence', () => {
                expect(() => {
                    parseScript('"use strict"; 018')
                }).to.throw();
            });
    
            it('should fail on binary invalid unicode escape sequence', () => {
                expect(() => {
                    parseScript('0\\u00620')
                }).to.throw();
            });
    
            it('should fail on binary invalid leadiing', () => {
                expect(() => {
                    parseScript('00b0')
                }).to.throw();
            });
    
            it('should fail on binary invalid truncated', () => {
                expect(() => {
                    parseScript('0b')
                }).to.throw();
            });
    
            it('should fail on binary invalid digit', () => {
                expect(() => {
                    parseScript('0b2')
                }).to.throw();
            });
    
            it('should fail on "0B18"', () => {
                expect(() => {
                    parseScript('0B18')
                }).to.throw();
            });
    
            it('should fail on "0b12"', () => {
                expect(() => {
                    parseScript('0b12')
                }).to.throw();
            });
    
            it('should fail on "0b1a"', () => {
                expect(() => {
                    parseScript('0b1a')
                }).to.throw();
            });
    
            it('should fail on "0B12"', () => {
                expect(() => {
                    parseScript('0B12')
                }).to.throw();
            });
    
            it('should fail on "0b9"', () => {
                expect(() => {
                    parseScript('0b9')
                }).to.throw();
            });
    
            it('should fail on "0B18"', () => {
                expect(() => {
                    parseScript('0B18')
                }).to.throw();
            });
        });
    
        describe('Mathematical value of valid octal integer literals', () => {
    
            it('should fail on octal invalid unicode escape sequence', () => {
                expect(() => {
                    parseScript('0\\u006f0')
                }).to.throw();
            });
    
            it('should fail on octal invalid leadiing', () => {
                expect(() => {
                    parseScript('00o0')
                }).to.throw();
            });
    
            it('should fail on octal invalid truncated', () => {
                expect(() => {
                    parseScript('0o')
                }).to.throw();
            });
    
            it('should fail on octal invalid digit', () => {
                expect(() => {
                    parseScript('0o8')
                }).to.throw();
            });
    
            it('should fail on "0o1a"', () => {
                expect(() => {
                    parseScript('0o1a')
                }).to.throw('');
            });
    
    
            it('should fail on "0O18"', () => {
                expect(() => {
                    parseScript('0O18')
                }).to.throw('');
            });
    
            it('should fail on "09.x"', () => {
                expect(() => {
                    parseScript('09.x')
                }).to.throw();
            });
    
            it('should fail on "0O1a"', () => {
                expect(() => {
                    parseScript('0O1a')
                }).to.throw('');
            });
    
            it('should fail on "0o18"', () => {
                expect(() => {
                    parseScript('0o18')
                }).to.throw('');
            });
    
            it('should fail on 07 (strict)', () => {
                expect(() => {
                    parseScript('"use strict"; 07')
                }).to.throw('');
            });
    
            it('should fail on 019 (strict)', () => {
                expect(() => {
                    parseScript('"use strict"; 019')
                }).to.throw('');
            });
    
            it('09.0', () => {
                expect(parseScript('09.0', {
                    ranges: true,
                    raw: true,
                    locations: true
                })).to.eql({
                    "type": "Program",
                    "body": [{
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "Literal",
                            "value": 9,
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
                            "raw": "09.0"
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
                    }],
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
                            "column": 4
                        }
                    }
                });
            });
    
            it('0O0', () => {
                expect(parseScript('0O0', {
                    ranges: true,
                    raw: true,
                    locations: true
                })).to.eql({
                    "type": "Program",
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
                    "body": [{
                        "type": "ExpressionStatement",
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
                        "expression": {
                            "type": "Literal",
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
                            "value": 0,
                            "raw": "0O0"
                        }
                    }],
                    "sourceType": "script"
                })
            })
    
            it('0o07', () => {
                expect(parseScript('0o07', {
                    ranges: true,
                    raw: true
                })).to.eql({
                    "body": [{
                        "end": 4,
                        "expression": {
                            "end": 4,
                            "raw": "0o07",
                            "start": 0,
                            "type": "Literal",
                            "value": 7
                        },
                        "start": 0,
                        "type": "ExpressionStatement"
                    }],
                    "end": 4,
                    "sourceType": "script",
                    "start": 0,
                    "type": "Program"
                })
            })
    
            it('0O010', () => {
                expect(parseScript('0O010', {
                    ranges: true,
                    raw: true
                })).to.eql({
                    "body": [{
                        "end": 5,
                        "expression": {
                            "end": 5,
                            "raw": "0O010",
                            "start": 0,
                            "type": "Literal",
                            "value": 8
                        },
                        "start": 0,
                        "type": "ExpressionStatement"
                    }],
                    "end": 5,
                    "sourceType": "script",
                    "start": 0,
                    "type": "Program"
                })
            })
    
            it('0O77', () => {
                expect(parseScript('0O77', {
                    ranges: true,
                    raw: true
                })).to.eql({
                    "body": [{
                        "end": 4,
                        "expression": {
                            "end": 4,
                            "raw": "0O77",
                            "start": 0,
                            "type": "Literal",
                            "value": 63
                        },
                        "start": 0,
                        "type": "ExpressionStatement"
                    }],
                    "end": 4,
                    "sourceType": "script",
                    "start": 0,
                    "type": "Program"
                })
            })
    
            it('0008', () => {
                expect(parseScript('0008', {
                    ranges: true,
                    raw: true
                })).to.eql({
                    "body": [{
                        "end": 4,
                        "expression": {
                            "end": 4,
                            "raw": "0008",
                            "start": 0,
                            "type": "Literal",
                            "value": 8
                        },
                        "start": 0,
                        "type": "ExpressionStatement"
                    }],
                    "end": 4,
                    "sourceType": "script",
                    "start": 0,
                    "type": "Program"
                })
            })
    
            it('09', () => {
                expect(parseScript('09', {
                    ranges: true,
                    raw: true
                })).to.eql({
                    "body": [{
                        "end": 2,
                        "expression": {
                            "end": 2,
                            "raw": "09",
                            "start": 0,
                            "type": "Literal",
                            "value": 9
                        },
                        "start": 0,
                        "type": "ExpressionStatement"
                    }],
                    "end": 2,
                    "sourceType": "script",
                    "start": 0,
                    "type": "Program"
                })
            })
    
            it('08', () => {
                expect(parseScript('08', {
                    ranges: true,
                    raw: true
                })).to.eql({
                    "body": [{
                        "end": 2,
                        "expression": {
                            "end": 2,
                            "raw": "08",
                            "start": 0,
                            "type": "Literal",
                            "value": 8
                        },
                        "start": 0,
                        "type": "ExpressionStatement"
                    }],
                    "end": 2,
                    "sourceType": "script",
                    "start": 0,
                    "type": "Program"
                })
            })
    
            it('09.5', () => {
                expect(parseScript('09.5', {
                    ranges: true,
                    raw: true
                })).to.eql({
                    "body": [{
                        "end": 4,
                        "expression": {
                            "end": 4,
                            "raw": "09.5",
                            "start": 0,
                            "type": "Literal",
                            "value": 9.5
                        },
                        "start": 0,
                        "type": "ExpressionStatement"
                    }],
                    "end": 4,
                    "sourceType": "script",
                    "start": 0,
                    "type": "Program"
                })
            })
        })
    
        it('should parse "0128"', () => {
            expect(parseScript('0128', {
                ranges: true
            })).to.eql({
                "body": [{
                    "end": 4,
                    "expression": {
                        "end": 4,
                        "start": 0,
                        "type": "Literal",
                        "value": 128,
                    },
                    "start": 0,
                    "type": "ExpressionStatement"
                }, ],
                "end": 4,
                "sourceType": "script",
                "start": 0,
                "type": "Program"
            });
        });
    });
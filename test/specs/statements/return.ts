import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;
describe('Statements - Return', () => {
    
        it('should fail if return is not inside an function body', () => {
            expect(() => {
                parseScript(`do {
        var x=1;
        return x;
        var y=2;
    } while(0);`)
            }).to.throw();
        });
    
        it('should fail if "return" appear without a function body', () => {
            expect(() => {
                parseScript(`var x=1;
    return;
    var y=2;`)
            }).to.throw();
        });
    
        it('should fail if "return" wrapped inside a do-while appear without a function body', () => {
            expect(() => {
                parseScript(`do {
        var x=1;
        return x;
        var y=2;
    } while(0);`)
            }).to.throw();
        });
    
        it('should fail if "return" wrapped inside a try-catch appear without a function body', () => {
            expect(() => {
                parseScript(`try {
        throw 1;
    } catch(e){
        return e;
    }`)
            }).to.throw();
        });

        it('should fail on invalid use of retyrn in global scope', () => {
            expect(() => {
                parseScript(`return 123`)
            }).to.throw();
        });

        it('should parse return in global scope', () => {
            expect(parseScript('return 123', {
                globalReturn: true
            })).to.eql({
                  "body": [
                    {
                      "argument": {
                        "type": "Literal",
                        "value": 123,
                      },
                      "type": "ReturnStatement",
                    },
                  ],
                  "sourceType": "script",
                  "type": "Program"
                });
        });

        it('should parse "(function(){ return x * y })"', () => {
            expect(parseScript('(function(){ return x * y })', {
                ranges: true,
                locations: true,
                raw: true
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
                "body": [
                  {
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
                      "type": "FunctionExpression",
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
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [],
                      "body": {
                        "type": "BlockStatement",
                        "start": 11,
                        "end": 27,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 11
                          },
                          "end": {
                            "line": 1,
                            "column": 27
                          }
                        },
                        "body": [
                          {
                            "type": "ReturnStatement",
                            "start": 13,
                            "end": 25,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 13
                              },
                              "end": {
                                "line": 1,
                                "column": 25
                              }
                            },
                            "argument": {
                              "type": "BinaryExpression",
                              "start": 20,
                              "end": 25,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 20
                                },
                                "end": {
                                  "line": 1,
                                  "column": 25
                                }
                              },
                              "left": {
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
                                "name": "x"
                              },
                              "operator": "*",
                              "right": {
                                "type": "Identifier",
                                "start": 24,
                                "end": 25,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 24
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 25
                                  }
                                },
                                "name": "y"
                              }
                            }
                          }
                        ]
                      }
                    }
                  }
                ],
                "sourceType": "script"
              });
        });
    
        it('should parse "(function(){ return })"', () => {
            expect(parseScript('(function(){ return })')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "FunctionExpression",
                        "id": null,
                        "params": [],
                        "body": {
                            "type": "BlockStatement",
                            "body": [{
                                "type": "ReturnStatement",
                                "argument": null
                            }]
                        },
                        "async": false,
                        "generator": false,
                        "expression": false
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse "(function(){ return; })"', () => {
            expect(parseScript('(function(){ return; })')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "FunctionExpression",
                        "id": null,
                        "params": [],
                        "body": {
                            "type": "BlockStatement",
                            "body": [{
                                "type": "ReturnStatement",
                                "argument": null
                            }]
                        },
                        "async": false,
                        "generator": false,
                        "expression": false
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse "(function(){ return x; })"', () => {
            expect(parseScript('(function(){ return x; })')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "FunctionExpression",
                        "id": null,
                        "params": [],
                        "body": {
                            "type": "BlockStatement",
                            "body": [{
                                "type": "ReturnStatement",
                                "argument": {
                                    "type": "Identifier",
                                    "name": "x"
                                }
                            }]
                        },
                        "async": false,
                        "generator": false,
                        "expression": false
                    }
                }],
                "sourceType": "script"
            });
        });
    });
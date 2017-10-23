import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Miscellaneous - Future reserved words', () => {

        it('should fail on execution of "var export = 1;"', () => {
            expect(() => {
                parseScript('var export = 1;')
            }).to.throw()
        });

        it('should fail on expected reserved words used as Identifier"', () => {
            expect(() => {
                parseScript('"use strict"; var inte\\u0072face = 123;')
            }).to.throw()
        });

        it('should fail on implement strict escaped', () => {
            expect(() => {
                parseScript('"use strict"; var \\u0069mplements = 123;')
            }).to.throw()
        });

        it('should fail on execution of "enum=1"', () => {
            expect(() => {
                parseScript('var enum = 1;')
            }).to.throw();
        });

        it('should fail on execution of "super=1"', () => {
            expect(() => {
                parseScript('var super = 1;')
            }).to.throw()
        });

        it('should fail on execution of "yield = 1 (only strict)"', () => {
            expect(() => {
                parseScript('"use strict"; var yield = 1;')
            }).to.throw()
        });
     
        it('should fail on execution of escaped "yield"', () => {
            expect(() => {
                parseScript('var \\u0079ield = 123;')
            }).to.throw()
        });

        it('should fail on interface strict only', () => {
            expect(() => {
                parseScript('"use strict"; var interface = 1;')
            }).to.throw()
        });
    
        it('should fail on private strict only', () => {
            expect(() => {
                parseScript('"use strict"; var private = 1;')
            }).to.throw()
        });
    
        it('should fail on static strict only', () => {
            expect(() => {
                parseScript('"use strict"; var protected = 1;')
            }).to.throw()
        });
    
        it('should fail on package strict only', () => {
            expect(() => {
                parseScript('"use strict"; var package = 1;')
            }).to.throw()
        });
    
        it('should fail on expected reserved words used as Identifier - yield"', () => {
            expect(() => {
                parseScript('var \\u0079ield = 123;')
            }).to.throw();
        });

        it('should fail on const', () => {
            expect(() => {
                parseScript('var const = 1;')
            }).to.throw();
        });

        it('should fail on escaped let', () => {
            expect(() => {
                parseScript('var l\\u0065t = 123;')
            }).to.throw();
        });
    
        it('should fail on expected "protected" reserved words used as Identifier in strict mode', () => {
            expect(() => {
                parseScript('"use strict"; var \\u0070\\u0075\\u0062\\u006c\\u0069\\u0063 = 123;')
            }).to.throw()
        });
    
        
        it('should parse Implement as title case correctly', () => {
            expect(parseScript('var Implements = 1;', {
                ranges: true,
                locations: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 19,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 19
                  }
                },
                "body": [
                  {
                    "type": "VariableDeclaration",
                    "start": 0,
                    "end": 19,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 19
                      }
                    },
                    "declarations": [
                      {
                        "type": "VariableDeclarator",
                        "start": 4,
                        "end": 18,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 4
                          },
                          "end": {
                            "line": 1,
                            "column": 18
                          }
                        },
                        "id": {
                          "type": "Identifier",
                          "start": 4,
                          "end": 14,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 4
                            },
                            "end": {
                              "line": 1,
                              "column": 14
                            }
                          },
                          "name": "Implements"
                        },
                        "init": {
                          "type": "Literal",
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
                          "value": 1,
                          "raw": "1"
                        }
                      }
                    ],
                    "kind": "var"
                  }
                ],
                "sourceType": "script"
              });
        });
    
        it('should parse "var abstract = 1;"', () => {
            expect(parseScript('var abstract = 1;', {
                ranges: true
            })).to.eql({
                "body": [{
                    "declarations": [{
                        "end": 16,
                        "id": {
                            "end": 12,
                            "name": "abstract",
                            "start": 4,
                            "type": "Identifier"
                        },
                        "init": {
                            "end": 16,
                            "start": 15,
                            "type": "Literal",
                            "value": 1
                        },
                        "start": 4,
                        "type": "VariableDeclarator"
                    }],
                    "end": 17,
                    "kind": "var",
                    "start": 0,
                    "type": "VariableDeclaration"
                }],
                "end": 17,
                "sourceType": "script",
                "start": 0,
                "type": "Program"
            });
        });
    
        it('should parse "var byte = 1;"', () => {
            expect(parseScript('var byte = 1;', {
                ranges: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "VariableDeclaration",
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "Identifier",
                            "name": "byte"
                        },
                        "init": {
                            "type": "Literal",
                            "value": 1,
                            "raw": "1"
                        }
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse "var throws = 1;"', () => {
            expect(parseScript('var throws = 1;', {
                ranges: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "VariableDeclaration",
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "Identifier",
                            "name": "throws"
                        },
                        "init": {
                            "type": "Literal",
                            "value": 1,
                            "raw": "1"
                        }
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse "var volatile = 1;"', () => {
            expect(parseScript('var volatile = 1;', {
                ranges: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "VariableDeclaration",
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "Identifier",
                            "name": "volatile"
                        },
                        "init": {
                            "type": "Literal",
                            "value": 1,
                            "raw": "1"
                        }
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse "var protected = 1;"', () => {
            expect(parseScript('var protected = 1;', {
                ranges: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "VariableDeclaration",
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "Identifier",
                            "name": "protected"
                        },
                        "init": {
                            "type": "Literal",
                            "value": 1,
                            "raw": "1"
                        }
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse "var short = 1;"', () => {
            expect(parseScript('var short = 1;', {
                ranges: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "VariableDeclaration",
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "Identifier",
                            "name": "short"
                        },
                        "init": {
                            "type": "Literal",
                            "value": 1,
                            "raw": "1"
                        }
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            });
        });
    
    });
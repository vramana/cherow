import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Miscellaneous - Keyword', () => {

    it('should fail on invalid use of if in binding context', () => {
        expect(() => {
            parseScript(`for = 1;`);
        }).to.throw();
    });

    it('should fail on invalid use of do in binding context', () => {
        expect(() => {
            parseScript(`do = 1;`);
        }).to.throw();
    });

    it('should fail on invalid escaped null', () => {
        expect(() => {
            parseScript(`nul\\u{6c}`);
        }).to.throw();
    });

    it('should fail on invalid escaped true', () => {
        expect(() => {
            parseScript(`\\u0074rue`);
        }).to.throw();
    });

    it('should fail on invalid use of in in binding context', () => {
        expect(() => {
            parseScript(`in = 1;`);
        }).to.throw();
    });

    it('should fail on invalid use of new in binding context', () => {
        expect(() => {
            parseScript(`new = 1;`);
        }).to.throw();
    });

    it('should fail on invalid use of else in binding context', () => {
        expect(() => {
            parseScript(`else = 1;`);
        }).to.throw();
    });

    it('should fail on invalid use of function in binding context', () => {
        expect(() => {
            parseScript(`function = 1;`);
        }).to.throw();
    });

    it('should fail on invalid use of function in binding context', () => {
        expect(() => {
            parseScript(`while = 1;`);
        }).to.throw();
    });

    it('should fail on invalid use of try in binding context', () => {
        expect(() => {
            parseScript(`try = 1;`);
        }).to.throw();
    });

    it('should fail on invalid use of delete in binding context', () => {
        expect(() => {
            parseScript(`delete = 1;`);
        }).to.throw();
    });

    it('should fail on invalid use of break in binding context', () => {
        expect(() => {
            parseScript(`break = 1;`);
        }).to.throw();
    });

    it('should fail on invalid use of catch in binding context', () => {
        expect(() => {
            parseScript(`catch = 1;`);
        }).to.throw();
    });

    it('should fail on invalid use of continue in binding context', () => {
        expect(() => {
            parseScript(`continue = 1;`);
        }).to.throw('');
    });

    it('should fail on invalid use of delete in binding context', () => {
        expect(() => {
            parseScript(`delete = 1;`);
        }).to.throw();
    });

    it('should fail on invalid use of finally in binding context', () => {
        expect(() => {
            parseScript(`finally = 1;`);
        }).to.throw();
    });

    it('should fail on invalid use of for in binding context', () => {
        expect(() => {
            parseScript(`for = 1;`);
        }).to.throw();
    });

    it('should fail on invalid use of instanceof in binding context', () => {
        expect(() => {
            parseScript(`instanceof = 1;`);
        }).to.throw();
    });

    it('should fail on invalid use of default in binding context', () => {
        expect(() => {
            parseScript(`default = 1;`);
        }).to.throw();
    });

    it('should fail on invalid use of continue in binding context', () => {
        expect(() => {
            parseScript(`continue = 1;`);
        }).to.throw();
    });

    it('should fail on invalid use of return in binding context', () => {
        expect(() => {
            parseScript(`return = 1;`);
        }).to.throw();
    });

    it('should fail on invalid use of this', () => {
        expect(() => {
            parseScript(`({this});`);
        }).to.throw();
    });

    it('should fail on "\\u0069\\u{66} (1) {}"', () => {
        expect(() => {
            parseModule(`\\u0069\\u{66} (1) {}`);
        }).to.not.throw();
    });

    it('should fail on "var i\\u0066"', () => {
        expect(() => {
            parseModule(`var i\\u0066`);
        }).to.throw();
    });

    it('should fail on "i\\u0066 (0)"', () => {
        expect(() => {
            parseModule(`i\\u0066 (0)`);
        }).to.throw();
    });

    it('should throw on if let are used as binding identifier in strict mode', () => {
        expect(() => {
            parseScript(`"use strict"; var le\\u0074`);
        }).to.throw();
    });

    it('should throw on if let are used as binding identifier in strict mode', () => {
        expect(() => {
            parseScript(`function *a(){yi\\u0065ld 0}`);
        }).to.not.throw();
    });

    it('should parse "var le\\u0074"', () => {
        expect(parseScript('function *a(){({yi\\u0065ld: 0})}', {
            ranges: true
        })).to.eql({
              "body": [
                {
                  "async": false,
                  "body": {
                   "body": [
                      {
                        "end": 31,
                        "expression": {
                          "end": 30,
                          "properties": [
                            {
                              "computed": false,
                              "end": 29,
                              "key": {
                               "end": 26,
                                "name": "yield",
                                "start": 16,
                                "type": "Identifier",
                              },
                              "kind": "init",
                              "method": false,
                              "shorthand": false,
                              "start": 16,
                              "type": "Property",
                              "value": {
                                "end": 29,
                                "start": 28,
                                "type": "Literal",
                                "value": 0,
                              }
                            }
                          ],
                          "start": 15,
                          "type": "ObjectExpression",
                        },
                        "start": 14,
                       "type": "ExpressionStatement"
                      },
                   ],
                    "end": 32,
                    "start": 13,
                    "type": "BlockStatement"
                  },
                  "end": 32,
                  "expression": false,
                  "generator": true,
                  "id": {
                    "end": 11,
                    "name": "a",
                    "start": 10,
                   "type": "Identifier"
                  },
                  "params": [],
                  "start": 0,
                  "type": "FunctionDeclaration"
                }
              ],
             "end": 32,
              "sourceType": "script",
             "start": 0,
              "type": "Program"
            });
    });
});
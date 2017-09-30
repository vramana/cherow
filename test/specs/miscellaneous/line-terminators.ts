import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Miscellaneous - Line termiantors', () => {

    it('should fail on line feed within strings', () => {
        expect(() => {
            parseScript(`"
            str
            ing
            ";`);
        }).to.throw();
    });

    it('should fail if single line comment contains line feed', () => {
        expect(() => {
            parseScript(`//single 
            line comment`);
        }).to.throw();
    });

    it('should fail if line terminator are expressed as a Unicode escape sequence - \\u000Ax;', () => {
        expect(() => {
            parseScript(`var\\u000Ax;`);
        }).to.throw();
    });

    it('should fail if line terminator are expressed as a Unicode escape sequence - \\u000Dx;', () => {
        expect(() => {
            parseScript(`var\\u000Dx;`);
        }).to.throw();
    });

    it('should fail if line terminator are expressed as a Unicode escape sequence - \\u2028x;', () => {
        expect(() => {
            parseScript(`var\\u2028x;`);
        }).to.throw();
    });

    it('should fail if line terminator are expressed as a Unicode escape sequence - \\u2029x;', () => {
        expect(() => {
            parseScript(`var\\u2029x;`);
        }).to.throw();
    });

    it('should fail on invalid paragraph separator', () => {
        expect(() => {
            parseScript(`\\u2028var\\u2028x\\u2028=\\u2028y\\u2028/\\u2028z\\u2028; result = x;`);
        }).to.throw();
    });

    it('should parse with line terminators between operators', () => {
        expect(parseScript(`var
        x
        =
        y
        -
        z
        ;`, {
            ranges: true,
            raw: true,
            locations: true,
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 63,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 7,
                "column": 9
              }
            },
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 63,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 7,
                    "column": 9
                  }
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 12,
                    "end": 53,
                    "loc": {
                      "start": {
                        "line": 2,
                        "column": 8
                      },
                      "end": {
                        "line": 6,
                        "column": 9
                      }
                    },
                    "id": {
                      "type": "Identifier",
                      "start": 12,
                      "end": 13,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 8
                        },
                        "end": {
                          "line": 2,
                          "column": 9
                        }
                      },
                      "name": "x"
                    },
                    "init": {
                      "type": "BinaryExpression",
                      "start": 32,
                      "end": 53,
                      "loc": {
                        "start": {
                          "line": 4,
                          "column": 8
                        },
                        "end": {
                          "line": 6,
                          "column": 9
                        }
                      },
                      "left": {
                        "type": "Identifier",
                        "start": 32,
                        "end": 33,
                        "loc": {
                          "start": {
                            "line": 4,
                            "column": 8
                          },
                          "end": {
                            "line": 4,
                            "column": 9
                          }
                        },
                        "name": "y"
                      },
                      "operator": "-",
                      "right": {
                        "type": "Identifier",
                        "start": 52,
                        "end": 53,
                        "loc": {
                          "start": {
                            "line": 6,
                            "column": 8
                          },
                          "end": {
                            "line": 6,
                            "column": 9
                          }
                        },
                        "name": "z"
                      }
                    }
                  }
                ],
                "kind": "var"
              }
            ],
            "sourceType": "script"
          });
    });

});
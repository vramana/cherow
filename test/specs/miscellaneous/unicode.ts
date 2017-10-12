import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Miscellaneous - Unicode', () => {

    it('should parse "var source = "\\u{00000000034}";"', () => {
        expect(parseScript('var source = "\\u{00000000034}";', {
            raw: true,
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "VariableDeclaration",
                    "declarations": [
                        {
                            "type": "VariableDeclarator",
                            "init": {
                                "type": "Literal",
                                "value": "4",
                                "raw": "\"\\u{00000000034}\""
                            },
                            "id": {
                                "type": "Identifier",
                                "name": "source"
                            }
                        }
                    ],
                    "kind": "var"
                }
            ],
            "sourceType": "script"
        });
    });
    it('should parse "\\u{1EE00}"', () => {
        expect(parseScript('\\u{1EE00}', {
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
            "body": [
              {
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
                  "type": "Identifier",
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
                  "name": "𞸀"
                }
              }
            ],
            "sourceType": "script"
          });
    });

});
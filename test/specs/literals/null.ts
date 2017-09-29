import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Literal - Null', () => {

    it('should parse null', () => {
        expect(parseScript('null', {
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
            "body": [
              {
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
                  "value": null,
                  "raw": "null"
                }
              }
            ],
            "sourceType": "script"
          });
    });
});
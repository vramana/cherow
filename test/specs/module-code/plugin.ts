import { parse, parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

// Our new plugin
const NewLiteral = (cherow: any): any => {
  
  cherow.parseLiteral = function(context: any) {
         const pos = this.getLocations();
         const value = this.tokenValue;
         const raw = this.tokenRaw;
 
         this.nextToken(context);
 
         const node = this.finishNode(pos, {
             type: 'NewLIteral',
             value
         });
 
         return node;
     }
 }

 
// Try to pase with the new plugin enabled
describe('Module - Export', () => {

      it('should export star', () => {
        expect(parseModule(`1`, {
            ranges: true,
            raw: true,
            locations: true,
            plugins: {
              NewLiteral
            }
        })).to.eql({
            "body": [
              {
                "end": 1,
                "expression": {
                  "end": 1,
                  "loc": {
                    "end": {
                     "column": 1,
                      "line": 1,
                    },
                    "start": {
                      "column": 0,
                      "line": 1,
                    }
                  },
                  "start": 0,
                  "type": "NewLIteral",
                  "value": 1,
                },
                "loc": {
                  "end": {
                    "column": 1,
                    "line": 1,
                  },
                  "start": {
                    "column": 0,
                    "line": 1,
                  },
                },
                "start": 0,
                "type": "ExpressionStatement",
              }
            ],
            "end": 1,
            "loc": {
              "end": {
                "column": 1,
                "line": 1,
              },
              "start": {
                "column": 0,
                "line": 1,
              }
            },
            "sourceType": "module",
            "start": 0,
            "type": "Program"
          });
    });
    });
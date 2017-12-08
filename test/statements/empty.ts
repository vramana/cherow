import { pass, fail } from '../utils';

describe('Statements - Empty', () => {
  
      pass(`;`, {
          source: ';',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
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
            "body": [
              {
                "type": "EmptyStatement",
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
                }
              }
            ],
            "sourceType": "script"
          }
      });
    });
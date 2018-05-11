import { pass } from '../test-utils';
import { Context } from 'cherow';
import * as t from 'assert';
import { parse } from '../../src/parser/parser';

describe('Arrow', () => {

  pass(`<T>(a: T) => a;`, Context.Strict | Context.Module, {
    source: `<T>(a: T) => a;`,
    expected: {
        "body": [
          {
            "expression": {
              "async": false,
              "body": {
                "name": "a",
                "type": "Identifier",
                "typeAnnotation": null,
              },
              "expression": true,
             "generator": false,
              "id": null,
              "params": undefined,
              "returnType": undefined,
              "type": "ArrowFunctionExpression",
              "typeParameters": null,
            },
            "type": "ExpressionStatement"
          },
        ],
        "sourceType": "module",
        "type": "Program"
      }
  });

  pass(`(x: number): number => x;`, Context.Strict | Context.Module, {
    source: `(foo: number): number => x;`,
    expected: {
        "body": [
          {
            "expression": {
              "async": false,
             "body": {
                "name": "x",
                "type": "Identifier",
                "typeAnnotation": null,
              },
              "expression": true,
              "generator": false,
              "id": null,
              "params": [
                {
                  "name": "foo",
                  "type": "Identifier",
                  "typeAnnotation": {
                                  "type": "TypeAnnotation",
                                  "typeAnnotation": {
                                    "type": "TSNumberKeyword"
                                  }
                                }
                }
              ],
              "returnType": {
                "type": "TypeAnnotation",
                "typeAnnotation": {
                  "type": "TSNumberKeyword",
                },
              },
              "type": "ArrowFunctionExpression",
              "typeParameters": null,
            },
            "type": "ExpressionStatement"
         }
        ],
        "sourceType": "module",
        "type": "Program"
      }
  });


  pass(`(x: number): number => x;`, Context.Strict | Context.Module, {
    source: `(): number => x;`,
    expected: {
        "body": [
          {
            "expression": {
              "async": false,
              "body": {
                "name": "x",
                "type": "Identifier",
                "typeAnnotation": null,
              },
              "expression": true,
              "generator": false,
              "id": null,
              "params": [],
              "returnType": {
               "loc": {
                  "end": {
                    "column": 10,
                    "line": 1
                 },
                  "start": {
                    "column": 2,
                    "line": 1,
                  }
                },
                "type": "TypeAnnotation",
                "typeAnnotation": {
                  "loc": {
                   "end": {
                      "column": 10,
                      "line": 1,
                    },
                    "start": {
                      "column": 4,
                      "line": 1,
                    }
                  },
                  "type": "TSNumberKeyword",
                },
              },
              "type": "ArrowFunctionExpression",
              "typeParameters": null,
            },
           "type": "ExpressionStatement"
          },
        ],
       "sourceType": "module",
        "type": "Program"
      }
  });
});

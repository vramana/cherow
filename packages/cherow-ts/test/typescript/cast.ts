import { pass } from '../test-utils';
import { Context } from 'cherow';
import * as t from 'assert';
import { parse } from '../../src/parser/parser';

describe('Cast', () => {
/*
  const validSyntax = [
    'const enum E {}',
];

for (const arg of validSyntax) {

    it(`${arg}`, () => {
        t.doesNotThrow(() => {
            parse(`${arg}`, undefined, Context.Strict | Context.Module);
        });
    });
}
*/
pass('x as any as T;', Context.Strict | Context.Module, {
  source: 'x as any as T;',
  expected: {
      "body": [
       {
          "expression": {
            "expression": {
              "expression": {
                "name": "x",
                "type": "Identifier",
              },
              "type": "AsExpression",
              "typeAnnotation": {
                "type": "TSAnyKeyword"
              }
            },
            "type": "AsExpression",
            "typeAnnotation": {
              "type": "TSTypeReference",
             "typeName": {
                "name": "T",
                "type": "Identifier",
              },
              "typeParameters": [],
            }
         },
          "type": "ExpressionStatement"
        },
      ],
      "sourceType": "module",
      "type": "Program"
    }
});

pass('x === 1 as number;', Context.Strict | Context.Module, {
  source: 'x === 1 as number;',
  expected: {
    "body": [
     {
        "expression": {
          "left": {
            "name": "x",
            "type": "Identifier"
          },
          "operator": "===",
          "right": {
            "expression": {
              "type": "Literal",
              "value": 1,
            },
            "type": "AsExpression",
            "typeAnnotation": {
              "type": "TSNumberKeyword"
            },
          },
          "type": "BinaryExpression",
        },
        "type": "ExpressionStatement"
     },
    ],
    "sourceType": "module",
    "type": "Program"
  }
});

pass('x as boolean < y ', Context.Strict | Context.Module, {
  source: 'x as T;',
  expected: {
      "body": [
       {
          "expression": {
            "expression": {
              "name": "x",
              "type": "Identifier",
            },
            "type": "AsExpression",
            "typeAnnotation": {
              "type": "TSTypeReference",
              "typeName": {
                "name": "T",
                "type": "Identifier",
              },
              "typeParameters": []
            }
          },
          "type": "ExpressionStatement"
        },
      ],
      "sourceType": "module",
      "type": "Program"
    }
});

pass('x as boolean < y ', Context.Strict | Context.Module, {
  source: 'x as boolean < y ',
  expected: {
      "body": [
        {
          "expression": {
            "left": {
              "expression": {
               "name": "x",
                "type": "Identifier"
              },
              "type": "AsExpression",
              "typeAnnotation": {
                "type": "TSBooleanKeyword"
              },
            },
            "operator": "<",
            "right": {
              "name": "y",
              "type": "Identifier"
            },
            "type": "BinaryExpression"
          },
          "type": "ExpressionStatement"
        },
      ],
      "sourceType": "module",
      "type": "Program"
    }
});

pass('x < y as boolean', Context.Strict | Context.Module, {
  source: 'x < y as boolean',
  expected: {
      "body": [
        {
          "expression": {
            "left": {
              "name": "x",
              "type": "Identifier"
           },
            "operator": "<",
            "right": {
              "expression": {
                "name": "y",
                "type": "Identifier"
             },
              "type": "AsExpression",
              "typeAnnotation": {
                "type": "TSBooleanKeyword"
              }
            },
            "type": "BinaryExpression"
          },
         "type": "ExpressionStatement"
        }
      ],
      "sourceType": "module",
      "type": "Program"
    }
});

});

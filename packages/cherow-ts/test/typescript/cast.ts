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


pass('(x as T).y;', Context.Strict | Context.Module, {
  source: '(x as T).y;',
  expected: {
      "body": [
        {
          "expression": {
            "computed": false,
            "object": {
              "expression": {
                "name": "x",
                "type": "Identifier"
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
            "property": {
              "name": "y",
              "type": "Identifier"
            },
            "type": "MemberExpression"
          },
          "type": "ExpressionStatement"
        },
      ],
      "sourceType": "module",
      "type": "Program"
    }
});

pass('(<T> x).y;', Context.Strict | Context.Module, {
  source: '(<T> x).y;',
  expected: {
      "body": [
        {
          "expression": {
            "computed": false,
            "object": {
              "expression": {
                "name": "x",
                "type": "Identifier"
              },
              "type": "TypeAssertion",
              "typeAnnotation": {
                "type": "TSTypeReference",
                "typeName": {
                  "name": "T",
                  "type": "Identifier",
                },
               "typeParameters": [],
              }
            },
            "property": {
              "name": "y",
              "type": "Identifier"
            },
            "type": "MemberExpression",
          },
          "type": "ExpressionStatement",
        },
      ],
      "sourceType": "module",
      "type": "Program",
    }
});

pass('<number> 1;', Context.Strict | Context.Module, {
  source: '<number> 1;',
  expected: {
      "body": [
        {
          "expression": {
            "expression": {
              "type": "Literal",
              "value": 1,
            },
            "type": "TypeAssertion",
           "typeAnnotation": {
              "type": "TSNumberKeyword",
            },
          },
          "type": "ExpressionStatement",
        },
      ],
      "sourceType": "module",
      "type": "Program"
    }
});

pass('<number> 1 + 1;', Context.Strict | Context.Module, {
  source: '<number> 1 + 1;',
  expected: {
      "body": [
        {
          "expression": {
           "left": {
              "expression": {
                "type": "Literal",
                "value": 1,
              },
              "type": "TypeAssertion",
              "typeAnnotation": {
                "type": "TSNumberKeyword",
              },
           },
            "operator": "+",
           "right": {
              "type": "Literal",
              "value": 1,
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

pass('1 + <number> 1;', Context.Strict | Context.Module, {
  source: '1 + <number> 1;',
  expected: {
      "body": [
        {
          "expression": {
            "left": {
              "type": "Literal",
              "value": 1,
            },
            "operator": "+",
            "right": {
              "expression": {
                "type": "Literal",
                "value": 1
              },
              "type": "TypeAssertion",
              "typeAnnotation": {
                 "type": "TSNumberKeyword"
               }
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

pass('x!.y;', Context.Strict | Context.Module, {
  source: 'x!.y;',
  expected: {
      "body": [
        {
          "expression": {
            "computed": false,
            "object": {
             "expression": {
                "name": "x",
                "type": "Identifier",
              },
              "type": "NonNullExpression",
            },
            "property": {
              "name": "y",
              "type": "Identifier",
            },
            "type": "MemberExpression",
          },
          "type": "ExpressionStatement",
        },
      ],
      "sourceType": "module",
      "type": "Program"
    }
});


pass('x!;', Context.Strict | Context.Module, {
source: 'x!;',
expected: {
    "body": [
      {
        "expression": {
          "type": "NonNullExpression",
          "expression": {
          "name": "x",
          "type": "Identifier",
          }
        },
        "type": "ExpressionStatement",
      },
    ],
    "sourceType": "module",
    "type": "Program"
  }
});

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

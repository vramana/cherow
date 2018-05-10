import { pass } from '../test-utils';
import { Context } from 'cherow';
import * as t from 'assert';
import { parse } from '../../src/parser/parser';

describe('Enum', () => {
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
pass('enum E { A, B = 0 }', Context.Strict | Context.Module, {
  source: 'enum E { A, B = 0 }',
  expected: {
      "body": [
        {
          "const": false,
          "id": {
            "name": "E",
            "type": "Identifier"
          },
         "members": [
            {
              "id": {
                "name": "A",
                "type": "Identifier",
             },
              "initializer": null,
              "type": "TSEnumMember"
            },
            {
              "id": {
                "name": "A",
                "type": "Identifier",
              },
              "initializer": null,
              "type": "TSEnumMember"
            },
            {
              "id": {
                "name": "B",
               "type": "Identifier",
              },
              "initializer": {
                "type": "Literal",
                "value": 0,
              },
              "type": "TSEnumMember"
            },
          ],
          "type": "TSEnumDeclaration"
        },
      ],
      "sourceType": "module",
      "type": "Program"
    }
});

pass('export const enum E {}', Context.Strict | Context.Module, {
  source: 'export const enum E {}',
  expected: {
      "body": [
       {
          "declaration": {
            "const": true,
            "id": {
              "name": "E",
              "type": "Identifier",
            },
            "members": [],
            "type": "TSEnumDeclaration",
          },
          "source": null,
          "specifiers": [],
          "type": "ExportNamedDeclaration",
        }
      ],
      "sourceType": "module",
      "type": "Program",
    }
});

pass('const enum E {}', Context.Strict | Context.Module, {
  source: 'const enum E {}',
  expected: {
      "body": [
       {
          "const": true,
          "id": {
            "name": "E",
            "type": "Identifier",
         },
          "members": [],
          "type": "TSEnumDeclaration",
        },
      ],
      "sourceType": "module",
      "type": "Program"
    }
});

pass('export enum E {}', Context.Strict | Context.Module, {
  source: 'export enum E {}',
  expected: {
      "body": [
        {
          "declaration": {
            "const": false,
            "id": {
              "name": "E",
              "type": "Identifier",
            },
            "members": [],
            "type": "TSEnumDeclaration",
          },
         "source": null,
          "specifiers": [],
          "type": "ExportNamedDeclaration"
        }
      ],
      "sourceType": "module",
      "type": "Program"
    }
});

pass('enum E { A, }', Context.Strict | Context.Module, {
  source: 'enum E { A, }',
  expected: {
      "body": [
        {
          "const": false,
          "id": {
            "name": "E",
            "type": "Identifier"
          },
          "members": [
            {
              "id": {
                "name": "A",
                "type": "Identifier",
              },
              "initializer": null,
              "type": "TSEnumMember"
            },
            {
              "id": {
                "name": "A",
                "type": "Identifier",
              },
              "initializer": null,
              "type": "TSEnumMember"
            },
          ],
          "type": "TSEnumDeclaration"
        }
      ],
     "sourceType": "module",
      "type": "Program"
    }
});

pass('enum E { A = 0, }', Context.Strict | Context.Module, {
  source: 'enum E { A = 0, }',
  expected: {
      "body": [
        {
          "const": false,
         "id": {
            "name": "E",
           "type": "Identifier",
          },
          "members": [
            {
              "id": {
                "name": "A",
                "type": "Identifier",
              },
              "initializer": {
               "type": "Literal",
                "value": 0,
              },
              "type": "TSEnumMember"
            },
            {
              "id": {
               "name": 0,
                "type": "Identifier",
              },
              "initializer": null,
              "type": "TSEnumMember"
            }
          ],
          "type": "TSEnumDeclaration"
        }
      ],
      "sourceType": "module",
      "type": "Program"
    }
});

pass('enum E {"foo","bar" = 1 }', Context.Strict | Context.Module, {
  source: 'enum E {"foo","bar" = 1 }',
  expected: {
      "body": [
        {
          "const": false,
          "id": {
           "name": "E",
            "type": "Identifier",
          },
          "members": [
            {
              "id": {
                "type": "Literal",
                "value": "foo",
             },
              "initializer": null,
              "type": "TSEnumMember",
            },
            {
              "id": {
                "name": "foo",
                "type": "Identifier",
              },
              "initializer": null,
              "type": "TSEnumMember"
            },
            {
              "id": {
                "type": "Literal",
                "value": "bar",
              },
              "initializer": {
                "type": "Literal",
                "value": 1,
              },
              "type": "TSEnumMember"
            }
         ],
          "type": "TSEnumDeclaration",
        },
      ],
      "sourceType": "module",
      "type": "Program"
    }
});

pass('declare enum E {}', Context.Strict | Context.Module, {
  source: 'declare enum E {}',
  expected: {
      "body": [
        {
          "const": false,
          "id": {
            "name": "E",
            "type": "Identifier",
          },
          "members": [],
         "type": "TSEnumDeclaration",
        },
      ],
      "sourceType": "module",
      "type": "Program"
    }
});

pass('declare const enum E {}', Context.Strict | Context.Module, {
  source: 'declare const enum E {}',
  expected: {
      "body": [
        {
          "const": true,
          "id": {
            "name": "E",
            "type": "Identifier",
          },
          "members": [],
          "type": "TSEnumDeclaration",
       },
      ],
      "sourceType": "module",
      "type": "Program"
    }
});

});

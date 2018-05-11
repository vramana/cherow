import { pass } from '../test-utils';
import { Context } from 'cherow';
import * as t from 'assert';
import { parse } from '../../src/parser/parser';

describe('Import', () => {

  pass('export import a = require("a");', Context.Strict | Context.Module, {
    source: 'export import a = require("a");',
    expected: {
        "body": [
         {
            "declaration": {
              "id": {
                "name": "a",
                "type": "Identifier",
              },
             "isExport": true,
              "moduleReference": {
                "expression": {
                  "type": "Literal",
                  "value": "a",
                },
                "type": "TSExternalModuleReference"
             },
              "type": "TSImportEqualsDeclaration",
            },
            "source": null,
            "specifiers": [],
            "type": "ExportNamedDeclaration",
          },
        ],
       "sourceType": "module",
        "type": "Program"
      }
  });

  pass('declare module "m" { import * as a from "a"; }', Context.Strict | Context.Module, {
    source:  'declare module "m" { import * as a from "a"; }',
    expected: {
        "body": [
          {
            "body": {
              "body": [
                {
                 "source": {
                    "type": "Literal",
                    "value": "a",
                  },
                  "specifiers": [
                    {
                      "local": {
                        "name": "a",
                        "optional": false,
                       "type": "Identifier",
                        "typeAnnotation": null,
                     },
                      "type": "ImportNamespaceSpecifier",
                    },
                  ],
                  "type": "ImportDeclaration",
                },
              ],
              "type": "TSModuleBlock",
            },
            "global": false,
            "id": {
              "type": "Literal",
              "value": "m",
            },
            "type": "TSModuleDeclaration ",
          },
        ],
        "sourceType": "module",
        "type": "Program"
      }
  });

pass('export import A = B.C;', Context.Strict | Context.Module, {
  source:  'export import A = B.C;',
  expected: {
      "body": [
        {
          "declaration": {
           "id": {
              "name": "A",
              "type": "Identifier"
            },
            "isExport": true,
            "moduleReference": {
              "left": {
                "name": "B",
                "type": "Identifier"
              },
              "right": {
                "name": "C",
                "type": "Identifier"
              },
              "type": "TSQualifiedName",
            },
            "type": "TSImportEqualsDeclaration",
          },
          "source": null,
          "specifiers": [],
         "type": "ExportNamedDeclaration"
        },
      ],
      "sourceType": "module",
      "type": "Program"
    }
});

pass('import A = B.C;', Context.Strict | Context.Module, {
    source:  'import A = B.C;',
    expected: {
        "body": [
          {
            "id": {
              "name": "A",
             "type": "Identifier",
            },
            "isExport": false,
            "moduleReference": {
              "left": {
                "name": "B",
                "type": "Identifier",
              },
              "right": {
                "name": "C",
                "type": "Identifier",
              },
              "type": "TSQualifiedName",
            },
            "type": "TSImportEqualsDeclaration",
          },
        ],
        "sourceType": "module",
        "type": "Program"
      }
});

pass('import a = require("a");', Context.Strict | Context.Module, {
  source:  'import a = require("a");',
  expected: {
      "body": [
        {
          "id": {
            "name": "a",
            "type": "Identifier",
          },
          "isExport": false,
          "moduleReference": {
            "expression": {
              "type": "Literal",
              "value": "a"
            },
            "type": "TSExternalModuleReference"
          },
          "type": "TSImportEqualsDeclaration"
        }
      ],
      "sourceType": "module",
      "type": "Program"
    }
});
});

import { pass } from '../test-utils';
import { Context } from 'cherow';
import * as t from 'assert';
import { parse } from '../../src/parser/parser';

describe('Module namespace', () => {
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
pass('namespace A { namespace B { } }', Context.Strict | Context.Module, {
  source: 'namespace A { namespace B { } }',
  expected: {
      "body": [
       {
          "body": {
            "body": [
              {
                "body": {
                  "body": [],
                  "type": "TSModuleBlock"
                },
                "id": {
                  "name": "B",
                  "type": "Identifier"
                },
                "type": "TSModuleDeclaration "
              }
            ],
            "type": "TSModuleBlock"
          },
          "id": {
            "name": "A",
            "type": "Identifier"
          },
          "type": "TSModuleDeclaration "
        }
     ],
      "sourceType": "module",
      "type": "Program"
    }
});

/*pass('declare module "m" { global { var x: number; }}', Context.Strict | Context.Module, {
  source: 'declare module "m" { global { var x: number; }}',
  expected: {}
});

pass('export module X {}', Context.Strict | Context.Module, {
  source: 'export module X {}',
  expected:  {}
});

pass('export module X {}', Context.Strict | Context.Module, {
  source: 'export module X {}',
  expected:  {}
});
*/
pass('namespace M.N.O {}', Context.Strict | Context.Module, {
  source: 'namespace M.N.O {}',
  expected:  {
      "body": [
        {
          "body": {
            "body": {
              "body": {
                "body": [],
                "type": "TSModuleBlock",
              },
              "id": {
                "name": "O",
                "type": "Identifier",
              },
              "type": "TSModuleDeclaration "
            },
            "id": {
              "name": "N",
              "type": "Identifier"
            },
            "type": "TSModuleDeclaration "
          },
          "id": {
            "name": "M",
            "type": "Identifier"
          },
          "type": "TSModuleDeclaration "
        },
      ],
      "sourceType": "module",
      "type": "Program"
    }
});

pass('namespace N {}', Context.Strict | Context.Module, {
  source: 'namespace N {}',
  expected:  {
      "body": [
        {
          "body": {
            "body": [],
            "type": "TSModuleBlock"
          },
          "id": {
            "name": "N",
            "type": "Identifier"
          },
          "type": "TSModuleDeclaration "
        },
      ],
      "sourceType": "module",
      "type": "Program"
    }
});

pass('declare global {}', Context.Strict | Context.Module, {
  source: 'declare global {}',
  expected:  {
      "body": [
       {
          "body": {
           "body": [],
            "type": "TSModuleBlock"
          },
          "global": true,
          "id": {
            "name": "global",
            "type": "Identifier"
          },
          "type": "TSModuleDeclaration "
        }
      ],
      "sourceType": "module",
      "type": "Program"
    }
});

pass('declare module "m" {}', Context.Strict | Context.Module, {
  source: 'declare module "m" {}',
  expected: {
      "body": [
        {
          "body": {
            "body": [],
            "type": "TSModuleBlock"
          },
          "global": false,
          "id": {
            "type": "Literal",
            "value": "m",
          },
          "type": "TSModuleDeclaration "
        }
      ],
      "sourceType": "module",
      "type": "Program"
    }
});

pass('declare module M {}', Context.Strict | Context.Module, {
  source: 'declare module M {}',
  expected: {
      "body": [
        {
          "body": {
            "body": [],
            "type": "TSModuleBlock"
          },
          "id": {
            "name": "M",
            "type": "Identifier"
          },
          "type": "TSModuleDeclaration ",
        },
      ],
      "sourceType": "module",
      "type": "Program"
    }
});

pass('declare namespace N.M {}', Context.Strict | Context.Module, {
  source: 'declare namespace N.M {}',
  expected: {
      "body": [
        {
          "body": {
            "body": {
              "body": [],
              "type": "TSModuleBlock"
            },
            "id": {
              "name": "M",
              "type": "Identifier"
            },
            "type": "TSModuleDeclaration ",
          },
          "id": {
            "name": "N",
            "type": "Identifier"
         },
          "type": "TSModuleDeclaration "
        },
      ],
      "sourceType": "module",
      "type": "Program"
    }
});


pass('declare module "m";', Context.Strict | Context.Module, {
  source: 'declare module "m";',
  expected: {
      "body": [
        {
          "body": null,
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

pass('namespace N { const x = 0; }', Context.Strict | Context.Module, {
  source: 'namespace N { const x = 0; }',
  expected: {
      "body": [
        {
          "body": {
            "body": [
             {
                "declarations": [
                  {
                    "id": {
                      "name": "x",
                      "type": "Identifier",
                      "typeAnnotation": null,
                    },
                    "init": {
                      "type": "Literal",
                      "value": 0,
                    },
                    "type": "VariableDeclarator",
                  }
                ],
                "kind": "const",
                "declared": false,
                "type": "VariableDeclaration",
              }
            ],
            "type": "TSModuleBlock",
          },
          "id": {
            "name": "N",
            "type": "Identifier",
          },
         "type": "TSModuleDeclaration ",
        },
      ],
      "sourceType": "module",
      "type": "Program"
    }
});

pass('declare namespace A { namespace B { var x: number; } }', Context.Strict | Context.Module, {
  source: 'declare namespace A { namespace B { var x: number; } }',
  expected: {
      "body": [
        {
          "body": {
            "body": [
              {
                "body": {
                  "body": [
                   {
                      "declarations": [
                        {
                          "id": {
                           "name": "x",
                            "type": "Identifier",
                            "typeAnnotation": {
                              "type": "TypeAnnotation",
                              "typeAnnotation": {
                                "type": "TSNumberKeyword",
                              }
                            }
                          },
                         "init": null,
                          "type": "VariableDeclarator"
                        }
                      ],
                      "kind": "var",
                      "declared": true,
                      "type": "VariableDeclaration",
                    }
                  ],
                  "type": "TSModuleBlock",
                },
                "id": {
                  "name": "B",
                  "type": "Identifier",
                },
                "type": "TSModuleDeclaration ",
              },
            ],
            "type": "TSModuleBlock",
          },
          "id": {
           "name": "A",
            "type": "Identifier",
          },
          "type": "TSModuleDeclaration "
        }
      ],
      "sourceType": "module",
      "type": "Program"
    }
});

pass('declare namespace N { var x: number; }', Context.Strict | Context.Module, {
  source: 'declare namespace N { var x: number; }',
  expected: {
      "body": [
        {
          "body": {
            "body": [
              {
                "declarations": [
                  {
                   "id": {
                      "name": "x",
                      "type": "Identifier",
                      "typeAnnotation": {
                        "type": "TypeAnnotation",
                        "typeAnnotation": {
                          "type": "TSNumberKeyword"
                        }
                      }
                    },
                    "init": null,
                    "type": "VariableDeclarator"
                  }
                ],
               "kind": "var",
               "declared": true,
                "type": "VariableDeclaration"
              }
            ],
            "type": "TSModuleBlock"
          },
          "id": {
            "name": "N",
            "type": "Identifier"
          },
          "type": "TSModuleDeclaration "
        }
      ],
     "sourceType": "module",
      "type": "Program"
    }
});

});

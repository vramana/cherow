import { Context } from "../../../src/common";
import { pass, fail } from "../../test-utils";

describe("Expressions - Unary", () => {});

fail("Expressions - Unary (fail)", [
  ["delete async; () => x;", Context.Strict],
  // ['delete async \n (a) => x', Context.Strict],
  ["delete async; () => x;", Context.Strict],
  ["delete async; () => x;", Context.Strict],
  ['"use strict"; delete foo;', Context.Strict],
  ['"use strict"; delete foo + 1;', Context.Strict],
  ['"use strict"; delete eval;', Context.Strict],
  ['"use strict"; delete (foo);', Context.Strict],
  ['"use strict"; delete interface;', Context.Strict]
  // ['typeof async () => x', Context.Empty],
  // ['typeof async \n () => x', Context.Empty],
  // ['let x = typeof async \n (x) => x', Context.Empty],
  // ['let x = typeof async (x) \n => x', Context.Empty],
  // ['delete async \n () => x', Context.Empty],
  // ['delete async () \n => x', Context.Empty],
  // ['let x = delete async \n (x) => x', Context.Empty],
  // ['let x = delete async (x) \n => x', Context.Empty]
]);

pass("Expressions - Unary (pass)", [
  [
    '"use strict"; delete this;',
    Context.OptionsDirectives | Context.OptionsRaw,
    {
      type: "Program",
      sourceType: "script",
      body: [
        {
          type: "ExpressionStatement",
          expression: {
            type: "Literal",
            value: "use strict"
          },
          directive: "use strict"
        },
        {
          type: "ExpressionStatement",
          expression: {
            type: "UnaryExpression",
            operator: "delete",
            argument: {
              type: "ThisExpression"
            },
            prefix: true
          }
        }
      ]
    }
  ],
  [
    '"use strict"; delete 1;',
    Context.OptionsDirectives | Context.OptionsRaw,
    {
      type: "Program",
      sourceType: "script",
      body: [
        {
          type: "ExpressionStatement",
          expression: {
            type: "Literal",
            value: "use strict"
          },
          directive: "use strict"
        },
        {
          type: "ExpressionStatement",
          expression: {
            type: "UnaryExpression",
            operator: "delete",
            argument: {
              type: "Literal",
              value: 1
            },
            prefix: true
          }
        }
      ]
    }
  ],
  [
    '"use strict"; delete 1 + 2;',
    Context.OptionsDirectives | Context.OptionsRaw,
    {
      type: "Program",
      sourceType: "script",
      body: [
        {
          type: "ExpressionStatement",
          expression: {
            type: "Literal",
            value: "use strict"
          },
          directive: "use strict"
        },
        {
          type: "ExpressionStatement",
          expression: {
            type: "BinaryExpression",
            left: {
              type: "UnaryExpression",
              operator: "delete",
              argument: {
                type: "Literal",
                value: 1
              },
              prefix: true
            },
            right: {
              type: "Literal",
              value: 2
            },
            operator: "+"
          }
        }
      ]
    }
  ],
  [
    '"use strict"; delete foo();',
    Context.OptionsDirectives | Context.OptionsRaw,
    {
      type: "Program",
      sourceType: "script",
      body: [
        {
          type: "ExpressionStatement",
          expression: {
            type: "Literal",
            value: "use strict"
          },
          directive: "use strict"
        },
        {
          type: "ExpressionStatement",
          expression: {
            type: "UnaryExpression",
            operator: "delete",
            argument: {
              type: "CallExpression",
              callee: {
                type: "Identifier",
                name: "foo"
              },
              arguments: []
            },
            prefix: true
          }
        }
      ]
    }
  ],
  [
    '"use strict"; delete foo.bar;',
    Context.OptionsDirectives | Context.OptionsRaw,
    {
      type: "Program",
      sourceType: "script",
      body: [
        {
          type: "ExpressionStatement",
          expression: {
            type: "Literal",
            value: "use strict"
          },
          directive: "use strict"
        },
        {
          type: "ExpressionStatement",
          expression: {
            type: "UnaryExpression",
            operator: "delete",
            argument: {
              type: "MemberExpression",
              object: {
                type: "Identifier",
                name: "foo"
              },
              computed: false,
              property: {
                type: "Identifier",
                name: "bar"
              }
            },
            prefix: true
          }
        }
      ]
    }
  ],
  [
    '"use strict"; delete --foo;',
    Context.OptionsDirectives | Context.OptionsRaw,
    {
      type: "Program",
      sourceType: "script",
      body: [
        {
          type: "ExpressionStatement",
          expression: {
            type: "Literal",
            value: "use strict"
          },
          directive: "use strict"
        },
        {
          type: "ExpressionStatement",
          expression: {
            type: "UnaryExpression",
            operator: "delete",
            argument: {
              type: "UpdateExpression",
              argument: {
                type: "Identifier",
                name: "foo"
              },
              operator: "--",
              prefix: true
            },
            prefix: true
          }
        }
      ]
    }
  ],
  [
    '"use strict"; delete new foo();',
    Context.OptionsDirectives | Context.OptionsRaw,
    {
      type: "Program",
      sourceType: "script",
      body: [
        {
          type: "ExpressionStatement",
          expression: {
            type: "Literal",
            value: "use strict"
          },
          directive: "use strict"
        },
        {
          type: "ExpressionStatement",
          expression: {
            type: "UnaryExpression",
            operator: "delete",
            argument: {
              type: "NewExpression",
              callee: {
                type: "Identifier",
                name: "foo"
              },
              arguments: []
            },
            prefix: true
          }
        }
      ]
    }
  ],
  [
    '"use strict"; delete new foo(bar);',
    Context.OptionsDirectives | Context.OptionsRaw,
    {
      type: "Program",
      sourceType: "script",
      body: [
        {
          type: "ExpressionStatement",
          expression: {
            type: "Literal",
            value: "use strict"
          },
          directive: "use strict"
        },
        {
          type: "ExpressionStatement",
          expression: {
            type: "UnaryExpression",
            operator: "delete",
            argument: {
              type: "NewExpression",
              callee: {
                type: "Identifier",
                name: "foo"
              },
              arguments: [
                {
                  type: "Identifier",
                  name: "bar"
                }
              ]
            },
            prefix: true
          }
        }
      ]
    }
  ],

  [
    "delete obj.$$hashKey;",
    Context.Empty,
    {
      body: [
        {
          expression: {
            argument: {
              computed: false,
              object: {
                name: "obj",
                type: "Identifier"
              },
              property: {
                name: "$$hashKey",
                type: "Identifier"
              },
              type: "MemberExpression"
            },
            operator: "delete",
            prefix: true,
            type: "UnaryExpression"
          },
          type: "ExpressionStatement"
        }
      ],
      sourceType: "script",
      type: "Program"
    }
  ],
  [
    "delete async",
    Context.Empty,
    {
      type: "Program",
      body: [
        {
          type: "ExpressionStatement",
          expression: {
            type: "UnaryExpression",
            operator: "delete",
            argument: {
              type: "Identifier",
              name: "async"
            },
            prefix: true
          }
        }
      ],
      sourceType: "script"
    }
  ],
  [
    "delete x.y",
    Context.Empty,
    {
      type: "Program",
      body: [
        {
          type: "ExpressionStatement",
          expression: {
            type: "UnaryExpression",
            operator: "delete",
            argument: {
              type: "MemberExpression",
              computed: false,
              object: {
                type: "Identifier",
                name: "x"
              },
              property: {
                type: "Identifier",
                name: "y"
              }
            },
            prefix: true
          }
        }
      ],
      sourceType: "script"
    }
  ],
  [
    "typeof async",
    Context.Empty,
    {
      type: "Program",
      body: [
        {
          type: "ExpressionStatement",
          expression: {
            type: "UnaryExpression",
            operator: "typeof",
            argument: {
              type: "Identifier",
              name: "async"
            },
            prefix: true
          }
        }
      ],
      sourceType: "script"
    }
  ]
]);

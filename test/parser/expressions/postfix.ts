import { Context } from "../../../src/common";
import { pass, fail } from "../../test-utils";

describe("Expressions - Postfix", () => {});

fail("Expressions - Template", [
  ["this.foo[foo].bar(this)(bar)[foo]()--", Context.Empty],
  ["foo[bar]()--", Context.Empty]
]);

pass("Expressions - Postfix (pass)", [
  [
    "foo.bar--",
    Context.Empty,
    {
      type: "Program",
      sourceType: "script",
      body: [
        {
          type: "ExpressionStatement",
          expression: {
            type: "UpdateExpression",
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
            operator: "--",
            prefix: false
          }
        }
      ]
    }
  ],
  [
    "new foo().bar--",
    Context.Empty,
    {
      type: "Program",
      sourceType: "script",
      body: [
        {
          type: "ExpressionStatement",
          expression: {
            type: "UpdateExpression",
            argument: {
              type: "MemberExpression",
              object: {
                type: "NewExpression",
                callee: {
                  type: "Identifier",
                  name: "foo"
                },
                arguments: []
              },
              computed: false,
              property: {
                type: "Identifier",
                name: "bar"
              }
            },
            operator: "--",
            prefix: false
          }
        }
      ]
    }
  ],
  [
    "x--",
    Context.Empty,
    {
      type: "Program",
      sourceType: "script",
      body: [
        {
          type: "ExpressionStatement",
          expression: {
            type: "UpdateExpression",
            argument: {
              type: "Identifier",
              name: "x"
            },
            operator: "--",
            prefix: false
          }
        }
      ]
    }
  ],
  [
    "x++",
    Context.Empty,
    {
      type: "Program",
      sourceType: "script",
      body: [
        {
          type: "ExpressionStatement",
          expression: {
            type: "UpdateExpression",
            argument: {
              type: "Identifier",
              name: "x"
            },
            operator: "++",
            prefix: false
          }
        }
      ]
    }
  ]
]);

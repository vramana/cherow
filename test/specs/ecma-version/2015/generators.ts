import { n, test } from '../../utils/test-utils';

describe("ES2015 - Generators", () => {

    test("function* f([x, y, z]) {}", {
            type: "Program",
            sourceType: "script",
            body: [
                {
                    type: "FunctionDeclaration",
                    params: [
                        {
                            type: "ArrayPattern",
                            elements: [
                                {
                                    type: "Identifier",
                                    name: "x",
                                },
                                {
                                    type: "Identifier",
                                    name: "y",
                                },
                                {
                                    type: "Identifier",
                                    name: "z",
                                },
                            ],
                        },
                    ],
                    body: {
                        type: "BlockStatement",
                        body: [],
                    },
                    async: false,
                    generator: true,
                    expression: false,
                    id: {
                        type: "Identifier",
                        name: "f",
                    },
                },
            ],
        });

    test("function* f([[...x] = function() {  }()]) {}", {
            type: "Program",
            sourceType: "script",
            body: [
                {
                    type: "FunctionDeclaration",
                    params: [
                        {
                            type: "ArrayPattern",
                            elements: [
                                {
                                    type: "AssignmentPattern",
                                    left: {
                                        type: "ArrayPattern",
                                        elements: [
                                            {
                                                type: "RestElement",
                                                argument: {
                                                    type: "Identifier",
                                                    name: "x",
                                                },
                                            },
                                        ],
                                    },
                                    right: {
                                        type: "CallExpression",
                                        arguments: [],
                                        callee: {
                                            type: "FunctionExpression",
                                            params: [],
                                            body: {
                                                type: "BlockStatement",
                                                body: [],
                                            },
                                            async: false,
                                            generator: false,
                                            expression: false,
                                            id: null,
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                    body: {
                        type: "BlockStatement",
                        body: [],
                    },
                    async: false,
                    generator: true,
                    expression: false,
                    id: {
                        type: "Identifier",
                        name: "f",
                    },
                },
            ],
        });

    test("function* f([x]) {}", {
            type: "Program",
            sourceType: "script",
            body: [
                {
                    type: "FunctionDeclaration",
                    params: [
                        {
                            type: "ArrayPattern",
                            elements: [
                                {
                                    type: "Identifier",
                                    name: "x",
                                },
                            ],
                        },
                    ],
                    body: {
                        type: "BlockStatement",
                        body: [],
                    },
                    async: false,
                    generator: true,
                    expression: false,
                    id: {
                        type: "Identifier",
                        name: "f",
                    },
                },
            ],
        });

     test("function* f([x, y, z] = [1, 2, 3]) {}", {
            type: "Program",
            sourceType: "script",
            body: [
                {
                    type: "FunctionDeclaration",
                    params: [
                        {
                            type: "AssignmentPattern",
                            left: {
                                type: "ArrayPattern",
                                elements: [
                                    {
                                        type: "Identifier",
                                        name: "x",
                                    },
                                    {
                                        type: "Identifier",
                                        name: "y",
                                    },
                                    {
                                        type: "Identifier",
                                        name: "z",
                                    },
                                ],
                            },
                            right: {
                                type: "ArrayExpression",
                                elements: [
                                    {
                                        type: "Literal",
                                        value: 1,
                                    },
                                    {
                                        type: "Literal",
                                        value: 2,
                                    },
                                    {
                                        type: "Literal",
                                        value: 3,
                                    },
                                ],
                            },
                        },
                    ],
                    body: {
                        type: "BlockStatement",
                        body: [],
                    },
                    async: false,
                    generator: true,
                    expression: false,
                    id: {
                        type: "Identifier",
                        name: "f",
                    },
                },
            ],
        });

    test("function* f([fn = function () {}, xFn = function x() {}] = []) {}",
            {
                type: "Program",
                sourceType: "script",
                body: [
                    {
                        type: "FunctionDeclaration",
                        params: [
                            {
                                type: "AssignmentPattern",
                                left: {
                                    type: "ArrayPattern",
                                    elements: [
                                        {
                                            type: "AssignmentPattern",
                                            left: {
                                                type: "Identifier",
                                                name: "fn",
                                            },
                                            right: {
                                                type: "FunctionExpression",
                                                params: [],
                                                body: {
                                                    type: "BlockStatement",
                                                    body: [],
                                                },
                                                async: false,
                                                generator: false,
                                                expression: false,
                                                id: null,
                                            },
                                        },
                                        {
                                            type: "AssignmentPattern",
                                            left: {
                                                type: "Identifier",
                                                name: "xFn",
                                            },
                                            right: {
                                                type: "FunctionExpression",
                                                params: [],
                                                body: {
                                                    type: "BlockStatement",
                                                    body: [],
                                                },
                                                async: false,
                                                generator: false,
                                                expression: false,
                                                id: {
                                                    type: "Identifier",
                                                    name: "x",
                                                },
                                            },
                                        },
                                    ],
                                },
                                right: {
                                    type: "ArrayExpression",
                                    elements: [],
                                },
                            },
                        ],
                        body: {
                            type: "BlockStatement",
                            body: [],
                        },
                        async: false,
                        generator: true,
                        expression: false,
                        id: {
                            type: "Identifier",
                            name: "f",
                        },
                    },
                ],
            });

    test("function* a(){}", {
            type: "Program",
            body: [
                {
                    type: "FunctionDeclaration",
                    id: {
                        type: "Identifier",
                        name: "a",
                    },
                    params: [],
                    body: {
                        type: "BlockStatement",
                        body: [],
                    },
                    generator: true,
                    expression: false,
                    async: false,
                },
            ],
            sourceType: "script",
        });

      test("function* a(){({[yield]:a}=0)}", {
            type: "Program",
            body: [
                {
                    type: "FunctionDeclaration",
                    id: {
                        type: "Identifier",
                        name: "a",
                    },
                    params: [],
                    body: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "ExpressionStatement",
                                expression: {
                                    type: "AssignmentExpression",
                                    operator: "=",
                                    left: {
                                        type: "ObjectPattern",
                                        properties: [
                                            {
                                                type: "Property",
                                                key: {
                                                    type: "YieldExpression",
                                                    argument: null,
                                                    delegate: false,
                                                },
                                                computed: true,
                                                value: {
                                                    type: "Identifier",
                                                    name: "a",
                                                },
                                                kind: "init",
                                                method: false,
                                                shorthand: false,
                                            },
                                        ],
                                    },
                                    right: {
                                        type: "Literal",
                                        value: 0,
                                    },
                                },
                            },
                        ],
                    },
                    generator: true,
                    expression: false,
                    async: false,
                },
            ],
            sourceType: "script",
        });

    test("function* a() {} function a() {}", {
            type: "Program",
            body: [
                {
                    type: "FunctionDeclaration",
                    id: {
                        type: "Identifier",
                        name: "a",
                    },
                    params: [],
                    body: {
                        type: "BlockStatement",
                        body: [],
                    },
                    generator: true,
                    expression: false,
                    async: false,
                },
                {
                    type: "FunctionDeclaration",
                    id: {
                        type: "Identifier",
                        name: "a",
                    },
                    params: [],
                    body: {
                        type: "BlockStatement",
                        body: [],
                    },
                    generator: false,
                    expression: false,
                    async: false,
                },
            ],
            sourceType: "script",
        });

    test("function a() { function* a() {} function a() {} }", {
            type: "Program",
            body: [
                {
                    type: "FunctionDeclaration",
                    id: {
                        type: "Identifier",
                        name: "a",
                    },
                    params: [],
                    body: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "FunctionDeclaration",
                                id: {
                                    type: "Identifier",
                                    name: "a",
                                },
                                params: [],
                                body: {
                                    type: "BlockStatement",
                                    body: [],
                                },
                                generator: true,
                                expression: false,
                                async: false,
                            },
                            {
                                type: "FunctionDeclaration",
                                id: {
                                    type: "Identifier",
                                    name: "a",
                                },
                                params: [],
                                body: {
                                    type: "BlockStatement",
                                    body: [],
                                },
                                generator: false,
                                expression: false,
                                async: false,
                            },
                        ],
                    },
                    generator: false,
                    expression: false,
                    async: false,
                },
            ],
            sourceType: "script",
        });

    test("({ *foo(x, y, z) {} })", {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ObjectExpression",
                        properties: [
                            {
                                type: "Property",
                                key: {
                                    type: "Identifier",
                                    name: "foo",
                                },
                                computed: false,
                                value: {
                                    type: "FunctionExpression",
                                    id: null,
                                    params: [
                                        {
                                            type: "Identifier",
                                            name: "x",
                                        },
                                        {
                                            type: "Identifier",
                                            name: "y",
                                        },
                                        {
                                            type: "Identifier",
                                            name: "z",
                                        },
                                    ],
                                    body: {
                                        type: "BlockStatement",
                                        body: [],
                                    },
                                    generator: true,
                                    expression: false,
                                    async: false,
                                },
                                kind: "init",
                                method: true,
                                shorthand: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });

    test("({ *foo() { yield 3; } })", {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ObjectExpression",
                        properties: [
                            {
                                type: "Property",
                                key: {
                                    type: "Identifier",
                                    name: "foo",
                                },
                                computed: false,
                                value: {
                                    type: "FunctionExpression",
                                    id: null,
                                    params: [],
                                    body: {
                                        type: "BlockStatement",
                                        body: [
                                            {
                                                type: "ExpressionStatement",
                                                expression: {
                                                    type: "YieldExpression",
                                                    argument: {
                                                        type: "Literal",
                                                        value: 3,
                                                    },
                                                    delegate: false,
                                                },
                                            },
                                        ],
                                    },
                                    generator: true,
                                    expression: false,
                                    async: false,
                                },
                                kind: "init",
                                method: true,
                                shorthand: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });

    test("({ *foo() { yield; } })", {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ObjectExpression",
                        properties: [
                            {
                                type: "Property",
                                key: {
                                    type: "Identifier",
                                    name: "foo",
                                },
                                computed: false,
                                value: {
                                    type: "FunctionExpression",
                                    id: null,
                                    params: [],
                                    body: {
                                        type: "BlockStatement",
                                        body: [
                                            {
                                                type: "ExpressionStatement",
                                                expression: {
                                                    type: "YieldExpression",
                                                    argument: null,
                                                    delegate: false,
                                                },
                                            },
                                        ],
                                    },
                                    generator: true,
                                    expression: false,
                                    async: false,
                                },
                                kind: "init",
                                method: true,
                                shorthand: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });

    test("class Foo { static *foo() {} }", {
            type: "Program",
            body: [
                {
                    type: "ClassDeclaration",
                    id: {
                        type: "Identifier",
                        name: "Foo",
                    },
                    superClass: null,
                    body: {
                        type: "ClassBody",
                        body: [
                            {
                                type: "MethodDefinition",
                                key: {
                                    type: "Identifier",
                                    name: "foo",
                                },
                                computed: false,
                                value: {
                                    type: "FunctionExpression",
                                    id: null,
                                    params: [],
                                    body: {
                                        type: "BlockStatement",
                                        body: [],
                                    },
                                    expression: false,
                                    generator: true,
                                    async: false,
                                },
                                kind: "method",
                                static: true,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });

    test("function *foo(x, y, z) {}", {
            type: "Program",
            body: [
                {
                    type: "FunctionDeclaration",
                    id: {
                        type: "Identifier",
                        name: "foo",
                    },
                    params: [
                        {
                            type: "Identifier",
                            name: "x",
                        },
                        {
                            type: "Identifier",
                            name: "y",
                        },
                        {
                            type: "Identifier",
                            name: "z",
                        },
                    ],
                    body: {
                        type: "BlockStatement",
                        body: [],
                    },
                    generator: true,
                    expression: false,
                    async: false,
                },
            ],
            sourceType: "script",
        });

    test("function *foo() { yield* 3; }", {
            type: "Program",
            body: [
                {
                    type: "FunctionDeclaration",
                    id: {
                        type: "Identifier",
                        name: "foo",
                    },
                    params: [],
                    body: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "ExpressionStatement",
                                expression: {
                                    type: "YieldExpression",
                                    argument: {
                                        type: "Literal",
                                        value: 3,
                                    },
                                    delegate: true,
                                },
                            },
                        ],
                    },
                    generator: true,
                    expression: false,
                    async: false,
                },
            ],
            sourceType: "script",
        });

    test("function *foo() {}", {
            type: "Program",
            body: [
                {
                    type: "FunctionDeclaration",
                    id: {
                        type: "Identifier",
                        name: "foo",
                    },
                    params: [],
                    body: {
                        type: "BlockStatement",
                        body: [],
                    },
                    generator: true,
                    expression: false,
                    async: false,
                },
            ],
            sourceType: "script",
        });

    test("(function*(...x) {})", {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "FunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "RestElement",
                                argument: {
                                    type: "Identifier",
                                    name: "x",
                                },
                            },
                        ],
                        body: {
                            type: "BlockStatement",
                            body: [],
                        },
                        generator: true,
                        expression: false,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });

    test("(function*(x, y, z) {})", {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "FunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "x",
                            },
                            {
                                type: "Identifier",
                                name: "y",
                            },
                            {
                                type: "Identifier",
                                name: "z",
                            },
                        ],
                        body: {
                            type: "BlockStatement",
                            body: [],
                        },
                        generator: true,
                        expression: false,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });

    test("(function*() {})", {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "FunctionExpression",
                        id: null,
                        params: [],
                        body: {
                            type: "BlockStatement",
                            body: [],
                        },
                        generator: true,
                        expression: false,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
});

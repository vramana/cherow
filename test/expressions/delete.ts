import { pass, fail } from '../utils';

describe('Expressions - Delete', () => {

    pass(`delete 1`, {
        source: 'delete 1',
        ranges: true,
        raw: true,
        expected: {
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "UnaryExpression",
                "operator": "delete",
                "argument": {
                    "type": "Literal",
                    "value": 1,
                    "start": 7,
                    "end": 8,
                    "raw": "1"
                },
                "prefix": true,
                "start": 0,
                "end": 8
            },
            "start": 0,
            "end": 8
        }
    ],
    "sourceType": "script",
    "start": 0,
    "end": 8
}
    });

    pass(`var d = delete {a:0} ;`, {
        source: 'var d = delete {a:0} ;',
        ranges: true,
        raw: true,
        expected: {
    "type": "Program",
    "body": [
        {
            "type": "VariableDeclaration",
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "init": {
                        "type": "UnaryExpression",
                        "operator": "delete",
                        "argument": {
                            "type": "ObjectExpression",
                            "properties": [
                                {
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "a",
                                        "start": 16,
                                        "end": 17
                                    },
                                    "value": {
                                        "type": "Literal",
                                        "value": 0,
                                        "start": 18,
                                        "end": 19,
                                        "raw": "0"
                                    },
                                    "kind": "init",
                                    "computed": false,
                                    "method": false,
                                    "shorthand": false,
                                    "start": 16,
                                    "end": 19
                                }
                            ],
                            "start": 15,
                            "end": 20
                        },
                        "prefix": true,
                        "start": 8,
                        "end": 20
                    },
                    "id": {
                        "type": "Identifier",
                        "name": "d",
                        "start": 4,
                        "end": 5
                    },
                    "start": 4,
                    "end": 20
                }
            ],
            "kind": "var",
            "start": 0,
            "end": 22
        }
    ],
    "sourceType": "script",
    "start": 0,
    "end": 22
}
    });

    pass(`"use strict"; var d = delete foo();`, {
        source: '"use strict"; var d = delete foo();',
        ranges: true,
        raw: true,
        expected: {
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "Literal",
                "value": "use strict",
                "start": 0,
                "end": 12,
                "raw": "\"use strict\""
            },
            "start": 0,
            "end": 13
        },
        {
            "type": "VariableDeclaration",
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "init": {
                        "type": "UnaryExpression",
                        "operator": "delete",
                        "argument": {
                            "type": "CallExpression",
                            "callee": {
                                "type": "Identifier",
                                "name": "foo",
                                "start": 29,
                                "end": 32
                            },
                            "arguments": [],
                            "start": 29,
                            "end": 34
                        },
                        "prefix": true,
                        "start": 22,
                        "end": 34
                    },
                    "id": {
                        "type": "Identifier",
                        "name": "d",
                        "start": 18,
                        "end": 19
                    },
                    "start": 18,
                    "end": 34
                }
            ],
            "kind": "var",
            "start": 14,
            "end": 35
        }
    ],
    "sourceType": "script",
    "start": 0,
    "end": 35
}
    });
});
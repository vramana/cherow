import { n, pass, fail } from '../utils/test-utils';

describe('Declarations - Functions', () => {

 //   fail('a: function* a(){}', 'a: function* a(){}');

    pass('function a(...[]) { }', 'function a(...[]) { }', {
        "type": "Program",
        "body": [
            {
                "type": "FunctionDeclaration",
                "params": [
                    {
                        "type": "RestElement",
                        "argument": {
                            "type": "ArrayPattern",
                            "elements": [],
                            "start": 14,
                            "end": 16,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 14
                                },
                                "end": {
                                    "line": 1,
                                    "column": 16
                                }
                            }
                        },
                        "start": 11,
                        "end": 16,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 11
                            },
                            "end": {
                                "line": 1,
                                "column": 16
                            }
                        }
                    }
                ],
                "body": {
                    "type": "BlockStatement",
                    "body": [],
                    "start": 18,
                    "end": 21,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 18
                        },
                        "end": {
                            "line": 1,
                            "column": 21
                        }
                    }
                },
                "async": false,
                "generator": false,
                "expression": false,
                "id": {
                    "type": "Identifier",
                    "name": "a",
                    "start": 9,
                    "end": 10,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 9
                        },
                        "end": {
                            "line": 1,
                            "column": 10
                        }
                    }
                },
                "start": 0,
                "end": 21,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 21
                    }
                }
            }
        ],
        "sourceType": "script",
        "start": 0,
        "end": 21,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 1,
                "column": 21
            }
        }
    });
});
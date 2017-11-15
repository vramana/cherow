import { n, pass, fail } from '../utils/test-utils';

describe('Declarations - Class', () => {

    fail('class {}', 'class {}');
    fail('class extends A{}', 'class extends A{}');
    fail('class a{ *() {} }', 'class a{ *() {} }');
    fail('class a{ get get a() {} }', 'class a{ get get a() {} }');
    fail('class a{ get async a() {} }', 'class a{ get async a() {} }');
    fail('class a{ async async a() {} }', 'class a{ async async a() {} }');

    fail('LineTerminator after async keyword', `class Foo {
        async 
        a() {}
      }`);
      pass('class a{ get get() {} }', 'class a{ get get() {} }', {
        "type": "Program",
        "body": [
            {
                "type": "ClassDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "a",
                    "start": 6,
                    "end": 7,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 6
                        },
                        "end": {
                            "line": 1,
                            "column": 7
                        }
                    }
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "body": [
                        {
                            "type": "MethodDefinition",
                            "key": {
                                "type": "Identifier",
                                "name": "get",
                                "start": 13,
                                "end": 16,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 13
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 16
                                    }
                                }
                            },
                            "kind": "get",
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
                                "id": null,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 19,
                                    "end": 21,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 19
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 21
                                        }
                                    }
                                },
                                "generator": false,
                                "async": false,
                                "expression": false,
                                "start": 16,
                                "end": 21,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 16
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 21
                                    }
                                }
                            },
                            "static": false,
                            "start": 9,
                            "end": 21,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 9
                                },
                                "end": {
                                    "line": 1,
                                    "column": 21
                                }
                            }
                        }
                    ],
                    "start": 7,
                    "end": 23,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 7
                        },
                        "end": {
                            "line": 1,
                            "column": 23
                        }
                    }
                },
                "start": 0,
                "end": 23,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 23
                    }
                }
            }
        ],
        "sourceType": "script",
        "start": 0,
        "end": 23,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 1,
                "column": 23
            }
        }
    })
    
});
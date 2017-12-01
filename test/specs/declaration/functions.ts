import { n, pass, fail } from '../utils/test-utils';

describe('Declarations - Functions', () => {

 //   fail('a: function* a(){}', 'a: function* a(){}');

    pass('function a() {"use strict"; 0O0; }', 'function a() { "use strict"; 0O0; }', {
        "type": "Program",
        "body": [
            {
                "type": "FunctionDeclaration",
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "body": [
                        {
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "Literal",
                                "value": "use strict",
                                "start": 15,
                                "end": 27,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 15
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 27
                                    }
                                },
                                "raw": "\"use strict\""
                            },
                            "directive": "use strict",
                            "start": 15,
                            "end": 28,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 15
                                },
                                "end": {
                                    "line": 1,
                                    "column": 28
                                }
                            }
                        },
                        {
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "Literal",
                                "value": 0,
                                "start": 29,
                                "end": 32,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 29
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 32
                                    }
                                },
                                "raw": "0O0"
                            },
                            "start": 29,
                            "end": 33,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 29
                                },
                                "end": {
                                    "line": 1,
                                    "column": 33
                                }
                            }
                        }
                    ],
                    "start": 13,
                    "end": 35,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 13
                        },
                        "end": {
                            "line": 1,
                            "column": 35
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
                "end": 35,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 35
                    }
                }
            }
        ],
        "sourceType": "script",
        "start": 0,
        "end": 35,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 1,
                "column": 35
            }
        }
    });

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
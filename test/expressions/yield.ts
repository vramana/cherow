import { pass, fail } from '../utils';

describe('Expressions - Yield', () => {
 
        pass(`function *a(){yield 0}`, {
            source: 'function *a(){yield 0}',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
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
                                        "type": "YieldExpression",
                                        "argument": {
                                            "type": "Literal",
                                            "value": 0,
                                            "start": 20,
                                            "end": 21,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 20
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 21
                                                }
                                            },
                                            "raw": "0"
                                        },
                                        "delegate": false,
                                        "start": 14,
                                        "end": 21,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 14
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 21
                                            }
                                        }
                                    },
                                    "start": 14,
                                    "end": 21,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 14
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 21
                                        }
                                    }
                                }
                            ],
                            "start": 13,
                            "end": 22,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 13
                                },
                                "end": {
                                    "line": 1,
                                    "column": 22
                                }
                            }
                        },
                        "async": false,
                        "generator": true,
                        "expression": false,
                        "id": {
                            "type": "Identifier",
                            "name": "a",
                            "start": 10,
                            "end": 11,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 10
                                },
                                "end": {
                                    "line": 1,
                                    "column": 11
                                }
                            }
                        },
                        "start": 0,
                        "end": 22,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 22
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 22,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 22
                    }
                }
            }
        });

        pass(`function *a(){yield null}`, {
            source: 'function *a(){yield null}',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
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
                                        "type": "YieldExpression",
                                        "argument": {
                                            "type": "Literal",
                                            "value": null,
                                            "start": 20,
                                            "end": 24,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 20
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 24
                                                }
                                            },
                                            "raw": "null"
                                        },
                                        "delegate": false,
                                        "start": 14,
                                        "end": 24,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 14
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 24
                                            }
                                        }
                                    },
                                    "start": 14,
                                    "end": 24,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 14
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 24
                                        }
                                    }
                                }
                            ],
                            "start": 13,
                            "end": 25,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 13
                                },
                                "end": {
                                    "line": 1,
                                    "column": 25
                                }
                            }
                        },
                        "async": false,
                        "generator": true,
                        "expression": false,
                        "id": {
                            "type": "Identifier",
                            "name": "a",
                            "start": 10,
                            "end": 11,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 10
                                },
                                "end": {
                                    "line": 1,
                                    "column": 11
                                }
                            }
                        },
                        "start": 0,
                        "end": 25,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 25
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 25,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 25
                    }
                }
            }
        });

        pass(`function *a(){yield+0}`, {
            source: 'function *a(){yield+0}',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
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
                                        "type": "YieldExpression",
                                        "argument": {
                                            "type": "UnaryExpression",
                                            "operator": "+",
                                            "argument": {
                                                "type": "Literal",
                                                "value": 0,
                                                "start": 20,
                                                "end": 21,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 20
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 21
                                                    }
                                                },
                                                "raw": "0"
                                            },
                                            "prefix": true,
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
                                        "delegate": false,
                                        "start": 14,
                                        "end": 21,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 14
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 21
                                            }
                                        }
                                    },
                                    "start": 14,
                                    "end": 21,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 14
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 21
                                        }
                                    }
                                }
                            ],
                            "start": 13,
                            "end": 22,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 13
                                },
                                "end": {
                                    "line": 1,
                                    "column": 22
                                }
                            }
                        },
                        "async": false,
                        "generator": true,
                        "expression": false,
                        "id": {
                            "type": "Identifier",
                            "name": "a",
                            "start": 10,
                            "end": 11,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 10
                                },
                                "end": {
                                    "line": 1,
                                    "column": 11
                                }
                            }
                        },
                        "start": 0,
                        "end": 22,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 22
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 22,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 22
                    }
                }
            }
        });

        pass(`function *a(){yield "a"}`, {
            source: 'function *a(){yield "a"}',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
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
                                        "type": "YieldExpression",
                                        "argument": {
                                            "type": "Literal",
                                            "value": "a",
                                            "start": 20,
                                            "end": 23,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 20
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 23
                                                }
                                            },
                                            "raw": "\"a\""
                                        },
                                        "delegate": false,
                                        "start": 14,
                                        "end": 23,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 14
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 23
                                            }
                                        }
                                    },
                                    "start": 14,
                                    "end": 23,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 14
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 23
                                        }
                                    }
                                }
                            ],
                            "start": 13,
                            "end": 24,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 13
                                },
                                "end": {
                                    "line": 1,
                                    "column": 24
                                }
                            }
                        },
                        "async": false,
                        "generator": true,
                        "expression": false,
                        "id": {
                            "type": "Identifier",
                            "name": "a",
                            "start": 10,
                            "end": 11,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 10
                                },
                                "end": {
                                    "line": 1,
                                    "column": 11
                                }
                            }
                        },
                        "start": 0,
                        "end": 24,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 24
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 24,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 24
                    }
                }
            }
        });

        pass(`function *a(){yield delete 0}`, {
            source: 'function *a(){yield delete 0}',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
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
                                        "type": "YieldExpression",
                                        "argument": {
                                            "type": "UnaryExpression",
                                            "operator": "delete",
                                            "argument": {
                                                "type": "Literal",
                                                "value": 0,
                                                "start": 27,
                                                "end": 28,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 27
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 28
                                                    }
                                                },
                                                "raw": "0"
                                            },
                                            "prefix": true,
                                            "start": 20,
                                            "end": 28,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 20
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 28
                                                }
                                            }
                                        },
                                        "delegate": false,
                                        "start": 14,
                                        "end": 28,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 14
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 28
                                            }
                                        }
                                    },
                                    "start": 14,
                                    "end": 28,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 14
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 28
                                        }
                                    }
                                }
                            ],
                            "start": 13,
                            "end": 29,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 13
                                },
                                "end": {
                                    "line": 1,
                                    "column": 29
                                }
                            }
                        },
                        "async": false,
                        "generator": true,
                        "expression": false,
                        "id": {
                            "type": "Identifier",
                            "name": "a",
                            "start": 10,
                            "end": 11,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 10
                                },
                                "end": {
                                    "line": 1,
                                    "column": 11
                                }
                            }
                        },
                        "start": 0,
                        "end": 29,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 29
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 29,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 29
                    }
                }
            }
        });

        pass(`function *a(){yield typeof 0}`, {
            source: 'function *a(){yield typeof 0}',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
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
                                        "type": "YieldExpression",
                                        "argument": {
                                            "type": "UnaryExpression",
                                            "operator": "typeof",
                                            "argument": {
                                                "type": "Literal",
                                                "value": 0,
                                                "start": 27,
                                                "end": 28,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 27
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 28
                                                    }
                                                },
                                                "raw": "0"
                                            },
                                            "prefix": true,
                                            "start": 20,
                                            "end": 28,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 20
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 28
                                                }
                                            }
                                        },
                                        "delegate": false,
                                        "start": 14,
                                        "end": 28,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 14
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 28
                                            }
                                        }
                                    },
                                    "start": 14,
                                    "end": 28,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 14
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 28
                                        }
                                    }
                                }
                            ],
                            "start": 13,
                            "end": 29,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 13
                                },
                                "end": {
                                    "line": 1,
                                    "column": 29
                                }
                            }
                        },
                        "async": false,
                        "generator": true,
                        "expression": false,
                        "id": {
                            "type": "Identifier",
                            "name": "a",
                            "start": 10,
                            "end": 11,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 10
                                },
                                "end": {
                                    "line": 1,
                                    "column": 11
                                }
                            }
                        },
                        "start": 0,
                        "end": 29,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 29
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 29,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 29
                    }
                }
            }
        });

        pass(`function *a(){yield 2e308}`, {
            source: 'function *a(){yield 2e308}',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
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
                                        "type": "YieldExpression",
                                        "argument": {
                                            "type": "Literal",
                                            "value": Infinity,
                                            "start": 20,
                                            "end": 25,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 20
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 25
                                                }
                                            },
                                            "raw": "2e308"
                                        },
                                        "delegate": false,
                                        "start": 14,
                                        "end": 25,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 14
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 25
                                            }
                                        }
                                    },
                                    "start": 14,
                                    "end": 25,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 14
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 25
                                        }
                                    }
                                }
                            ],
                            "start": 13,
                            "end": 26,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 13
                                },
                                "end": {
                                    "line": 1,
                                    "column": 26
                                }
                            }
                        },
                        "async": false,
                        "generator": true,
                        "expression": false,
                        "id": {
                            "type": "Identifier",
                            "name": "a",
                            "start": 10,
                            "end": 11,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 10
                                },
                                "end": {
                                    "line": 1,
                                    "column": 11
                                }
                            }
                        },
                        "start": 0,
                        "end": 26,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 26
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 26,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 26
                    }
                }
            }
        });

        pass(`function*a(){yield*a}`, {
            source: 'function*a(){yield*a}',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
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
                                        "type": "YieldExpression",
                                        "argument": {
                                            "type": "Identifier",
                                            "name": "a",
                                            "start": 19,
                                            "end": 20,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 19
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 20
                                                }
                                            }
                                        },
                                        "delegate": true,
                                        "start": 13,
                                        "end": 20,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 13
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 20
                                            }
                                        }
                                    },
                                    "start": 13,
                                    "end": 20,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 13
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 20
                                        }
                                    }
                                }
                            ],
                            "start": 12,
                            "end": 21,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 12
                                },
                                "end": {
                                    "line": 1,
                                    "column": 21
                                }
                            }
                        },
                        "async": false,
                        "generator": true,
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
            }
        });

        pass(`function a(){yield*a}`, {
            source: 'function a(){yield*a}',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
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
                                        "type": "BinaryExpression",
                                        "left": {
                                            "type": "Identifier",
                                            "name": "yield",
                                            "start": 13,
                                            "end": 18,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 13
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 18
                                                }
                                            }
                                        },
                                        "right": {
                                            "type": "Identifier",
                                            "name": "a",
                                            "start": 19,
                                            "end": 20,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 19
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 20
                                                }
                                            }
                                        },
                                        "operator": "*",
                                        "start": 13,
                                        "end": 20,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 13
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 20
                                            }
                                        }
                                    },
                                    "start": 13,
                                    "end": 20,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 13
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 20
                                        }
                                    }
                                }
                            ],
                            "start": 12,
                            "end": 21,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 12
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
            }
        });

        pass(`function *a(){yield ++a;}`, {
            source: 'function *a(){yield ++a;}',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
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
                                        "type": "YieldExpression",
                                        "argument": {
                                            "type": "UpdateExpression",
                                            "operator": "++",
                                            "prefix": true,
                                            "argument": {
                                                "type": "Identifier",
                                                "name": "a",
                                                "start": 22,
                                                "end": 23,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 22
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 23
                                                    }
                                                }
                                            },
                                            "start": 20,
                                            "end": 23,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 20
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 23
                                                }
                                            }
                                        },
                                        "delegate": false,
                                        "start": 14,
                                        "end": 23,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 14
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 23
                                            }
                                        }
                                    },
                                    "start": 14,
                                    "end": 24,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 14
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 24
                                        }
                                    }
                                }
                            ],
                            "start": 13,
                            "end": 25,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 13
                                },
                                "end": {
                                    "line": 1,
                                    "column": 25
                                }
                            }
                        },
                        "async": false,
                        "generator": true,
                        "expression": false,
                        "id": {
                            "type": "Identifier",
                            "name": "a",
                            "start": 10,
                            "end": 11,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 10
                                },
                                "end": {
                                    "line": 1,
                                    "column": 11
                                }
                            }
                        },
                        "start": 0,
                        "end": 25,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 25
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 25,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 25
                    }
                }
            }
        });

        fail(`function *a(){yield\n*a}`, {
            source: 'function *a(){yield\n*a}',
            loc: true,
            ranges: true,
            raw: true
        });

        fail(`function *a(){yield*}`, {
            source: 'function *a(){yield*}',
            loc: true,
            ranges: true,
            raw: true
        });
});
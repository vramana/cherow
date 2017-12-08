import { pass, fail } from '../utils';

describe('Destructuring - Binding pattern', () => {
    
        describe('Array binding', () => {

            pass(`var [,a] = 0;`, {
                source: 'var [,a] = 0;',
                loc: true,
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
                                        "type": "Literal",
                                        "value": 0,
                                        "start": 11,
                                        "end": 12,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 11
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 12
                                            }
                                        },
                                        "raw": "0"
                                    },
                                    "id": {
                                        "type": "ArrayPattern",
                                        "elements": [
                                            null,
                                            {
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
                                            }
                                        ],
                                        "start": 4,
                                        "end": 8,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 4
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 8
                                            }
                                        }
                                    },
                                    "start": 4,
                                    "end": 12,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 4
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 12
                                        }
                                    }
                                }
                            ],
                            "kind": "var",
                            "start": 0,
                            "end": 13,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 13
                                }
                            }
                        }
                    ],
                    "sourceType": "script",
                    "start": 0,
                    "end": 13,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 13
                        }
                    }
                }
            });

            pass(`var [a]=[1];`, {
                source: 'var [a]=[1];',
                loc: true,
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
                                        "type": "ArrayExpression",
                                        "elements": [
                                            {
                                                "type": "Literal",
                                                "value": 1,
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
                                                },
                                                "raw": "1"
                                            }
                                        ],
                                        "start": 8,
                                        "end": 11,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 8
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 11
                                            }
                                        }
                                    },
                                    "id": {
                                        "type": "ArrayPattern",
                                        "elements": [
                                            {
                                                "type": "Identifier",
                                                "name": "a",
                                                "start": 5,
                                                "end": 6,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 5
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 6
                                                    }
                                                }
                                            }
                                        ],
                                        "start": 4,
                                        "end": 7,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 4
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 7
                                            }
                                        }
                                    },
                                    "start": 4,
                                    "end": 11,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 4
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 11
                                        }
                                    }
                                }
                            ],
                            "kind": "var",
                            "start": 0,
                            "end": 12,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 12
                                }
                            }
                        }
                    ],
                    "sourceType": "script",
                    "start": 0,
                    "end": 12,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 12
                        }
                    }
                }
            });

            pass(`var [[a]]=0;`, {
                source: 'var [[a]]=0;',
                loc: true,
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
                                        "type": "Literal",
                                        "value": 0,
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
                                        },
                                        "raw": "0"
                                    },
                                    "id": {
                                        "type": "ArrayPattern",
                                        "elements": [
                                            {
                                                "type": "ArrayPattern",
                                                "elements": [
                                                    {
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
                                                    }
                                                ],
                                                "start": 5,
                                                "end": 8,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 5
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 8
                                                    }
                                                }
                                            }
                                        ],
                                        "start": 4,
                                        "end": 9,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 4
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 9
                                            }
                                        }
                                    },
                                    "start": 4,
                                    "end": 11,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 4
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 11
                                        }
                                    }
                                }
                            ],
                            "kind": "var",
                            "start": 0,
                            "end": 12,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 12
                                }
                            }
                        }
                    ],
                    "sourceType": "script",
                    "start": 0,
                    "end": 12,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 12
                        }
                    }
                }
            });

            pass(`var a, [a] = 0;`, {
                source: 'var a, [a] = 0;',
                loc: true,
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
                                    "init": null,
                                    "id": {
                                        "type": "Identifier",
                                        "name": "a",
                                        "start": 4,
                                        "end": 5,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 4
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 5
                                            }
                                        }
                                    },
                                    "start": 4,
                                    "end": 5,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 4
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 5
                                        }
                                    }
                                },
                                {
                                    "type": "VariableDeclarator",
                                    "init": {
                                        "type": "Literal",
                                        "value": 0,
                                        "start": 13,
                                        "end": 14,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 13
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 14
                                            }
                                        },
                                        "raw": "0"
                                    },
                                    "id": {
                                        "type": "ArrayPattern",
                                        "elements": [
                                            {
                                                "type": "Identifier",
                                                "name": "a",
                                                "start": 8,
                                                "end": 9,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 8
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 9
                                                    }
                                                }
                                            }
                                        ],
                                        "start": 7,
                                        "end": 10,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 7
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 10
                                            }
                                        }
                                    },
                                    "start": 7,
                                    "end": 14,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 7
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 14
                                        }
                                    }
                                }
                            ],
                            "kind": "var",
                            "start": 0,
                            "end": 15,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 15
                                }
                            }
                        }
                    ],
                    "sourceType": "script",
                    "start": 0,
                    "end": 15,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 15
                        }
                    }
                }
            });

            pass(`var [a, a] = 0;`, {
                source: 'var [a, a] = 0;',
                loc: true,
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
                                        "type": "Literal",
                                        "value": 0,
                                        "start": 13,
                                        "end": 14,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 13
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 14
                                            }
                                        },
                                        "raw": "0"
                                    },
                                    "id": {
                                        "type": "ArrayPattern",
                                        "elements": [
                                            {
                                                "type": "Identifier",
                                                "name": "a",
                                                "start": 5,
                                                "end": 6,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 5
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 6
                                                    }
                                                }
                                            },
                                            {
                                                "type": "Identifier",
                                                "name": "a",
                                                "start": 8,
                                                "end": 9,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 8
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 9
                                                    }
                                                }
                                            }
                                        ],
                                        "start": 4,
                                        "end": 10,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 4
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 10
                                            }
                                        }
                                    },
                                    "start": 4,
                                    "end": 14,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 4
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 14
                                        }
                                    }
                                }
                            ],
                            "kind": "var",
                            "start": 0,
                            "end": 15,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 15
                                }
                            }
                        }
                    ],
                    "sourceType": "script",
                    "start": 0,
                    "end": 15,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 15
                        }
                    }
                }
            });

            pass(`var [a, ...a] = 0;`, {
                source: 'var [a, ...a] = 0;',
                loc: true,
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
                                        "type": "Literal",
                                        "value": 0,
                                        "start": 16,
                                        "end": 17,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 16
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 17
                                            }
                                        },
                                        "raw": "0"
                                    },
                                    "id": {
                                        "type": "ArrayPattern",
                                        "elements": [
                                            {
                                                "type": "Identifier",
                                                "name": "a",
                                                "start": 5,
                                                "end": 6,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 5
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 6
                                                    }
                                                }
                                            },
                                            {
                                                "type": "RestElement",
                                                "argument": {
                                                    "type": "Identifier",
                                                    "name": "a",
                                                    "start": 11,
                                                    "end": 12,
                                                    "loc": {
                                                        "start": {
                                                            "line": 1,
                                                            "column": 11
                                                        },
                                                        "end": {
                                                            "line": 1,
                                                            "column": 12
                                                        }
                                                    }
                                                },
                                                "start": 8,
                                                "end": 12,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 8
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 12
                                                    }
                                                }
                                            }
                                        ],
                                        "start": 4,
                                        "end": 13,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 4
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 13
                                            }
                                        }
                                    },
                                    "start": 4,
                                    "end": 17,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 4
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 17
                                        }
                                    }
                                }
                            ],
                            "kind": "var",
                            "start": 0,
                            "end": 18,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 18
                                }
                            }
                        }
                    ],
                    "sourceType": "script",
                    "start": 0,
                    "end": 18,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 18
                        }
                    }
                }
            });

           /* fail(`([a.b]) => 0`, {
                source: '([a.b]) => 0',
                loc: true,
                ranges: true,
                raw: true
            });
*/
            fail(`function a([a.b]) {}`, {
                source: 'function a([a.b]) {}',
                loc: true,
                ranges: true,
                raw: true
            });

            fail(`function* a([a.b]) {}`, {
                source: 'function* a([a.b]) {}',
                loc: true,
                ranges: true,
                raw: true
            });

            fail(`(function ([a.b]) {})`, {
                source: '(function ([a.b]) {})',
                loc: true,
                ranges: true,
                raw: true
            });

            fail(`(function* ([a.b]) {})`, {
                source: '(function* ([a.b]) {})',
                loc: true,
                ranges: true,
                raw: true
            });

            fail(`({a([a.b]){}})`, {
                source: '({a([a.b]){}})',
                loc: true,
                ranges: true,
                raw: true
            });

            fail(`({*a([a.b]){}})`, {
                source: '({*a([a.b]){}})',
                loc: true,
                ranges: true,
                raw: true
            });

            fail(`({set a([a.b]){}})`, {
                source: '({set a([a.b]){}})',
                loc: true,
                ranges: true,
                raw: true
            });

        });
    
        describe('Binding Identifier', () => {
/*
            pass(`for(let in 0);`, {
                source: 'for(let in 0);',
                loc: true,
                ranges: true,
                raw: true,
                expected: {}
            });
*/
        });
    
        describe('Object binding', () => {

            pass(`var {a} = 0;`, {
                source: 'var {a} = 0;',
                loc: true,
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
                                        "type": "Literal",
                                        "value": 0,
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
                                        },
                                        "raw": "0"
                                    },
                                    "id": {
                                        "type": "ObjectPattern",
                                        "properties": [
                                            {
                                                "type": "Property",
                                                "kind": "init",
                                                "key": {
                                                    "type": "Identifier",
                                                    "name": "a",
                                                    "start": 5,
                                                    "end": 6,
                                                    "loc": {
                                                        "start": {
                                                            "line": 1,
                                                            "column": 5
                                                        },
                                                        "end": {
                                                            "line": 1,
                                                            "column": 6
                                                        }
                                                    }
                                                },
                                                "computed": false,
                                                "value": {
                                                    "type": "Identifier",
                                                    "name": "a",
                                                    "start": 5,
                                                    "end": 6,
                                                    "loc": {
                                                        "start": {
                                                            "line": 1,
                                                            "column": 5
                                                        },
                                                        "end": {
                                                            "line": 1,
                                                            "column": 6
                                                        }
                                                    }
                                                },
                                                "method": false,
                                                "shorthand": true,
                                                "start": 5,
                                                "end": 6,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 5
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 6
                                                    }
                                                }
                                            }
                                        ],
                                        "start": 4,
                                        "end": 7,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 4
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 7
                                            }
                                        }
                                    },
                                    "start": 4,
                                    "end": 11,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 4
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 11
                                        }
                                    }
                                }
                            ],
                            "kind": "var",
                            "start": 0,
                            "end": 12,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 12
                                }
                            }
                        }
                    ],
                    "sourceType": "script",
                    "start": 0,
                    "end": 12,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 12
                        }
                    }
                }
            });

            pass(`var [{a = 0}] = 0;`, {
                source: 'var [{a = 0}] = 0;',
                loc: true,
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
                                        "type": "Literal",
                                        "value": 0,
                                        "start": 16,
                                        "end": 17,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 16
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 17
                                            }
                                        },
                                        "raw": "0"
                                    },
                                    "id": {
                                        "type": "ArrayPattern",
                                        "elements": [
                                            {
                                                "type": "ObjectPattern",
                                                "properties": [
                                                    {
                                                        "type": "Property",
                                                        "kind": "init",
                                                        "key": {
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
                                                        "computed": false,
                                                        "value": {
                                                            "type": "AssignmentPattern",
                                                            "left": {
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
                                                            "right": {
                                                                "type": "Literal",
                                                                "value": 0,
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
                                                                },
                                                                "raw": "0"
                                                            },
                                                            "start": 6,
                                                            "end": 11,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 1,
                                                                    "column": 6
                                                                },
                                                                "end": {
                                                                    "line": 1,
                                                                    "column": 11
                                                                }
                                                            }
                                                        },
                                                        "method": false,
                                                        "shorthand": true,
                                                        "start": 6,
                                                        "end": 11,
                                                        "loc": {
                                                            "start": {
                                                                "line": 1,
                                                                "column": 6
                                                            },
                                                            "end": {
                                                                "line": 1,
                                                                "column": 11
                                                            }
                                                        }
                                                    }
                                                ],
                                                "start": 5,
                                                "end": 12,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 5
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 12
                                                    }
                                                }
                                            }
                                        ],
                                        "start": 4,
                                        "end": 13,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 4
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 13
                                            }
                                        }
                                    },
                                    "start": 4,
                                    "end": 17,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 4
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 17
                                        }
                                    }
                                }
                            ],
                            "kind": "var",
                            "start": 0,
                            "end": 18,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 18
                                }
                            }
                        }
                    ],
                    "sourceType": "script",
                    "start": 0,
                    "end": 18,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 18
                        }
                    }
                }
            });

            pass(`var [{__proto__:a, __proto__:b}] = 0;`, {
                source: 'var [{__proto__:a, __proto__:b}] = 0;',
                loc: true,
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
                                        "type": "Literal",
                                        "value": 0,
                                        "start": 35,
                                        "end": 36,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 35
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 36
                                            }
                                        },
                                        "raw": "0"
                                    },
                                    "id": {
                                        "type": "ArrayPattern",
                                        "elements": [
                                            {
                                                "type": "ObjectPattern",
                                                "properties": [
                                                    {
                                                        "type": "Property",
                                                        "kind": "init",
                                                        "key": {
                                                            "type": "Identifier",
                                                            "name": "__proto__",
                                                            "start": 6,
                                                            "end": 15,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 1,
                                                                    "column": 6
                                                                },
                                                                "end": {
                                                                    "line": 1,
                                                                    "column": 15
                                                                }
                                                            }
                                                        },
                                                        "computed": false,
                                                        "value": {
                                                            "type": "Identifier",
                                                            "name": "a",
                                                            "start": 16,
                                                            "end": 17,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 1,
                                                                    "column": 16
                                                                },
                                                                "end": {
                                                                    "line": 1,
                                                                    "column": 17
                                                                }
                                                            }
                                                        },
                                                        "method": false,
                                                        "shorthand": false,
                                                        "start": 6,
                                                        "end": 17,
                                                        "loc": {
                                                            "start": {
                                                                "line": 1,
                                                                "column": 6
                                                            },
                                                            "end": {
                                                                "line": 1,
                                                                "column": 17
                                                            }
                                                        }
                                                    },
                                                    {
                                                        "type": "Property",
                                                        "kind": "init",
                                                        "key": {
                                                            "type": "Identifier",
                                                            "name": "__proto__",
                                                            "start": 19,
                                                            "end": 28,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 1,
                                                                    "column": 19
                                                                },
                                                                "end": {
                                                                    "line": 1,
                                                                    "column": 28
                                                                }
                                                            }
                                                        },
                                                        "computed": false,
                                                        "value": {
                                                            "type": "Identifier",
                                                            "name": "b",
                                                            "start": 29,
                                                            "end": 30,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 1,
                                                                    "column": 29
                                                                },
                                                                "end": {
                                                                    "line": 1,
                                                                    "column": 30
                                                                }
                                                            }
                                                        },
                                                        "method": false,
                                                        "shorthand": false,
                                                        "start": 19,
                                                        "end": 30,
                                                        "loc": {
                                                            "start": {
                                                                "line": 1,
                                                                "column": 19
                                                            },
                                                            "end": {
                                                                "line": 1,
                                                                "column": 30
                                                            }
                                                        }
                                                    }
                                                ],
                                                "start": 5,
                                                "end": 31,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 5
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 31
                                                    }
                                                }
                                            }
                                        ],
                                        "start": 4,
                                        "end": 32,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 4
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 32
                                            }
                                        }
                                    },
                                    "start": 4,
                                    "end": 36,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 4
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 36
                                        }
                                    }
                                }
                            ],
                            "kind": "var",
                            "start": 0,
                            "end": 37,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 37
                                }
                            }
                        }
                    ],
                    "sourceType": "script",
                    "start": 0,
                    "end": 37,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 37
                        }
                    }
                }
            });

           /* pass(`var {a, x: {y: a}} = 0;`, {
                source: 'vvar {a, x: {y: a}} = 0;',
                loc: true,
                ranges: true,
                raw: true,
                expected: {}
            });*/

            pass(`var {let, yield} = 0;`, {
                source: 'var {let, yield} = 0;',
                loc: true,
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
                                        "type": "Literal",
                                        "value": 0,
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
                                        },
                                        "raw": "0"
                                    },
                                    "id": {
                                        "type": "ObjectPattern",
                                        "properties": [
                                            {
                                                "type": "Property",
                                                "kind": "init",
                                                "key": {
                                                    "type": "Identifier",
                                                    "name": "let",
                                                    "start": 5,
                                                    "end": 8,
                                                    "loc": {
                                                        "start": {
                                                            "line": 1,
                                                            "column": 5
                                                        },
                                                        "end": {
                                                            "line": 1,
                                                            "column": 8
                                                        }
                                                    }
                                                },
                                                "computed": false,
                                                "value": {
                                                    "type": "Identifier",
                                                    "name": "let",
                                                    "start": 5,
                                                    "end": 8,
                                                    "loc": {
                                                        "start": {
                                                            "line": 1,
                                                            "column": 5
                                                        },
                                                        "end": {
                                                            "line": 1,
                                                            "column": 8
                                                        }
                                                    }
                                                },
                                                "method": false,
                                                "shorthand": true,
                                                "start": 5,
                                                "end": 8,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 5
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 8
                                                    }
                                                }
                                            },
                                            {
                                                "type": "Property",
                                                "kind": "init",
                                                "key": {
                                                    "type": "Identifier",
                                                    "name": "yield",
                                                    "start": 10,
                                                    "end": 15,
                                                    "loc": {
                                                        "start": {
                                                            "line": 1,
                                                            "column": 10
                                                        },
                                                        "end": {
                                                            "line": 1,
                                                            "column": 15
                                                        }
                                                    }
                                                },
                                                "computed": false,
                                                "value": {
                                                    "type": "Identifier",
                                                    "name": "yield",
                                                    "start": 10,
                                                    "end": 15,
                                                    "loc": {
                                                        "start": {
                                                            "line": 1,
                                                            "column": 10
                                                        },
                                                        "end": {
                                                            "line": 1,
                                                            "column": 15
                                                        }
                                                    }
                                                },
                                                "method": false,
                                                "shorthand": true,
                                                "start": 10,
                                                "end": 15,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 10
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 15
                                                    }
                                                }
                                            }
                                        ],
                                        "start": 4,
                                        "end": 16,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 4
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 16
                                            }
                                        }
                                    },
                                    "start": 4,
                                    "end": 20,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 4
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 20
                                        }
                                    }
                                }
                            ],
                            "kind": "var",
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

            pass(`(a, b, [c]) => 0`, {
                source: '(a, b, [c]) => 0',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    "type": "Program",
                    "body": [
                        {
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "ArrowFunctionExpression",
                                "body": {
                                    "type": "Literal",
                                    "value": 0,
                                    "start": 15,
                                    "end": 16,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 15
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 16
                                        }
                                    },
                                    "raw": "0"
                                },
                                "params": [
                                    {
                                        "type": "Identifier",
                                        "name": "a",
                                        "start": 1,
                                        "end": 2,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 1
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 2
                                            }
                                        }
                                    },
                                    {
                                        "type": "Identifier",
                                        "name": "b",
                                        "start": 4,
                                        "end": 5,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 4
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 5
                                            }
                                        }
                                    },
                                    {
                                        "type": "ArrayPattern",
                                        "elements": [
                                            {
                                                "type": "Identifier",
                                                "name": "c",
                                                "start": 8,
                                                "end": 9,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 8
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 9
                                                    }
                                                }
                                            }
                                        ],
                                        "start": 7,
                                        "end": 10,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 7
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 10
                                            }
                                        }
                                    }
                                ],
                                "id": null,
                                "async": false,
                                "generator": false,
                                "expression": true,
                                "start": 0,
                                "end": 16,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 0
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 16
                                    }
                                }
                            },
                            "start": 0,
                            "end": 16,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 16
                                }
                            }
                        }
                    ],
                    "sourceType": "script",
                    "start": 0,
                    "end": 16,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 16
                        }
                    }
                }
            });

            fail(`function* a({e: a.b}) {}`, {
                source: 'function* a({e: a.b}) {}',
                loc: true,
                ranges: true,
                raw: true
            });
    });
});
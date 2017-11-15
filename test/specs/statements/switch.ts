import { pass } from '../utils/test-utils';

describe('Statements - Switch', () => {

    pass('switch (answer) { case 0: let a; }', 'switch (answer) { case 0: let a; }', {
        "type": "Program",
        "body": [
            {
                "type": "SwitchStatement",
                "discriminant": {
                    "type": "Identifier",
                    "name": "answer",
                    "start": 8,
                    "end": 14,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 8
                        },
                        "end": {
                            "line": 1,
                            "column": 14
                        }
                    }
                },
                "cases": [
                    {
                        "type": "SwitchCase",
                        "test": {
                            "type": "Literal",
                            "value": 0,
                            "start": 23,
                            "end": 24,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 23
                                },
                                "end": {
                                    "line": 1,
                                    "column": 24
                                }
                            },
                            "raw": "0"
                        },
                        "consequent": [
                            {
                                "type": "VariableDeclaration",
                                "declarations": [
                                    {
                                        "type": "VariableDeclarator",
                                        "init": null,
                                        "id": {
                                            "type": "Identifier",
                                            "name": "a",
                                            "start": 30,
                                            "end": 31,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 30
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 31
                                                }
                                            }
                                        },
                                        "start": 30,
                                        "end": 31,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 30
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 31
                                            }
                                        }
                                    }
                                ],
                                "kind": "let",
                                "start": 26,
                                "end": 32,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 26
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 32
                                    }
                                }
                            }
                        ],
                        "start": 18,
                        "end": 32,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 18
                            },
                            "end": {
                                "line": 1,
                                "column": 32
                            }
                        }
                    }
                ],
                "start": 0,
                "end": 34,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 34
                    }
                }
            }
        ],
        "sourceType": "script",
        "start": 0,
        "end": 34,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 1,
                "column": 34
            }
        }
    });

    pass('switch (answer) { case 0: hi(); break; }', 'switch (answer) { case 0: hi(); break; }', {
        "type": "Program",
        "body": [
            {
                "type": "SwitchStatement",
                "discriminant": {
                    "type": "Identifier",
                    "name": "answer",
                    "start": 8,
                    "end": 14,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 8
                        },
                        "end": {
                            "line": 1,
                            "column": 14
                        }
                    }
                },
                "cases": [
                    {
                        "type": "SwitchCase",
                        "test": {
                            "type": "Literal",
                            "value": 0,
                            "start": 23,
                            "end": 24,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 23
                                },
                                "end": {
                                    "line": 1,
                                    "column": 24
                                }
                            },
                            "raw": "0"
                        },
                        "consequent": [
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "CallExpression",
                                    "callee": {
                                        "type": "Identifier",
                                        "name": "hi",
                                        "start": 26,
                                        "end": 28,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 26
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 28
                                            }
                                        }
                                    },
                                    "arguments": [],
                                    "start": 26,
                                    "end": 30,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 26
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 30
                                        }
                                    }
                                },
                                "start": 26,
                                "end": 31,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 26
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 31
                                    }
                                }
                            },
                            {
                                "type": "BreakStatement",
                                "label": null,
                                "start": 32,
                                "end": 38,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 32
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 38
                                    }
                                }
                            }
                        ],
                        "start": 18,
                        "end": 38,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 18
                            },
                            "end": {
                                "line": 1,
                                "column": 38
                            }
                        }
                    }
                ],
                "start": 0,
                "end": 40,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 40
                    }
                }
            }
        ],
        "sourceType": "script",
        "start": 0,
        "end": 40,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 1,
                "column": 40
            }
        }
    })

    pass('switch(a){case 1:}', 'switch(a){case 1:}', {
        "type": "Program",
        "body": [
            {
                "type": "SwitchStatement",
                "discriminant": {
                    "type": "Identifier",
                    "name": "a",
                    "start": 7,
                    "end": 8,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 7
                        },
                        "end": {
                            "line": 1,
                            "column": 8
                        }
                    }
                },
                "cases": [
                    {
                        "type": "SwitchCase",
                        "test": {
                            "type": "Literal",
                            "value": 1,
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
                            "raw": "1"
                        },
                        "consequent": [],
                        "start": 10,
                        "end": 17,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 10
                            },
                            "end": {
                                "line": 1,
                                "column": 17
                            }
                        }
                    }
                ],
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
    })

    pass('switch (x) {}', 'switch (x) {}', {
        "type": "Program",
        "body": [
            {
                "type": "SwitchStatement",
                "discriminant": {
                    "type": "Identifier",
                    "name": "x",
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
                },
                "cases": [],
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
    })
});
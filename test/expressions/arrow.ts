import { pass, fail } from '../utils';

describe('Expressions - Arrow', () => {
        
    pass(`(...[]) => 0`, {
        source: '(...[]) => 0',
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
                        "params": [
                            {
                                "type": "RestElement",
                                "argument": {
                                    "type": "ArrayPattern",
                                    "elements": [],
                                    "start": 4,
                                    "end": 6,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 4
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 6
                                        }
                                    }
                                },
                                "start": 1,
                                "end": 6,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 1
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 6
                                    }
                                }
                            }
                        ],
                        "id": null,
                        "async": false,
                        "generator": false,
                        "expression": true,
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
                    },
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

    pass(`(()=>0)`, {
        source: '(()=>0)',
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
                            },
                            "raw": "0"
                        },
                        "params": [],
                        "id": null,
                        "async": false,
                        "generator": false,
                        "expression": true,
                        "start": 1,
                        "end": 6,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 1
                            },
                            "end": {
                                "line": 1,
                                "column": 6
                            }
                        }
                    },
                    "start": 0,
                    "end": 7,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 7
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 7,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 7
                }
            }
        }
    });

    pass(`(()=>0)`, {
            source: '(()=>0)',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "ArrowFunctionExpression",
                        "body": {
                            "type": "Literal",
                            "value": 0,
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
                            },
                            "raw": "0"
                        },
                        "params": [],
                        "id": null,
                        "async": false,
                        "generator": false,
                        "expression": true,
                        "start": 1,
                        "end": 6,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 1
                            },
                            "end": {
                                "line": 1,
                                "column": 6
                            }
                        }
                    },
                    "start": 0,
                    "end": 7,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 7
                        }
                    }
                }],
                "sourceType": "script",
                "start": 0,
                "end": 7,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 7
                    }
                }
            }
        });
    
        pass(`() => 0`, {
            source: '() => 0',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "ArrowFunctionExpression",
                        "body": {
                            "type": "Literal",
                            "value": 0,
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
                            },
                            "raw": "0"
                        },
                        "params": [],
                        "id": null,
                        "async": false,
                        "generator": false,
                        "expression": true,
                        "start": 0,
                        "end": 7,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 7
                            }
                        }
                    },
                    "start": 0,
                    "end": 7,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 7
                        }
                    }
                }],
                "sourceType": "script",
                "start": 0,
                "end": 7,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 7
                    }
                }
            }
        });
    
        pass(`(...a) => 0`, {
            source: '(...a) => 0',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "ArrowFunctionExpression",
                        "body": {
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
                        "params": [{
                            "type": "RestElement",
                            "argument": {
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
                            "start": 1,
                            "end": 5,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 1
                                },
                                "end": {
                                    "line": 1,
                                    "column": 5
                                }
                            }
                        }],
                        "id": null,
                        "async": false,
                        "generator": false,
                        "expression": true,
                        "start": 0,
                        "end": 11,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 11
                            }
                        }
                    },
                    "start": 0,
                    "end": 11,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 11
                        }
                    }
                }],
                "sourceType": "script",
                "start": 0,
                "end": 11,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 11
                    }
                }
            }
        });
    
        pass(`() => {}`, {
            source: '() => {}',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "ArrowFunctionExpression",
                        "body": {
                            "type": "BlockStatement",
                            "body": [],
                            "start": 6,
                            "end": 8,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 6
                                },
                                "end": {
                                    "line": 1,
                                    "column": 8
                                }
                            }
                        },
                        "params": [],
                        "id": null,
                        "async": false,
                        "generator": false,
                        "expression": false,
                        "start": 0,
                        "end": 8,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 8
                            }
                        }
                    },
                    "start": 0,
                    "end": 8,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 8
                        }
                    }
                }],
                "sourceType": "script",
                "start": 0,
                "end": 8,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 8
                    }
                }
            }
        });
    
        pass(`(a) => 0`, {
            source: '(a) => 0',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "ArrowFunctionExpression",
                        "body": {
                            "type": "Literal",
                            "value": 0,
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
                            },
                            "raw": "0"
                        },
                        "params": [{
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
                        }],
                        "id": null,
                        "async": false,
                        "generator": false,
                        "expression": true,
                        "start": 0,
                        "end": 8,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 8
                            }
                        }
                    },
                    "start": 0,
                    "end": 8,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 8
                        }
                    }
                }],
                "sourceType": "script",
                "start": 0,
                "end": 8,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 8
                    }
                }
            }
        });
        /*
                pass(`([a]) => 0`, {
                    source: '([a]) => 0',
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
                                        "raw": "0"
                                    },
                                    "params": [
                                        {
                                            "type": "ArrayPattern",
                                            "elements": [
                                                {
                                                    "type": "Identifier",
                                                    "name": "a",
                                                    "start": 2,
                                                    "end": 3,
                                                    "loc": {
                                                        "start": {
                                                            "line": 1,
                                                            "column": 2
                                                        },
                                                        "end": {
                                                            "line": 1,
                                                            "column": 3
                                                        }
                                                    }
                                                }
                                            ],
                                            "start": 1,
                                            "end": 4,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 1
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 4
                                                }
                                            }
                                        }
                                    ],
                                    "id": null,
                                    "async": false,
                                    "generator": false,
                                    "expression": true,
                                    "start": 0,
                                    "end": 10,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 0
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 10
                                        }
                                    }
                                },
                                "start": 0,
                                "end": 10,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 0
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 10
                                    }
                                }
                            }
                        ],
                        "sourceType": "script",
                        "start": 0,
                        "end": 10,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 10
                            }
                        }
                    }
                }); */
    
        pass(`a => 0`, {
            source: 'a => 0',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "start": 0,
                "end": 6,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 6
                    }
                },
                "body": [{
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 6,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 6
                        }
                    },
                    "expression": {
                        "type": "ArrowFunctionExpression",
                        "start": 0,
                        "end": 6,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 6
                            }
                        },
                        "id": null,
                        "generator": false,
                        "expression": true,
                        "async": false,
                        "params": [{
                            "type": "Identifier",
                            "start": 0,
                            "end": 1,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 1
                                }
                            },
                            "name": "a"
                        }],
                        "body": {
                            "type": "Literal",
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
                            },
                            "value": 0,
                            "raw": "0"
                        }
                    }
                }],
                "sourceType": "script"
            }
        });
    
        pass(`() => () => 0`, {
            source: '() => () => 0',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "ArrowFunctionExpression",
                        "body": {
                            "type": "ArrowFunctionExpression",
                            "body": {
                                "type": "Literal",
                                "value": 0,
                                "start": 12,
                                "end": 13,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 12
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 13
                                    }
                                },
                                "raw": "0"
                            },
                            "params": [],
                            "id": null,
                            "async": false,
                            "generator": false,
                            "expression": true,
                            "start": 6,
                            "end": 13,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 6
                                },
                                "end": {
                                    "line": 1,
                                    "column": 13
                                }
                            }
                        },
                        "params": [],
                        "id": null,
                        "async": false,
                        "generator": false,
                        "expression": true,
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
                    },
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
                }],
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
    
        pass(`() => 0, 1`, {
            source: '() => 0, 1',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "SequenceExpression",
                        "expressions": [{
                                "type": "ArrowFunctionExpression",
                                "body": {
                                    "type": "Literal",
                                    "value": 0,
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
                                    },
                                    "raw": "0"
                                },
                                "params": [],
                                "id": null,
                                "async": false,
                                "generator": false,
                                "expression": true,
                                "start": 0,
                                "end": 7,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 0
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 7
                                    }
                                }
                            },
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
                        "start": 0,
                        "end": 10,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 10
                            }
                        }
                    },
                    "start": 0,
                    "end": 10,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 10
                        }
                    }
                }],
                "sourceType": "script",
                "start": 0,
                "end": 10,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 10
                    }
                }
            }
        });
    
        pass(`() => 0 + 1`, {
            source: '() => 0 + 1',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "ArrowFunctionExpression",
                        "body": {
                            "type": "BinaryExpression",
                            "left": {
                                "type": "Literal",
                                "value": 0,
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
                                },
                                "raw": "0"
                            },
                            "right": {
                                "type": "Literal",
                                "value": 1,
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
                                "raw": "1"
                            },
                            "operator": "+",
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
                        "params": [],
                        "id": null,
                        "async": false,
                        "generator": false,
                        "expression": true,
                        "start": 0,
                        "end": 11,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 11
                            }
                        }
                    },
                    "start": 0,
                    "end": 11,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 11
                        }
                    }
                }],
                "sourceType": "script",
                "start": 0,
                "end": 11,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 11
                    }
                }
            }
        });
    
        pass(`(a,b) => 0 + 1`, {
            source: '(a,b) => 0 + 1',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "ArrowFunctionExpression",
                        "body": {
                            "type": "BinaryExpression",
                            "left": {
                                "type": "Literal",
                                "value": 0,
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
                                "raw": "0"
                            },
                            "right": {
                                "type": "Literal",
                                "value": 1,
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
                                "raw": "1"
                            },
                            "operator": "+",
                            "start": 9,
                            "end": 14,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 9
                                },
                                "end": {
                                    "line": 1,
                                    "column": 14
                                }
                            }
                        },
                        "params": [{
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
                                "start": 3,
                                "end": 4,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 3
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 4
                                    }
                                }
                            }
                        ],
                        "id": null,
                        "async": false,
                        "generator": false,
                        "expression": true,
                        "start": 0,
                        "end": 14,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 14
                            }
                        }
                    },
                    "start": 0,
                    "end": 14,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 14
                        }
                    }
                }],
                "sourceType": "script",
                "start": 0,
                "end": 14,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 14
                    }
                }
            }
        });
    
        pass(`(a,b,...c) => 0 + 1`, {
            source: '(a,b,...c) => 0 + 1',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "ArrowFunctionExpression",
                        "body": {
                            "type": "BinaryExpression",
                            "left": {
                                "type": "Literal",
                                "value": 0,
                                "start": 14,
                                "end": 15,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 14
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 15
                                    }
                                },
                                "raw": "0"
                            },
                            "right": {
                                "type": "Literal",
                                "value": 1,
                                "start": 18,
                                "end": 19,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 18
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 19
                                    }
                                },
                                "raw": "1"
                            },
                            "operator": "+",
                            "start": 14,
                            "end": 19,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 14
                                },
                                "end": {
                                    "line": 1,
                                    "column": 19
                                }
                            }
                        },
                        "params": [{
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
                                "start": 3,
                                "end": 4,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 3
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 4
                                    }
                                }
                            },
                            {
                                "type": "RestElement",
                                "argument": {
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
                                },
                                "start": 5,
                                "end": 9,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 5
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 9
                                    }
                                }
                            }
                        ],
                        "id": null,
                        "async": false,
                        "generator": false,
                        "expression": true,
                        "start": 0,
                        "end": 19,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 19
                            }
                        }
                    },
                    "start": 0,
                    "end": 19,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 19
                        }
                    }
                }],
                "sourceType": "script",
                "start": 0,
                "end": 19,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 19
                    }
                }
            }
        });
    
        pass(`() => (a) = 0`, {
            source: '() => (a) = 0',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "ArrowFunctionExpression",
                        "body": {
                            "type": "AssignmentExpression",
                            "left": {
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
                            "operator": "=",
                            "right": {
                                "type": "Literal",
                                "value": 0,
                                "start": 12,
                                "end": 13,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 12
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 13
                                    }
                                },
                                "raw": "0"
                            },
                            "start": 6,
                            "end": 13,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 6
                                },
                                "end": {
                                    "line": 1,
                                    "column": 13
                                }
                            }
                        },
                        "params": [],
                        "id": null,
                        "async": false,
                        "generator": false,
                        "expression": true,
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
                    },
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
                }],
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
    
        pass(`a => b => c => 0`, {
            source: 'a => b => c => 0',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "ArrowFunctionExpression",
                        "body": {
                            "type": "ArrowFunctionExpression",
                            "body": {
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
                                "params": [{
                                    "type": "Identifier",
                                    "name": "c",
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
                                }],
                                "id": null,
                                "async": false,
                                "generator": false,
                                "expression": true,
                                "start": 10,
                                "end": 16,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 10
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 16
                                    }
                                }
                            },
                            "params": [{
                                "type": "Identifier",
                                "name": "b",
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
                            }],
                            "id": null,
                            "async": false,
                            "generator": false,
                            "expression": true,
                            "start": 5,
                            "end": 16,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 5
                                },
                                "end": {
                                    "line": 1,
                                    "column": 16
                                }
                            }
                        },
                        "params": [{
                            "type": "Identifier",
                            "name": "a",
                            "start": 0,
                            "end": 1,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 1
                                }
                            }
                        }],
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
                }],
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

        pass(`(e) => "test"`, {
            source: '(e) => "test"',
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
                                "value": "test",
                                "start": 7,
                                "end": 13,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 7
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 13
                                    }
                                },
                                "raw": "\"test\""
                            },
                            "params": [
                                {
                                    "type": "Identifier",
                                    "name": "e",
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
                                }
                            ],
                            "id": null,
                            "async": false,
                            "generator": false,
                            "expression": true,
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
                        },
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

        pass(`(x)=>{}`, {
            source: `async () => {}
            () => {}
            async b => {}
            async b => {}
            async () => {}
            async () => {}
            () => {}
            a => {}
            a => {}
            async () => {}
            () => {}
            a => {}
            async () => {}
            () => {}
            async () => {}
            a => {}
            async () => {}
            async () => {}
            () => {}`,
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
                                "type": "BlockStatement",
                                "body": [],
                                "start": 12,
                                "end": 14,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 12
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 14
                                    }
                                }
                            },
                            "params": [],
                            "id": null,
                            "async": true,
                            "generator": false,
                            "expression": false,
                            "start": 0,
                            "end": 14,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 14
                                }
                            }
                        },
                        "start": 0,
                        "end": 14,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 14
                            }
                        }
                    },
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "ArrowFunctionExpression",
                            "body": {
                                "type": "BlockStatement",
                                "body": [],
                                "start": 33,
                                "end": 35,
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 18
                                    },
                                    "end": {
                                        "line": 2,
                                        "column": 20
                                    }
                                }
                            },
                            "params": [],
                            "id": null,
                            "async": false,
                            "generator": false,
                            "expression": false,
                            "start": 27,
                            "end": 35,
                            "loc": {
                                "start": {
                                    "line": 2,
                                    "column": 12
                                },
                                "end": {
                                    "line": 2,
                                    "column": 20
                                }
                            }
                        },
                        "start": 27,
                        "end": 35,
                        "loc": {
                            "start": {
                                "line": 2,
                                "column": 12
                            },
                            "end": {
                                "line": 2,
                                "column": 20
                            }
                        }
                    },
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "ArrowFunctionExpression",
                            "body": {
                                "type": "BlockStatement",
                                "body": [],
                                "start": 59,
                                "end": 61,
                                "loc": {
                                    "start": {
                                        "line": 3,
                                        "column": 23
                                    },
                                    "end": {
                                        "line": 3,
                                        "column": 25
                                    }
                                }
                            },
                            "params": [
                                {
                                    "type": "Identifier",
                                    "name": "b",
                                    "start": 54,
                                    "end": 55,
                                    "loc": {
                                        "start": {
                                            "line": 3,
                                            "column": 18
                                        },
                                        "end": {
                                            "line": 3,
                                            "column": 19
                                        }
                                    }
                                }
                            ],
                            "id": null,
                            "async": true,
                            "generator": false,
                            "expression": false,
                            "start": 48,
                            "end": 61,
                            "loc": {
                                "start": {
                                    "line": 3,
                                    "column": 12
                                },
                                "end": {
                                    "line": 3,
                                    "column": 25
                                }
                            }
                        },
                        "start": 48,
                        "end": 61,
                        "loc": {
                            "start": {
                                "line": 3,
                                "column": 12
                            },
                            "end": {
                                "line": 3,
                                "column": 25
                            }
                        }
                    },
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "ArrowFunctionExpression",
                            "body": {
                                "type": "BlockStatement",
                                "body": [],
                                "start": 85,
                                "end": 87,
                                "loc": {
                                    "start": {
                                        "line": 4,
                                        "column": 23
                                    },
                                    "end": {
                                        "line": 4,
                                        "column": 25
                                    }
                                }
                            },
                            "params": [
                                {
                                    "type": "Identifier",
                                    "name": "b",
                                    "start": 80,
                                    "end": 81,
                                    "loc": {
                                        "start": {
                                            "line": 4,
                                            "column": 18
                                        },
                                        "end": {
                                            "line": 4,
                                            "column": 19
                                        }
                                    }
                                }
                            ],
                            "id": null,
                            "async": true,
                            "generator": false,
                            "expression": false,
                            "start": 74,
                            "end": 87,
                            "loc": {
                                "start": {
                                    "line": 4,
                                    "column": 12
                                },
                                "end": {
                                    "line": 4,
                                    "column": 25
                                }
                            }
                        },
                        "start": 74,
                        "end": 87,
                        "loc": {
                            "start": {
                                "line": 4,
                                "column": 12
                            },
                            "end": {
                                "line": 4,
                                "column": 25
                            }
                        }
                    },
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "ArrowFunctionExpression",
                            "body": {
                                "type": "BlockStatement",
                                "body": [],
                                "start": 112,
                                "end": 114,
                                "loc": {
                                    "start": {
                                        "line": 5,
                                        "column": 24
                                    },
                                    "end": {
                                        "line": 5,
                                        "column": 26
                                    }
                                }
                            },
                            "params": [],
                            "id": null,
                            "async": true,
                            "generator": false,
                            "expression": false,
                            "start": 100,
                            "end": 114,
                            "loc": {
                                "start": {
                                    "line": 5,
                                    "column": 12
                                },
                                "end": {
                                    "line": 5,
                                    "column": 26
                                }
                            }
                        },
                        "start": 100,
                        "end": 114,
                        "loc": {
                            "start": {
                                "line": 5,
                                "column": 12
                            },
                            "end": {
                                "line": 5,
                                "column": 26
                            }
                        }
                    },
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "ArrowFunctionExpression",
                            "body": {
                                "type": "BlockStatement",
                                "body": [],
                                "start": 139,
                                "end": 141,
                                "loc": {
                                    "start": {
                                        "line": 6,
                                        "column": 24
                                    },
                                    "end": {
                                        "line": 6,
                                        "column": 26
                                    }
                                }
                            },
                            "params": [],
                            "id": null,
                            "async": true,
                            "generator": false,
                            "expression": false,
                            "start": 127,
                            "end": 141,
                            "loc": {
                                "start": {
                                    "line": 6,
                                    "column": 12
                                },
                                "end": {
                                    "line": 6,
                                    "column": 26
                                }
                            }
                        },
                        "start": 127,
                        "end": 141,
                        "loc": {
                            "start": {
                                "line": 6,
                                "column": 12
                            },
                            "end": {
                                "line": 6,
                                "column": 26
                            }
                        }
                    },
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "ArrowFunctionExpression",
                            "body": {
                                "type": "BlockStatement",
                                "body": [],
                                "start": 160,
                                "end": 162,
                                "loc": {
                                    "start": {
                                        "line": 7,
                                        "column": 18
                                    },
                                    "end": {
                                        "line": 7,
                                        "column": 20
                                    }
                                }
                            },
                            "params": [],
                            "id": null,
                            "async": false,
                            "generator": false,
                            "expression": false,
                            "start": 154,
                            "end": 162,
                            "loc": {
                                "start": {
                                    "line": 7,
                                    "column": 12
                                },
                                "end": {
                                    "line": 7,
                                    "column": 20
                                }
                            }
                        },
                        "start": 154,
                        "end": 162,
                        "loc": {
                            "start": {
                                "line": 7,
                                "column": 12
                            },
                            "end": {
                                "line": 7,
                                "column": 20
                            }
                        }
                    },
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "ArrowFunctionExpression",
                            "body": {
                                "type": "BlockStatement",
                                "body": [],
                                "start": 180,
                                "end": 182,
                                "loc": {
                                    "start": {
                                        "line": 8,
                                        "column": 17
                                    },
                                    "end": {
                                        "line": 8,
                                        "column": 19
                                    }
                                }
                            },
                            "params": [
                                {
                                    "type": "Identifier",
                                    "name": "a",
                                    "start": 175,
                                    "end": 176,
                                    "loc": {
                                        "start": {
                                            "line": 8,
                                            "column": 12
                                        },
                                        "end": {
                                            "line": 8,
                                            "column": 13
                                        }
                                    }
                                }
                            ],
                            "id": null,
                            "async": false,
                            "generator": false,
                            "expression": false,
                            "start": 175,
                            "end": 182,
                            "loc": {
                                "start": {
                                    "line": 8,
                                    "column": 12
                                },
                                "end": {
                                    "line": 8,
                                    "column": 19
                                }
                            }
                        },
                        "start": 175,
                        "end": 182,
                        "loc": {
                            "start": {
                                "line": 8,
                                "column": 12
                            },
                            "end": {
                                "line": 8,
                                "column": 19
                            }
                        }
                    },
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "ArrowFunctionExpression",
                            "body": {
                                "type": "BlockStatement",
                                "body": [],
                                "start": 200,
                                "end": 202,
                                "loc": {
                                    "start": {
                                        "line": 9,
                                        "column": 17
                                    },
                                    "end": {
                                        "line": 9,
                                        "column": 19
                                    }
                                }
                            },
                            "params": [
                                {
                                    "type": "Identifier",
                                    "name": "a",
                                    "start": 195,
                                    "end": 196,
                                    "loc": {
                                        "start": {
                                            "line": 9,
                                            "column": 12
                                        },
                                        "end": {
                                            "line": 9,
                                            "column": 13
                                        }
                                    }
                                }
                            ],
                            "id": null,
                            "async": false,
                            "generator": false,
                            "expression": false,
                            "start": 195,
                            "end": 202,
                            "loc": {
                                "start": {
                                    "line": 9,
                                    "column": 12
                                },
                                "end": {
                                    "line": 9,
                                    "column": 19
                                }
                            }
                        },
                        "start": 195,
                        "end": 202,
                        "loc": {
                            "start": {
                                "line": 9,
                                "column": 12
                            },
                            "end": {
                                "line": 9,
                                "column": 19
                            }
                        }
                    },
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "ArrowFunctionExpression",
                            "body": {
                                "type": "BlockStatement",
                                "body": [],
                                "start": 227,
                                "end": 229,
                                "loc": {
                                    "start": {
                                        "line": 10,
                                        "column": 24
                                    },
                                    "end": {
                                        "line": 10,
                                        "column": 26
                                    }
                                }
                            },
                            "params": [],
                            "id": null,
                            "async": true,
                            "generator": false,
                            "expression": false,
                            "start": 215,
                            "end": 229,
                            "loc": {
                                "start": {
                                    "line": 10,
                                    "column": 12
                                },
                                "end": {
                                    "line": 10,
                                    "column": 26
                                }
                            }
                        },
                        "start": 215,
                        "end": 229,
                        "loc": {
                            "start": {
                                "line": 10,
                                "column": 12
                            },
                            "end": {
                                "line": 10,
                                "column": 26
                            }
                        }
                    },
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "ArrowFunctionExpression",
                            "body": {
                                "type": "BlockStatement",
                                "body": [],
                                "start": 248,
                                "end": 250,
                                "loc": {
                                    "start": {
                                        "line": 11,
                                        "column": 18
                                    },
                                    "end": {
                                        "line": 11,
                                        "column": 20
                                    }
                                }
                            },
                            "params": [],
                            "id": null,
                            "async": false,
                            "generator": false,
                            "expression": false,
                            "start": 242,
                            "end": 250,
                            "loc": {
                                "start": {
                                    "line": 11,
                                    "column": 12
                                },
                                "end": {
                                    "line": 11,
                                    "column": 20
                                }
                            }
                        },
                        "start": 242,
                        "end": 250,
                        "loc": {
                            "start": {
                                "line": 11,
                                "column": 12
                            },
                            "end": {
                                "line": 11,
                                "column": 20
                            }
                        }
                    },
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "ArrowFunctionExpression",
                            "body": {
                                "type": "BlockStatement",
                                "body": [],
                                "start": 268,
                                "end": 270,
                                "loc": {
                                    "start": {
                                        "line": 12,
                                        "column": 17
                                    },
                                    "end": {
                                        "line": 12,
                                        "column": 19
                                    }
                                }
                            },
                            "params": [
                                {
                                    "type": "Identifier",
                                    "name": "a",
                                    "start": 263,
                                    "end": 264,
                                    "loc": {
                                        "start": {
                                            "line": 12,
                                            "column": 12
                                        },
                                        "end": {
                                            "line": 12,
                                            "column": 13
                                        }
                                    }
                                }
                            ],
                            "id": null,
                            "async": false,
                            "generator": false,
                            "expression": false,
                            "start": 263,
                            "end": 270,
                            "loc": {
                                "start": {
                                    "line": 12,
                                    "column": 12
                                },
                                "end": {
                                    "line": 12,
                                    "column": 19
                                }
                            }
                        },
                        "start": 263,
                        "end": 270,
                        "loc": {
                            "start": {
                                "line": 12,
                                "column": 12
                            },
                            "end": {
                                "line": 12,
                                "column": 19
                            }
                        }
                    },
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "ArrowFunctionExpression",
                            "body": {
                                "type": "BlockStatement",
                                "body": [],
                                "start": 295,
                                "end": 297,
                                "loc": {
                                    "start": {
                                        "line": 13,
                                        "column": 24
                                    },
                                    "end": {
                                        "line": 13,
                                        "column": 26
                                    }
                                }
                            },
                            "params": [],
                            "id": null,
                            "async": true,
                            "generator": false,
                            "expression": false,
                            "start": 283,
                            "end": 297,
                            "loc": {
                                "start": {
                                    "line": 13,
                                    "column": 12
                                },
                                "end": {
                                    "line": 13,
                                    "column": 26
                                }
                            }
                        },
                        "start": 283,
                        "end": 297,
                        "loc": {
                            "start": {
                                "line": 13,
                                "column": 12
                            },
                            "end": {
                                "line": 13,
                                "column": 26
                            }
                        }
                    },
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "ArrowFunctionExpression",
                            "body": {
                                "type": "BlockStatement",
                                "body": [],
                                "start": 316,
                                "end": 318,
                                "loc": {
                                    "start": {
                                        "line": 14,
                                        "column": 18
                                    },
                                    "end": {
                                        "line": 14,
                                        "column": 20
                                    }
                                }
                            },
                            "params": [],
                            "id": null,
                            "async": false,
                            "generator": false,
                            "expression": false,
                            "start": 310,
                            "end": 318,
                            "loc": {
                                "start": {
                                    "line": 14,
                                    "column": 12
                                },
                                "end": {
                                    "line": 14,
                                    "column": 20
                                }
                            }
                        },
                        "start": 310,
                        "end": 318,
                        "loc": {
                            "start": {
                                "line": 14,
                                "column": 12
                            },
                            "end": {
                                "line": 14,
                                "column": 20
                            }
                        }
                    },
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "ArrowFunctionExpression",
                            "body": {
                                "type": "BlockStatement",
                                "body": [],
                                "start": 343,
                                "end": 345,
                                "loc": {
                                    "start": {
                                        "line": 15,
                                        "column": 24
                                    },
                                    "end": {
                                        "line": 15,
                                        "column": 26
                                    }
                                }
                            },
                            "params": [],
                            "id": null,
                            "async": true,
                            "generator": false,
                            "expression": false,
                            "start": 331,
                            "end": 345,
                            "loc": {
                                "start": {
                                    "line": 15,
                                    "column": 12
                                },
                                "end": {
                                    "line": 15,
                                    "column": 26
                                }
                            }
                        },
                        "start": 331,
                        "end": 345,
                        "loc": {
                            "start": {
                                "line": 15,
                                "column": 12
                            },
                            "end": {
                                "line": 15,
                                "column": 26
                            }
                        }
                    },
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "ArrowFunctionExpression",
                            "body": {
                                "type": "BlockStatement",
                                "body": [],
                                "start": 363,
                                "end": 365,
                                "loc": {
                                    "start": {
                                        "line": 16,
                                        "column": 17
                                    },
                                    "end": {
                                        "line": 16,
                                        "column": 19
                                    }
                                }
                            },
                            "params": [
                                {
                                    "type": "Identifier",
                                    "name": "a",
                                    "start": 358,
                                    "end": 359,
                                    "loc": {
                                        "start": {
                                            "line": 16,
                                            "column": 12
                                        },
                                        "end": {
                                            "line": 16,
                                            "column": 13
                                        }
                                    }
                                }
                            ],
                            "id": null,
                            "async": false,
                            "generator": false,
                            "expression": false,
                            "start": 358,
                            "end": 365,
                            "loc": {
                                "start": {
                                    "line": 16,
                                    "column": 12
                                },
                                "end": {
                                    "line": 16,
                                    "column": 19
                                }
                            }
                        },
                        "start": 358,
                        "end": 365,
                        "loc": {
                            "start": {
                                "line": 16,
                                "column": 12
                            },
                            "end": {
                                "line": 16,
                                "column": 19
                            }
                        }
                    },
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "ArrowFunctionExpression",
                            "body": {
                                "type": "BlockStatement",
                                "body": [],
                                "start": 390,
                                "end": 392,
                                "loc": {
                                    "start": {
                                        "line": 17,
                                        "column": 24
                                    },
                                    "end": {
                                        "line": 17,
                                        "column": 26
                                    }
                                }
                            },
                            "params": [],
                            "id": null,
                            "async": true,
                            "generator": false,
                            "expression": false,
                            "start": 378,
                            "end": 392,
                            "loc": {
                                "start": {
                                    "line": 17,
                                    "column": 12
                                },
                                "end": {
                                    "line": 17,
                                    "column": 26
                                }
                            }
                        },
                        "start": 378,
                        "end": 392,
                        "loc": {
                            "start": {
                                "line": 17,
                                "column": 12
                            },
                            "end": {
                                "line": 17,
                                "column": 26
                            }
                        }
                    },
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "ArrowFunctionExpression",
                            "body": {
                                "type": "BlockStatement",
                                "body": [],
                                "start": 417,
                                "end": 419,
                                "loc": {
                                    "start": {
                                        "line": 18,
                                        "column": 24
                                    },
                                    "end": {
                                        "line": 18,
                                        "column": 26
                                    }
                                }
                            },
                            "params": [],
                            "id": null,
                            "async": true,
                            "generator": false,
                            "expression": false,
                            "start": 405,
                            "end": 419,
                            "loc": {
                                "start": {
                                    "line": 18,
                                    "column": 12
                                },
                                "end": {
                                    "line": 18,
                                    "column": 26
                                }
                            }
                        },
                        "start": 405,
                        "end": 419,
                        "loc": {
                            "start": {
                                "line": 18,
                                "column": 12
                            },
                            "end": {
                                "line": 18,
                                "column": 26
                            }
                        }
                    },
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "ArrowFunctionExpression",
                            "body": {
                                "type": "BlockStatement",
                                "body": [],
                                "start": 438,
                                "end": 440,
                                "loc": {
                                    "start": {
                                        "line": 19,
                                        "column": 18
                                    },
                                    "end": {
                                        "line": 19,
                                        "column": 20
                                    }
                                }
                            },
                            "params": [],
                            "id": null,
                            "async": false,
                            "generator": false,
                            "expression": false,
                            "start": 432,
                            "end": 440,
                            "loc": {
                                "start": {
                                    "line": 19,
                                    "column": 12
                                },
                                "end": {
                                    "line": 19,
                                    "column": 20
                                }
                            }
                        },
                        "start": 432,
                        "end": 440,
                        "loc": {
                            "start": {
                                "line": 19,
                                "column": 12
                            },
                            "end": {
                                "line": 19,
                                "column": 20
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 440,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 19,
                        "column": 20
                    }
                }
            }
        });

        pass(`a => a => a => async a => a`, {
            source: 'a => a => a => async a => a',
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
                                "type": "ArrowFunctionExpression",
                                "body": {
                                    "type": "ArrowFunctionExpression",
                                    "body": {
                                        "type": "ArrowFunctionExpression",
                                        "body": {
                                            "type": "Identifier",
                                            "name": "a",
                                            "start": 26,
                                            "end": 27,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 26
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 27
                                                }
                                            }
                                        },
                                        "params": [
                                            {
                                                "type": "Identifier",
                                                "name": "a",
                                                "start": 21,
                                                "end": 22,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 21
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 22
                                                    }
                                                }
                                            }
                                        ],
                                        "id": null,
                                        "async": true,
                                        "generator": false,
                                        "expression": true,
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
                                        }
                                    },
                                    "params": [
                                        {
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
                                        }
                                    ],
                                    "id": null,
                                    "async": false,
                                    "generator": false,
                                    "expression": true,
                                    "start": 10,
                                    "end": 27,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 10
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 27
                                        }
                                    }
                                },
                                "params": [
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
                                "id": null,
                                "async": false,
                                "generator": false,
                                "expression": true,
                                "start": 5,
                                "end": 27,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 5
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 27
                                    }
                                }
                            },
                            "params": [
                                {
                                    "type": "Identifier",
                                    "name": "a",
                                    "start": 0,
                                    "end": 1,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 0
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 1
                                        }
                                    }
                                }
                            ],
                            "id": null,
                            "async": false,
                            "generator": false,
                            "expression": true,
                            "start": 0,
                            "end": 27,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 27
                                }
                            }
                        },
                        "start": 0,
                        "end": 27,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 27
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 27,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 27
                    }
                }
            }
        });

        pass(`a => a => a => async a => a`, {
            source: `b => {}
            a(b, c => 123)`,
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
                                "type": "BlockStatement",
                                "body": [],
                                "start": 5,
                                "end": 7,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 5
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 7
                                    }
                                }
                            },
                            "params": [
                                {
                                    "type": "Identifier",
                                    "name": "b",
                                    "start": 0,
                                    "end": 1,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 0
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 1
                                        }
                                    }
                                }
                            ],
                            "id": null,
                            "async": false,
                            "generator": false,
                            "expression": false,
                            "start": 0,
                            "end": 7,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 7
                                }
                            }
                        },
                        "start": 0,
                        "end": 7,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 7
                            }
                        }
                    },
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "CallExpression",
                            "callee": {
                                "type": "Identifier",
                                "name": "a",
                                "start": 20,
                                "end": 21,
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 12
                                    },
                                    "end": {
                                        "line": 2,
                                        "column": 13
                                    }
                                }
                            },
                            "arguments": [
                                {
                                    "type": "Identifier",
                                    "name": "b",
                                    "start": 22,
                                    "end": 23,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 14
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 15
                                        }
                                    }
                                },
                                {
                                    "type": "ArrowFunctionExpression",
                                    "body": {
                                        "type": "Literal",
                                        "value": 123,
                                        "start": 30,
                                        "end": 33,
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 22
                                            },
                                            "end": {
                                                "line": 2,
                                                "column": 25
                                            }
                                        },
                                        "raw": "123"
                                    },
                                    "params": [
                                        {
                                            "type": "Identifier",
                                            "name": "c",
                                            "start": 25,
                                            "end": 26,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 17
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 18
                                                }
                                            }
                                        }
                                    ],
                                    "id": null,
                                    "async": false,
                                    "generator": false,
                                    "expression": true,
                                    "start": 25,
                                    "end": 33,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 17
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 25
                                        }
                                    }
                                }
                            ],
                            "start": 20,
                            "end": 34,
                            "loc": {
                                "start": {
                                    "line": 2,
                                    "column": 12
                                },
                                "end": {
                                    "line": 2,
                                    "column": 26
                                }
                            }
                        },
                        "start": 20,
                        "end": 34,
                        "loc": {
                            "start": {
                                "line": 2,
                                "column": 12
                            },
                            "end": {
                                "line": 2,
                                "column": 26
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
                        "line": 2,
                        "column": 26
                    }
                }
            }
        });

        pass(`a => a => a => async a => a`, {
            source: `() => {}
            () => {}
            a => {}
            b => {
            async cherow => cherow(a, b, c);
            }
            () => {}
            () => {
              a = a.b.c(a,b)
              a = () => {
              async () => {}
              }
            }
            ((a, b) => { return a + b.d.e.a; })(1, 5), 6
            async b => {}
            async b => {}
            async a => {}
            ((a, b) => { return a + b; })(1, 5), () => {
              async cherow => a.b.c.d.e.f.g
            }
            () => {
              async a => {}
            }
            ((a, b))
            a = () => {}
            () => {}
            async cherow => a
            (async cherow => a)(b)`,
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
                                "type": "BlockStatement",
                                "body": [],
                                "start": 6,
                                "end": 8,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 6
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 8
                                    }
                                }
                            },
                            "params": [],
                            "id": null,
                            "async": false,
                            "generator": false,
                            "expression": false,
                            "start": 0,
                            "end": 8,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 8
                                }
                            }
                        },
                        "start": 0,
                        "end": 8,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 8
                            }
                        }
                    },
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "ArrowFunctionExpression",
                            "body": {
                                "type": "BlockStatement",
                                "body": [],
                                "start": 27,
                                "end": 29,
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 18
                                    },
                                    "end": {
                                        "line": 2,
                                        "column": 20
                                    }
                                }
                            },
                            "params": [],
                            "id": null,
                            "async": false,
                            "generator": false,
                            "expression": false,
                            "start": 21,
                            "end": 29,
                            "loc": {
                                "start": {
                                    "line": 2,
                                    "column": 12
                                },
                                "end": {
                                    "line": 2,
                                    "column": 20
                                }
                            }
                        },
                        "start": 21,
                        "end": 29,
                        "loc": {
                            "start": {
                                "line": 2,
                                "column": 12
                            },
                            "end": {
                                "line": 2,
                                "column": 20
                            }
                        }
                    },
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "ArrowFunctionExpression",
                            "body": {
                                "type": "BlockStatement",
                                "body": [],
                                "start": 47,
                                "end": 49,
                                "loc": {
                                    "start": {
                                        "line": 3,
                                        "column": 17
                                    },
                                    "end": {
                                        "line": 3,
                                        "column": 19
                                    }
                                }
                            },
                            "params": [
                                {
                                    "type": "Identifier",
                                    "name": "a",
                                    "start": 42,
                                    "end": 43,
                                    "loc": {
                                        "start": {
                                            "line": 3,
                                            "column": 12
                                        },
                                        "end": {
                                            "line": 3,
                                            "column": 13
                                        }
                                    }
                                }
                            ],
                            "id": null,
                            "async": false,
                            "generator": false,
                            "expression": false,
                            "start": 42,
                            "end": 49,
                            "loc": {
                                "start": {
                                    "line": 3,
                                    "column": 12
                                },
                                "end": {
                                    "line": 3,
                                    "column": 19
                                }
                            }
                        },
                        "start": 42,
                        "end": 49,
                        "loc": {
                            "start": {
                                "line": 3,
                                "column": 12
                            },
                            "end": {
                                "line": 3,
                                "column": 19
                            }
                        }
                    },
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "ArrowFunctionExpression",
                            "body": {
                                "type": "BlockStatement",
                                "body": [
                                    {
                                        "type": "ExpressionStatement",
                                        "expression": {
                                            "type": "ArrowFunctionExpression",
                                            "body": {
                                                "type": "CallExpression",
                                                "callee": {
                                                    "type": "Identifier",
                                                    "name": "cherow",
                                                    "start": 97,
                                                    "end": 103,
                                                    "loc": {
                                                        "start": {
                                                            "line": 5,
                                                            "column": 28
                                                        },
                                                        "end": {
                                                            "line": 5,
                                                            "column": 34
                                                        }
                                                    }
                                                },
                                                "arguments": [
                                                    {
                                                        "type": "Identifier",
                                                        "name": "a",
                                                        "start": 104,
                                                        "end": 105,
                                                        "loc": {
                                                            "start": {
                                                                "line": 5,
                                                                "column": 35
                                                            },
                                                            "end": {
                                                                "line": 5,
                                                                "column": 36
                                                            }
                                                        }
                                                    },
                                                    {
                                                        "type": "Identifier",
                                                        "name": "b",
                                                        "start": 107,
                                                        "end": 108,
                                                        "loc": {
                                                            "start": {
                                                                "line": 5,
                                                                "column": 38
                                                            },
                                                            "end": {
                                                                "line": 5,
                                                                "column": 39
                                                            }
                                                        }
                                                    },
                                                    {
                                                        "type": "Identifier",
                                                        "name": "c",
                                                        "start": 110,
                                                        "end": 111,
                                                        "loc": {
                                                            "start": {
                                                                "line": 5,
                                                                "column": 41
                                                            },
                                                            "end": {
                                                                "line": 5,
                                                                "column": 42
                                                            }
                                                        }
                                                    }
                                                ],
                                                "start": 97,
                                                "end": 112,
                                                "loc": {
                                                    "start": {
                                                        "line": 5,
                                                        "column": 28
                                                    },
                                                    "end": {
                                                        "line": 5,
                                                        "column": 43
                                                    }
                                                }
                                            },
                                            "params": [
                                                {
                                                    "type": "Identifier",
                                                    "name": "cherow",
                                                    "start": 87,
                                                    "end": 93,
                                                    "loc": {
                                                        "start": {
                                                            "line": 5,
                                                            "column": 18
                                                        },
                                                        "end": {
                                                            "line": 5,
                                                            "column": 24
                                                        }
                                                    }
                                                }
                                            ],
                                            "id": null,
                                            "async": true,
                                            "generator": false,
                                            "expression": true,
                                            "start": 81,
                                            "end": 112,
                                            "loc": {
                                                "start": {
                                                    "line": 5,
                                                    "column": 12
                                                },
                                                "end": {
                                                    "line": 5,
                                                    "column": 43
                                                }
                                            }
                                        },
                                        "start": 81,
                                        "end": 113,
                                        "loc": {
                                            "start": {
                                                "line": 5,
                                                "column": 12
                                            },
                                            "end": {
                                                "line": 5,
                                                "column": 44
                                            }
                                        }
                                    }
                                ],
                                "start": 67,
                                "end": 127,
                                "loc": {
                                    "start": {
                                        "line": 4,
                                        "column": 17
                                    },
                                    "end": {
                                        "line": 6,
                                        "column": 13
                                    }
                                }
                            },
                            "params": [
                                {
                                    "type": "Identifier",
                                    "name": "b",
                                    "start": 62,
                                    "end": 63,
                                    "loc": {
                                        "start": {
                                            "line": 4,
                                            "column": 12
                                        },
                                        "end": {
                                            "line": 4,
                                            "column": 13
                                        }
                                    }
                                }
                            ],
                            "id": null,
                            "async": false,
                            "generator": false,
                            "expression": false,
                            "start": 62,
                            "end": 127,
                            "loc": {
                                "start": {
                                    "line": 4,
                                    "column": 12
                                },
                                "end": {
                                    "line": 6,
                                    "column": 13
                                }
                            }
                        },
                        "start": 62,
                        "end": 127,
                        "loc": {
                            "start": {
                                "line": 4,
                                "column": 12
                            },
                            "end": {
                                "line": 6,
                                "column": 13
                            }
                        }
                    },
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "ArrowFunctionExpression",
                            "body": {
                                "type": "BlockStatement",
                                "body": [],
                                "start": 146,
                                "end": 148,
                                "loc": {
                                    "start": {
                                        "line": 7,
                                        "column": 18
                                    },
                                    "end": {
                                        "line": 7,
                                        "column": 20
                                    }
                                }
                            },
                            "params": [],
                            "id": null,
                            "async": false,
                            "generator": false,
                            "expression": false,
                            "start": 140,
                            "end": 148,
                            "loc": {
                                "start": {
                                    "line": 7,
                                    "column": 12
                                },
                                "end": {
                                    "line": 7,
                                    "column": 20
                                }
                            }
                        },
                        "start": 140,
                        "end": 148,
                        "loc": {
                            "start": {
                                "line": 7,
                                "column": 12
                            },
                            "end": {
                                "line": 7,
                                "column": 20
                            }
                        }
                    },
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "ArrowFunctionExpression",
                            "body": {
                                "type": "BlockStatement",
                                "body": [
                                    {
                                        "type": "ExpressionStatement",
                                        "expression": {
                                            "type": "AssignmentExpression",
                                            "left": {
                                                "type": "Identifier",
                                                "name": "a",
                                                "start": 183,
                                                "end": 184,
                                                "loc": {
                                                    "start": {
                                                        "line": 9,
                                                        "column": 14
                                                    },
                                                    "end": {
                                                        "line": 9,
                                                        "column": 15
                                                    }
                                                }
                                            },
                                            "operator": "=",
                                            "right": {
                                                "type": "CallExpression",
                                                "callee": {
                                                    "type": "MemberExpression",
                                                    "object": {
                                                        "type": "MemberExpression",
                                                        "object": {
                                                            "type": "Identifier",
                                                            "name": "a",
                                                            "start": 187,
                                                            "end": 188,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 9,
                                                                    "column": 18
                                                                },
                                                                "end": {
                                                                    "line": 9,
                                                                    "column": 19
                                                                }
                                                            }
                                                        },
                                                        "computed": false,
                                                        "property": {
                                                            "type": "Identifier",
                                                            "name": "b",
                                                            "start": 189,
                                                            "end": 190,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 9,
                                                                    "column": 20
                                                                },
                                                                "end": {
                                                                    "line": 9,
                                                                    "column": 21
                                                                }
                                                            }
                                                        },
                                                        "start": 187,
                                                        "end": 190,
                                                        "loc": {
                                                            "start": {
                                                                "line": 9,
                                                                "column": 18
                                                            },
                                                            "end": {
                                                                "line": 9,
                                                                "column": 21
                                                            }
                                                        }
                                                    },
                                                    "computed": false,
                                                    "property": {
                                                        "type": "Identifier",
                                                        "name": "c",
                                                        "start": 191,
                                                        "end": 192,
                                                        "loc": {
                                                            "start": {
                                                                "line": 9,
                                                                "column": 22
                                                            },
                                                            "end": {
                                                                "line": 9,
                                                                "column": 23
                                                            }
                                                        }
                                                    },
                                                    "start": 187,
                                                    "end": 192,
                                                    "loc": {
                                                        "start": {
                                                            "line": 9,
                                                            "column": 18
                                                        },
                                                        "end": {
                                                            "line": 9,
                                                            "column": 23
                                                        }
                                                    }
                                                },
                                                "arguments": [
                                                    {
                                                        "type": "Identifier",
                                                        "name": "a",
                                                        "start": 193,
                                                        "end": 194,
                                                        "loc": {
                                                            "start": {
                                                                "line": 9,
                                                                "column": 24
                                                            },
                                                            "end": {
                                                                "line": 9,
                                                                "column": 25
                                                            }
                                                        }
                                                    },
                                                    {
                                                        "type": "Identifier",
                                                        "name": "b",
                                                        "start": 195,
                                                        "end": 196,
                                                        "loc": {
                                                            "start": {
                                                                "line": 9,
                                                                "column": 26
                                                            },
                                                            "end": {
                                                                "line": 9,
                                                                "column": 27
                                                            }
                                                        }
                                                    }
                                                ],
                                                "start": 187,
                                                "end": 197,
                                                "loc": {
                                                    "start": {
                                                        "line": 9,
                                                        "column": 18
                                                    },
                                                    "end": {
                                                        "line": 9,
                                                        "column": 28
                                                    }
                                                }
                                            },
                                            "start": 183,
                                            "end": 197,
                                            "loc": {
                                                "start": {
                                                    "line": 9,
                                                    "column": 14
                                                },
                                                "end": {
                                                    "line": 9,
                                                    "column": 28
                                                }
                                            }
                                        },
                                        "start": 183,
                                        "end": 197,
                                        "loc": {
                                            "start": {
                                                "line": 9,
                                                "column": 14
                                            },
                                            "end": {
                                                "line": 9,
                                                "column": 28
                                            }
                                        }
                                    },
                                    {
                                        "type": "ExpressionStatement",
                                        "expression": {
                                            "type": "AssignmentExpression",
                                            "left": {
                                                "type": "Identifier",
                                                "name": "a",
                                                "start": 212,
                                                "end": 213,
                                                "loc": {
                                                    "start": {
                                                        "line": 10,
                                                        "column": 14
                                                    },
                                                    "end": {
                                                        "line": 10,
                                                        "column": 15
                                                    }
                                                }
                                            },
                                            "operator": "=",
                                            "right": {
                                                "type": "ArrowFunctionExpression",
                                                "body": {
                                                    "type": "BlockStatement",
                                                    "body": [
                                                        {
                                                            "type": "ExpressionStatement",
                                                            "expression": {
                                                                "type": "ArrowFunctionExpression",
                                                                "body": {
                                                                    "type": "BlockStatement",
                                                                    "body": [],
                                                                    "start": 250,
                                                                    "end": 252,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 11,
                                                                            "column": 26
                                                                        },
                                                                        "end": {
                                                                            "line": 11,
                                                                            "column": 28
                                                                        }
                                                                    }
                                                                },
                                                                "params": [],
                                                                "id": null,
                                                                "async": true,
                                                                "generator": false,
                                                                "expression": false,
                                                                "start": 238,
                                                                "end": 252,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 11,
                                                                        "column": 14
                                                                    },
                                                                    "end": {
                                                                        "line": 11,
                                                                        "column": 28
                                                                    }
                                                                }
                                                            },
                                                            "start": 238,
                                                            "end": 252,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 11,
                                                                    "column": 14
                                                                },
                                                                "end": {
                                                                    "line": 11,
                                                                    "column": 28
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    "start": 222,
                                                    "end": 268,
                                                    "loc": {
                                                        "start": {
                                                            "line": 10,
                                                            "column": 24
                                                        },
                                                        "end": {
                                                            "line": 12,
                                                            "column": 15
                                                        }
                                                    }
                                                },
                                                "params": [],
                                                "id": null,
                                                "async": false,
                                                "generator": false,
                                                "expression": false,
                                                "start": 216,
                                                "end": 268,
                                                "loc": {
                                                    "start": {
                                                        "line": 10,
                                                        "column": 18
                                                    },
                                                    "end": {
                                                        "line": 12,
                                                        "column": 15
                                                    }
                                                }
                                            },
                                            "start": 212,
                                            "end": 268,
                                            "loc": {
                                                "start": {
                                                    "line": 10,
                                                    "column": 14
                                                },
                                                "end": {
                                                    "line": 12,
                                                    "column": 15
                                                }
                                            }
                                        },
                                        "start": 212,
                                        "end": 268,
                                        "loc": {
                                            "start": {
                                                "line": 10,
                                                "column": 14
                                            },
                                            "end": {
                                                "line": 12,
                                                "column": 15
                                            }
                                        }
                                    }
                                ],
                                "start": 167,
                                "end": 282,
                                "loc": {
                                    "start": {
                                        "line": 8,
                                        "column": 18
                                    },
                                    "end": {
                                        "line": 13,
                                        "column": 13
                                    }
                                }
                            },
                            "params": [],
                            "id": null,
                            "async": false,
                            "generator": false,
                            "expression": false,
                            "start": 161,
                            "end": 282,
                            "loc": {
                                "start": {
                                    "line": 8,
                                    "column": 12
                                },
                                "end": {
                                    "line": 13,
                                    "column": 13
                                }
                            }
                        },
                        "start": 161,
                        "end": 282,
                        "loc": {
                            "start": {
                                "line": 8,
                                "column": 12
                            },
                            "end": {
                                "line": 13,
                                "column": 13
                            }
                        }
                    },
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "SequenceExpression",
                            "expressions": [
                                {
                                    "type": "CallExpression",
                                    "callee": {
                                        "type": "ArrowFunctionExpression",
                                        "body": {
                                            "type": "BlockStatement",
                                            "body": [
                                                {
                                                    "type": "ReturnStatement",
                                                    "argument": {
                                                        "type": "BinaryExpression",
                                                        "left": {
                                                            "type": "Identifier",
                                                            "name": "a",
                                                            "start": 315,
                                                            "end": 316,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 14,
                                                                    "column": 32
                                                                },
                                                                "end": {
                                                                    "line": 14,
                                                                    "column": 33
                                                                }
                                                            }
                                                        },
                                                        "right": {
                                                            "type": "MemberExpression",
                                                            "object": {
                                                                "type": "MemberExpression",
                                                                "object": {
                                                                    "type": "MemberExpression",
                                                                    "object": {
                                                                        "type": "Identifier",
                                                                        "name": "b",
                                                                        "start": 319,
                                                                        "end": 320,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 14,
                                                                                "column": 36
                                                                            },
                                                                            "end": {
                                                                                "line": 14,
                                                                                "column": 37
                                                                            }
                                                                        }
                                                                    },
                                                                    "computed": false,
                                                                    "property": {
                                                                        "type": "Identifier",
                                                                        "name": "d",
                                                                        "start": 321,
                                                                        "end": 322,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 14,
                                                                                "column": 38
                                                                            },
                                                                            "end": {
                                                                                "line": 14,
                                                                                "column": 39
                                                                            }
                                                                        }
                                                                    },
                                                                    "start": 319,
                                                                    "end": 322,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 14,
                                                                            "column": 36
                                                                        },
                                                                        "end": {
                                                                            "line": 14,
                                                                            "column": 39
                                                                        }
                                                                    }
                                                                },
                                                                "computed": false,
                                                                "property": {
                                                                    "type": "Identifier",
                                                                    "name": "e",
                                                                    "start": 323,
                                                                    "end": 324,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 14,
                                                                            "column": 40
                                                                        },
                                                                        "end": {
                                                                            "line": 14,
                                                                            "column": 41
                                                                        }
                                                                    }
                                                                },
                                                                "start": 319,
                                                                "end": 324,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 14,
                                                                        "column": 36
                                                                    },
                                                                    "end": {
                                                                        "line": 14,
                                                                        "column": 41
                                                                    }
                                                                }
                                                            },
                                                            "computed": false,
                                                            "property": {
                                                                "type": "Identifier",
                                                                "name": "a",
                                                                "start": 325,
                                                                "end": 326,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 14,
                                                                        "column": 42
                                                                    },
                                                                    "end": {
                                                                        "line": 14,
                                                                        "column": 43
                                                                    }
                                                                }
                                                            },
                                                            "start": 319,
                                                            "end": 326,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 14,
                                                                    "column": 36
                                                                },
                                                                "end": {
                                                                    "line": 14,
                                                                    "column": 43
                                                                }
                                                            }
                                                        },
                                                        "operator": "+",
                                                        "start": 315,
                                                        "end": 326,
                                                        "loc": {
                                                            "start": {
                                                                "line": 14,
                                                                "column": 32
                                                            },
                                                            "end": {
                                                                "line": 14,
                                                                "column": 43
                                                            }
                                                        }
                                                    },
                                                    "start": 308,
                                                    "end": 327,
                                                    "loc": {
                                                        "start": {
                                                            "line": 14,
                                                            "column": 25
                                                        },
                                                        "end": {
                                                            "line": 14,
                                                            "column": 44
                                                        }
                                                    }
                                                }
                                            ],
                                            "start": 306,
                                            "end": 329,
                                            "loc": {
                                                "start": {
                                                    "line": 14,
                                                    "column": 23
                                                },
                                                "end": {
                                                    "line": 14,
                                                    "column": 46
                                                }
                                            }
                                        },
                                        "params": [
                                            {
                                                "type": "Identifier",
                                                "name": "a",
                                                "start": 297,
                                                "end": 298,
                                                "loc": {
                                                    "start": {
                                                        "line": 14,
                                                        "column": 14
                                                    },
                                                    "end": {
                                                        "line": 14,
                                                        "column": 15
                                                    }
                                                }
                                            },
                                            {
                                                "type": "Identifier",
                                                "name": "b",
                                                "start": 300,
                                                "end": 301,
                                                "loc": {
                                                    "start": {
                                                        "line": 14,
                                                        "column": 17
                                                    },
                                                    "end": {
                                                        "line": 14,
                                                        "column": 18
                                                    }
                                                }
                                            }
                                        ],
                                        "id": null,
                                        "async": false,
                                        "generator": false,
                                        "expression": false,
                                        "start": 296,
                                        "end": 329,
                                        "loc": {
                                            "start": {
                                                "line": 14,
                                                "column": 13
                                            },
                                            "end": {
                                                "line": 14,
                                                "column": 46
                                            }
                                        }
                                    },
                                    "arguments": [
                                        {
                                            "type": "Literal",
                                            "value": 1,
                                            "start": 331,
                                            "end": 332,
                                            "loc": {
                                                "start": {
                                                    "line": 14,
                                                    "column": 48
                                                },
                                                "end": {
                                                    "line": 14,
                                                    "column": 49
                                                }
                                            },
                                            "raw": "1"
                                        },
                                        {
                                            "type": "Literal",
                                            "value": 5,
                                            "start": 334,
                                            "end": 335,
                                            "loc": {
                                                "start": {
                                                    "line": 14,
                                                    "column": 51
                                                },
                                                "end": {
                                                    "line": 14,
                                                    "column": 52
                                                }
                                            },
                                            "raw": "5"
                                        }
                                    ],
                                    "start": 295,
                                    "end": 336,
                                    "loc": {
                                        "start": {
                                            "line": 14,
                                            "column": 12
                                        },
                                        "end": {
                                            "line": 14,
                                            "column": 53
                                        }
                                    }
                                },
                                {
                                    "type": "Literal",
                                    "value": 6,
                                    "start": 338,
                                    "end": 339,
                                    "loc": {
                                        "start": {
                                            "line": 14,
                                            "column": 55
                                        },
                                        "end": {
                                            "line": 14,
                                            "column": 56
                                        }
                                    },
                                    "raw": "6"
                                }
                            ],
                            "start": 295,
                            "end": 339,
                            "loc": {
                                "start": {
                                    "line": 14,
                                    "column": 12
                                },
                                "end": {
                                    "line": 14,
                                    "column": 56
                                }
                            }
                        },
                        "start": 295,
                        "end": 339,
                        "loc": {
                            "start": {
                                "line": 14,
                                "column": 12
                            },
                            "end": {
                                "line": 14,
                                "column": 56
                            }
                        }
                    },
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "ArrowFunctionExpression",
                            "body": {
                                "type": "BlockStatement",
                                "body": [],
                                "start": 363,
                                "end": 365,
                                "loc": {
                                    "start": {
                                        "line": 15,
                                        "column": 23
                                    },
                                    "end": {
                                        "line": 15,
                                        "column": 25
                                    }
                                }
                            },
                            "params": [
                                {
                                    "type": "Identifier",
                                    "name": "b",
                                    "start": 358,
                                    "end": 359,
                                    "loc": {
                                        "start": {
                                            "line": 15,
                                            "column": 18
                                        },
                                        "end": {
                                            "line": 15,
                                            "column": 19
                                        }
                                    }
                                }
                            ],
                            "id": null,
                            "async": true,
                            "generator": false,
                            "expression": false,
                            "start": 352,
                            "end": 365,
                            "loc": {
                                "start": {
                                    "line": 15,
                                    "column": 12
                                },
                                "end": {
                                    "line": 15,
                                    "column": 25
                                }
                            }
                        },
                        "start": 352,
                        "end": 365,
                        "loc": {
                            "start": {
                                "line": 15,
                                "column": 12
                            },
                            "end": {
                                "line": 15,
                                "column": 25
                            }
                        }
                    },
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "ArrowFunctionExpression",
                            "body": {
                                "type": "BlockStatement",
                                "body": [],
                                "start": 389,
                                "end": 391,
                                "loc": {
                                    "start": {
                                        "line": 16,
                                        "column": 23
                                    },
                                    "end": {
                                        "line": 16,
                                        "column": 25
                                    }
                                }
                            },
                            "params": [
                                {
                                    "type": "Identifier",
                                    "name": "b",
                                    "start": 384,
                                    "end": 385,
                                    "loc": {
                                        "start": {
                                            "line": 16,
                                            "column": 18
                                        },
                                        "end": {
                                            "line": 16,
                                            "column": 19
                                        }
                                    }
                                }
                            ],
                            "id": null,
                            "async": true,
                            "generator": false,
                            "expression": false,
                            "start": 378,
                            "end": 391,
                            "loc": {
                                "start": {
                                    "line": 16,
                                    "column": 12
                                },
                                "end": {
                                    "line": 16,
                                    "column": 25
                                }
                            }
                        },
                        "start": 378,
                        "end": 391,
                        "loc": {
                            "start": {
                                "line": 16,
                                "column": 12
                            },
                            "end": {
                                "line": 16,
                                "column": 25
                            }
                        }
                    },
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "ArrowFunctionExpression",
                            "body": {
                                "type": "BlockStatement",
                                "body": [],
                                "start": 415,
                                "end": 417,
                                "loc": {
                                    "start": {
                                        "line": 17,
                                        "column": 23
                                    },
                                    "end": {
                                        "line": 17,
                                        "column": 25
                                    }
                                }
                            },
                            "params": [
                                {
                                    "type": "Identifier",
                                    "name": "a",
                                    "start": 410,
                                    "end": 411,
                                    "loc": {
                                        "start": {
                                            "line": 17,
                                            "column": 18
                                        },
                                        "end": {
                                            "line": 17,
                                            "column": 19
                                        }
                                    }
                                }
                            ],
                            "id": null,
                            "async": true,
                            "generator": false,
                            "expression": false,
                            "start": 404,
                            "end": 417,
                            "loc": {
                                "start": {
                                    "line": 17,
                                    "column": 12
                                },
                                "end": {
                                    "line": 17,
                                    "column": 25
                                }
                            }
                        },
                        "start": 404,
                        "end": 417,
                        "loc": {
                            "start": {
                                "line": 17,
                                "column": 12
                            },
                            "end": {
                                "line": 17,
                                "column": 25
                            }
                        }
                    },
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "SequenceExpression",
                            "expressions": [
                                {
                                    "type": "CallExpression",
                                    "callee": {
                                        "type": "ArrowFunctionExpression",
                                        "body": {
                                            "type": "BlockStatement",
                                            "body": [
                                                {
                                                    "type": "ReturnStatement",
                                                    "argument": {
                                                        "type": "BinaryExpression",
                                                        "left": {
                                                            "type": "Identifier",
                                                            "name": "a",
                                                            "start": 450,
                                                            "end": 451,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 18,
                                                                    "column": 32
                                                                },
                                                                "end": {
                                                                    "line": 18,
                                                                    "column": 33
                                                                }
                                                            }
                                                        },
                                                        "right": {
                                                            "type": "Identifier",
                                                            "name": "b",
                                                            "start": 454,
                                                            "end": 455,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 18,
                                                                    "column": 36
                                                                },
                                                                "end": {
                                                                    "line": 18,
                                                                    "column": 37
                                                                }
                                                            }
                                                        },
                                                        "operator": "+",
                                                        "start": 450,
                                                        "end": 455,
                                                        "loc": {
                                                            "start": {
                                                                "line": 18,
                                                                "column": 32
                                                            },
                                                            "end": {
                                                                "line": 18,
                                                                "column": 37
                                                            }
                                                        }
                                                    },
                                                    "start": 443,
                                                    "end": 456,
                                                    "loc": {
                                                        "start": {
                                                            "line": 18,
                                                            "column": 25
                                                        },
                                                        "end": {
                                                            "line": 18,
                                                            "column": 38
                                                        }
                                                    }
                                                }
                                            ],
                                            "start": 441,
                                            "end": 458,
                                            "loc": {
                                                "start": {
                                                    "line": 18,
                                                    "column": 23
                                                },
                                                "end": {
                                                    "line": 18,
                                                    "column": 40
                                                }
                                            }
                                        },
                                        "params": [
                                            {
                                                "type": "Identifier",
                                                "name": "a",
                                                "start": 432,
                                                "end": 433,
                                                "loc": {
                                                    "start": {
                                                        "line": 18,
                                                        "column": 14
                                                    },
                                                    "end": {
                                                        "line": 18,
                                                        "column": 15
                                                    }
                                                }
                                            },
                                            {
                                                "type": "Identifier",
                                                "name": "b",
                                                "start": 435,
                                                "end": 436,
                                                "loc": {
                                                    "start": {
                                                        "line": 18,
                                                        "column": 17
                                                    },
                                                    "end": {
                                                        "line": 18,
                                                        "column": 18
                                                    }
                                                }
                                            }
                                        ],
                                        "id": null,
                                        "async": false,
                                        "generator": false,
                                        "expression": false,
                                        "start": 431,
                                        "end": 458,
                                        "loc": {
                                            "start": {
                                                "line": 18,
                                                "column": 13
                                            },
                                            "end": {
                                                "line": 18,
                                                "column": 40
                                            }
                                        }
                                    },
                                    "arguments": [
                                        {
                                            "type": "Literal",
                                            "value": 1,
                                            "start": 460,
                                            "end": 461,
                                            "loc": {
                                                "start": {
                                                    "line": 18,
                                                    "column": 42
                                                },
                                                "end": {
                                                    "line": 18,
                                                    "column": 43
                                                }
                                            },
                                            "raw": "1"
                                        },
                                        {
                                            "type": "Literal",
                                            "value": 5,
                                            "start": 463,
                                            "end": 464,
                                            "loc": {
                                                "start": {
                                                    "line": 18,
                                                    "column": 45
                                                },
                                                "end": {
                                                    "line": 18,
                                                    "column": 46
                                                }
                                            },
                                            "raw": "5"
                                        }
                                    ],
                                    "start": 430,
                                    "end": 465,
                                    "loc": {
                                        "start": {
                                            "line": 18,
                                            "column": 12
                                        },
                                        "end": {
                                            "line": 18,
                                            "column": 47
                                        }
                                    }
                                },
                                {
                                    "type": "ArrowFunctionExpression",
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": [
                                            {
                                                "type": "ExpressionStatement",
                                                "expression": {
                                                    "type": "ArrowFunctionExpression",
                                                    "body": {
                                                        "type": "MemberExpression",
                                                        "object": {
                                                            "type": "MemberExpression",
                                                            "object": {
                                                                "type": "MemberExpression",
                                                                "object": {
                                                                    "type": "MemberExpression",
                                                                    "object": {
                                                                        "type": "MemberExpression",
                                                                        "object": {
                                                                            "type": "MemberExpression",
                                                                            "object": {
                                                                                "type": "Identifier",
                                                                                "name": "a",
                                                                                "start": 505,
                                                                                "end": 506,
                                                                                "loc": {
                                                                                    "start": {
                                                                                        "line": 19,
                                                                                        "column": 30
                                                                                    },
                                                                                    "end": {
                                                                                        "line": 19,
                                                                                        "column": 31
                                                                                    }
                                                                                }
                                                                            },
                                                                            "computed": false,
                                                                            "property": {
                                                                                "type": "Identifier",
                                                                                "name": "b",
                                                                                "start": 507,
                                                                                "end": 508,
                                                                                "loc": {
                                                                                    "start": {
                                                                                        "line": 19,
                                                                                        "column": 32
                                                                                    },
                                                                                    "end": {
                                                                                        "line": 19,
                                                                                        "column": 33
                                                                                    }
                                                                                }
                                                                            },
                                                                            "start": 505,
                                                                            "end": 508,
                                                                            "loc": {
                                                                                "start": {
                                                                                    "line": 19,
                                                                                    "column": 30
                                                                                },
                                                                                "end": {
                                                                                    "line": 19,
                                                                                    "column": 33
                                                                                }
                                                                            }
                                                                        },
                                                                        "computed": false,
                                                                        "property": {
                                                                            "type": "Identifier",
                                                                            "name": "c",
                                                                            "start": 509,
                                                                            "end": 510,
                                                                            "loc": {
                                                                                "start": {
                                                                                    "line": 19,
                                                                                    "column": 34
                                                                                },
                                                                                "end": {
                                                                                    "line": 19,
                                                                                    "column": 35
                                                                                }
                                                                            }
                                                                        },
                                                                        "start": 505,
                                                                        "end": 510,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 19,
                                                                                "column": 30
                                                                            },
                                                                            "end": {
                                                                                "line": 19,
                                                                                "column": 35
                                                                            }
                                                                        }
                                                                    },
                                                                    "computed": false,
                                                                    "property": {
                                                                        "type": "Identifier",
                                                                        "name": "d",
                                                                        "start": 511,
                                                                        "end": 512,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 19,
                                                                                "column": 36
                                                                            },
                                                                            "end": {
                                                                                "line": 19,
                                                                                "column": 37
                                                                            }
                                                                        }
                                                                    },
                                                                    "start": 505,
                                                                    "end": 512,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 19,
                                                                            "column": 30
                                                                        },
                                                                        "end": {
                                                                            "line": 19,
                                                                            "column": 37
                                                                        }
                                                                    }
                                                                },
                                                                "computed": false,
                                                                "property": {
                                                                    "type": "Identifier",
                                                                    "name": "e",
                                                                    "start": 513,
                                                                    "end": 514,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 19,
                                                                            "column": 38
                                                                        },
                                                                        "end": {
                                                                            "line": 19,
                                                                            "column": 39
                                                                        }
                                                                    }
                                                                },
                                                                "start": 505,
                                                                "end": 514,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 19,
                                                                        "column": 30
                                                                    },
                                                                    "end": {
                                                                        "line": 19,
                                                                        "column": 39
                                                                    }
                                                                }
                                                            },
                                                            "computed": false,
                                                            "property": {
                                                                "type": "Identifier",
                                                                "name": "f",
                                                                "start": 515,
                                                                "end": 516,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 19,
                                                                        "column": 40
                                                                    },
                                                                    "end": {
                                                                        "line": 19,
                                                                        "column": 41
                                                                    }
                                                                }
                                                            },
                                                            "start": 505,
                                                            "end": 516,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 19,
                                                                    "column": 30
                                                                },
                                                                "end": {
                                                                    "line": 19,
                                                                    "column": 41
                                                                }
                                                            }
                                                        },
                                                        "computed": false,
                                                        "property": {
                                                            "type": "Identifier",
                                                            "name": "g",
                                                            "start": 517,
                                                            "end": 518,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 19,
                                                                    "column": 42
                                                                },
                                                                "end": {
                                                                    "line": 19,
                                                                    "column": 43
                                                                }
                                                            }
                                                        },
                                                        "start": 505,
                                                        "end": 518,
                                                        "loc": {
                                                            "start": {
                                                                "line": 19,
                                                                "column": 30
                                                            },
                                                            "end": {
                                                                "line": 19,
                                                                "column": 43
                                                            }
                                                        }
                                                    },
                                                    "params": [
                                                        {
                                                            "type": "Identifier",
                                                            "name": "cherow",
                                                            "start": 495,
                                                            "end": 501,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 19,
                                                                    "column": 20
                                                                },
                                                                "end": {
                                                                    "line": 19,
                                                                    "column": 26
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    "id": null,
                                                    "async": true,
                                                    "generator": false,
                                                    "expression": true,
                                                    "start": 489,
                                                    "end": 518,
                                                    "loc": {
                                                        "start": {
                                                            "line": 19,
                                                            "column": 14
                                                        },
                                                        "end": {
                                                            "line": 19,
                                                            "column": 43
                                                        }
                                                    }
                                                },
                                                "start": 489,
                                                "end": 518,
                                                "loc": {
                                                    "start": {
                                                        "line": 19,
                                                        "column": 14
                                                    },
                                                    "end": {
                                                        "line": 19,
                                                        "column": 43
                                                    }
                                                }
                                            }
                                        ],
                                        "start": 473,
                                        "end": 532,
                                        "loc": {
                                            "start": {
                                                "line": 18,
                                                "column": 55
                                            },
                                            "end": {
                                                "line": 20,
                                                "column": 13
                                            }
                                        }
                                    },
                                    "params": [],
                                    "id": null,
                                    "async": false,
                                    "generator": false,
                                    "expression": false,
                                    "start": 467,
                                    "end": 532,
                                    "loc": {
                                        "start": {
                                            "line": 18,
                                            "column": 49
                                        },
                                        "end": {
                                            "line": 20,
                                            "column": 13
                                        }
                                    }
                                }
                            ],
                            "start": 430,
                            "end": 532,
                            "loc": {
                                "start": {
                                    "line": 18,
                                    "column": 12
                                },
                                "end": {
                                    "line": 20,
                                    "column": 13
                                }
                            }
                        },
                        "start": 430,
                        "end": 532,
                        "loc": {
                            "start": {
                                "line": 18,
                                "column": 12
                            },
                            "end": {
                                "line": 20,
                                "column": 13
                            }
                        }
                    },
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "ArrowFunctionExpression",
                            "body": {
                                "type": "BlockStatement",
                                "body": [
                                    {
                                        "type": "ExpressionStatement",
                                        "expression": {
                                            "type": "ArrowFunctionExpression",
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [],
                                                "start": 578,
                                                "end": 580,
                                                "loc": {
                                                    "start": {
                                                        "line": 22,
                                                        "column": 25
                                                    },
                                                    "end": {
                                                        "line": 22,
                                                        "column": 27
                                                    }
                                                }
                                            },
                                            "params": [
                                                {
                                                    "type": "Identifier",
                                                    "name": "a",
                                                    "start": 573,
                                                    "end": 574,
                                                    "loc": {
                                                        "start": {
                                                            "line": 22,
                                                            "column": 20
                                                        },
                                                        "end": {
                                                            "line": 22,
                                                            "column": 21
                                                        }
                                                    }
                                                }
                                            ],
                                            "id": null,
                                            "async": true,
                                            "generator": false,
                                            "expression": false,
                                            "start": 567,
                                            "end": 580,
                                            "loc": {
                                                "start": {
                                                    "line": 22,
                                                    "column": 14
                                                },
                                                "end": {
                                                    "line": 22,
                                                    "column": 27
                                                }
                                            }
                                        },
                                        "start": 567,
                                        "end": 580,
                                        "loc": {
                                            "start": {
                                                "line": 22,
                                                "column": 14
                                            },
                                            "end": {
                                                "line": 22,
                                                "column": 27
                                            }
                                        }
                                    }
                                ],
                                "start": 551,
                                "end": 594,
                                "loc": {
                                    "start": {
                                        "line": 21,
                                        "column": 18
                                    },
                                    "end": {
                                        "line": 23,
                                        "column": 13
                                    }
                                }
                            },
                            "params": [],
                            "id": null,
                            "async": false,
                            "generator": false,
                            "expression": false,
                            "start": 545,
                            "end": 594,
                            "loc": {
                                "start": {
                                    "line": 21,
                                    "column": 12
                                },
                                "end": {
                                    "line": 23,
                                    "column": 13
                                }
                            }
                        },
                        "start": 545,
                        "end": 594,
                        "loc": {
                            "start": {
                                "line": 21,
                                "column": 12
                            },
                            "end": {
                                "line": 23,
                                "column": 13
                            }
                        }
                    },
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "SequenceExpression",
                            "expressions": [
                                {
                                    "type": "Identifier",
                                    "name": "a",
                                    "start": 609,
                                    "end": 610,
                                    "loc": {
                                        "start": {
                                            "line": 24,
                                            "column": 14
                                        },
                                        "end": {
                                            "line": 24,
                                            "column": 15
                                        }
                                    }
                                },
                                {
                                    "type": "Identifier",
                                    "name": "b",
                                    "start": 612,
                                    "end": 613,
                                    "loc": {
                                        "start": {
                                            "line": 24,
                                            "column": 17
                                        },
                                        "end": {
                                            "line": 24,
                                            "column": 18
                                        }
                                    }
                                }
                            ],
                            "start": 609,
                            "end": 613,
                            "loc": {
                                "start": {
                                    "line": 24,
                                    "column": 14
                                },
                                "end": {
                                    "line": 24,
                                    "column": 18
                                }
                            }
                        },
                        "start": 607,
                        "end": 615,
                        "loc": {
                            "start": {
                                "line": 24,
                                "column": 12
                            },
                            "end": {
                                "line": 24,
                                "column": 20
                            }
                        }
                    },
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "AssignmentExpression",
                            "left": {
                                "type": "Identifier",
                                "name": "a",
                                "start": 628,
                                "end": 629,
                                "loc": {
                                    "start": {
                                        "line": 25,
                                        "column": 12
                                    },
                                    "end": {
                                        "line": 25,
                                        "column": 13
                                    }
                                }
                            },
                            "operator": "=",
                            "right": {
                                "type": "ArrowFunctionExpression",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 638,
                                    "end": 640,
                                    "loc": {
                                        "start": {
                                            "line": 25,
                                            "column": 22
                                        },
                                        "end": {
                                            "line": 25,
                                            "column": 24
                                        }
                                    }
                                },
                                "params": [],
                                "id": null,
                                "async": false,
                                "generator": false,
                                "expression": false,
                                "start": 632,
                                "end": 640,
                                "loc": {
                                    "start": {
                                        "line": 25,
                                        "column": 16
                                    },
                                    "end": {
                                        "line": 25,
                                        "column": 24
                                    }
                                }
                            },
                            "start": 628,
                            "end": 640,
                            "loc": {
                                "start": {
                                    "line": 25,
                                    "column": 12
                                },
                                "end": {
                                    "line": 25,
                                    "column": 24
                                }
                            }
                        },
                        "start": 628,
                        "end": 640,
                        "loc": {
                            "start": {
                                "line": 25,
                                "column": 12
                            },
                            "end": {
                                "line": 25,
                                "column": 24
                            }
                        }
                    },
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "ArrowFunctionExpression",
                            "body": {
                                "type": "BlockStatement",
                                "body": [],
                                "start": 659,
                                "end": 661,
                                "loc": {
                                    "start": {
                                        "line": 26,
                                        "column": 18
                                    },
                                    "end": {
                                        "line": 26,
                                        "column": 20
                                    }
                                }
                            },
                            "params": [],
                            "id": null,
                            "async": false,
                            "generator": false,
                            "expression": false,
                            "start": 653,
                            "end": 661,
                            "loc": {
                                "start": {
                                    "line": 26,
                                    "column": 12
                                },
                                "end": {
                                    "line": 26,
                                    "column": 20
                                }
                            }
                        },
                        "start": 653,
                        "end": 661,
                        "loc": {
                            "start": {
                                "line": 26,
                                "column": 12
                            },
                            "end": {
                                "line": 26,
                                "column": 20
                            }
                        }
                    },
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "ArrowFunctionExpression",
                            "body": {
                                "type": "CallExpression",
                                "callee": {
                                    "type": "CallExpression",
                                    "callee": {
                                        "type": "Identifier",
                                        "name": "a",
                                        "start": 690,
                                        "end": 691,
                                        "loc": {
                                            "start": {
                                                "line": 27,
                                                "column": 28
                                            },
                                            "end": {
                                                "line": 27,
                                                "column": 29
                                            }
                                        }
                                    },
                                    "arguments": [
                                        {
                                            "type": "ArrowFunctionExpression",
                                            "body": {
                                                "type": "Identifier",
                                                "name": "a",
                                                "start": 721,
                                                "end": 722,
                                                "loc": {
                                                    "start": {
                                                        "line": 28,
                                                        "column": 29
                                                    },
                                                    "end": {
                                                        "line": 28,
                                                        "column": 30
                                                    }
                                                }
                                            },
                                            "params": [
                                                {
                                                    "type": "Identifier",
                                                    "name": "cherow",
                                                    "start": 711,
                                                    "end": 717,
                                                    "loc": {
                                                        "start": {
                                                            "line": 28,
                                                            "column": 19
                                                        },
                                                        "end": {
                                                            "line": 28,
                                                            "column": 25
                                                        }
                                                    }
                                                }
                                            ],
                                            "id": null,
                                            "async": true,
                                            "generator": false,
                                            "expression": true,
                                            "start": 705,
                                            "end": 722,
                                            "loc": {
                                                "start": {
                                                    "line": 28,
                                                    "column": 13
                                                },
                                                "end": {
                                                    "line": 28,
                                                    "column": 30
                                                }
                                            }
                                        }
                                    ],
                                    "start": 690,
                                    "end": 723,
                                    "loc": {
                                        "start": {
                                            "line": 27,
                                            "column": 28
                                        },
                                        "end": {
                                            "line": 28,
                                            "column": 31
                                        }
                                    }
                                },
                                "arguments": [
                                    {
                                        "type": "Identifier",
                                        "name": "b",
                                        "start": 724,
                                        "end": 725,
                                        "loc": {
                                            "start": {
                                                "line": 28,
                                                "column": 32
                                            },
                                            "end": {
                                                "line": 28,
                                                "column": 33
                                            }
                                        }
                                    }
                                ],
                                "start": 690,
                                "end": 726,
                                "loc": {
                                    "start": {
                                        "line": 27,
                                        "column": 28
                                    },
                                    "end": {
                                        "line": 28,
                                        "column": 34
                                    }
                                }
                            },
                            "params": [
                                {
                                    "type": "Identifier",
                                    "name": "cherow",
                                    "start": 680,
                                    "end": 686,
                                    "loc": {
                                        "start": {
                                            "line": 27,
                                            "column": 18
                                        },
                                        "end": {
                                            "line": 27,
                                            "column": 24
                                        }
                                    }
                                }
                            ],
                            "id": null,
                            "async": true,
                            "generator": false,
                            "expression": true,
                            "start": 674,
                            "end": 726,
                            "loc": {
                                "start": {
                                    "line": 27,
                                    "column": 12
                                },
                                "end": {
                                    "line": 28,
                                    "column": 34
                                }
                            }
                        },
                        "start": 674,
                        "end": 726,
                        "loc": {
                            "start": {
                                "line": 27,
                                "column": 12
                            },
                            "end": {
                                "line": 28,
                                "column": 34
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 726,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 28,
                        "column": 34
                    }
                }
            }
        });

        pass(`(x=1) => x * x`, {
            source: '(x=1) => x * x',
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
                                "type": "BinaryExpression",
                                "left": {
                                    "type": "Identifier",
                                    "name": "x",
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
                                "right": {
                                    "type": "Identifier",
                                    "name": "x",
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
                                    }
                                },
                                "operator": "*",
                                "start": 9,
                                "end": 14,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 9
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 14
                                    }
                                }
                            },
                            "params": [
                                {
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "x",
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
                                    "right": {
                                        "type": "Literal",
                                        "value": 1,
                                        "start": 3,
                                        "end": 4,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 3
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 4
                                            }
                                        },
                                        "raw": "1"
                                    },
                                    "start": 1,
                                    "end": 4,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 1
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 4
                                        }
                                    }
                                }
                            ],
                            "id": null,
                            "async": false,
                            "generator": false,
                            "expression": true,
                            "start": 0,
                            "end": 14,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 14
                                }
                            }
                        },
                        "start": 0,
                        "end": 14,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 14
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 14,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 14
                    }
                }
            }
        });
    
        pass(`(x)=>{\'use strict\';}`, {
            source: '(x)=>{\'use strict\';}',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "body": [{
                    "end": 20,
                    "expression": {
                        "async": false,
                        "body": {
                            "body": [{
                                "end": 19,
                                "expression": {
                                    "end": 18,
                                    "loc": {
                                        "end": {
                                            "column": 18,
                                            "line": 1,
                                        },
                                        "start": {
                                            "column": 6,
                                            "line": 1,
                                        }
                                    },
                                    "raw": "'use strict'",
                                    "start": 6,
                                    "type": "Literal",
                                    "value": "use strict",
                                },
                                "loc": {
                                    "end": {
                                        "column": 19,
                                        "line": 1,
                                    },
                                    "start": {
                                        "column": 6,
                                        "line": 1,
                                    }
                                },
                                "start": 6,
                                "type": "ExpressionStatement"
                            }],
                            "end": 20,
                            "loc": {
                                "end": {
                                    "column": 20,
                                    "line": 1,
                                },
                                "start": {
                                    "column": 5,
                                    "line": 1,
                                }
                            },
                            "start": 5,
                            "type": "BlockStatement",
                        },
                        "end": 20,
                        "expression": false,
                        "generator": false,
                        "id": null,
                        "loc": {
                            "end": {
                                "column": 20,
                                "line": 1,
                            },
                            "start": {
                                "column": 0,
                                "line": 1,
                            }
                        },
                        "params": [{
                            "end": 2,
                            "loc": {
                                "end": {
                                    "column": 2,
                                    "line": 1,
                                },
                                "start": {
                                    "column": 1,
                                    "line": 1,
                                }
                            },
                            "name": "x",
                            "start": 1,
                            "type": "Identifier"
                        }],
                        "start": 0,
                        "type": "ArrowFunctionExpression",
                    },
                    "loc": {
                        "end": {
                            "column": 20,
                            "line": 1,
                        },
                        "start": {
                            "column": 0,
                            "line": 1,
                        }
                    },
                    "start": 0,
                    "type": "ExpressionStatement",
                }],
                "end": 20,
                "loc": {
                    "end": {
                        "column": 20,
                        "line": 1,
                    },
                    "start": {
                        "column": 0,
                        "line": 1,
                    },
                },
                "sourceType": "script",
                "start": 0,
                "type": "Program"
            }
        });
    
        fail(`var af = eval => 1;`, {
            source: '"use strict"; var af = eval => 1;',
        });

        fail(`var af = eval => 1;`, {
            source: '"use strict"; var af = arguments => 1;',
        });

        fail(`[]=>0`, {
            source: '[]=>0',
        });
    
        fail(`() ? 0`, {
            source: '() ? 0',
        });

        fail(`(a)\n=> 0`, {
            source: '(a)\n=> 0',
        });
    
        fail(`1 + ()`, {
            source: '1 + ()',
        });
    
        fail(`1 + ()`, {
            source: '1 + ()',
        });
    
        fail(`a\n=> 0`, {
            source: 'a\n=> 0',
        });

        fail(`(a,...a)/*\u2028*/ => 0`, {
            source: '(a,...a)/*\u2028*/ => 0',
        });
    
        fail(`a\n=> 0`, {
            source: 'a\n=> 0',
        });
    
        fail(`((a),...a) => 1`, {
            source: '((a),...a) => 1',
        });
    
        fail(`(a,...a)\n`, {
            source: '(a,...a)\n',
        });
    
        fail(`(a,...a)/*\u2028*/ => 0`, {
            source: '(a,...a)/*\u2028*/ => 0',
        });
    
        fail(`(a,...a)/*\u2029*/ => 0`, {
            source: '(a,...a)/*\u2029*/ => 0',
        });
    
        fail(`() <= 0`, {
            source: '() <= 0',
        });
    
        fail(`() + 0`, {
            source: '() + 0',
        });

        fail(`(a,...a)/*\u202a*/`, {
            source: '(a,...a)/*\u202a*/',
        });

        fail(`(a,...a)/*\n*/ => 0`, {
            source: '(a,...a)/*\n*/ => 0',
        });

        fail(`(a,...a)/*\r\n*/ => 0`, {
            source: '(a,...a)/*\r\n*/ => 0',
        });

        fail(`eval => {"use strict"};`, {
            source: 'eval => {"use strict"};',
        });

        fail(`(a,...[a]) => 0;`, {
            source: '(a,...[a]) => 0;',
        });

        fail(`(x, x) => y;`, {
            source: '(x, x) => y;',
        });
    });
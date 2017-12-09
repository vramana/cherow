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
    });
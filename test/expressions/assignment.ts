import { pass, fail } from '../utils';

describe('Expressions - Assignment', () => {
        
        pass(`x <<= 42`, {
            source: 'x <<= 42',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "left": {
                            "type": "Identifier",
                            "name": "x",
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
                        },
                        "operator": "<<=",
                        "right": {
                            "type": "Literal",
                            "value": 42,
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
                            },
                            "raw": "42"
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
    
        pass(`x &= 42;`, {
            source: 'x &= 42;',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "left": {
                            "type": "Identifier",
                            "name": "x",
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
                        },
                        "operator": "&=",
                        "right": {
                            "type": "Literal",
                            "value": 42,
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
                            },
                            "raw": "42"
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
    
        pass(`x /= 42`, {
            source: 'x /= 42',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "left": {
                            "type": "Identifier",
                            "name": "x",
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
                        },
                        "operator": "/=",
                        "right": {
                            "type": "Literal",
                            "value": 42,
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
                            },
                            "raw": "42"
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
    
        pass(`arguments = 42`, {
            source: 'arguments = 42',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "left": {
                            "type": "Identifier",
                            "name": "arguments",
                            "start": 0,
                            "end": 9,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 9
                                }
                            }
                        },
                        "operator": "=",
                        "right": {
                            "type": "Literal",
                            "value": 42,
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
                            },
                            "raw": "42"
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
    
        pass(`x >>>= 42`, {
            source: 'x >>>= 42',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "left": {
                            "type": "Identifier",
                            "name": "x",
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
                        },
                        "operator": ">>>=",
                        "right": {
                            "type": "Literal",
                            "value": 42,
                            "start": 7,
                            "end": 9,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 7
                                },
                                "end": {
                                    "line": 1,
                                    "column": 9
                                }
                            },
                            "raw": "42"
                        },
                        "start": 0,
                        "end": 9,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 9
                            }
                        }
                    },
                    "start": 0,
                    "end": 9,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 9
                        }
                    }
                }],
                "sourceType": "script",
                "start": 0,
                "end": 9,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 9
                    }
                }
            }
        });
    
        pass(`x >>= 42;`, {
            source: 'x >>= 42',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "left": {
                            "type": "Identifier",
                            "name": "x",
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
                        },
                        "operator": ">>=",
                        "right": {
                            "type": "Literal",
                            "value": 42,
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
                            },
                            "raw": "42"
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
    
        pass(`x |= 42`, {
            source: 'x |= 42',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "left": {
                            "type": "Identifier",
                            "name": "x",
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
                        },
                        "operator": "|=",
                        "right": {
                            "type": "Literal",
                            "value": 42,
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
                            },
                            "raw": "42"
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
    
        pass(`a=0;`, {
            source: 'a=0;',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "left": {
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
                        },
                        "operator": "=",
                        "right": {
                            "type": "Literal",
                            "value": 0,
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
                            },
                            "raw": "0"
                        },
                        "start": 0,
                        "end": 3,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 3
                            }
                        }
                    },
                    "start": 0,
                    "end": 4,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 4
                        }
                    }
                }],
                "sourceType": "script",
                "start": 0,
                "end": 4,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 4
                    }
                }
            }
        });
    
        pass(`(a)=(0);`, {
            source: '(a)=(0);',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "left": {
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
                        "operator": "=",
                        "right": {
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
    
        pass(`x = 0`, {
            source: 'x = 0',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "left": {
                            "type": "Identifier",
                            "name": "x",
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
                        },
                        "operator": "=",
                        "right": {
                            "type": "Literal",
                            "value": 0,
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
                            },
                            "raw": "0"
                        },
                        "start": 0,
                        "end": 5,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 5
                            }
                        }
                    },
                    "start": 0,
                    "end": 5,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 5
                        }
                    }
                }],
                "sourceType": "script",
                "start": 0,
                "end": 5,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 5
                    }
                }
            }
        });
    
        pass(`eval = 0`, {
            source: 'eval = 0',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "left": {
                            "type": "Identifier",
                            "name": "eval",
                            "start": 0,
                            "end": 4,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 4
                                }
                            }
                        },
                        "operator": "=",
                        "right": {
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
    
        pass(`x *= 0`, {
            source: 'x *= 0',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "left": {
                            "type": "Identifier",
                            "name": "x",
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
                        },
                        "operator": "*=",
                        "right": {
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
                        }
                    },
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
                    }
                }],
                "sourceType": "script",
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
                }
            }
        });
    
        pass(`x.x *= 0`, {
            source: 'x.x *= 0',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "left": {
                            "type": "MemberExpression",
                            "object": {
                                "type": "Identifier",
                                "name": "x",
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
                            },
                            "computed": false,
                            "property": {
                                "type": "Identifier",
                                "name": "x",
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
                            },
                            "start": 0,
                            "end": 3,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 3
                                }
                            }
                        },
                        "operator": "*=",
                        "right": {
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
    
        pass(`x /= 0`, {
            source: 'x /= 0',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "left": {
                            "type": "Identifier",
                            "name": "x",
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
                        },
                        "operator": "/=",
                        "right": {
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
                        }
                    },
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
                    }
                }],
                "sourceType": "script",
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
                }
            }
        });
    
        pass(`x %= 0`, {
            source: 'x %= 0',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "left": {
                            "type": "Identifier",
                            "name": "x",
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
                        },
                        "operator": "%=",
                        "right": {
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
                        }
                    },
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
                    }
                }],
                "sourceType": "script",
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
                }
            }
        });
    
        pass(`x **= 0`, {
            source: 'x **= 0',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "left": {
                            "type": "Identifier",
                            "name": "x",
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
                        },
                        "operator": "**=",
                        "right": {
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
    
        pass(`x <<= 0`, {
            source: 'x <<= 0',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "left": {
                            "type": "Identifier",
                            "name": "x",
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
                        },
                        "operator": "<<=",
                        "right": {
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
    
        pass(`x |= 0`, {
            source: 'x |= 0',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "left": {
                            "type": "Identifier",
                            "name": "x",
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
                        },
                        "operator": "|=",
                        "right": {
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
                        }
                    },
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
                    }
                }],
                "sourceType": "script",
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
                }
            }
        });
    
        pass(`((((((((((((((((((((((((((((((((((((((((a)))))))))))))))))))))))))))))))))))))))) = 0`, {
            source: '((((((((((((((((((((((((((((((((((((((((a)))))))))))))))))))))))))))))))))))))))) = 0',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "left": {
                            "type": "Identifier",
                            "name": "a",
                            "start": 40,
                            "end": 41,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 40
                                },
                                "end": {
                                    "line": 1,
                                    "column": 41
                                }
                            }
                        },
                        "operator": "=",
                        "right": {
                            "type": "Literal",
                            "value": 0,
                            "start": 84,
                            "end": 85,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 84
                                },
                                "end": {
                                    "line": 1,
                                    "column": 85
                                }
                            },
                            "raw": "0"
                        },
                        "start": 0,
                        "end": 85,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 85
                            }
                        }
                    },
                    "start": 0,
                    "end": 85,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 85
                        }
                    }
                }],
                "sourceType": "script",
                "start": 0,
                "end": 85,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 85
                    }
                }
            }
        });
    
        pass(`((((((((((((((((((((((((((((((((((((((((a.a)))))))))))))))))))))))))))))))))))))))) = 0`, {
            source: '((((((((((((((((((((((((((((((((((((((((a.a)))))))))))))))))))))))))))))))))))))))) = 0',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "left": {
                            "type": "MemberExpression",
                            "object": {
                                "type": "Identifier",
                                "name": "a",
                                "start": 40,
                                "end": 41,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 40
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 41
                                    }
                                }
                            },
                            "computed": false,
                            "property": {
                                "type": "Identifier",
                                "name": "a",
                                "start": 42,
                                "end": 43,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 42
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 43
                                    }
                                }
                            },
                            "start": 40,
                            "end": 43,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 40
                                },
                                "end": {
                                    "line": 1,
                                    "column": 43
                                }
                            }
                        },
                        "operator": "=",
                        "right": {
                            "type": "Literal",
                            "value": 0,
                            "start": 86,
                            "end": 87,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 86
                                },
                                "end": {
                                    "line": 1,
                                    "column": 87
                                }
                            },
                            "raw": "0"
                        },
                        "start": 0,
                        "end": 87,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 87
                            }
                        }
                    },
                    "start": 0,
                    "end": 87,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 87
                        }
                    }
                }],
                "sourceType": "script",
                "start": 0,
                "end": 87,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 87
                    }
                }
            }
        });
    
        pass(`[0].length = 0`, {
            source: '[0].length = 0',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "left": {
                            "type": "MemberExpression",
                            "object": {
                                "type": "ArrayExpression",
                                "elements": [{
                                    "type": "Literal",
                                    "value": 0,
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
                                    },
                                    "raw": "0"
                                }],
                                "start": 0,
                                "end": 3,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 0
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 3
                                    }
                                }
                            },
                            "computed": false,
                            "property": {
                                "type": "Identifier",
                                "name": "length",
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
                        "operator": "=",
                        "right": {
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
    
        pass(`([0].length) = 0`, {
            source: '([0].length) = 0',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "left": {
                            "type": "MemberExpression",
                            "object": {
                                "type": "ArrayExpression",
                                "elements": [{
                                    "type": "Literal",
                                    "value": 0,
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
                                    },
                                    "raw": "0"
                                }],
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
                            },
                            "computed": false,
                            "property": {
                                "type": "Identifier",
                                "name": "length",
                                "start": 5,
                                "end": 11,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 5
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 11
                                    }
                                }
                            },
                            "start": 1,
                            "end": 11,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 1
                                },
                                "end": {
                                    "line": 1,
                                    "column": 11
                                }
                            }
                        },
                        "operator": "=",
                        "right": {
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
    
        pass(`(a**b).c=0`, {
            source: '(a**b).c=0',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "left": {
                            "type": "MemberExpression",
                            "object": {
                                "type": "BinaryExpression",
                                "left": {
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
                                "right": {
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
                                "operator": "**",
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
                            },
                            "computed": false,
                            "property": {
                                "type": "Identifier",
                                "name": "c",
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
                        "operator": "=",
                        "right": {
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
    
        fail(`"use strict"; (arguments) = 20;`, {
            source: '"use strict"; (arguments) = 20;',
            loc: true,
            ranges: true,
            raw: true
        });
    
        fail(`(({a})=0);`, {
            source: '(({a})=0);',
            loc: true,
            ranges: true,
            raw: true
        });
    
        fail(`(([a])=0);`, {
            source: '(([a])=0);',
            loc: true,
            ranges: true,
            raw: true
        });
        /*
                fail(`({a: (b = 0)} = {})`, {
                    source: '({a: (b = 0)} = {})',
                    loc: true,
                    ranges: true,
                    raw: true
                });
                */
        fail(`([(a = b)] = []`, {
            source: '([(a = b)] = []',
            loc: true,
            ranges: true,
            raw: true
        });

        fail(`42 = 42;`, {
           source: '42 = 42;',
        });

        fail(`"x" = 42;`, {
           source: '"x" = 42;',
        });
    
    });
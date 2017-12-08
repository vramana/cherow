import { pass, fail } from '../utils';

describe('Statements - Variable', () => {
    
        pass(`var x`, {
            source: 'var x',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
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
                },
                "body": [{
                    "type": "VariableDeclaration",
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
                    },
                    "declarations": [{
                        "type": "VariableDeclarator",
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
                        "id": {
                            "type": "Identifier",
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
                            "name": "x"
                        },
                        "init": null
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            }
        });
    
        pass(`var x, y;`, {
            source: 'var x, y;',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
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
                },
                "body": [{
                    "type": "VariableDeclaration",
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
                    },
                    "declarations": [{
                            "type": "VariableDeclarator",
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
                            "id": {
                                "type": "Identifier",
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
                                "name": "x"
                            },
                            "init": null
                        },
                        {
                            "type": "VariableDeclarator",
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
                            "id": {
                                "type": "Identifier",
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
                                "name": "y"
                            },
                            "init": null
                        }
                    ],
                    "kind": "var"
                }],
                "sourceType": "script"
            }
        });
    
        pass(`tvar x = 0`, {
            source: 'var x = 0',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
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
                },
                "body": [{
                    "type": "VariableDeclaration",
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
                    },
                    "declarations": [{
                        "type": "VariableDeclarator",
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
                        },
                        "id": {
                            "type": "Identifier",
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
                            "name": "x"
                        },
                        "init": {
                            "type": "Literal",
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
                            },
                            "value": 0,
                            "raw": "0"
                        }
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            }
        });
    
        pass(`var eval = 0, arguments = 1`, {
            source: 'var eval = 0, arguments = 1',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
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
                },
                "body": [{
                    "type": "VariableDeclaration",
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
                    },
                    "declarations": [{
                            "type": "VariableDeclarator",
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
                            },
                            "id": {
                                "type": "Identifier",
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
                                },
                                "name": "eval"
                            },
                            "init": {
                                "type": "Literal",
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
                                "value": 0,
                                "raw": "0"
                            }
                        },
                        {
                            "type": "VariableDeclarator",
                            "start": 14,
                            "end": 27,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 14
                                },
                                "end": {
                                    "line": 1,
                                    "column": 27
                                }
                            },
                            "id": {
                                "type": "Identifier",
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
                                },
                                "name": "arguments"
                            },
                            "init": {
                                "type": "Literal",
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
                                },
                                "value": 1,
                                "raw": "1"
                            }
                        }
                    ],
                    "kind": "var"
                }],
                "sourceType": "script"
            }
        });
    
        pass(`var x = 0, y = 1, z = 2`, {
            source: 'var x = 0, y = 1, z = 2',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
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
                },
                "body": [{
                    "type": "VariableDeclaration",
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
                    },
                    "declarations": [{
                            "type": "VariableDeclarator",
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
                            },
                            "id": {
                                "type": "Identifier",
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
                                "name": "x"
                            },
                            "init": {
                                "type": "Literal",
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
                                },
                                "value": 0,
                                "raw": "0"
                            }
                        },
                        {
                            "type": "VariableDeclarator",
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
                            },
                            "id": {
                                "type": "Identifier",
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
                                "name": "y"
                            },
                            "init": {
                                "type": "Literal",
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
                                "value": 1,
                                "raw": "1"
                            }
                        },
                        {
                            "type": "VariableDeclarator",
                            "start": 18,
                            "end": 23,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 18
                                },
                                "end": {
                                    "line": 1,
                                    "column": 23
                                }
                            },
                            "id": {
                                "type": "Identifier",
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
                                "name": "z"
                            },
                            "init": {
                                "type": "Literal",
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
                                },
                                "value": 2,
                                "raw": "2"
                            }
                        }
                    ],
                    "kind": "var"
                }],
                "sourceType": "script"
            }
        });
    
        pass(`var implements, interface, package`, {
            source: 'var implements, interface, package',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
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
                },
                "body": [{
                    "type": "VariableDeclaration",
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
                    },
                    "declarations": [{
                            "type": "VariableDeclarator",
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
                            },
                            "id": {
                                "type": "Identifier",
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
                                },
                                "name": "implements"
                            },
                            "init": null
                        },
                        {
                            "type": "VariableDeclarator",
                            "start": 16,
                            "end": 25,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 16
                                },
                                "end": {
                                    "line": 1,
                                    "column": 25
                                }
                            },
                            "id": {
                                "type": "Identifier",
                                "start": 16,
                                "end": 25,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 16
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 25
                                    }
                                },
                                "name": "interface"
                            },
                            "init": null
                        },
                        {
                            "type": "VariableDeclarator",
                            "start": 27,
                            "end": 34,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 27
                                },
                                "end": {
                                    "line": 1,
                                    "column": 34
                                }
                            },
                            "id": {
                                "type": "Identifier",
                                "start": 27,
                                "end": 34,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 27
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 34
                                    }
                                },
                                "name": "package"
                            },
                            "init": null
                        }
                    ],
                    "kind": "var"
                }],
                "sourceType": "script"
            }
        });
    
        pass(`tvar yield;`, {
            source: 'var yield;',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
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
                },
                "body": [{
                    "type": "VariableDeclaration",
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
                    },
                    "declarations": [{
                        "type": "VariableDeclarator",
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
                        },
                        "id": {
                            "type": "Identifier",
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
                            },
                            "name": "yield"
                        },
                        "init": null
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            }
        });
    
    
        pass(`var async = await;`, {
            source: 'var async = await;',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
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
                },
                "body": [{
                    "type": "VariableDeclaration",
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
                    },
                    "declarations": [{
                        "type": "VariableDeclarator",
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
                        },
                        "id": {
                            "type": "Identifier",
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
                            },
                            "name": "async"
                        },
                        "init": {
                            "type": "Identifier",
                            "start": 12,
                            "end": 17,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 12
                                },
                                "end": {
                                    "line": 1,
                                    "column": 17
                                }
                            },
                            "name": "await"
                        }
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            }
        });
    
    
        pass(`var let`, {
            source: 'var let',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
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
                },
                "body": [{
                    "type": "VariableDeclaration",
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
                    },
                    "declarations": [{
                        "type": "VariableDeclarator",
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
                        },
                        "id": {
                            "type": "Identifier",
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
                            },
                            "name": "let"
                        },
                        "init": null
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            }
        });
    
        pass(`{ let x }`, {
            source: '{ let x }',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
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
                },
                "body": [{
                    "type": "BlockStatement",
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
                    },
                    "body": [{
                        "type": "VariableDeclaration",
                        "start": 2,
                        "end": 7,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 2
                            },
                            "end": {
                                "line": 1,
                                "column": 7
                            }
                        },
                        "declarations": [{
                            "type": "VariableDeclarator",
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
                            "id": {
                                "type": "Identifier",
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
                                "name": "x"
                            },
                            "init": null
                        }],
                        "kind": "let"
                    }]
                }],
                "sourceType": "script"
            }
        });
    
        pass(`{ let x = 0, y = 1, z = 2 }`, {
            source: '{ let x = 0, y = 1, z = 2 }',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
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
                },
                "body": [{
                    "type": "BlockStatement",
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
                    },
                    "body": [{
                        "type": "VariableDeclaration",
                        "start": 2,
                        "end": 25,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 2
                            },
                            "end": {
                                "line": 1,
                                "column": 25
                            }
                        },
                        "declarations": [{
                                "type": "VariableDeclarator",
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
                                },
                                "id": {
                                    "type": "Identifier",
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
                                    "name": "x"
                                },
                                "init": {
                                    "type": "Literal",
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
                                    "value": 0,
                                    "raw": "0"
                                }
                            },
                            {
                                "type": "VariableDeclarator",
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
                                },
                                "id": {
                                    "type": "Identifier",
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
                                    "name": "y"
                                },
                                "init": {
                                    "type": "Literal",
                                    "start": 17,
                                    "end": 18,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 17
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 18
                                        }
                                    },
                                    "value": 1,
                                    "raw": "1"
                                }
                            },
                            {
                                "type": "VariableDeclarator",
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
                                "id": {
                                    "type": "Identifier",
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
                                    "name": "z"
                                },
                                "init": {
                                    "type": "Literal",
                                    "start": 24,
                                    "end": 25,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 24
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 25
                                        }
                                    },
                                    "value": 2,
                                    "raw": "2"
                                }
                            }
                        ],
                        "kind": "let"
                    }]
                }],
                "sourceType": "script"
            }
        });
    
        pass(`var static;`, {
            source: 'var static;',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
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
                },
                "body": [{
                    "type": "VariableDeclaration",
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
                    },
                    "declarations": [{
                        "type": "VariableDeclarator",
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
                        },
                        "id": {
                            "type": "Identifier",
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
                            },
                            "name": "static"
                        },
                        "init": null
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            }
        });
    
        pass(`(let[a])`, {
            source: '(let[a])',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
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
                },
                "body": [{
                    "type": "ExpressionStatement",
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
                    },
                    "expression": {
                        "type": "MemberExpression",
                        "start": 1,
                        "end": 7,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 1
                            },
                            "end": {
                                "line": 1,
                                "column": 7
                            }
                        },
                        "object": {
                            "type": "Identifier",
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
                            },
                            "name": "let"
                        },
                        "property": {
                            "type": "Identifier",
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
                            "name": "a"
                        },
                        "computed": true
                    }
                }],
                "sourceType": "script"
            }
        });
    
        pass(`{ const x = 0, y = 1, z = 2 }`, {
            source: '{ const x = 0, y = 1, z = 2 }',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
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
                },
                "body": [{
                    "type": "BlockStatement",
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
                    },
                    "body": [{
                        "type": "VariableDeclaration",
                        "start": 2,
                        "end": 27,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 2
                            },
                            "end": {
                                "line": 1,
                                "column": 27
                            }
                        },
                        "declarations": [{
                                "type": "VariableDeclarator",
                                "start": 8,
                                "end": 13,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 8
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 13
                                    }
                                },
                                "id": {
                                    "type": "Identifier",
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
                                    },
                                    "name": "x"
                                },
                                "init": {
                                    "type": "Literal",
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
                                    "value": 0,
                                    "raw": "0"
                                }
                            },
                            {
                                "type": "VariableDeclarator",
                                "start": 15,
                                "end": 20,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 15
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 20
                                    }
                                },
                                "id": {
                                    "type": "Identifier",
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
                                    "name": "y"
                                },
                                "init": {
                                    "type": "Literal",
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
                                    "value": 1,
                                    "raw": "1"
                                }
                            },
                            {
                                "type": "VariableDeclarator",
                                "start": 22,
                                "end": 27,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 22
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 27
                                    }
                                },
                                "id": {
                                    "type": "Identifier",
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
                                    },
                                    "name": "z"
                                },
                                "init": {
                                    "type": "Literal",
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
                                    },
                                    "value": 2,
                                    "raw": "2"
                                }
                            }
                        ],
                        "kind": "const"
                    }]
                }],
                "sourceType": "script"
            }
        });
        
        fail(`var {a:a};`, {
            source: 'var {a:a};',
            loc: true,
            ranges: true,
            raw: true
        });
    
        fail(`var {a};`, {
            source: 'var {a};',
            loc: true,
            ranges: true,
            raw: true
        });
    
        fail(`var [a];`, {
            source: 'var [a];',
            loc: true,
            ranges: true,
            raw: true
        });
    
        fail(`var this`, {
            source: 'var this',
            loc: true,
            ranges: true,
            raw: true
        });
    
        fail(`var new A = 0;`, {
            source: 'var new A = 0;',
            loc: true,
            ranges: true,
            raw: true
        });
    
        fail(`var (a)=0;`, {
            source: 'var (a)=0;',
            loc: true,
            ranges: true,
            raw: true
        });
    
        fail(`var a[0]=0;`, {
            source: 'var a[0]=0;',
            loc: true,
            ranges: true,
            raw: true
        });
    
        fail(`var const`, {
            source: 'var const',
            loc: true,
            ranges: true,
            raw: true
        });
    });
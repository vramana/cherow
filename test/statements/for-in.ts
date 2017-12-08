import { pass, fail } from '../utils';

describe('Statements - For In', () => {
    
        pass(`for(x in list) process(x);`, {
            source: 'for(x in list) process(x);',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ForInStatement",
                        "body": {
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "CallExpression",
                                "callee": {
                                    "type": "Identifier",
                                    "name": "process",
                                    "start": 15,
                                    "end": 22,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 15
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 22
                                        }
                                    }
                                },
                                "arguments": [
                                    {
                                        "type": "Identifier",
                                        "name": "x",
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
                                        }
                                    }
                                ],
                                "start": 15,
                                "end": 25,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 15
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 25
                                    }
                                }
                            },
                            "start": 15,
                            "end": 26,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 15
                                },
                                "end": {
                                    "line": 1,
                                    "column": 26
                                }
                            }
                        },
                        "left": {
                            "type": "Identifier",
                            "name": "x",
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
                        "right": {
                            "type": "Identifier",
                            "name": "list",
                            "start": 9,
                            "end": 13,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 9
                                },
                                "end": {
                                    "line": 1,
                                    "column": 13
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

        pass(`for (var x in list) process(x);`, {
            source: 'for (var x in list) process(x);',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ForInStatement",
                        "body": {
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "CallExpression",
                                "callee": {
                                    "type": "Identifier",
                                    "name": "process",
                                    "start": 20,
                                    "end": 27,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 20
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 27
                                        }
                                    }
                                },
                                "arguments": [
                                    {
                                        "type": "Identifier",
                                        "name": "x",
                                        "start": 28,
                                        "end": 29,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 28
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 29
                                            }
                                        }
                                    }
                                ],
                                "start": 20,
                                "end": 30,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 20
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 30
                                    }
                                }
                            },
                            "start": 20,
                            "end": 31,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 20
                                },
                                "end": {
                                    "line": 1,
                                    "column": 31
                                }
                            }
                        },
                        "left": {
                            "type": "VariableDeclaration",
                            "declarations": [
                                {
                                    "type": "VariableDeclarator",
                                    "init": null,
                                    "id": {
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
                                }
                            ],
                            "kind": "var",
                            "start": 5,
                            "end": 10,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 5
                                },
                                "end": {
                                    "line": 1,
                                    "column": 10
                                }
                            }
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "list",
                            "start": 14,
                            "end": 18,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 14
                                },
                                "end": {
                                    "line": 1,
                                    "column": 18
                                }
                            }
                        },
                        "start": 0,
                        "end": 31,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 31
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 31,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 31
                    }
                }
            }
        });

        pass(`for (let x in list) process(x);`, {
            source: 'for (let x in list) process(x);',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ForInStatement",
                        "body": {
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "CallExpression",
                                "callee": {
                                    "type": "Identifier",
                                    "name": "process",
                                    "start": 20,
                                    "end": 27,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 20
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 27
                                        }
                                    }
                                },
                                "arguments": [
                                    {
                                        "type": "Identifier",
                                        "name": "x",
                                        "start": 28,
                                        "end": 29,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 28
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 29
                                            }
                                        }
                                    }
                                ],
                                "start": 20,
                                "end": 30,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 20
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 30
                                    }
                                }
                            },
                            "start": 20,
                            "end": 31,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 20
                                },
                                "end": {
                                    "line": 1,
                                    "column": 31
                                }
                            }
                        },
                        "left": {
                            "type": "VariableDeclaration",
                            "declarations": [
                                {
                                    "type": "VariableDeclarator",
                                    "init": null,
                                    "id": {
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
                                }
                            ],
                            "kind": "let",
                            "start": 5,
                            "end": 10,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 5
                                },
                                "end": {
                                    "line": 1,
                                    "column": 10
                                }
                            }
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "list",
                            "start": 14,
                            "end": 18,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 14
                                },
                                "end": {
                                    "line": 1,
                                    "column": 18
                                }
                            }
                        },
                        "start": 0,
                        "end": 31,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 31
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 31,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 31
                    }
                }
            }
        });

        pass(`for(var a in b);`, {
            source: 'for(var a in b);',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ForInStatement",
                        "body": {
                            "type": "EmptyStatement",
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
                            }
                        },
                        "left": {
                            "type": "VariableDeclaration",
                            "declarations": [
                                {
                                    "type": "VariableDeclarator",
                                    "init": null,
                                    "id": {
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
                                    },
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
                            "kind": "var",
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
                        "right": {
                            "type": "Identifier",
                            "name": "b",
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

        pass(`for(a in b);`, {
            source: 'for(a in b);',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ForInStatement",
                        "body": {
                            "type": "EmptyStatement",
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
                        "left": {
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
                        "right": {
                            "type": "Identifier",
                            "name": "b",
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

        pass(`for(a.b in c);`, {
            source: 'for(a.b in c);',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ForInStatement",
                        "body": {
                            "type": "EmptyStatement",
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
                        "left": {
                            "type": "MemberExpression",
                            "object": {
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
                            "computed": false,
                            "property": {
                                "type": "Identifier",
                                "name": "b",
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
                        "right": {
                            "type": "Identifier",
                            "name": "c",
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

        pass(`for(let of in of);`, {
            source: 'for(let of in of);',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ForInStatement",
                        "body": {
                            "type": "EmptyStatement",
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
                            }
                        },
                        "left": {
                            "type": "VariableDeclaration",
                            "declarations": [
                                {
                                    "type": "VariableDeclarator",
                                    "init": null,
                                    "id": {
                                        "type": "Identifier",
                                        "name": "of",
                                        "start": 8,
                                        "end": 10,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 8
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 10
                                            }
                                        }
                                    },
                                    "start": 8,
                                    "end": 10,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 8
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 10
                                        }
                                    }
                                }
                            ],
                            "kind": "let",
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
                        "right": {
                            "type": "Identifier",
                            "name": "of",
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

        pass(`for(a in b);`, {
            source: 'for(a in b);',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ForInStatement",
                        "body": {
                            "type": "EmptyStatement",
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
                        "left": {
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
                        "right": {
                            "type": "Identifier",
                            "name": "b",
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

        fail(`for(let of 0);`, {
            source: 'for(let of 0);',
            loc: true,
            ranges: true,
            raw: true
        });

        fail(`for (a=12 in e) break;`, {
            source: 'for (a=12 in e) break;',
            loc: true,
            ranges: true,
            raw: true
        });
        
        fail(`for (var a, b in e) break;`, {
            source: 'for (var a, b in e) break;',
            loc: true,
            ranges: true,
            raw: true
        });

      /*  fail(`for (var a = 12 in e) break;`, {
            source: 'for (var a = 12 in e) break;',
            loc: true,
            ranges: true,
            raw: true
        });*/

        fail(`for (a in b 5`, {
            source: 'for (a in b 5',
            loc: true,
            ranges: true,
            raw: true
        });

        fail(`for (a to e) break;`, {
            source: 'for (a to e) break;',
            loc: true,
            ranges: true,
            raw: true
        });

        fail(`for (a 12 b; 12) break;`, {
            source: 'for (a 12 b; 12) break;',
            loc: true,
            ranges: true,
            raw: true
        });
        

      /*  fail(`for(this of 0);`, {
            source: 'for(this of 0);',
            loc: true,
            ranges: true,
            raw: true
        });

        fail(`for(let.let of 0);`, {
            source: 'for(let.let of 0);',
            loc: true,
            ranges: true,
            raw: true
        }); */

        /*
        fail(`for (const x in {}) { var x; }`, {
            source: 'for (const x in {}) { var x; }',
            loc: true,
            ranges: true,
            raw: true
        });
        */
});
            